import $ from 'jquery';
import moment from 'moment';

import { store } from 'app';
import {
  assignAppointment,
  moveAppointment,
  putBackAppointment,
  selectAppointment,
} from '../../containers/AppointmentPage/actions';

const EVENT_OPTION_RENDER_TEMPLATE = option => `
  <div class="app-event__option">- ${option.name}</div>
`;

const EVENT_RENDER_TEMPLATE = event => `
  <div class="app-event">
    <div class="app-event__id-number">#${event.id}</div>
    <div class="app-event__full-name">${event.userFullName}</div>
    <div class="app-event__phone-number">${event.phoneNumber}</div>
    ${event.options.map(option => EVENT_OPTION_RENDER_TEMPLATE(option))}
  </div>
`;

export const MAIN_CALENDAR_OPTIONS = {
  header: false,
  defaultView: 'agendaDay',
  groupByResource: true,
  editable: true,
  eventResourceEditable: true,
  droppable: true,
  height: 'parent',
  allDaySlot: false,
  nowIndicator: true,
  slotLabelFormat: 'HH:mm A',
  slotDuration: '00:15:00',
  defaultTimedEventDuration: '01:30:00',
  minTime: '06:00:00',
  maxTime: '23:00:00',
  timezone: 'local',
  resources: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  eventClick: event => {
    const displayedMembers = store
      .getState()
      .getIn(['appointment', 'appointments', 'calendar']);
    const oldPosition = displayedMembers.find(member =>
      member.appointments.find(appointment => appointment.id === event.data.id),
    );
    if (!oldPosition) return;

    const appointment = oldPosition.appointments.find(
      app => app.id === event.data.id,
    );
    if (!appointment) return;

    store.dispatch(selectAppointment(appointment, event));
  },
  drop(date, jsEvent, ui, resourceId) {
    const displayedMembers = store
      .getState()
      .getIn(['appointment', 'appointments', 'calendar']);
    const isOverride =
      displayedMembers[resourceId] &&
      displayedMembers[resourceId].appointments.findIndex(appointment => {
        const appTime = moment(appointment.start, 'YYYY-MM-DDTHH:mm:ss');
        return Math.abs(date.diff(appTime, 'minute')) < 90;
      });
    if (isOverride >= 0 || date.isBefore(moment())) {
      // Remove added event out of calendar
      $('#full-calendar').fullCalendar(
        'removeEvents',
        event => event.data.id === $(this).data().event.data.id,
      );
    } else {
      // Remove added event from waiting list
      const event = $(this).data().event.data;
      store.dispatch(
        assignAppointment({
          eventData: {
            ...event,
            status: 'ASSIGNED',
            start: `${date.format('YYYY-MM-DD')}T${date.format('HH:mm:ss')}`,
          },
          resourceId,
        }),
      );
    }
  },
  eventDrop: (event, delta, revertFunc) => {
    const displayedMembers = store
      .getState()
      .getIn(['appointment', 'appointments', 'calendar']);
    const override = displayedMembers[event.resourceId].appointments.find(
      appointment => {
        const appTime = moment(appointment.start, 'YYYY-MM-DDTHH:mm:ss');
        return Math.abs(event.start.diff(appTime, 'minute')) < 90;
      },
    );
    if (
      (!!override && override.id !== event.data.id) ||
      event.start.isBefore(moment()) ||
      event.data.status === 'PAID'
    ) {
      revertFunc();
    } else {
      store.dispatch(
        moveAppointment(
          event.data.id,
          event.resourceId,
          event.start.format('YYYY-MM-DDTHH:mm:ss'),
        ),
      );
    }
  },
  /* eslint no-param-reassign: "error" */
  eventDragStop: (event, jsEvent) => {
    const trashEl = $('#drag-zone');
    const ofs = trashEl.offset();

    const x1 = ofs.left;
    const x2 = ofs.left + trashEl.outerWidth(true);
    const y1 = ofs.top;
    const y2 = ofs.top + trashEl.outerHeight(true);

    if (
      jsEvent.pageX >= x1 &&
      jsEvent.pageX <= x2 &&
      jsEvent.pageY >= y1 &&
      jsEvent.pageY <= y2
    ) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      $('#full-calendar').fullCalendar('removeEvents', event._id);
      const displayedMembers = store
        .getState()
        .getIn(['appointment', 'appointments', 'calendar']);
      const override = displayedMembers[event.resourceId];
      store.dispatch(
        putBackAppointment({
          ...event.data,
          memberId: override.memberId,
        }),
      );
      setTimeout(() => {
        function handleDrag() {
          const eventInformation = $(this).data('event-information');
          $(this).data('event', {
            data: eventInformation,
            color: '#ffe400',
            stick: true,
          });

          $(this).draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0,
          });
        }
        $('#waiting-events > div').each(handleDrag);
      }, 1000);
    }
  },
  /* eslint no-param-reassign: "error" */
  eventRender: (event, element) => {
    element[0].innerHTML = EVENT_RENDER_TEMPLATE(event.data);
  },
  resourceRender: (resourceObj, labelTds) => {
    labelTds[0].innerHTML = '';
  },
};

export const addEventsToCalendar = (currentDate, appointmentsMembers) => {
  $('#full-calendar').fullCalendar('gotoDate', currentDate);
  $('#full-calendar').fullCalendar('removeEvents');
  const events = [];
  appointmentsMembers.forEach((member, index) => {
    member.appointments.forEach(appointment => {
      let eventColor = '#00b4f7';
      if (appointment.status === 'ASSIGNED') eventColor = '#ffe400';
      if (appointment.status === 'CONFIRMED') eventColor = '#98e6f8';
      if (appointment.status === 'CHECKED_IN') eventColor = '#00b4f7';
      if (appointment.status === 'PAID') eventColor = '#00dc00';
      events.push({
        resourceId: index,
        start: appointment.start,
        data: appointment,
        color: eventColor,
        startEditable: !(appointment.status === 'PAID'),
        resourceEditable: !(appointment.status === 'PAID'),
      });
    });
  });
  $('#full-calendar').fullCalendar('renderEvents', events);
};

export const deleteEventFromCalendar = eventId => {
  $('#full-calendar').fullCalendar('removeEvents', [eventId]);
};

export const updateEventFromCalendar = fcEvent => {
  let color;
  let startEditable = true;
  let resourceEditable = true;
  const { status } = fcEvent.data;
  if (status === 'ASSIGNED') {
    color = '#ffe400';
  }
  if (status === 'CONFIRMED' || fcEvent.color === '#ffe400') {
    color = '#98e6f8';
  }
  if (status === 'CHECKED_IN' || fcEvent.color === '#98e6f8') {
    color = '#00b4f7';
  }
  if (status === 'PAID' || fcEvent.color === '#00b4f7') {
    color = '#00dc00';
    startEditable = false;
    resourceEditable = false;
  }
  $('#full-calendar').fullCalendar('updateEvent', {
    ...fcEvent,
    color,
    startEditable,
    resourceEditable,
  });
};

import $ from 'jquery';
import moment from 'moment';

import { store } from 'app';
import { assignAppointment } from './actions';

export const EVENT_RENDER_TEMPLATE = event => `
  <div class="app-event">
    <div class="app-event__id-number">#${event.id}</div>
    <div class="app-event__full-name">${event.userFullName}</div>
    <div class="app-event__phone-number">${event.phoneNumber}</div>
    <div class="app-event__option">- ${event.option1}</div>
    <div class="app-event__option">- ${event.option2}</div>
    <div class="app-event__option">- ${event.option3}</div>
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
  drop(date, jsEvent, ui, resourceId) {
    const displayedMembers = store
      .getState()
      .getIn(['appointment', 'appointments', 'calendar']);
    const isOverride = displayedMembers[resourceId].appointments.findIndex(
      appointment => {
        const appTime = moment(appointment.start, 'YYYY-MM-DDTHH:mm:ss');
        return date.diff(appTime, 'minute') < 90;
      },
    );
    if (isOverride >= 0 || date.isBefore(moment())) {
      // Remove added event out of calendar
      $('#full-calendar').fullCalendar(
        'removeEvents',
        event => event.data.id === $(this).data().event.data.id,
      );
    } else {
      // Remove added event from waiting list
      const event = $(this).data().event.data;
      $(this).remove();
      store.dispatch(
        assignAppointment({
          eventData: {
            ...event,
            status: 'ASSIGNED',
            start: date.format('YYYY-MM-DDTHH:mm:ss'),
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
        return event.start.diff(appTime, 'minute') < 90;
      },
    );
    if (
      (!!override && override.id !== event.data.id) ||
      event.start.isBefore(moment())
    ) {
      revertFunc();
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

/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SELECT_DAY = 'app/Appointment/SELECT_DAY';
export const SELECT_WEEK = 'app/Appointment/SELECT_WEEK';
export const SELECT_DAY_CALENDAR = 'app/Appointment/SELECT_DAY_CALENDAR';

export const LOAD_MEMBERS = 'boilerplate/App/LOAD_MEMBERS';
export const LOAD_MEMBERS_SUCCESS = 'boilerplate/App/LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_ERROR = 'boilerplate/App/LOAD_MEMBERS_ERROR';
export const SET_DISPLAYED_MEMBERS = 'boilerplate/App/SET_DISPLAYED_MEMBERS';

export const LOAD_WAITING_APPOINTMENT =
  'boilerplate/App/LOAD_WAITING_APPOINTMENT';
export const LOAD_WAITING_APPOINTMENT_SUCCESS =
  'boilerplate/App/LOAD_WAITING_APPOINTMENT_SUCCESS';
export const LOAD_WAITING_APPOINTMENT_ERROR =
  'boilerplate/App/ASSIGN_WAITING_APPOINTMENT_ERROR';

export const LOAD_APPOINTMENTS_BY_MEMBERS =
  'boilerplate/App/LOAD_APPOINTMENTS_BY_MEMBERS';
export const LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS =
  'boilerplate/App/LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS';
export const LOAD_APPOINTMENTS_BY_MEMBERS_ERROR =
  'boilerplate/App/LOAD_APPOINTMENTS_BY_MEMBERS_ERROR';

export const ASSIGN_APPOINTMENT = 'boilerplate/App/ASSIGN_APPOINTMENT';
export const ASSIGN_APPOINTMENT_SUCCESS =
  'boilerplate/App/ASSIGN_APPOINTMENT_SUCCESS';
export const ASSIGN_APPOINTMENT_ERROR =
  'boilerplate/App/ASSIGN_APPOINTMENT_ERROR';

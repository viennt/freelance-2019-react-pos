import { delay } from 'redux-saga';
import { call, fork, put, takeLatest, all, select } from 'redux-saga/effects';
import $ from 'jquery';
import moment from 'moment';

import request from 'utils/request';

import {
  SELECT_DAY,
  SELECT_DAY_CALENDAR,
  LOAD_MEMBERS,
  SET_DISPLAYED_MEMBERS,
  LOAD_APPOINTMENTS_BY_MEMBERS,
  LOAD_WAITING_APPOINTMENT,
  ASSIGN_APPOINTMENT,
  MOVE_APPOINTMENT,
  PUT_BACK_APPOINTMENT,
  NEXT_STATUS_APPOINTMENT,
} from './constants';
import {
  selectDay,
  selectWeek,
  membersLoaded,
  memberLoadingError,
  setDisplayedMembers,
  waitingAppointmentsLoaded,
  waitingAppointmentLoadingError,
  loadAppointmentByMembers,
  appointmentByMembersLoaded,
  appointmentByMemberLoadingError,
  appointmentAssigned,
  appointmentAssigningError,
  appointmentMoved,
  appointmentMovingError,
  appointmentPutBack,
  appointmentPutingBackError,
  deselectAppointment,
} from './actions';
import {
  makeCurrentDay,
  makeSelectCalendarAppointments,
  makeSelectDisplayedMembers,
  makeSelectFCEvent,
} from './selectors';

import {
  GET_APPOINTMENTS_BY_MEMBERS_DATE_API,
  GET_MEMBERS_API,
  GET_WAITING_APPOINTMENTS_API,
  POST_ASSIGN_APPOINTMENT_API,
} from '../../../app-constants';

import { members as mockedMembers } from '../../assets/mocks/members';
import { waitingAppointments as mockedWaitingAppointments } from '../../assets/mocks/waitingAppointments';
import { appointments as mockedAppointments } from '../../assets/mocks/appointments';
import { assignAppointment as mockedAssignAppointment } from '../../assets/mocks/assignAppointment';

/* **************************** API Caller ********************************* */

export function* getMembers() {
  const requestURL = new URL(GET_MEMBERS_API);
  requestURL.searchParams.append('_embed', 'appointments');

  // TODO: Remove this after apply real api
  yield delay(1000);

  try {
    const members =
      process.env.NODE_ENV === 'production'
        ? mockedMembers
        : yield call(request, requestURL.toString());
    yield put(
      membersLoaded(
        members.map(member => ({
          id: member.id,
          title: member.title,
          imageUrl: member.imageUrl,
          orderNumber: member.orderNumber,
          numberOfAppointments: member.appointments.length,
        })),
      ),
    );
    yield put(setDisplayedMembers(members.slice(0, 6)));
  } catch (err) {
    yield put(memberLoadingError(err));
  }
}

export function* getWaitingAppointments() {
  const requestURL = new URL(GET_WAITING_APPOINTMENTS_API);
  requestURL.searchParams.append('status', 'WAITING');

  // TODO: Remove this after apply real api
  yield delay(1000);

  try {
    const appointments =
      process.env.NODE_ENV === 'production'
        ? mockedWaitingAppointments
        : yield call(request, requestURL.toString());
    yield put(waitingAppointmentsLoaded(appointments));
  } catch (err) {
    yield put(waitingAppointmentLoadingError(err));
  }
}

export function* getAppointmentsByMembersAndDate() {
  const displayedMembers = yield select(makeSelectDisplayedMembers());
  const currentDate = yield select(makeCurrentDay());

  const requestURL = new URL(GET_APPOINTMENTS_BY_MEMBERS_DATE_API);
  displayedMembers.forEach(member => {
    requestURL.searchParams.append('memberId', member.id);
  });
  requestURL.searchParams.append(
    'start_like',
    currentDate.format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
  );

  try {
    const appointments =
      process.env.NODE_ENV === 'production'
        ? mockedAppointments
        : yield call(request, requestURL.toString());
    const appointmentsMembers = displayedMembers.map(member => ({
      memberId: member.id,
      appointments: appointments.filter(
        appointment => appointment.memberId === member.id,
      ),
    }));
    yield put(appointmentByMembersLoaded(appointmentsMembers));

    // ******************** //
    // UPDATE MAIN CALENDAR
    // ******************** //
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
        });
      });
    });
    $('#full-calendar').fullCalendar('renderEvents', events);
  } catch (err) {
    yield put(appointmentByMemberLoadingError(err));
  }
}

export function* assignAppointment(action) {
  const displayedMembers = yield select(makeSelectDisplayedMembers());
  const assignedMember = displayedMembers[action.resourceId];
  const appointment = {
    ...action.eventData,
    memberId: assignedMember.id,
  };
  const requestURL = new URL(POST_ASSIGN_APPOINTMENT_API);

  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        memberId: appointment.memberId,
        appointmentId: appointment.id,
      }),
    };
    const result =
      process.env.NODE_ENV === 'production'
        ? mockedAssignAppointment
        : yield call(request, requestURL.toString(), options);
    if (result) {
      yield put(appointmentAssigned(appointment));
    } else {
      yield put(appointmentAssigningError(result));
    }
  } catch (err) {
    yield put(appointmentAssigningError(err));
  }
}

export function* moveAppointment(action) {
  const displayedMembers = yield select(makeSelectDisplayedMembers());
  const calendarMembers = yield select(makeSelectCalendarAppointments());
  const assignedMember = displayedMembers[action.newPositionIndex];

  const oldMemberPosition = calendarMembers.find(member =>
    member.appointments.find(
      appointment => appointment.id === action.appointmentId,
    ),
  );
  if (!oldMemberPosition) {
    return;
  }

  const movedAppointment = oldMemberPosition.appointments.find(
    appointment => appointment.id === action.appointmentId,
  );
  if (!movedAppointment) {
    return;
  }

  const appointment = {
    ...movedAppointment,
    start: action.newTime,
    memberId: assignedMember.id,
  };
  const requestURL = new URL(POST_ASSIGN_APPOINTMENT_API);

  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        memberId: appointment.memberId,
        appointmentId: appointment.id,
      }),
    };
    const result =
      process.env.NODE_ENV === 'production'
        ? mockedAssignAppointment
        : yield call(request, requestURL.toString(), options);
    if (result) {
      yield put(appointmentMoved(appointment));
    } else {
      yield put(appointmentMovingError(result));
    }
  } catch (err) {
    yield put(appointmentMovingError(err));
  }
}

export function* putBackAppointment(action) {
  const requestURL = new URL(POST_ASSIGN_APPOINTMENT_API);

  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        memberId: action.appointment.memberId,
        appointmentId: action.appointment.id,
      }),
    };
    const result =
      process.env.NODE_ENV === 'production'
        ? mockedAssignAppointment
        : yield call(request, requestURL.toString(), options);
    if (result) {
      yield put(appointmentPutBack(action.appointment));
    } else {
      yield put(appointmentPutingBackError(result));
    }
  } catch (err) {
    yield put(appointmentMovingError(err));
  }
}

export function* nextStatusAppointment() {
  const fcEvent = yield select(makeSelectFCEvent());
  if (fcEvent) {
    const { status } = fcEvent.data;
    if (status === 'ASSIGNED') fcEvent.color = '#ffe400';
    if (status === 'CONFIRMED') fcEvent.color = '#98e6f8';
    if (status === 'CHECKED_IN') fcEvent.color = '#00b4f7';
    if (status === 'PAID') fcEvent.color = '#00dc00';
    $('#full-calendar').fullCalendar('updateEvent', fcEvent);
    yield put(deselectAppointment());
  }
}

/* **************************** Subroutines ******************************** */

export function* selectDayAndWeek(action) {
  yield put(selectDay(action.day));
  yield put(selectWeek(action.day));
}

export function* getDisplayedMembers() {
  yield put(loadAppointmentByMembers());
}

/* ************************************************************************* */
/* ****************************** WATCHERS ********************************* */
/* ************************************************************************* */

export function* selectDayOnCalendar() {
  yield takeLatest(SELECT_DAY_CALENDAR, selectDayAndWeek);
}

export function* membersData() {
  yield takeLatest(LOAD_MEMBERS, getMembers);
}

export function* waitingAppointmentsData() {
  yield takeLatest(LOAD_WAITING_APPOINTMENT, getWaitingAppointments);
}

export function* appointmentsByMembersData() {
  yield takeLatest(
    LOAD_APPOINTMENTS_BY_MEMBERS,
    getAppointmentsByMembersAndDate,
  );
  yield takeLatest(SELECT_DAY, getAppointmentsByMembersAndDate);
}

export function* displayedMembersData() {
  yield takeLatest(SET_DISPLAYED_MEMBERS, getDisplayedMembers);
}

export function* assignAppointmentData() {
  yield takeLatest(ASSIGN_APPOINTMENT, assignAppointment);
}

export function* moveAppointmentData() {
  yield takeLatest(MOVE_APPOINTMENT, moveAppointment);
}

export function* putBackAppointmentData() {
  yield takeLatest(PUT_BACK_APPOINTMENT, putBackAppointment);
}

export function* nextStatusAppointmentData() {
  yield takeLatest(NEXT_STATUS_APPOINTMENT, nextStatusAppointment);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    fork(selectDayOnCalendar),
    fork(membersData),
    fork(waitingAppointmentsData),
    fork(displayedMembersData),
    fork(appointmentsByMembersData),
    fork(assignAppointmentData),
    fork(moveAppointmentData),
    fork(putBackAppointmentData),
    fork(nextStatusAppointmentData),
  ]);
}

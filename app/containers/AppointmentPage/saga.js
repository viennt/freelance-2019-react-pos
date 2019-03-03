import { delay } from 'redux-saga';
import { call, fork, put, takeLatest, all, select } from 'redux-saga/effects';
import $ from 'jquery';
import moment from 'moment';

import request from 'utils/request';

import {
  SELECT_DAY,
  SELECT_DAY_CALENDAR,
  LOAD_MEMBERS,
  LOAD_APPOINTMENTS_BY_MEMBERS,
  ASSIGN_APPOINTMENT,
  SET_DISPLAYED_MEMBERS,
  LOAD_WAITING_APPOINTMENT,
} from './constants';
import {
  selectDay,
  selectWeek,
  membersLoaded,
  memberLoadingError,
  loadAppointmentByMembers,
  appointmentByMembersLoaded,
  appointmentByMemberLoadingError,
  setDisplayedMembers,
  appointmentAssigned,
  waitingAppointmentsLoaded,
  waitingAppointmentLoadingError,
} from './actions';
import { makeCurrentDay, makeSelectDisplayedMembers } from './selectors';

const baseUrl = 'http://localhost:3000';

/* **************************** API Caller ********************************* */

export function* getMembers() {
  const requestURL = new URL('members', baseUrl);
  requestURL.searchParams.append('_embed', 'appointments');

  // TODO: Remove this after apply real api
  yield delay(1000);

  try {
    const members = yield call(request, requestURL.toString());
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
  const requestURL = new URL('appointments', baseUrl);
  requestURL.searchParams.append('status', 'WAITING');

  // TODO: Remove this after apply real api
  yield delay(1000);

  try {
    const appointments = yield call(request, requestURL.toString());
    yield put(waitingAppointmentsLoaded(appointments));
  } catch (err) {
    yield put(waitingAppointmentLoadingError(err));
  }
}

export function* getAppointmentsByMembersAndDate() {
  const displayedMembers = yield select(makeSelectDisplayedMembers());
  const currentDate = yield select(makeCurrentDay());

  const requestURL = new URL('appointments', baseUrl);
  displayedMembers.forEach(member => {
    requestURL.searchParams.append('memberId', member.id);
  });
  requestURL.searchParams.append(
    'start_like',
    currentDate.format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
  );

  try {
    const appointments = yield call(request, requestURL.toString());
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
        events.push({
          resourceId: index,
          start: appointment.start,
          data: appointment,
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
  const requestURL = new URL('appointments', baseUrl);

  try {
    const result = yield call(request, requestURL.toString(), {
      method: 'POST',
      body: JSON.stringify({
        memberId: appointment.memberId,
        appointmentId: appointment.id,
      }),
    });
    if (result) {
      yield put(appointmentAssigned(appointment));
    } else {
      yield put(memberLoadingError(result));
    }
  } catch (err) {
    yield put(memberLoadingError(err));
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
  ]);
}

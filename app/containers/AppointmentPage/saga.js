/**
 * Gets the membersitories of the user from Github
 */

import { delay } from 'redux-saga';
import { call, fork, put, takeLatest, all, select } from 'redux-saga/effects';
import $ from 'jquery';
import moment from 'moment';

import request from 'utils/request';
import {
  SELECT_DAY_CALENDAR,
  LOAD_MEMBERS,
  LOAD_APPOINTMENTS_BY_MEMBERS,
  SET_DISPLAYED_MEMBERS,
  SELECT_DAY,
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
} from './actions';
import { makeCurrentDay, makeSelectDisplayedMembers } from './selectors';

const baseUrl = 'http://localhost:3000';

export function* selectDayAndWeek(action) {
  yield put(selectDay(action.day));
  yield put(selectWeek(action.day));
}

export function* getMembers(action) {
  const requestURL = new URL('members', baseUrl);
  if (action.page) {
    requestURL.searchParams.append('_page', action.page);
  }
  if (action.limit) {
    requestURL.searchParams.append('_limit', action.limit);
  }
  if (action.embed) {
    requestURL.searchParams.append('_embed', action.embed);
  }

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

export function* getDisplayedMembers() {
  yield put(loadAppointmentByMembers());
}

export function* getAppointmentsByMembersAndDate() {
  const displayedMembers = yield select(makeSelectDisplayedMembers());
  const currentDate = yield select(makeCurrentDay());

  $('#full-calendar').fullCalendar('gotoDate', currentDate);
  $('#full-calendar').fullCalendar('removeEvents');

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

export function* selectDayOnCalendar() {
  yield takeLatest(SELECT_DAY_CALENDAR, selectDayAndWeek);
}

export function* membersData() {
  yield takeLatest(LOAD_MEMBERS, getMembers);
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    fork(selectDayOnCalendar),
    fork(membersData),
    fork(displayedMembersData),
    fork(appointmentsByMembersData),
  ]);
}

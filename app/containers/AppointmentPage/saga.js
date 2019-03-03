/**
 * Gets the membersitories of the user from Github
 */

import { delay } from 'redux-saga';
import { call, fork, put, takeLatest, all } from 'redux-saga/effects';
import $ from 'jquery';

import request from 'utils/request';
import { SELECT_DAY_CALENDAR, LOAD_MEMBERS } from './constants';
import {
  selectDay,
  selectWeek,
  membersLoaded,
  memberLoadingError,
} from './actions';

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
    const events = [];
    members.forEach((member, index) => {
      member.appointments.forEach(appointment => {
        events.push({
          resourceId: index,
          start: appointment.start,
          data: appointment,
        });
      });
    });
    $('#full-calendar').fullCalendar('renderEvents', events);
    yield put(membersLoaded(members));
  } catch (err) {
    yield put(memberLoadingError(err));
  }
}

export function* selectDayOnCalendar() {
  yield takeLatest(SELECT_DAY_CALENDAR, selectDayAndWeek);
}

export function* memberData() {
  yield takeLatest(LOAD_MEMBERS, getMembers);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([fork(selectDayOnCalendar), fork(memberData)]);
}

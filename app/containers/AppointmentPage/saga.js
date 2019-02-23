/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';

import { SELECT_DAY_CALENDAR } from './constants';
import { selectDay, selectWeek } from './actions';

/**
 * Github repos request/response handler
 */
export function* selectDayAndWeek(action) {
  yield put(selectDay(action.day));
  yield put(selectWeek(action.day));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* selectDayOnCalendar() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SELECT_DAY_CALENDAR, selectDayAndWeek);
}

import { delay } from 'redux-saga';
import { call, fork, put, takeLatest, all, select } from 'redux-saga/effects';
import moment from 'moment';

// import request from 'utils/request';

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
  UPDATE_STATUS_APPOINTMENT,
  CANCEL_APPOINTMENT,
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
  appointmentPuttingBackError,
  deselectAppointment,
  appointmentCanceled,
  appointmentCancellingError,
  appointmentUpdatedStatus,
  appointmentUpdatingStatusError,
} from './actions';
import {
  makeCurrentDay,
  makeSelectAppointment,
  makeSelectCalendarAppointments,
  makeSelectDisplayedMembers,
  makeSelectFCEvent,
} from './selectors';

// import {
// GET_MEMBERS_API,
// GET_WAITING_APPOINTMENTS_API,
// GET_APPOINTMENTS_BY_MEMBERS_DATE_API,
// POST_ASSIGN_APPOINTMENT_API,
// POST_MOVE_APPOINTMENT_API,
// POST_PUT_BACK_APPOINTMENT_API
// POST_CANCEL_APPOINTMENT_API
// POST_STATUS_APPOINTMENT_API
// } from '../../../app-constants';

import { members as mockedMembers } from '../../assets/mocks/members';
import { appointments as mockedAppointments } from '../../assets/mocks/appointments';
import { assignAppointment as mockedPostAppointment } from '../../assets/mocks/assignAppointment';
import {
  addEventsToCalendar,
  deleteEventFromCalendar,
  updateEventFromCalendar,
} from '../../components/Calendar/constants';

/* **************************** API Caller ********************************* */

export function* getMembers() {
  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const members = mockedMembers;
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(GET_MEMBERS_API);
    // const members = yield call(request, requestURL.toString());
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
    yield put(membersLoaded(members));
    yield put(setDisplayedMembers(members.slice(0, 6)));
  } catch (err) {
    yield put(memberLoadingError(err));
  }
}

export function* getWaitingAppointments() {
  // Query params for this api
  const apiStatusQuery = 'WAITING';

  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const appointments = mockedAppointments.filter(
      app => app.status === apiStatusQuery,
    );
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(GET_WAITING_APPOINTMENTS_API);
    // requestURL.searchParams.append('status', apiStatusQuery);
    // const appointments = yield call(request, requestURL.toString());
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
    yield put(waitingAppointmentsLoaded(appointments));
  } catch (err) {
    yield put(waitingAppointmentLoadingError(err));
  }
}

export function* getAppointmentsByMembersAndDate() {
  const displayedMembers = yield select(makeSelectDisplayedMembers());
  const currentDate = yield select(makeCurrentDay());

  // Query params for this api
  const apiDateQuery =
    currentDate.format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
  const apiMemberIdsQuery = displayedMembers.map(member => member.id);

  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const appointments = mockedAppointments.filter(
      app =>
        app.start &&
        app.start.startsWith(apiDateQuery) &&
        apiMemberIdsQuery.includes(app.memberId),
    );
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(GET_APPOINTMENTS_BY_MEMBERS_DATE_API);
    // requestURL.searchParams.append('date', apiDateQuery);
    // apiMemberIdsQuery.forEach(memberId =>
    //   requestURL.searchParams.append('memberId', memberId),
    // );
    // const appointments = yield call(request, requestURL.toString());
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
    const appointmentsMembers = displayedMembers.map(member => ({
      memberId: member.id,
      appointments: appointments.filter(
        appointment => appointment.memberId === member.id,
      ),
    }));
    yield put(appointmentByMembersLoaded(appointmentsMembers));
    // Update main calendar
    addEventsToCalendar(currentDate, appointmentsMembers);
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

  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const result = mockedPostAppointment;
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(POST_ASSIGN_APPOINTMENT_API);
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     memberId: appointment.memberId,
    //     appointmentId: appointment.id,
    //   }),
    // };
    // const result = yield call(request, requestURL.toString(), options);
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
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
    yield put(appointmentMovingError('Cannot find previous position.'));
  }

  const movedAppointment = oldMemberPosition.appointments.find(
    appointment => appointment.id === action.appointmentId,
  );
  if (!movedAppointment) {
    yield put(appointmentMovingError('Cannot find moved appointment.'));
  }

  const appointment = {
    ...movedAppointment,
    start: action.newTime,
    memberId: assignedMember.id,
  };

  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const result = mockedPostAppointment;
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(POST_MOVE_APPOINTMENT_API);
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     memberId: appointment.memberId,
    //     appointmentId: appointment.id,
    //   }),
    // };
    // const result = yield call(request, requestURL.toString(), options);
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
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
  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const result = mockedPostAppointment;
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(POST_PUT_BACK_APPOINTMENT_API);
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     appointmentId: action.appointment.id,
    //   }),
    // };
    // const result = yield call(request, requestURL.toString(), options);
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
    if (result) {
      yield put(appointmentPutBack(action.appointment));
    } else {
      yield put(appointmentPuttingBackError(result));
    }
  } catch (err) {
    yield put(appointmentPuttingBackError(err));
  }
}

export function* cancelAppointment(action) {
  const fcEvent = yield select(makeSelectFCEvent());

  if (!fcEvent) {
    yield put(appointmentCancellingError('Cannot find selected fcEvent'));
  }

  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const result = mockedPostAppointment;
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(POST_CANCEL_APPOINTMENT_API);
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     appointmentId: action.appointmentId,
    //   }),
    // };
    // const result = yield call(request, requestURL.toString(), options);
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
    if (result) {
      yield put(appointmentCanceled(action.appointmentId));
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      deleteEventFromCalendar(fcEvent._id);
      yield put(deselectAppointment());
    } else {
      yield put(appointmentCancellingError(result));
    }
  } catch (err) {
    yield put(appointmentCancellingError(err));
  }
}

export function* updateStatusAppointment(action) {
  const fcEvent = yield select(makeSelectFCEvent());

  if (!fcEvent) {
    yield put(appointmentUpdatingStatusError('Cannot find selected fcEvent'));
  }

  try {
    /* |||||||||||||||||||||| MOCKED DATA BLOCK |||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    yield delay(200);
    const result = mockedPostAppointment;
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

    /* ------------------ REAL DATA FROM API BLOCK ------------------- */
    /* --------------------------------------------------------------- */
    // const requestURL = new URL(POST_STATUS_APPOINTMENT_API);
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     appointmentId: action.appointmentId,
    //     status: fcEvent.data.status
    //   }),
    // };
    // const result = yield call(request, requestURL.toString(), options);
    /* --------------------------------------------------------------- */
    /* --------------------------------------------------------------- */
    if (result) {
      yield put(appointmentUpdatedStatus(action.appointmentId));
      updateEventFromCalendar(fcEvent);
      yield put(deselectAppointment());
    } else {
      yield put(appointmentUpdatingStatusError(result));
    }
  } catch (err) {
    yield put(appointmentUpdatingStatusError(err));
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

export function* updateStatusAppointmentData() {
  yield takeLatest(UPDATE_STATUS_APPOINTMENT, updateStatusAppointment);
}

export function* cancelAppointmentData() {
  yield takeLatest(CANCEL_APPOINTMENT, cancelAppointment);
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
    fork(updateStatusAppointmentData),
    fork(cancelAppointmentData),
  ]);
}

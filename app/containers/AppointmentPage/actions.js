/*
 * Appointment Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  ASSIGN_APPOINTMENT,
  ASSIGN_APPOINTMENT_ERROR,
  ASSIGN_APPOINTMENT_SUCCESS,
  CANCEL_APPOINTMENT,
  CANCEL_APPOINTMENT_ERROR,
  CANCEL_APPOINTMENT_SUCCESS,
  CLOSE_ADDING_APPOINTMENT,
  DESELECT_APPOINTMENT,
  LOAD_APPOINTMENTS_BY_MEMBERS,
  LOAD_APPOINTMENTS_BY_MEMBERS_ERROR,
  LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS,
  LOAD_MEMBERS,
  LOAD_MEMBERS_ERROR,
  LOAD_MEMBERS_SUCCESS,
  LOAD_WAITING_APPOINTMENT,
  LOAD_WAITING_APPOINTMENT_ERROR,
  LOAD_WAITING_APPOINTMENT_SUCCESS,
  MOVE_APPOINTMENT,
  MOVE_APPOINTMENT_ERROR,
  MOVE_APPOINTMENT_SUCCESS,
  OPEN_ADDING_APPOINTMENT,
  PUT_BACK_APPOINTMENT,
  PUT_BACK_APPOINTMENT_ERROR,
  PUT_BACK_APPOINTMENT_SUCCESS,
  SELECT_APPOINTMENT,
  SELECT_DAY,
  SELECT_DAY_CALENDAR,
  SELECT_WEEK,
  SET_DISPLAYED_MEMBERS,
  UPDATE_STATUS_APPOINTMENT,
  UPDATE_STATUS_APPOINTMENT_SUCCESS,
  UPDATE_STATUS_APPOINTMENT_ERROR,
  UPDATE_CALENDAR_INTERVAL,
} from './constants';

/**
 * Select day on mini calendar or day slider
 * @param  {string} day The string with format DDMMYYYY
 * @return {object}   An action object with a type of SELECT_DAY
 */
export function selectDay(day) {
  return {
    type: SELECT_DAY,
    day,
  };
}

/**
 * Select week on day slider
 * @param  {string} dayOfWeek The string with format DDMMYYYY
 * @return {object}   An action object with a type of SELECT_DAY
 */
export function selectWeek(dayOfWeek) {
  return {
    type: SELECT_WEEK,
    dayOfWeek,
  };
}

/**
 * Select day on mini calendar
 * @param  {string} day The string with format DDMMYYYY
 * @return {object}   An action object with a type of SELECT_DAY
 */
export function selectDayOnCalendar(day) {
  return {
    type: SELECT_DAY_CALENDAR,
    day,
  };
}

/**
 * Select an appointment
 * @param  {object} appointment The appointment was selected
 * @param  {object} fcEvent The fcEvent was selected
 * @return {object}   An action object with a type of SELECT_APPOINTMENT
 */
export function selectAppointment(appointment, fcEvent) {
  return {
    type: SELECT_APPOINTMENT,
    appointment,
    fcEvent,
  };
}

/**
 * Deselect the appointment
 * @return {object}   An action object with a type of DESELECT_APPOINTMENT
 */
export function deselectAppointment() {
  return {
    type: DESELECT_APPOINTMENT,
  };
}

/**
 * Open adding appointment popup
 * @param  {object} appointment The selected appointment
 * @return {object}   An action object with a type of OPEN_ADDING_APPOINTMENT
 */
export function openAddingAppointment(appointment) {
  return {
    type: OPEN_ADDING_APPOINTMENT,
    appointment,
  };
}

/**
 * Close adding appointment popup
 * @return {object}   An action object with a type of CLOSE_ADDING_APPOINTMENT
 */
export function closeAddingAppointment() {
  return {
    type: CLOSE_ADDING_APPOINTMENT,
  };
}

/**
 * Load the members, this action starts the request saga
 * @return {object} An action object with a type of LOAD_MEMBERS
 */
export function loadMembers() {
  return {
    type: LOAD_MEMBERS,
  };
}

/**
 * Dispatched when the members are loaded by the request saga
 * @param  {array} members The members data
 * @return {object} An action object with a type of LOAD_MEMBERS_SUCCESS passing the members
 */
export function membersLoaded(members) {
  return {
    type: LOAD_MEMBERS_SUCCESS,
    members,
  };
}

/**
 * Dispatched when loading the members fails
 * @param  {object} error The error
 * @return {object} An action object with a type of LOAD_MEMBERS_ERROR passing the error
 */
export function memberLoadingError(error) {
  return {
    type: LOAD_MEMBERS_ERROR,
    error,
  };
}

/**
 * Load the members, this action starts the request saga
 * @param  {object} members The url options
 * @return {object} An action object with a type of LOAD_MEMBERS
 */
export function setDisplayedMembers(members) {
  return {
    type: SET_DISPLAYED_MEMBERS,
    members,
  };
}

/**
 * Load the waiting appointments, this action starts the request saga
 * @param  {object} options The url options
 * @return {object} An action object with a type of LOAD_WAITING_APPOINTMENT
 */
export function loadWaitingAppointments(options) {
  return {
    type: LOAD_WAITING_APPOINTMENT,
    ...options,
  };
}

/**
 * Dispatched when the waiting appointments are loaded by the request saga
 * @param  {array} appointments The appointments data
 * @return {object} An action object with a type of LOAD_WAITING_APPOINTMENT_SUCCESS passing the appointments
 */
export function waitingAppointmentsLoaded(appointments) {
  return {
    type: LOAD_WAITING_APPOINTMENT_SUCCESS,
    appointments,
  };
}

/**
 * Dispatched when loading the waiting appointments fails
 * @param  {object} error The error
 * @return {object} An action object with a type of LOAD_WAITING_APPOINTMENT_ERROR passing the error
 */
export function waitingAppointmentLoadingError(error) {
  return {
    type: LOAD_WAITING_APPOINTMENT_ERROR,
    error,
  };
}

/**
 * Load the appointment by members, this action starts the request saga
 // * @param  {object} options The url options
 * @return {object} An action object with a type of LOAD_APPOINTMENTS_BY_MEMBERS
 */
export function loadAppointmentByMembers() {
  return {
    type: LOAD_APPOINTMENTS_BY_MEMBERS,
  };
}

/**
 * Dispatched when the appointment by members are loaded by the request saga
 * @param  {array} appointments The appointments data
 * @return {object} An action object with a type of LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS passing the members
 */
export function appointmentByMembersLoaded(appointments) {
  return {
    type: LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS,
    appointments,
  };
}

/**
 * Dispatched when loading the appointment by members fails
 * @param  {object} error The error
 * @return {object} An action object with a type of LOAD_APPOINTMENTS_BY_MEMBERS_ERROR passing the error
 */
export function appointmentByMemberLoadingError(error) {
  return {
    type: LOAD_APPOINTMENTS_BY_MEMBERS_ERROR,
    error,
  };
}

/**
 * Assign appointment to member, this action starts the request saga
 * @param  {object} options The url options
 * @return {object} An action object with a type of ASSIGN_APPOINTMENT
 */
export function assignAppointment(options) {
  return {
    type: ASSIGN_APPOINTMENT,
    ...options,
  };
}

/**
 * Dispatched when assign appointment to member by the request saga
 * @param  {object} appointment
 * @return {object} An action object with a type of ASSIGN_APPOINTMENT_SUCCESS passing the members
 */
export function appointmentAssigned(appointment) {
  return {
    type: ASSIGN_APPOINTMENT_SUCCESS,
    appointment,
  };
}

/**
 * Dispatched when assigning appointment to member fails
 * @param  {object} error The error
 * @return {object} An action object with a type of ASSIGN_APPOINTMENT_ERROR passing the error
 */
export function appointmentAssigningError(error) {
  return {
    type: ASSIGN_APPOINTMENT_ERROR,
    error,
  };
}

/**
 * Move to another member, this action starts the request saga
 * @param  {number} appointmentId The url options
 * @param  {number} newPositionIndex The url options
 * @param  {object} newTime The url options
 * @param  {object} newEndTime The url options
 * @return {object} An action object with a type of MOVE_APPOINTMENT
 */
export function moveAppointment(
  appointmentId,
  newPositionIndex,
  newTime,
  newEndTime,
) {
  return {
    type: MOVE_APPOINTMENT,
    appointmentId,
    newPositionIndex,
    newTime,
    newEndTime,
  };
}

/**
 * Dispatched when move appointment to member by the request saga
 * @param  {object} appointment
 * @return {object} An action object with a type of MOVE_APPOINTMENT_SUCCESS passing the members
 */
export function appointmentMoved(appointment) {
  return {
    type: MOVE_APPOINTMENT_SUCCESS,
    appointment,
  };
}

/**
 * Dispatched when moving appointment to member fails
 * @param  {object} error The error
 * @return {object} An action object with a type of MOVE_APPOINTMENT_ERROR passing the error
 */
export function appointmentMovingError(error) {
  return {
    type: MOVE_APPOINTMENT_ERROR,
    error,
  };
}

/**
 * Put back to waiting list, this action starts the request saga
 * @param  {object} appointment The url options
 * @return {object} An action object with a type of PUT_BACK_APPOINTMENT
 */
export function putBackAppointment(appointment) {
  return {
    type: PUT_BACK_APPOINTMENT,
    appointment,
  };
}

/**
 * Dispatched when put back appointment to waiting list by the request saga
 * @param  {object} appointment
 * @return {object} An action object with a type of PUT_BACK_APPOINTMENT_SUCCESS passing the members
 */
export function appointmentPutBack(appointment) {
  return {
    type: PUT_BACK_APPOINTMENT_SUCCESS,
    appointment,
  };
}

/**
 * Dispatched when putting back appointment to waiting fails
 * @param  {object} error The error
 * @return {object} An action object with a type of PUT_BACK_APPOINTMENT_ERROR passing the error
 */
export function appointmentPuttingBackError(error) {
  return {
    type: PUT_BACK_APPOINTMENT_ERROR,
    error,
  };
}

/**
 * Cancel appointment, this action starts the request saga
 * @param  {number} appointmentId The url options
 * @return {object} An action object with a type of CANCEL_APPOINTMENT
 */
export function cancelAppointment(appointmentId) {
  return {
    type: CANCEL_APPOINTMENT,
    appointmentId,
  };
}

/**
 * Dispatched when cancel appointment to waiting list by the request saga
 * @param  {number} appointmentId
 * @return {object} An action object with a type of CANCEL_APPOINTMENT_SUCCESS passing the members
 */
export function appointmentCanceled(appointmentId) {
  return {
    type: CANCEL_APPOINTMENT_SUCCESS,
    appointmentId,
  };
}

/**
 * Dispatched when cancelling appointment to waiting fails
 * @param  {object} error The error
 * @return {object} An action object with a type of CANCEL_APPOINTMENT_ERROR passing the error
 */
export function appointmentCancellingError(error) {
  return {
    type: CANCEL_APPOINTMENT_ERROR,
    error,
  };
}

/**
 * Update status of appointment, this action starts the request saga
 * @param  {number} appointmentId The error
 * @param  {object} bookingServices The error
 * @return {object} An action object with a type of UPDATE_STATUS_APPOINTMENT
 */
export function updateStatusAppointment(appointmentId, bookingServices) {
  return {
    type: UPDATE_STATUS_APPOINTMENT,
    appointmentId,
    bookingServices,
  };
}

/**
 * Dispatched when update status of appointment to waiting list by the request saga
 * @param  {number} appointmentId
 * @return {object} An action object with a type of UPDATE_STATUS_APPOINTMENT_SUCCESS passing the members
 */
export function appointmentUpdatedStatus(appointmentId) {
  return {
    type: UPDATE_STATUS_APPOINTMENT_SUCCESS,
    appointmentId,
  };
}

/**
 * Dispatched when updating status of appointment to waiting fails
 * @param  {object} error The error
 * @return {object} An action object with a type of UPDATE_STATUS_APPOINTMENT_ERROR passing the error
 */
export function appointmentUpdatingStatusError(error) {
  return {
    type: UPDATE_STATUS_APPOINTMENT_ERROR,
    error,
  };
}

// FIXME: This is hard code for real-time calendar
export function updateCalendarInterval() {
  return {
    type: UPDATE_CALENDAR_INTERVAL,
  };
}

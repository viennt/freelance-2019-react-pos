/*
 * AppointmentConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'app/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'app/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SELECT_DAY = 'app/Appointment/SELECT_DAY';
export const SELECT_WEEK = 'app/Appointment/SELECT_WEEK';
export const SELECT_DAY_CALENDAR = 'app/Appointment/SELECT_DAY_CALENDAR';

export const SELECT_APPOINTMENT = 'app/Appointment/SELECT_APPOINTMENT';
export const DESELECT_APPOINTMENT = 'app/Appointment/DESELECT_APPOINTMENT';

export const OPEN_ADDING_APPOINTMENT =
  'app/Appointment/OPEN_ADDING_APPOINTMENT';
export const CLOSE_ADDING_APPOINTMENT =
  'app/Appointment/CLOSE_ADDING_APPOINTMENT';

export const LOAD_MEMBERS = 'App/LOAD_MEMBERS';
export const LOAD_MEMBERS_SUCCESS = 'App/LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_ERROR = 'App/LOAD_MEMBERS_ERROR';
export const SET_DISPLAYED_MEMBERS = 'App/SET_DISPLAYED_MEMBERS';

export const LOAD_WAITING_APPOINTMENT = 'App/LOAD_WAITING_APPOINTMENT';
export const LOAD_WAITING_APPOINTMENT_SUCCESS =
  'App/LOAD_WAITING_APPOINTMENT_SUCCESS';
export const LOAD_WAITING_APPOINTMENT_ERROR =
  'App/ASSIGN_WAITING_APPOINTMENT_ERROR';

export const LOAD_APPOINTMENTS_BY_MEMBERS = 'App/LOAD_APPOINTMENTS_BY_MEMBERS';
export const LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS =
  'App/LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS';
export const LOAD_APPOINTMENTS_BY_MEMBERS_ERROR =
  'App/LOAD_APPOINTMENTS_BY_MEMBERS_ERROR';

export const ASSIGN_APPOINTMENT = 'App/ASSIGN_APPOINTMENT';
export const ASSIGN_APPOINTMENT_SUCCESS = 'App/ASSIGN_APPOINTMENT_SUCCESS';
export const ASSIGN_APPOINTMENT_ERROR = 'App/ASSIGN_APPOINTMENT_ERROR';

export const MOVE_APPOINTMENT = 'App/MOVE_APPOINTMENT';
export const MOVE_APPOINTMENT_SUCCESS = 'App/MOVE_APPOINTMENT_SUCCESS';
export const MOVE_APPOINTMENT_ERROR = 'App/MOVE_APPOINTMENT_ERROR';

export const PUT_BACK_APPOINTMENT = 'App/PUT_BACK_APPOINTMENT';
export const PUT_BACK_APPOINTMENT_SUCCESS = 'App/PUT_BACK_APPOINTMENT_SUCCESS';
export const PUT_BACK_APPOINTMENT_ERROR = 'App/PUT_BACK_APPOINTMENT_ERROR';

export const CANCEL_APPOINTMENT = 'app/Appointment/CANCEL_APPOINTMENT';
export const CANCEL_APPOINTMENT_SUCCESS =
  'app/Appointment/CANCEL_APPOINTMENT_SUCCESS';
export const CANCEL_APPOINTMENT_ERROR =
  'app/Appointment/CANCEL_APPOINTMENT_ERROR';

export const UPDATE_STATUS_APPOINTMENT =
  'app/Appointment/UPDATE_STATUS_APPOINTMENT';
export const UPDATE_STATUS_APPOINTMENT_SUCCESS =
  'app/Appointment/UPDATE_STATUS_APPOINTMENT_SUCCESS';
export const UPDATE_STATUS_APPOINTMENT_ERROR =
  'app/Appointment/UPDATE_STATUS_APPOINTMENT_ERROR';

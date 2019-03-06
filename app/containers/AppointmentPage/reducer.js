/*
 * AppointmentReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import moment from 'moment';
import { fromJS } from 'immutable';

import {
  SELECT_DAY,
  SELECT_WEEK,
  LOAD_MEMBERS,
  LOAD_MEMBERS_ERROR,
  LOAD_MEMBERS_SUCCESS,
  LOAD_APPOINTMENTS_BY_MEMBERS,
  LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS,
  LOAD_APPOINTMENTS_BY_MEMBERS_ERROR,
  SET_DISPLAYED_MEMBERS,
  ASSIGN_APPOINTMENT_SUCCESS,
  LOAD_WAITING_APPOINTMENT,
  LOAD_WAITING_APPOINTMENT_SUCCESS,
  LOAD_WAITING_APPOINTMENT_ERROR,
  MOVE_APPOINTMENT,
} from './constants';

const initialCurrentDay = moment();
const firstDayOfWeek = initialCurrentDay.clone().startOf('isoWeek');
const initialWeekDays = [
  firstDayOfWeek,
  firstDayOfWeek.clone().add(1, 'd'),
  firstDayOfWeek.clone().add(2, 'd'),
  firstDayOfWeek.clone().add(3, 'd'),
  firstDayOfWeek.clone().add(4, 'd'),
  firstDayOfWeek.clone().add(5, 'd'),
  firstDayOfWeek.clone().add(6, 'd'),
];

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  currentDay: initialCurrentDay,
  currentWeekDays: initialWeekDays,
  members: {
    all: [],
    displayed: [],
  },
  appointments: {
    calendar: [],
    waiting: [],
  },
});

function appointmentReducer(state = initialState, action) {
  let startOfWeek;
  switch (action.type) {
    case SELECT_DAY:
      return state.set('currentDay', moment(action.day, 'DDMMYYYY'));
    case SELECT_WEEK:
      startOfWeek = moment(action.dayOfWeek, 'DDMMYYYY').startOf('isoWeek');
      return state.set(
        'currentWeekDays',
        fromJS([
          startOfWeek,
          startOfWeek.clone().add(1, 'd'),
          startOfWeek.clone().add(2, 'd'),
          startOfWeek.clone().add(3, 'd'),
          startOfWeek.clone().add(4, 'd'),
          startOfWeek.clone().add(5, 'd'),
          startOfWeek.clone().add(6, 'd'),
        ]),
      );

    case LOAD_MEMBERS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['members', 'all'], []);
    case LOAD_MEMBERS_SUCCESS:
      return state
        .setIn(['members', 'all'], action.members)
        .set('loading', false);
    case LOAD_MEMBERS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SET_DISPLAYED_MEMBERS:
      return state.setIn(['members', 'displayed'], action.members);

    case LOAD_WAITING_APPOINTMENT:
      return state.setIn(['appointments', 'waiting'], []);
    case LOAD_WAITING_APPOINTMENT_SUCCESS:
      return state.setIn(['appointments', 'waiting'], action.appointments);
    case LOAD_WAITING_APPOINTMENT_ERROR:
      return state.set('error', action.error);

    case LOAD_APPOINTMENTS_BY_MEMBERS:
      return state.setIn(['appointments', 'calendar'], []);
    case LOAD_APPOINTMENTS_BY_MEMBERS_SUCCESS:
      return state.setIn(['appointments', 'calendar'], action.appointments);
    case LOAD_APPOINTMENTS_BY_MEMBERS_ERROR:
      return state.set('error', action.error);

    case ASSIGN_APPOINTMENT_SUCCESS:
      return state
        .updateIn(['appointments', 'calendar'], arr => {
          const assignedMember = arr.find(
            member => member.memberId === action.appointment.memberId,
          );
          if (assignedMember) {
            assignedMember.appointments.push(action.appointment);
          }
          return [...arr];
        })
        .updateIn(['members', 'all'], arr => {
          const assignedMember = arr.find(
            member => member.id === action.appointment.memberId,
          );
          if (assignedMember) {
            assignedMember.numberOfAppointments += 1;
          }
          return [...arr];
        });

    case MOVE_APPOINTMENT:
      return state.updateIn(['appointments', 'calendar'], arr => {
        const oldPosition = arr.find(member =>
          member.appointments.find(
            appointment => appointment.id === action.appointmentId,
          ),
        );
        if (!oldPosition) return [...arr];

        const movedAppointmentIndex = oldPosition.appointments.findIndex(
          appointment => appointment.id === action.appointmentId,
        );
        if (movedAppointmentIndex < 0) return [...arr];

        const appointment = {
          ...oldPosition.appointments[movedAppointmentIndex],
          start: action.newTime,
        };
        oldPosition.appointments.splice(movedAppointmentIndex, 2);
        arr[action.newPositionIndex].appointments.push(appointment);

        return [...arr];
      });
    default:
      return state;
  }
}

export default appointmentReducer;

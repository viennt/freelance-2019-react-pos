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

import { SELECT_DAY, SELECT_WEEK } from './constants';

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
  currentDay: initialCurrentDay,
  currentWeekDays: initialWeekDays,
});

function appointmentReducer(state = initialState, action) {
  let startOfWeek;
  switch (action.type) {
    case SELECT_DAY:
      return state.set('currentDay', moment(action.day, 'YYYY-MM-DD'));
    case SELECT_WEEK:
      startOfWeek = moment(action.dayOfWeek, 'YYYY-MM-DD').startOf('isoWeek');
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
    default:
      return state;
  }
}

export default appointmentReducer;

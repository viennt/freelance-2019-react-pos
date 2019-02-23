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

import { SELECT_DAY, SELECT_WEEK } from './constants';

/**
 * Select day from mini calendar or day slider
 *
 * @param  {string} day The string with format YYYY-MM-DD
 *
 * @return {object}    An action object with a type of SELECT_DAY
 */
export function selectDay(day) {
  return {
    type: SELECT_DAY,
    day,
  };
}

/**
 * Select week from day slider
 *
 * @param  {string} dayOfWeek The string with format YYYY-MM-DD
 *
 * @return {object}    An action object with a type of SELECT_DAY
 */
export function selectWeek(dayOfWeek) {
  return {
    type: SELECT_WEEK,
    dayOfWeek,
  };
}

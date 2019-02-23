/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const currentAppointment = state => state.get('appointment', initialState);

const makeCurrentWeekDays = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.get('currentWeekDays'),
  );

const makeCurrentDay = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.get('currentDay'),
  );

export { currentAppointment, makeCurrentDay, makeCurrentWeekDays };

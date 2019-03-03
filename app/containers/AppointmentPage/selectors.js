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

const makeSelectLoading = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.get('error'),
  );

const makeSelectMembers = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.getIn(['members', 'all']),
  );

const makeSelectDisplayedMembers = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.getIn(['members', 'displayed']),
  );

export {
  currentAppointment,
  makeCurrentDay,
  makeCurrentWeekDays,
  makeSelectLoading,
  makeSelectError,
  makeSelectMembers,
  makeSelectDisplayedMembers,
};

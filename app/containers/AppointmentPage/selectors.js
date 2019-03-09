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

const makeSelectWaitingAppointments = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.getIn(['appointments', 'waiting']),
  );

const makeSelectWaitingIndexAppointments = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.getIn(['appointments', 'waitingIndex']),
  );

const makeSelectCalendarAppointments = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.getIn(['appointments', 'calendar']),
  );

const makeSelectAppointment = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.get('selectedAppointment'),
  );

const makeSelectFCEvent = () =>
  createSelector(currentAppointment, appointmentState =>
    appointmentState.get('selectedFCEvent'),
  );

export {
  currentAppointment,
  makeCurrentDay,
  makeCurrentWeekDays,
  makeSelectLoading,
  makeSelectError,
  makeSelectMembers,
  makeSelectDisplayedMembers,
  makeSelectWaitingAppointments,
  makeSelectWaitingIndexAppointments,
  makeSelectCalendarAppointments,
  makeSelectAppointment,
  makeSelectFCEvent,
};

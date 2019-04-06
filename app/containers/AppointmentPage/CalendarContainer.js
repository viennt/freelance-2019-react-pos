import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Calendar from 'components/Calendar';

import {
  loadWaitingAppointments,
  openAddingAppointment,
  updateCalendarInterval,
} from './actions';
import {
  makeSelectWaitingAppointments,
  makeSelectWaitingIndexAppointments,
} from './selectors';

export function mapDispatchToProps(dispatch) {
  return {
    loadWaitingAppointments: day => dispatch(loadWaitingAppointments(day)),
    openAddingAppointment: app => dispatch(openAddingAppointment(app)),
    updateCalendarInterval: app => dispatch(updateCalendarInterval(app)),
  };
}

const mapStateToProps = createStructuredSelector({
  waitingAppointments: makeSelectWaitingAppointments(),
  waitingIndex: makeSelectWaitingIndexAppointments(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  //
  withConnect,
)(Calendar);

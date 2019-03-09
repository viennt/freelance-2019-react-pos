import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Calendar from 'components/Calendar';

import {
  loadWaitingAppointments,
  nextWaitingAppointment,
  prevWaitingAppointment,
} from './actions';
import {
  makeSelectWaitingAppointments,
  makeSelectWaitingIndexAppointments,
} from './selectors';

export function mapDispatchToProps(dispatch) {
  return {
    loadWaitingAppointments: day => dispatch(loadWaitingAppointments(day)),
    nextWaitingAppointment: () => dispatch(nextWaitingAppointment()),
    prevWaitingAppointment: () => dispatch(prevWaitingAppointment()),
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

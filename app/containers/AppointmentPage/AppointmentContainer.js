import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Appointment from 'components/Appointment';

import { makeSelectAppointment } from './selectors';
import {
  cancelAppointment,
  deselectAppointment,
  nextStatusAppointment,
} from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    deselectAppointment: () => dispatch(deselectAppointment()),
    cancelAppointment: id => dispatch(cancelAppointment(id)),
    nextStatus: id => dispatch(nextStatusAppointment(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  appointment: makeSelectAppointment(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  //
  withConnect,
)(Appointment);

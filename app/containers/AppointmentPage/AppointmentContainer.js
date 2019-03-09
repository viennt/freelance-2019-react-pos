import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Appointment from 'components/Appointment';

import { makeSelectAppointment } from './selectors';
import { deselectAppointment, nextStatusAppointment } from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    deselectAppointment: () => dispatch(deselectAppointment()),
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

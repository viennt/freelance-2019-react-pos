import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import DetailAppointment from 'components/DetailAppointment';

import { makeSelectAppointment } from './selectors';
import {
  cancelAppointment,
  deselectAppointment,
  updateStatusAppointment,
} from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    deselectAppointment: () => dispatch(deselectAppointment()),
    cancelAppointment: id => dispatch(cancelAppointment(id)),
    nextStatus: id => dispatch(updateStatusAppointment(id)),
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
)(DetailAppointment);

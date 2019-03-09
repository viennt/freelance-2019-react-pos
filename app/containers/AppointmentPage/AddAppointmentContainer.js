import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AddAppointment from 'components/AddAppointment';

import { makeAddingAppointment } from './selectors';
import { closeAddingAppointment } from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    closeAddingAppointment: () => dispatch(closeAddingAppointment()),
  };
}

const mapStateToProps = createStructuredSelector({
  appointment: makeAddingAppointment(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  //
  withConnect,
)(AddAppointment);

// import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Appointment from 'components/Appointment';

export function mapDispatchToProps() {
  return {
    //
  };
}

const mapStateToProps = () => ({
  appointment: {
    id: 32,
    userFullName: 'Rickie Medhurst',
    phoneNumber: '0525 896 423',
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
    status: 'CONFIRMED',
    memberId: 1,
    start: '2019-03-11T11:30:00',
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  //
  withConnect,
)(Appointment);

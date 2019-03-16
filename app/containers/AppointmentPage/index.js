import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import ResourceSelectorContainer from './ResourceSelectorContainer';
import CalendarContainer from './CalendarContainer';
import DaySelectorContainer from './DaySelectorContainer';
import DetailAppointmentContainer from './DetailAppointmentContainer';
import AddAppointmentContainer from './AddAppointmentContainer';

import GlobalStyle from '../../global-styles';

import reducer from './reducer';
import saga from './saga';

const AppointmentPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export class AppointmentPage extends React.PureComponent {
  componentDidMount() {
    //
  }

  render() {
    return (
      <AppointmentPageWrapper>
        <ResourceSelectorContainer />
        <CalendarContainer />
        <DaySelectorContainer />
        <DetailAppointmentContainer />
        <AddAppointmentContainer />
        <GlobalStyle />
      </AppointmentPageWrapper>
    );
  }
}

export function mapDispatchToProps() {
  return {
    //
  };
}

const mapStateToProps = createStructuredSelector({
  //
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'appointment', reducer });
const withSaga = injectSaga({ key: 'appointment', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppointmentPage);

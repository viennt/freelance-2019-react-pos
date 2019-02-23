import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Header from 'components/Header';
import Calendar from 'components/Calendar';
import DaySelectorContainer from './DaySelectorContainer';

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
        <Header />
        <Calendar />
        <DaySelectorContainer />
        <GlobalStyle />
      </AppointmentPageWrapper>
    );
  }
}

const withReducer = injectReducer({ key: 'appointment', reducer });
const withSaga = injectSaga({ key: 'appointment', saga });

export default compose(
  withReducer,
  withSaga,
)(AppointmentPage);

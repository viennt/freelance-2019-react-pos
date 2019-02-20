import React from 'react';
import styled from 'styled-components';

import Calendar from 'components/Calendar';
import External from 'components/Calendar/External';

import GlobalStyle from '../../global-styles';
import { MAIN_CALENDAR_OPTIONS } from './constants';

const AppointmentWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #3883bb;
  height: 99vh;
  overflow: hidden;
`;

const MainCalendar = styled.div`
  flex: 1 0;
  border-right: 2px solid #3883bb;
`;

const WaitingList = styled.div`
  width: 8rem;
`;

WaitingList.Heading = styled.div`
  height: 64px;
  border-top: 2px solid #3883bb;
  border-bottom: 2px solid #3883bb;
`;

export default function AppointmentPage() {
  return (
    <AppointmentWrapper>
      <MainCalendar>
        <Calendar options={MAIN_CALENDAR_OPTIONS} />
      </MainCalendar>
      <WaitingList>
        <WaitingList.Heading />
        <External />
      </WaitingList>
      <GlobalStyle />
    </AppointmentWrapper>
  );
}

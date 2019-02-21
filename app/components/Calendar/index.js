import React from 'react';
import styled from 'styled-components';

import FCAgenda from './FCAgenda';
import FCDragZone from './FCDragZone';

import {
  MAIN_CALENDAR_OPTIONS,
  MOCK_WAITING_EVENTS,
} from '../../containers/AppointmentPage/constants';

const CalendarWrapper = styled.div`
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

function Calendar() {
  return (
    <CalendarWrapper>
      <MainCalendar>
        <FCAgenda options={MAIN_CALENDAR_OPTIONS} />
      </MainCalendar>
      <WaitingList>
        <WaitingList.Heading />
        <FCDragZone events={MOCK_WAITING_EVENTS} />
      </WaitingList>
    </CalendarWrapper>
  );
}

export default Calendar;

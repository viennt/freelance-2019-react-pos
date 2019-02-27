import React from 'react';
import styled from 'styled-components';

import FCAgenda from './FCAgenda';
import FCDragZone from './FCDragZone';

import { MAIN_CALENDAR_OPTIONS } from '../../containers/AppointmentPage/constants';
import { MOCK_WAITING_EVENTS } from '../../containers/AppointmentPage/mockData';

const CalendarWrapper = styled.div`
  display: flex;
  border-left: 2px solid #3883bb;
  border-right: 2px solid #3883bb;
  border-bottom: 2px solid #3883bb;
  height: calc(100% - 3rem - 4rem - 4rem);
  overflow: hidden;
`;

const MainCalendar = styled.div`
  flex: 1 0;
  border-right: 1px solid #3883bb;
`;

const RightSideBar = styled.div`
  width: calc((100vw - 5.05rem) / 7);
  border-top: 2px solid #3883bb;
`;

function Calendar() {
  return (
    <CalendarWrapper>
      <MainCalendar>
        <FCAgenda options={MAIN_CALENDAR_OPTIONS} />
      </MainCalendar>
      <RightSideBar>
        <FCDragZone events={MOCK_WAITING_EVENTS} />
      </RightSideBar>
    </CalendarWrapper>
  );
}

export default Calendar;

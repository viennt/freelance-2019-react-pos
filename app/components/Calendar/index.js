import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FCAgenda from './FCAgenda';
import FCDragZone from './FCDragZone';

import { MAIN_CALENDAR_OPTIONS } from './constants';

const CalendarWrapper = styled.div`
  display: flex;
  border-left: 2px solid #3883bb;
  border-right: 2px solid #3883bb;
  border-bottom: 2px solid #3883bb;
  height: calc(100% - 4rem - 4rem);
  overflow: hidden;
`;

const MainCalendar = styled.div`
  flex: 1 0;
  border-right: 1px solid #3883bb;
`;

const RightSideBar = styled.div`
  width: calc((100vw - 5.05rem) / 7);
  border-top: 2px solid #3883bb;
  position: relative;
`;

const SignInWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: calc((100vw - 5.05rem) / 7);
  background: #fafafa;
  height: 4rem;
  text-align: center;
  padding: 0.5rem;
`;

SignInWrapper.Button = styled.div`
  border-radius: 4px;
  background: #0071c5;
  color: #ffffff;
  width: 100%;
  font-size: 1rem;
  line-height: 2.8;
  height: 100%;
  cursor: pointer;
`;

class Calendar extends React.Component {
  componentWillMount() {
    const { loadWaitingAppointments } = this.props;
    loadWaitingAppointments();
  }

  // FIXME: This is hard code for real-time calendar
  componentDidMount() {
    const { updateCalendarInterval } = this.props;
    setInterval(() => {
      updateCalendarInterval();
    }, 5000);
  }

  render() {
    const {
      waitingAppointments,
      waitingIndex,
      openAddingAppointment,
    } = this.props;
    return (
      <CalendarWrapper>
        <MainCalendar>
          <FCAgenda options={MAIN_CALENDAR_OPTIONS} />
        </MainCalendar>
        <RightSideBar id="drag-zone">
          {!!waitingAppointments && !!waitingAppointments.length ? (
            <FCDragZone events={waitingAppointments} index={waitingIndex} />
          ) : (
            ''
          )}
          <SignInWrapper>
            <SignInWrapper.Button onClick={() => openAddingAppointment({})}>
              Sign in
            </SignInWrapper.Button>
          </SignInWrapper>
        </RightSideBar>
      </CalendarWrapper>
    );
  }
}

Calendar.propTypes = {
  waitingAppointments: PropTypes.any,
  loadWaitingAppointments: PropTypes.func,
  waitingIndex: PropTypes.number,
  openAddingAppointment: PropTypes.func,
  updateCalendarInterval: PropTypes.func,
};

export default Calendar;

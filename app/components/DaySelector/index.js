import React from 'react';
import styled from 'styled-components';
// import DayPicker from 'react-day-picker';
import { FaCalendarAlt } from 'react-icons/fa';

const DaySelectorWrapper = styled.div`
  width: 100%;
  height: 4rem;
  border-left: 2px solid #3883bb;
  border-right: 2px solid #3883bb;
  border-bottom: 2px solid #3883bb;
  display: flex;
`;

const MiniCalendar = styled.div`
  width: 5.05rem;
  height: 100%;
  text-align: center;
  border-right: 2px solid #3883bb;
  position: relative;
  padding: 0.5rem;
`;

const Button = styled.div`
  border-radius: 4px;
  background: #0071c5;
  color: #ffffff;
  width: 100%;
  font-size: 1.5rem;
  line-height: 1.5;
  height: 100%;
`;

const CalendarPopup = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  transform: translate3d(0.5rem, calc(-18rem + 0.5rem), 0px);
  will-change: transform;
  z-index: 1;
  background: #fff;
  color: #000;
  height: 18rem;
  line-height: 1;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

CalendarPopup.Heading = styled.div`
  background: #0071c5;
  color: #ffffff;
  height: 3rem;
  font-size: 1.5rem;
  line-height: 2;
`;

CalendarPopup.Body = styled.div``;

const DateSlider = styled.div`
  display: flex;
  width: calc(100% - 5.05rem - 2px);
`;

DateSlider.Item = styled.div`
  flex: 1;
  border-right: 1px solid #3883bb;
`;

class DaySelector extends React.Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <DaySelectorWrapper>
        <MiniCalendar>
          <Button>
            <FaCalendarAlt />
          </Button>
          {/* <CalendarPopup> */}
          {/* <CalendarPopup.Heading>Calendar</CalendarPopup.Heading> */}
          {/* <CalendarPopup.Body> */}
          {/* <DayPicker onDayClick={day => console.log(day)} /> */}
          {/* </CalendarPopup.Body> */}
          {/* </CalendarPopup> */}
        </MiniCalendar>
        <DateSlider>
          <DateSlider.Item />
          <DateSlider.Item />
          <DateSlider.Item />
          <DateSlider.Item />
          <DateSlider.Item />
          <DateSlider.Item />
          <DateSlider.Item />
        </DateSlider>
      </DaySelectorWrapper>
    );
  }
}

export default DaySelector;

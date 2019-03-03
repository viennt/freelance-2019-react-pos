import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FaCalendarAlt } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';

const MiniCalendarWrapper = styled.div`
  width: calc(5.05rem - 1px);
  height: 100%;
  text-align: center;
  border-right: 1px solid #3883bb;
  position: relative;
  padding: 0.5rem;
`;

MiniCalendarWrapper.Button = styled.div`
  border-radius: 4px;
  background: #0071c5;
  color: #ffffff;
  width: 100%;
  font-size: 1.5rem;
  line-height: 1.5;
  height: 100%;
  cursor: pointer;
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

class MiniCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
    };
  }

  onClickButton() {
    const { isPopupOpen } = this.state;
    this.setState({
      isPopupOpen: !isPopupOpen,
    });
  }

  onOutsideClickPopup() {
    this.setState({
      isPopupOpen: false,
    });
  }

  onDaySelected(day) {
    const { onChangeDay } = this.props;
    onChangeDay(moment(new Date(day)).format('DDMMYYYY'));
  }

  renderPopup() {
    const { selectedDay } = this.props;
    const { isPopupOpen } = this.state;
    return isPopupOpen ? (
      <CalendarPopup>
        <CalendarPopup.Heading>Calendar</CalendarPopup.Heading>
        <CalendarPopup.Body>
          <DayPicker
            firstDayOfWeek={1}
            selectedDays={[selectedDay.toDate()]}
            onDayClick={day => this.onDaySelected(day)}
          />
        </CalendarPopup.Body>
      </CalendarPopup>
    ) : (
      ''
    );
  }

  render() {
    return (
      <OutsideClickHandler onOutsideClick={() => this.onOutsideClickPopup()}>
        <Helmet>
          <style>{`
            .DayPicker-Day--today {
              color: #00e260;
            }
          `}</style>
        </Helmet>
        <MiniCalendarWrapper>
          <MiniCalendarWrapper.Button onClick={() => this.onClickButton()}>
            <FaCalendarAlt />
          </MiniCalendarWrapper.Button>
          {this.renderPopup()}
        </MiniCalendarWrapper>
      </OutsideClickHandler>
    );
  }
}

MiniCalendar.propTypes = {
  selectedDay: PropTypes.object,
  onChangeDay: PropTypes.func,
};

export default MiniCalendar;

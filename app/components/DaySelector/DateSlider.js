import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const DateSliderWrapper = styled.div`
  width: calc(100% - 5.05rem);
  position: relative;
  display: flex;
`;

const Item = styled.div`
  flex: 1;
  border-right: 1px solid #3883bb;
  text-align: center;
  padding: 0.5rem;
`;

const ActiveItem = styled.div`
  flex: 1;
  border-right: 1px solid #3883bb;
  text-align: center;
  padding: 0.5rem;
  background: #0071c5;
  color: #ffffff;
`;

const TodayItem = styled.div`
  flex: 1;
  border-right: 1px solid #3883bb;
  text-align: center;
  padding: 0.5rem;
  background: #00e260;
  color: #ffffff;
`;

const PrevButton = styled.div`
  position: absolute;
  top: 0.75rem;
  left: -0.25rem;
  color: #3883bb;
  font-size: 2rem;
  line-height: 2rem;
  cursor: pointer;
`;

const NextButton = styled.div`
  position: absolute;
  top: 0.75rem;
  right: -0.25rem;
  color: #3883bb;
  font-size: 2rem;
  line-height: 2rem;
  cursor: pointer;
`;

class DateSlider extends React.Component {
  onPrevButtonClick() {
    const { days, onChangeWeek } = this.props;
    onChangeWeek(days[0].subtract(1, 'w').format('YYYY-MM-DD'));
  }

  onNextButtonClick() {
    const { days, onChangeWeek } = this.props;
    onChangeWeek(days[0].add(1, 'w').format('YYYY-MM-DD'));
  }

  onDayClick(day) {
    const { onChangeDay } = this.props;
    onChangeDay(day.format('YYYY-MM-DD'));
  }

  renderItem(day, index) {
    const { selectedDay } = this.props;
    if (day.format('DDMMYYYY') === selectedDay.format('DDMMYYYY')) {
      return (
        <ActiveItem key={index} onClick={() => this.onDayClick(day)}>
          <div>{day.format('dddd')}</div>
          <div>{day.format('MM/DD/YYYY')}</div>
        </ActiveItem>
      );
    }
    if (day.format('DDMMYYYY') === moment().format('DDMMYYYY')) {
      return (
        <TodayItem key={index} onClick={() => this.onDayClick(day)}>
          <div>{day.format('dddd')}</div>
          <div>{day.format('MM/DD/YYYY')}</div>
        </TodayItem>
      );
    }
    return (
      <Item key={index} onClick={() => this.onDayClick(day)}>
        <div>{day.format('dddd')}</div>
        <div>{day.format('MM/DD/YYYY')}</div>
      </Item>
    );
  }

  render() {
    const { days } = this.props;
    return (
      <DateSliderWrapper>
        {days.map((day, index) => this.renderItem(day, index))}
        <PrevButton onClick={() => this.onPrevButtonClick()}>
          <FaCaretLeft />
        </PrevButton>
        <NextButton onClick={() => this.onNextButtonClick()}>
          <FaCaretRight />
        </NextButton>
      </DateSliderWrapper>
    );
  }
}

DateSlider.propTypes = {
  selectedDay: PropTypes.object,
  days: PropTypes.array,
  onChangeDay: PropTypes.func,
  onChangeWeek: PropTypes.func,
};

export default DateSlider;

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const DateSliderWrapper = styled.div`
  width: calc(100% - 5.05rem);
  position: relative;
`;

const CarouselItem = styled.div`
  display: flex;
`;

const NormalDay = styled.div`
  flex: 1;
  border-right: 1px solid #3883bb;
  text-align: center;
  padding: 0.5rem;
  overflow: hidden;

  &:last-child {
    border-right: none;
  }

  & div {
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ActiveDay = styled(NormalDay)`
  background: #0071c5;
  color: #ffffff;
`;

const TodayDay = styled(NormalDay)`
  background: #00e260;
  color: #ffffff;
`;

const PrevButton = styled.div`
  color: #3883bb;
  font-size: 2rem;
  line-height: 2rem;
  cursor: pointer;
`;

const NextButton = styled.div`
  color: #3883bb;
  font-size: 2rem;
  line-height: 2rem;
  cursor: pointer;
`;

class DaySlider extends React.Component {
  onPrevClick(event, previousSlide) {
    previousSlide(event);
    const { days, onChangeWeek } = this.props;
    onChangeWeek(days[0].subtract(1, 'w').format('DDMMYYYY'));
  }

  onNextClick(event, nextSlide) {
    nextSlide(event);
    const { days, onChangeWeek } = this.props;
    onChangeWeek(days[0].add(1, 'w').format('DDMMYYYY'));
  }

  onDayClick(day) {
    const { onChangeDay } = this.props;
    onChangeDay(day.format('DDMMYYYY'));
  }

  renderDay(day) {
    return (
      <>
        <div>{day.format('dddd')}</div>
        <div>{day.format('MM/DD/YYYY')}</div>
      </>
    );
  }

  renderItems(day, index) {
    const { selectedDay } = this.props;
    if (day.format('DDMMYYYY') === selectedDay.format('DDMMYYYY')) {
      return (
        <ActiveDay key={index} onClick={() => this.onDayClick(day)}>
          {this.renderDay(day)}
        </ActiveDay>
      );
    }
    if (day.format('DDMMYYYY') === moment().format('DDMMYYYY')) {
      return (
        <TodayDay key={index} onClick={() => this.onDayClick(day)}>
          {this.renderDay(day)}
        </TodayDay>
      );
    }
    return (
      <NormalDay key={index} onClick={() => this.onDayClick(day)}>
        {this.renderDay(day)}
      </NormalDay>
    );
  }

  render() {
    const { days } = this.props;
    return (
      <DateSliderWrapper>
        <Carousel
          wrapAround
          dragging={false}
          renderBottomCenterControls={() => ''}
          renderCenterLeftControls={({ previousSlide }) => (
            <PrevButton onClick={ev => this.onPrevClick(ev, previousSlide)}>
              <FaCaretLeft />
            </PrevButton>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <NextButton onClick={ev => this.onNextClick(ev, nextSlide)}>
              <FaCaretRight />
            </NextButton>
          )}
        >
          <CarouselItem>
            {days.map((day, index) => this.renderItems(day, index))}
          </CarouselItem>
          <CarouselItem>
            {days.map((day, index) => this.renderItems(day, index))}
          </CarouselItem>
          <CarouselItem>
            {days.map((day, index) => this.renderItems(day, index))}
          </CarouselItem>
        </Carousel>
      </DateSliderWrapper>
    );
  }
}

DaySlider.propTypes = {
  selectedDay: PropTypes.object,
  days: PropTypes.array,
  onChangeDay: PropTypes.func,
  onChangeWeek: PropTypes.func,
};

export default DaySlider;

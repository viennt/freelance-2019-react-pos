import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import MiniCalendar from './MiniCalendar';
import DaySlider from './DaySlider';

const DaySelectorWrapper = styled.div`
  width: 100%;
  height: 4rem;
  border-left: 2px solid #3883bb;
  border-right: 2px solid #3883bb;
  border-bottom: 2px solid #3883bb;
  display: flex;
`;

class DaySelector extends React.Component {
  constructor(props) {
    super(props);
    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    this.days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      this.days.push(day);
      day = day.clone().add(1, 'd');
    }
  }

  render() {
    const {
      currentDay,
      weekDays,
      onChangeDay,
      onChangeWeek,
      onChangeDayOnCalendar,
    } = this.props;
    return (
      <DaySelectorWrapper>
        <MiniCalendar
          selectedDay={currentDay}
          onChangeDay={onChangeDayOnCalendar}
        />
        <DaySlider
          days={weekDays.valueSeq().toArray()}
          selectedDay={currentDay}
          onChangeDay={onChangeDay}
          onChangeWeek={onChangeWeek}
        />
      </DaySelectorWrapper>
    );
  }
}

DaySelector.propTypes = {
  currentDay: PropTypes.object,
  weekDays: PropTypes.object,
  onChangeDay: PropTypes.func,
  onChangeWeek: PropTypes.func,
  onChangeDayOnCalendar: PropTypes.func,
};

export default DaySelector;

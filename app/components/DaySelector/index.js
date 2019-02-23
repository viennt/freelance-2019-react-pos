import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import MiniCalendar from './MiniCalendar';

const DaySelectorWrapper = styled.div`
  width: 100%;
  height: 4rem;
  border-left: 2px solid #3883bb;
  border-right: 2px solid #3883bb;
  border-bottom: 2px solid #3883bb;
  display: flex;
`;

const DateSlider = styled.div`
  display: flex;
  width: calc(100% - 5.05rem - 2px);
`;

DateSlider.Item = styled.div`
  flex: 1;
  border-right: 1px solid #3883bb;
  text-align: center;
  padding: 0.5rem;
`;

DateSlider.ActiveItem = styled.div`
  flex: 1;
  border-right: 1px solid #3883bb;
  text-align: center;
  padding: 0.5rem;
  background: #0071c5;
  color: #ffffff;
`;

class DaySelector extends React.Component {
  constructor() {
    super();
    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    this.days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      this.days.push(day);
      day = day.clone().add(1, 'd');
    }
  }

  renderItem(day, index) {
    return day.format('DDMMYYYY') === moment().format('DDMMYYYY') ? (
      <DateSlider.ActiveItem key={index}>
        <div>{day.format('dddd')}</div>
        <div>{day.format('MM/DD/YYYY')}</div>
      </DateSlider.ActiveItem>
    ) : (
      <DateSlider.Item key={index}>
        <div>{day.format('dddd')}</div>
        <div>{day.format('MM/DD/YYYY')}</div>
      </DateSlider.Item>
    );
  }

  render() {
    return (
      <DaySelectorWrapper>
        <MiniCalendar />
        <DateSlider>
          {this.days.map((day, index) => this.renderItem(day, index))}
        </DateSlider>
      </DaySelectorWrapper>
    );
  }
}

export default DaySelector;

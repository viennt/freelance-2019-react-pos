import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import DaySelector from 'components/DaySelector';

import { selectDay, selectWeek, selectDayOnCalendar } from './actions';
import { makeCurrentDay, makeCurrentWeekDays } from './selectors';

export function mapDispatchToProps(dispatch) {
  return {
    onChangeDay: day => dispatch(selectDay(day)),
    onChangeWeek: dayOfWeek => dispatch(selectWeek(dayOfWeek)),
    onChangeDayOnCalendar: dayOfWeek =>
      dispatch(selectDayOnCalendar(dayOfWeek)),
  };
}

const mapStateToProps = createStructuredSelector({
  currentDay: makeCurrentDay(),
  weekDays: makeCurrentWeekDays(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  //
  withConnect,
)(DaySelector);

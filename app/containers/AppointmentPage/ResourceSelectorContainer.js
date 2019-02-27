import { connect } from 'react-redux';
import { compose } from 'redux';

import ResourceSelector from 'components/ResourceSelector';

import { selectDayOnCalendar } from './actions';
import { MOCK_RESOURCES_HEADER } from './mockData';

export function mapDispatchToProps(dispatch) {
  return {
    onChangeToday: day => dispatch(selectDayOnCalendar(day)),
  };
}

export function mapStateToProps() {
  return {
    resources: MOCK_RESOURCES_HEADER,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  //
  withConnect,
)(ResourceSelector);

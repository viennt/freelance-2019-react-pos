import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ResourceSelector from 'components/ResourceSelector';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectMembers,
} from './selectors';
import {
  selectDayOnCalendar,
  loadMembers,
  setDisplayedMembers,
} from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    onChangeToday: day => dispatch(selectDayOnCalendar(day)),
    loadMembers: options => dispatch(loadMembers(options)),
    setDisplayedMembers: members => dispatch(setDisplayedMembers(members)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  resources: makeSelectMembers(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  //
  withConnect,
)(ResourceSelector);

import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Calendar extends React.Component {
  componentDidMount() {
    const { options } = this.props;
    $('#full-calendar').fullCalendar(options);
  }

  render() {
    return <div id="full-calendar" />;
  }
}

// We require the use of src and alt, only enforced by react in dev mode
Calendar.propTypes = {
  options: PropTypes.object.isRequire(),
};

export default Calendar;

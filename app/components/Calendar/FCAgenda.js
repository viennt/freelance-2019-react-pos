import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class FCAgenda extends React.Component {
  componentDidMount() {
    const { options } = this.props;
    $('#full-calendar').fullCalendar(options);
  }

  render() {
    return <div id="full-calendar" />;
  }
}

FCAgenda.propTypes = {
  options: PropTypes.object,
};

export default FCAgenda;

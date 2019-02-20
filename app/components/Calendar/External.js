import React from 'react';

import $ from 'jquery';

import 'jquery-ui';
import FCEvent from './FCEvent';

class External extends React.Component {
  render() {
    return (
      <div id="waiting-events">
        <FCEvent />
        <FCEvent />
        <FCEvent />
      </div>
    );
  }

  componentDidMount() {
    $('#waiting-events > div').each(function() {
      const eventInformation = $(this).data('event-information');
      $(this).data('event', {
        data: eventInformation,
        stick: true,
      });

      $(this).draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0,
      });
    });
  }
}

export default External;

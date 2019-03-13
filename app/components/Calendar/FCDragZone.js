import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import $ from 'jquery';
import 'jquery-ui';

const DragZoneWrapper = styled.div`
  height: calc(100vh - 4rem - 4rem - 4rem);
  //overflow: hidden;

  #waiting-events {
    height: 100%;
    overflow: scroll;
  }
`;

const EventWrapper = styled.div`
  background: #f4f4f5;
  border: 1px solid #ffffff;
  color: #333333;
`;

function handleDrag() {
  const eventInformation = $(this).data('event-information');
  $(this).data('event', {
    data: eventInformation,
    color: '#ffe400',
    stick: true,
  });

  $(this).draggable({
    containment: 'document',
    helper: 'clone',
    appendTo: 'body',
    zIndex: 999,
    revert: true,
    revertDuration: 0,
  });
}

class FCDragZone extends React.PureComponent {
  componentDidMount() {
    $('#waiting-events > div').each(handleDrag);
  }

  render() {
    const { events } = this.props;
    return (
      <DragZoneWrapper>
        <div id="waiting-events">
          {events.map(event => (
            <EventWrapper
              className="app-event"
              key={event.id}
              data-event-information={JSON.stringify(event)}
            >
              <div className="app-event__id-number">#{event.id}</div>
              <div className="app-event__full-name">{event.userFullName}</div>
              <div className="app-event__phone-number">{event.phoneNumber}</div>
              <div className="app-event__option">- {event.option1}</div>
              <div className="app-event__option">- {event.option2}</div>
              <div className="app-event__option">- {event.option3}</div>
            </EventWrapper>
          ))}
        </div>
      </DragZoneWrapper>
    );
  }
}

FCDragZone.propTypes = {
  events: PropTypes.any,
};

export default FCDragZone;

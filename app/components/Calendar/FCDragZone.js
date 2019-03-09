import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import $ from 'jquery';
import 'jquery-ui';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const DragZoneWrapper = styled.div`
  height: calc(100vh - 4rem - 4rem - 4rem);
  //overflow: hidden;
`;

const EventWrapper = styled.div`
  background: #f4f4f5;
  border: 1px solid #ffffff;
  color: #333333;
`;

const Button = styled.button`
  background: ${props => (props.disabled ? '#dddddd' : '#0071c5')};
  color: #ffffff;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
  text-align: center;
`;

function handleDrag() {
  const eventInformation = $(this).data('event-information');
  $(this).data('event', {
    data: eventInformation,
    color: '#ffe400',
    stick: true,
  });

  $(this).draggable({
    zIndex: 999,
    revert: true,
    revertDuration: 0,
  });
}

class FCDragZone extends React.PureComponent {
  componentDidMount() {
    setInterval(() => {
      $('#waiting-events > div').each(handleDrag);
    }, 500);
  }

  nextSlide() {
    const { nextWaitingAppointment } = this.props;
    nextWaitingAppointment();
  }

  prevSlide() {
    const { prevWaitingAppointment } = this.props;
    prevWaitingAppointment();
  }

  render() {
    const { events, index } = this.props;
    const displayedEvents = events.slice(index, index + 3);
    return (
      <DragZoneWrapper>
        <Button disabled={index <= 0} onClick={() => this.prevSlide()}>
          <FaCaretUp />
        </Button>
        <div id="waiting-events">
          {displayedEvents.map(event => (
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
        <Button
          disabled={index >= events.length - 3}
          onClick={() => this.nextSlide()}
        >
          <FaCaretDown />
        </Button>
      </DragZoneWrapper>
    );
  }
}

FCDragZone.propTypes = {
  events: PropTypes.any,
  index: PropTypes.number,
  nextWaitingAppointment: PropTypes.func,
  prevWaitingAppointment: PropTypes.func,
};

export default FCDragZone;

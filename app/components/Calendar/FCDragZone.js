import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

import $ from 'jquery';
import 'jquery-ui';

const DragZoneWrapper = styled.div`
  height: calc(100vh - 4rem - 4rem - 4rem);
  position: relative;
`;

const EventWrapper = styled.div`
  background: #f4f4f5;
  border: 1px solid #ffffff;
  color: #333333;
`;

const PrevButton = styled.div`
  color: #3883bb;
  font-size: 2rem;
  line-height: 2rem;
  cursor: pointer;
  text-align: center;
  width: 100%;
`;

const NextButton = styled(PrevButton)`
  position: absolute;
  left: 0;
  bottom: 0;
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
  state = {
    slideIndex: 0,
    slidesToShow: 3,
  };

  updateDimensions() {
    this.setState({
      slidesToShow:
        Math.floor(($(window).height() - 64 * 3 - 36) / 127) - 1 || 1,
    });
    setInterval(() => {
      $('#waiting-events > div').each(handleDrag);
    }, 500);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateDimensions());
  }

  prevSlide() {
    const { slideIndex } = this.state;
    if (slideIndex > 0) {
      this.setState({
        slideIndex: slideIndex - 1,
      });
    }
  }

  nextSlide() {
    const { events } = this.props;
    const { slideIndex, slidesToShow } = this.state;
    if (slideIndex < Math.floor(events.length / slidesToShow)) {
      this.setState({
        slideIndex: slideIndex + 1,
      });
    }
  }

  render() {
    const { events } = this.props;
    const { slideIndex, slidesToShow } = this.state;
    const displayedEvents = events.slice(
      slideIndex * slidesToShow,
      slideIndex * slidesToShow + slidesToShow,
    );
    return (
      <DragZoneWrapper>
        <PrevButton onClick={() => this.prevSlide()}>
          <FaCaretUp />
        </PrevButton>
        <NextButton onClick={() => this.nextSlide()}>
          <FaCaretDown />
        </NextButton>
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
              {event.options.map(option => (
                <div className="app-event__option" key={option.id}>
                  - {option.name}
                </div>
              ))}
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

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import $ from 'jquery';
import 'jquery-ui';

const DragZoneWrapper = styled.div`
  height: calc(100vh - 4rem - 4rem - 4rem);
  //overflow: hidden;
`;

const EventWrapper = styled.div`
  background: #f4f4f5;
  border: 1px solid #ffffff;
  color: #333333;
`;

// const chunk = (array, size) => {
//   const chunkedArr = [];
//   let index = 0;
//   while (index < array.length) {
//     chunkedArr.push(array.slice(index, size + index));
//     index += size;
//   }
//   return chunkedArr;
// };

class FCDragZone extends React.Component {
  render() {
    const { events } = this.props;
    return (
      <DragZoneWrapper id="waiting-events">
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
      </DragZoneWrapper>
    );
  }

  componentDidMount() {
    function handleDrag() {
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
    }

    $('#waiting-events > div').each(handleDrag);
  }
}

FCDragZone.propTypes = {
  events: PropTypes.array,
};

export default FCDragZone;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import $ from 'jquery';
import 'jquery-ui';

const EventWrapper = styled.div`
  background: #f4f4f5;
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin: 1px 1px 4px 1px;
  padding: 4px;
  text-align: left;
  color: #333333;
  cursor: move;
`;

const IdNumber = styled.div`
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const UserFullName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
  margin-bottom: 4px;
  line-height: 1.3;
`;

const PhoneNumber = styled.div`
  font-size: 13px;
  margin-left: 8px;
  margin-bottom: 4px;
  line-height: 1.8;
  font-style: italic;
`;

const Options = styled.div`
  font-size: 13px;
  margin-left: 16px;
  line-height: 1.3;
  font-style: italic;
`;

class FCDragZone extends React.Component {
  render() {
    const { events } = this.props;
    return (
      <div id="waiting-events">
        {events.map(event => (
          <EventWrapper
            key={event.idNumber}
            data-event-information={JSON.stringify(event)}
          >
            <IdNumber>#{event.idNumber}</IdNumber>
            <UserFullName>{event.userFullName}</UserFullName>
            <PhoneNumber>{event.phoneNumber}</PhoneNumber>
            <Options>- {event.option1}</Options>
            <Options>- {event.option2}</Options>
            <Options>- {event.option3}</Options>
          </EventWrapper>
        ))}
      </div>
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

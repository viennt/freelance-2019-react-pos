import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

function FCEvent({ data }) {
  return (
    <EventWrapper data-event-information={JSON.stringify(data)}>
      <IdNumber>#{data.idNumber}</IdNumber>
      <UserFullName>{data.userFullName}</UserFullName>
      <PhoneNumber>{data.phoneNumber}</PhoneNumber>
      <Options>- {data.option1}</Options>
      <Options>- {data.option2}</Options>
      <Options>- {data.option3}</Options>
    </EventWrapper>
  );
}

FCEvent.propTypes = {
  data: PropTypes.object,
};

export default FCEvent;

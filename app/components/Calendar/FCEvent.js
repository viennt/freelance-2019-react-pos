import React from 'react';
import styled from 'styled-components';
import faker from 'faker';

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

export default function FCEvent() {
  const eventInfo = {
    idNumber: faker.random.number({ min: 10, max: 99 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  };
  return (
    <EventWrapper data-event-information={JSON.stringify(eventInfo)}>
      <IdNumber>#{eventInfo.idNumber}</IdNumber>
      <UserFullName>{eventInfo.userFullName}</UserFullName>
      <PhoneNumber>{eventInfo.phoneNumber}</PhoneNumber>
      <Options>- {eventInfo.option1}</Options>
      <Options>- {eventInfo.option2}</Options>
      <Options>- {eventInfo.option3}</Options>
    </EventWrapper>
  );
}

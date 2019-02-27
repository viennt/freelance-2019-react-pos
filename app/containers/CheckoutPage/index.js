import React from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';

import GlobalStyle from '../../global-styles';

const Notification = styled.div`
  font-size: 4rem;
  text-align: center;
  line-height: 50vh;
  color: #9e9e9e;
`;

export default function CheckoutPage() {
  return (
    <div>
      <Header />
      <Notification>Coming Soon</Notification>
      <GlobalStyle />
    </div>
  );
}

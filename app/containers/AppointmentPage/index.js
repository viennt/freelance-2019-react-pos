import React from 'react';
import styled from 'styled-components';
import 'react-day-picker/lib/style.css';

import Header from '../../components/Header';
import Calendar from '../../components/Calendar';
import DaySelector from '../../components/DaySelector';

import GlobalStyle from '../../global-styles';

const AppointmentPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default function AppointmentPage() {
  return (
    <AppointmentPageWrapper>
      <Header />
      <Calendar />
      <DaySelector />
      <GlobalStyle />
    </AppointmentPageWrapper>
  );
}

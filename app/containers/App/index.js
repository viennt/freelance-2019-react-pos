/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import AppointmentPage from 'containers/AppointmentPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - React App" defaultTitle="Appointment App">
        <meta name="description" content="React App" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={AppointmentPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}

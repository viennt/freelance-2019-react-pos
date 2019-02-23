import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  // ############################################
  // Main calendar - Fullcalendar
  // ############################################
  .fc-unthemed td.fc-today {
    background: #ffffff;
}
  .fc-unthemed th, .fc-unthemed td {
    border-color: #1484c0;
    border-width: 2px;
  }
  .fc-unthemed th:first-child, .fc-unthemed td:first-child {
    border-left: none;
  }
  .fc-unthemed th:last-child, .fc-unthemed td:last-child {
    border-right: none;
  }
  .fc-unthemed .fc-widget-content {
    border-color: #ddd;
    border-width: 1px;
  }
  .fc-unthemed .fc-axis {
    border-right: 2px solid #1484c0;
  }
  .fc th {
    border-width: 2px;
  }
  .fc-resource-cell {
    position: relative;
  }
  .fc-event {
    border: none;
    padding: 0;
    background: #00b4f7;
    color: #ffffff;
  }

  // ############################################
  // Main calendar - App Resource
  // ############################################
  .app-resource__avatar {
    padding: 2px;
    height: 3.5rem;
  }
  .app-resource__avatar img {
    width: 56px;
    border-radius: 50%;
  }
  .app-resource__order-number {
    position: absolute;
    top: 2px;
    right: 2px;
    background: #3883bb;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: #ffffff;
    padding: 2px;
    font-size: 12px;
    line-height: 1.3
  }
  .app-resource__title {
    position: absolute;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    opacity: 0.75;
    text-align:center;
    padding-bottom: 4px;
    font-size: 13px;
    line-height: 1.3;
  }
  
  // ############################################
  // Main calendar - App Event
  // ############################################
  .app-event {
    border-radius: 4px;
    margin: 1px 1px 4px 1px;
    padding: 4px;
    text-align: left;
    cursor: move;
  }
  .app-event__id-number {
    font-size: 11px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .app-event__full-name {
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
    margin-bottom: 4px;
    line-height: 1.3;
  }
  .app-event__phone-number {
    font-size: 13px;
    margin-left: 8px;
    margin-bottom: 4px;
    line-height: 1.8;
    font-style: italic;
  }
  .app-event__option {
    font-size: 13px;
    margin-left: 16px;
    line-height: 1.2;
    font-style: italic;
  }
`;

export default GlobalStyle;

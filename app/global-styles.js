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
`;

export default GlobalStyle;

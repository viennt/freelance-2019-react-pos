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
  
  :focus {
    outline: none;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead {
    background: #585858;
    color: #ffffff;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 0.5rem;
  }

  // ############################################
  // Main calendar - Fullcalendar
  // ############################################
  .fc-unthemed td.fc-today {
    background: #ffffff;
}
  .fc-unthemed th, .fc-unthemed td {
    border-color: #1484c0;
    border-width: 1px;
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
    border-right: 1px solid #1484c0;
  }
  .fc th {
    border-width: 1px;
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
  
  .fc-ltr .fc-time-grid .fc-now-indicator-arrow {
    left: 50px;
    background: #ffffff;
    color: #f00;
    border: none;
    box-shadow: 0 0 10px #949494;
    border-radius: 10px;
    font-size: 12px;
    margin-top: -10px;
    padding: 1px 10px;
    z-index: 9;
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

  .timeline {
    position: absolute;    
    border-top: 2px dashed red;
    width: 100%;
    margin: 0;
    padding: 0;
    z-index: 999;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0
    }
    100% {
      background-position: 468px 0
    }
  }
`;

export default GlobalStyle;

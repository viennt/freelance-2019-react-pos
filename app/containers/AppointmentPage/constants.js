import $ from 'jquery';
import { MOCK_EVENTS, MOCK_RESOURCES } from './mockData';

export const EVENT_RENDER_TEMPLATE = event => `
  <div class="app-event">
    <div class="app-event__id-number">#${event.idNumber}</div>
    <div class="app-event__full-name">${event.userFullName}</div>
    <div class="app-event__phone-number">${event.phoneNumber}</div>
    <div class="app-event__option">- ${event.option1}</div>
    <div class="app-event__option">- ${event.option2}</div>
    <div class="app-event__option">- ${event.option3}</div>
  </div>
`;

export const RESOURCE_RENDER_TEMPLATE = resource => `
  <div class="app-resource__avatar">
    <img src="${resource.imageUrl}" alt="${resource.orderNumber}">
  </div>
  <div class="app-resource__order-number">${resource.orderNumber}</div>
  <div class="app-resource__title">${resource.title}</div>
`;

export const MAIN_CALENDAR_OPTIONS = {
  header: false,
  defaultView: 'agendaDay',
  groupByResource: true,
  editable: true,
  eventResourceEditable: true,
  droppable: true,
  height: 'parent',
  allDaySlot: false,
  nowIndicator: true,
  slotLabelFormat: 'HH:mm A',
  slotDuration: '00:15:00',
  defaultTimedEventDuration: '01:30:00',
  minTime: '06:00:00',
  maxTime: '23:00:00',
  resources: MOCK_RESOURCES,
  events: MOCK_EVENTS,
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  drop() {
    $(this).remove();
  },
  /* eslint no-param-reassign: "error" */
  eventRender: (event, element) => {
    element[0].innerHTML = EVENT_RENDER_TEMPLATE(event.data);
  },
  resourceRender: (resourceObj, labelTds) => {
    labelTds[0].innerHTML = RESOURCE_RENDER_TEMPLATE(resourceObj);
  },
};

/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SELECT_DAY = 'app/Appointment/SELECT_DAY';

export const SELECT_WEEK = 'app/Appointment/SELECT_WEEK';

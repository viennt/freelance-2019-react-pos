import faker from 'faker';
import $ from 'jquery';

export const MOCK_WAITING_EVENTS = [
  {
    idNumber: faker.random.number({ min: 10, max: 99 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 10, max: 99 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 10, max: 99 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 10, max: 99 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 10, max: 99 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
];

export const MOCK_EVENTS = [
  {
    resourceId: 1,
    start: '2019-02-22T07:00:00+00:00',
    data: {
      idNumber: '01',
      userFullName: 'Tiffany Brenda',
      phoneNumber: '0123 456 789',
      option1: 'Full set',
      option2: 'Get',
      option3: 'Pill others',
    },
  },
  {
    resourceId: 6,
    start: '2019-02-22T09:00:00+00:00',
    data: {
      idNumber: '02',
      userFullName: 'Hattie Blanda',
      phoneNumber: '0123 456 789',
      option1: 'Full set',
      option2: 'Get',
      option3: 'Pill others',
    },
  },
];

export const MOCK_RESOURCES = [2, 1, 5, 4, 6, 3].map(orderNumber => ({
  id: orderNumber,
  title: faker.name.firstName(1),
  imageUrl: faker.image.avatar(),
  orderNumber,
}));

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

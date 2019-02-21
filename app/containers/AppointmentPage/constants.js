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
];

export const MOCK_EVENTS = [
  {
    resourceId: 'a',
    start: '2019-02-21T07:00:00+00:00',
    end: '2019-02-21T09:00:00+00:00',
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
    resourceId: 'b',
    start: '2019-02-21T09:00:00+00:00',
    end: '2019-02-21T11:00:00+00:00',
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

export const MOCK_RESOURCES = [
  {
    id: 'a',
    title: faker.name.firstName(1),
    imageUrl: faker.image.avatar(),
    orderNumber: faker.random.number({ min: 1, max: 10 }),
  },
  {
    id: 'b',
    title: faker.name.firstName(1),
    imageUrl: faker.image.avatar(),
    orderNumber: faker.random.number({ min: 1, max: 10 }),
  },
  {
    id: 'c',
    title: faker.name.firstName(1),
    imageUrl: faker.image.avatar(),
    orderNumber: faker.random.number({ min: 1, max: 10 }),
  },
  {
    id: 'd',
    title: faker.name.firstName(1),
    imageUrl: faker.image.avatar(),
    orderNumber: faker.random.number({ min: 1, max: 10 }),
  },
  {
    id: 'e',
    title: faker.name.firstName(1),
    imageUrl: faker.image.avatar(),
    orderNumber: faker.random.number({ min: 1, max: 10 }),
  },
  {
    id: 'f',
    title: faker.name.firstName(1),
    imageUrl: faker.image.avatar(),
    orderNumber: faker.random.number({ min: 1, max: 10 }),
  },
];

export const EVENT_RENDER_TEMPLATE = event => `
  <div style="
border-radius: 4px;
margin: 1px 1px 4px 1px;
padding: 4px;
text-align: left;
cursor: move;">
    <div style="
font-size: 11px;
font-weight: bold;
margin-bottom: 2px;">#${event.idNumber}</div>
    <div style="
font-size: 18px;
font-weight: bold;
margin-left: 8px;
margin-bottom: 4px;
line-height: 1.3;">
      ${event.userFullName}
    </div>
    <div style="
font-size: 13px;
margin-left: 8px;
margin-bottom: 4px;
line-height: 1.8;
font-style: italic;">${event.phoneNumber}</div>
    <div style="
font-size: 13px;
margin-left: 16px;
line-height: 1.3;
font-style: italic;">- ${event.option1}</div>
    <div style="
font-size: 13px;
margin-left: 16px;
line-height: 1.3;
font-style: italic;">- ${event.option2}</div>
    <div style="
font-size: 13px;
margin-left: 16px;
line-height: 1.3;
font-style: italic;">- ${event.option3}</div>
  </div>
`;

export const RESOURCE_RENDER_TEMPLATE = resource => `
  <div style="
  position: relative;
  padding: 2px">
    <img src="${resource.imageUrl}" width="56" style="border-radius: 50%">
  </div>
  <div style="
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
  line-height: 1.3">
    ${resource.orderNumber}
  </div>
  <div style="
  position: absolute;
  bottom: 0;
  background: #ffffff;
  width: 100%;
  opacity: 0.75;
  text-align:center;
  padding-bottom: 1px;
  font-size: 13px;">
    ${resource.title}
  </div>
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

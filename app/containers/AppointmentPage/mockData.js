import faker from 'faker';

export const MOCK_WAITING_EVENTS = [
  {
    idNumber: faker.random.number({ min: 11, max: 20 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 21, max: 30 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 31, max: 40 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 41, max: 50 }),
    userFullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNumber: faker.phone.phoneNumber('0### ### ###'),
    option1: 'Full set',
    option2: 'Get',
    option3: 'Pill others',
  },
  {
    idNumber: faker.random.number({ min: 51, max: 60 }),
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
    start: '2019-02-27T07:00:00+00:00',
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
    start: '2019-02-27T09:00:00+00:00',
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

export const MOCK_RESOURCES_HEADER = [2, 1, 5, 4, 6, 3, 7, 9, 8].map(
  orderNumber => ({
    id: orderNumber,
    title: faker.name.firstName(1),
    imageUrl: faker.image.avatar(),
    orderNumber,
  }),
);

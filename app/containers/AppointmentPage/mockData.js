import faker from 'faker';

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

import {sortList} from '../src/utils';

test('orders by desc', () => {
  const originalArray = [
    {
      date: '2021-07-22T16:07:33.968Z',
      id: '1f4e495b-9a01-4b1e-bc1a-912b242af8d0',
      key: '1',
      products: [[Object], [Object]],
      status: 'active',
      title: 'wigilia',
    },
    {
      date: '2021-07-22T16:11:32.351Z',
      id: 'e65d95a6-99d6-468d-9548-0ed562098107',
      key: '0',
      products: [],
      status: 'active',
      title: 'inne',
    },
    {
      date: '2021-07-22T16:06:32.435Z',
      id: 'e9d9966e-f79d-4747-8c5b-fcc9fc98e815',
      key: '2',
      products: [[Object], [Object]],
      status: 'active',
      title: 'prezenty',
    },
  ];

  const expectedArray = [
    {
      date: '2021-07-22T16:11:32.351Z',
      id: 'e65d95a6-99d6-468d-9548-0ed562098107',
      key: '0',
      products: [],
      status: 'active',
      title: 'inne',
    },
    {
      date: '2021-07-22T16:07:33.968Z',
      id: '1f4e495b-9a01-4b1e-bc1a-912b242af8d0',
      key: '1',
      products: [[Object], [Object]],
      status: 'active',
      title: 'wigilia',
    },
    {
      date: '2021-07-22T16:06:32.435Z',
      id: 'e9d9966e-f79d-4747-8c5b-fcc9fc98e815',
      key: '2',
      products: [[Object], [Object]],
      status: 'active',
      title: 'prezenty',
    },
  ];

  const sortResult = sortList(originalArray, 'desc');
  expect(sortResult).toEqual(expectedArray);
});

test('orders by asc', () => {
  const originalArray = [
    {
      date: '2021-07-22T16:07:33.968Z',
      id: '1f4e495b-9a01-4b1e-bc1a-912b242af8d0',
      key: '1',
      products: [[Object], [Object]],
      status: 'active',
      title: 'wigilia',
    },
    {
      date: '2021-07-22T16:11:32.351Z',
      id: 'e65d95a6-99d6-468d-9548-0ed562098107',
      key: '0',
      products: [],
      status: 'active',
      title: 'inne',
    },
    {
      date: '2021-07-22T16:06:32.435Z',
      id: 'e9d9966e-f79d-4747-8c5b-fcc9fc98e815',
      key: '2',
      products: [[Object], [Object]],
      status: 'active',
      title: 'prezenty',
    },
  ];

  const expectedArray = [
    {
      date: '2021-07-22T16:06:32.435Z',
      id: 'e9d9966e-f79d-4747-8c5b-fcc9fc98e815',
      key: '2',
      products: [[Object], [Object]],
      status: 'active',
      title: 'prezenty',
    },
    {
      date: '2021-07-22T16:07:33.968Z',
      id: '1f4e495b-9a01-4b1e-bc1a-912b242af8d0',
      key: '1',
      products: [[Object], [Object]],
      status: 'active',
      title: 'wigilia',
    },
    {
      date: '2021-07-22T16:11:32.351Z',
      id: 'e65d95a6-99d6-468d-9548-0ed562098107',
      key: '0',
      products: [],
      status: 'active',
      title: 'inne',
    },
  ];

  const sortResult = sortList(originalArray, 'asc');
  expect(sortResult).toEqual(expectedArray);
});

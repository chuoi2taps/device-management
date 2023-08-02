import dayjs from 'dayjs/esm';

import { IDevice, NewDevice } from './device.model';

export const sampleWithRequiredData: IDevice = {
  id: 1535,
  name: 'frightfully Brekke',
  serialNumber: 'Folk',
  status: 'partial',
  purchaseDate: dayjs('2023-08-02'),
};

export const sampleWithPartialData: IDevice = {
  id: 23011,
  name: 'Pants Oklahoma Account',
  serialNumber: 'stable',
  status: 'male',
  purchaseDate: dayjs('2023-08-02'),
};

export const sampleWithFullData: IDevice = {
  id: 10486,
  name: 'Avon',
  serialNumber: 'Northeast',
  status: 'Table Towels',
  purchaseDate: dayjs('2023-08-01'),
};

export const sampleWithNewData: NewDevice = {
  name: 'invoice',
  serialNumber: 'white Chrysler Small',
  status: 'purple Bicycle',
  purchaseDate: dayjs('2023-08-01'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

import dayjs from 'dayjs/esm';

export interface IDevice {
  id: number;
  name?: string | null;
  serialNumber?: string | null;
  status?: string | null;
  purchaseDate?: dayjs.Dayjs | null;
}

export type NewDevice = Omit<IDevice, 'id'> & { id: null };

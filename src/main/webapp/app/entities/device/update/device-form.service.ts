import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDevice, NewDevice } from '../device.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDevice for edit and NewDeviceFormGroupInput for create.
 */
type DeviceFormGroupInput = IDevice | PartialWithRequiredKeyOf<NewDevice>;

type DeviceFormDefaults = Pick<NewDevice, 'id'>;

type DeviceFormGroupContent = {
  id: FormControl<IDevice['id'] | NewDevice['id']>;
  name: FormControl<IDevice['name']>;
  serialNumber: FormControl<IDevice['serialNumber']>;
  status: FormControl<IDevice['status']>;
  purchaseDate: FormControl<IDevice['purchaseDate']>;
};

export type DeviceFormGroup = FormGroup<DeviceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeviceFormService {
  createDeviceFormGroup(device: DeviceFormGroupInput = { id: null }): DeviceFormGroup {
    const deviceRawValue = {
      ...this.getFormDefaults(),
      ...device,
    };
    return new FormGroup<DeviceFormGroupContent>({
      id: new FormControl(
        { value: deviceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(deviceRawValue.name, {
        validators: [Validators.required],
      }),
      serialNumber: new FormControl(deviceRawValue.serialNumber, {
        validators: [Validators.required],
      }),
      status: new FormControl(deviceRawValue.status, {
        validators: [Validators.required],
      }),
      purchaseDate: new FormControl(deviceRawValue.purchaseDate, {
        validators: [Validators.required],
      }),
    });
  }

  getDevice(form: DeviceFormGroup): IDevice | NewDevice {
    return form.getRawValue() as IDevice | NewDevice;
  }

  resetForm(form: DeviceFormGroup, device: DeviceFormGroupInput): void {
    const deviceRawValue = { ...this.getFormDefaults(), ...device };
    form.reset(
      {
        ...deviceRawValue,
        id: { value: deviceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeviceFormDefaults {
    return {
      id: null,
    };
  }
}

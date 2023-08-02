import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeviceFormService, DeviceFormGroup } from './device-form.service';
import { IDevice } from '../device.model';
import { DeviceService } from '../service/device.service';

@Component({
  standalone: true,
  selector: 'jhi-device-update',
  templateUrl: './device-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DeviceUpdateComponent implements OnInit {
  isSaving = false;
  device: IDevice | null = null;

  editForm: DeviceFormGroup = this.deviceFormService.createDeviceFormGroup();

  constructor(
    protected deviceService: DeviceService,
    protected deviceFormService: DeviceFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ device }) => {
      this.device = device;
      if (device) {
        this.updateForm(device);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const device = this.deviceFormService.getDevice(this.editForm);
    if (device.id !== null) {
      this.subscribeToSaveResponse(this.deviceService.update(device));
    } else {
      this.subscribeToSaveResponse(this.deviceService.create(device));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevice>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(device: IDevice): void {
    this.device = device;
    this.deviceFormService.resetForm(this.editForm, device);
  }
}

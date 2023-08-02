import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DeviceDetailComponent } from './device-detail.component';

describe('Device Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DeviceDetailComponent,
              resolve: { device: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding()
        ),
      ],
    })
      .overrideTemplate(DeviceDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load device on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DeviceDetailComponent);

      // THEN
      expect(instance.device).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

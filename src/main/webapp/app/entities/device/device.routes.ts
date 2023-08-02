import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeviceComponent } from './list/device.component';
import { DeviceDetailComponent } from './detail/device-detail.component';
import { DeviceUpdateComponent } from './update/device-update.component';
import DeviceResolve from './route/device-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const deviceRoute: Routes = [
  {
    path: '',
    component: DeviceComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeviceDetailComponent,
    resolve: {
      device: DeviceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeviceUpdateComponent,
    resolve: {
      device: DeviceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeviceUpdateComponent,
    resolve: {
      device: DeviceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default deviceRoute;

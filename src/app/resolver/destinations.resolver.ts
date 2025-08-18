import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core"
import { HotelsService } from '../services/hotels.service';


export const destinationsResolver: ResolveFn<boolean> = (route, state) => {
  let destinations_init = inject(HotelsService)
  return destinations_init.fetchDestinationsDisplay();
};

import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor (private _toastr: ToastrService) { }
  
  success(message: string, title: string,  options?: Partial<IndividualConfig>) {
    this._toastr.success(message, title, options)
  }

  error(message: string, title: string, options?: Partial<IndividualConfig>){
    this._toastr.error(message, title, options)
  }
}

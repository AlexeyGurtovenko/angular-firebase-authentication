import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  
  constructor (private readonly _injector: Injector) { }

  /**
   * Need to get NotificationService from injector rather than constructor injection to avoid cyclic dependency error
  */
  private get _notify() {
    return this._injector.get(NotificationService);
  }
  
  handleError(error: any) {
    let errorTitle: string = 'Unhandled error';
    let errorMsg: string = 'Something went wrong';

    switch (error.rejection?.code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        errorTitle = 'Authentication failed';
        errorMsg = 'The email or password is invalid!';
        break;
      case 'auth/user-disabled':
        errorTitle = 'Authentication failed';
        errorMsg = 'The user was disabled by administrator!';
        break;
      case 'auth/email-already-in-use':
        errorTitle = 'Authentication failed';
        errorMsg = 'The email address is already in use !';
        break;
      case 'auth/popup-closed-by-user':
        errorTitle = 'Authentication failed';
        errorMsg = 'The popup has been closed by before finalizing the authentication!';
        break;
          
      default:
        console.error(error);
        break;
    }

    this._notify.error(errorMsg, errorTitle, { onActivateTick: true });
  }
}

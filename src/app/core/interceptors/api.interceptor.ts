import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      // **Success** – qui potresti aggiungere log o trasformazioni
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // La chiamata è andata a buon fine (status 2xx)
          // Se vuoi fare qualcosa in caso di OK, aggiungilo qui.
          // Per ora lasciamo passare l'evento così com’è.
          return event;
        }
        return event;
      }),

      // **Error** – mostra toast con il messaggio proveniente dal BE
      catchError((error: HttpErrorResponse) => {
        // Il backend di solito restituisce { message: '...' } o una stringa.
        const backendMessage = error.error?.message ?? error.message;
        this.toastr.error(backendMessage, 'Errore');
        // Rilancia l'errore così i componenti possono gestirlo ulteriormente se lo desiderano
        return throwError(() => error);
      })
    );
  }
}
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IErrorHandler } from "../interfaces/error-handler.interface";


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements IErrorHandler {
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400: errorMessage = 'Solicitud incorrecta'; break;
        case 401: errorMessage = 'No autorizado'; break;
        case 404: errorMessage = 'Recurso no encontrado'; break;
        case 500: errorMessage = 'Error interno del servidor'; break;
        default: errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error('Error en HTTP:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IErrorHandler {
  handleError(error: HttpErrorResponse): Observable<never>;
}

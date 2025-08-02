import { InjectionToken } from "@angular/core";
import { IErrorHandler } from "../interfaces/error-handler.interface";

export const ERROR_HANDLER_TOKEN = new InjectionToken<IErrorHandler>('ErrorHandler');

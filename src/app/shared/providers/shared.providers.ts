import { ERROR_HANDLER_TOKEN } from "../tokens/shared.tokens";
import { ErrorHandlerService } from "../services/error-handler.service";

export const SHARED_PROVIDERS = [
  {
    provide: ERROR_HANDLER_TOKEN,
    useClass: ErrorHandlerService
  }
];

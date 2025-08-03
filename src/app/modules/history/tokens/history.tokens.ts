import { InjectionToken } from "@angular/core";
import { IHistoryRepository } from "../interfaces/history-repository.interface";

export const HISTORY_REPOSITORY_TOKEN = new InjectionToken<IHistoryRepository>('HistoryRepository');

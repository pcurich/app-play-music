import { InjectionToken } from "@angular/core";
import { ITrackFilter } from "@modules/tracks/interfaces/track-filter.interface";
import { ITrackRepository } from "@modules/tracks/interfaces/track-repository.interface";

export const TRACK_REPOSITORY_TOKEN = new InjectionToken<ITrackRepository>('TrackRepository');
export const TRACK_FILTER_TOKEN = new InjectionToken<ITrackFilter>('TrackFilter');

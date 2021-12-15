import { Options, UserInfo, TrackEvents } from './types';
export { Options, UserInfo, TrackEvents };
export default class AnalyticsBoom {
    private analytics;
    private sensors;
    private options;
    private userInfo;
    track: TrackEvents;
    constructor(options: Options);
    private init;
    identify(): void;
    setUserInfo(userInfo: UserInfo): void;
    private initTrack;
    trackInstance(eventName: string, payload: any): void;
    getAnonymousId(): {
        segment_id: string;
        sensors_id: string;
    };
}

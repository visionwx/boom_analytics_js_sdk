import { Options, UserInfo, TrackEvents, SensorsUserInfo } from './types';
export { Options, UserInfo, TrackEvents, SensorsUserInfo };
export default class AnalyticsBoom {
    private analytics;
    private sensors;
    private options;
    private userInfo;
    track: TrackEvents;
    constructor(options: Options);
    private init;
    /**
     * 用户关联
     */
    identify(): void;
    /**
     * 设置公共属性 - 用户信息
     * @param userInfo
     */
    setUserInfo(userInfo: UserInfo): void;
    /**
     * 初始化自定义事件
     */
    private initTrack;
    /**
     * 自定义事件上报
     * @param eventName 追踪事件名
     * @param payload 埋点追踪参数
     */
    trackInstance(eventName: string, payload: any): Promise<false | import("@segment/analytics-next").Context>;
    /**
     * 获取匿名 id
     * @returns segment_id
     * @returns sensors_id
     */
    getAnonymousId(): {
        segment_id: string;
        sensors_id: string;
    };
    /**
     * 设置公共属性 - extra_data
     * @param payload 自定义参数
     */
    setExtraData(payload: any): void;
    /**
     * 神策 - 设置用户属性
     * @param payload 用户属性（神策要求）
     */
    setProfile(payload: SensorsUserInfo): void;
}

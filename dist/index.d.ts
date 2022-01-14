import { Options, UserInfo, TrackEvents, SensorsUserInfo, LogOptions, LogPayload, ResponseData, ResponseDataData, AnalyticsInfo } from './types';
import { AxiosInstance } from 'axios';
export default class AnalyticsBoom {
    private analytics;
    private sensors;
    private options;
    private userInfo;
    track: TrackEvents;
    beforeTrack: (description: string) => void;
    afterTrack: (description: string) => void;
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
     * @returns segment_user_id
     */
    getAnonymousId(): {
        segment_id: string;
        segment_user_id: string;
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
    /**
     * 注册 trackBefore 钩子函数
     * @param callback
     */
    setBeforeTrack(callback: (description: string) => void): void;
    /**
     * 注册 afterTrack 钩子函数
     * @param callback
     */
    setAfterTrack(callback: (description: string) => void): void;
}
declare class Log {
    private options;
    private userInfo;
    private analyticsInfo;
    axios: AxiosInstance;
    constructor(options: LogOptions);
    /**
     * 实例化 axios
     */
    initAxios(): void;
    /**
     * 设置公共属性 - 用户信息
     * @param userInfo
     */
    setUserInfo(userInfo: UserInfo): void;
    /**
     * 设置公共属性 - sdk 匿名信息
     * @param analyticsInfo
     */
    setAnalyticsInfo(analyticsInfo: AnalyticsInfo): void;
    debug(payload: LogPayload): Promise<ResponseData<ResponseDataData>>;
    info(payload: LogPayload): Promise<ResponseData<ResponseDataData>>;
    warn(payload: LogPayload): Promise<ResponseData<ResponseDataData>>;
    error(payload: LogPayload): Promise<ResponseData<ResponseDataData>>;
    request(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', logTag: string, payload: LogPayload): Promise<ResponseData<ResponseDataData>>;
}
export { Options, UserInfo, TrackEvents, SensorsUserInfo, AnalyticsInfo, ResponseData, Log, LogPayload, LogOptions };

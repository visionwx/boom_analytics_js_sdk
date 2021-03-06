import { Analytics, AnalyticsBrowser } from '@segment/analytics-next';
import { DispatchedEvent } from '@segment/analytics-next/dist/pkg/core/arguments-resolver';
import {
    Options,
    UserInfo,
    TrackEvents,
    SensorsUserInfo,
    LogOptions,
    LogPayload,
    ResponseData,
    ResponseDataData,
    AnalyticsInfo,
} from './types';

import axios, { AxiosInstance } from 'axios';

/**
 * 行为事件上报模块
 */
export default class AnalyticsBoom {
    // segment
    private analytics!: Analytics;
    // 神策
    private sensors!: {
        login: (arg0: string) => void;
        track: (arg0: string, arg1: any) => void;
        quick: (arg0: string) => string;
        setProfile: (arg0: SensorsUserInfo) => void;
    };
    private options: Options;
    private userInfo!: UserInfo;

    track!: TrackEvents;

    beforeTrack!: (description: string) => void;
    afterTrack!: (description: string) => void;

    queues: { type: string; payload: any }[] = [];
    timer: any = null;
    counter = 0;

    constructor(options: Options) {
        this.options = {
            channel_media: '',
            channel: '',
            ...options,
        };

        this.userInfo = {
            _id: '',
            name: '',
            phone: '',
        };

        this.initTrack();
        this.init();
    }

    // 初始化 sdk
    private async init() {
        const isLive = this.options.env === 'live';
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sensors = require('./sensors').default;

        (window as any).analytics = {
            _cdn: 'https://oss.flix.visionwx.com/vendor_lib',
        };

        const [response] = await AnalyticsBrowser.load({
            writeKey: isLive ? 'GCNYIjqIBhkI4eA10HxDEGazuCMW69hM' : 'ryeevPxktAiS6AL1tjATM0s7iGf7piwM',
        });

        this.analytics = response;

        sensors.init({
            server_url: `https://weixi-boom.datasink.sensorsdata.cn/sa?token=edf9a6d8db338f69&project=${
                isLive ? 'production' : 'default'
            }`,
            is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
            use_client_time: true,
            send_type: 'beacon',
            heatmap: {
                // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
                clickmap: 'default',
                // 是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
                scroll_notice_map: 'not_collect',
            },
            show_log: this.options.show_log || false,
        });

        sensors.quick('autoTrack'); // 用于采集 $pageview 事件。

        // 注册公共属性
        sensors.registerPage({
            platform_type: this.options.platform_type,
            channel_media: this.options.channel_media,
            platform_version: this.options.platform_version,
            channel: this.options.channel,
        });

        this.sensors = sensors;
    }

    /**
     * 用户关联
     */
    identify() {
        if (!this.userInfo._id) {
            return;
        }

        if (this.sensors) {
            this.sensors.login(this.userInfo._id);
        }

        if (this.analytics) {
            this.analytics.identify(this.userInfo._id);
        }
    }

    /**
     * 设置公共属性 - 用户信息
     * @param userInfo
     */
    setUserInfo(userInfo: UserInfo) {
        this.userInfo = {
            name: '',
            ...userInfo,
        };
    }

    /**
     * 初始化自定义事件
     */
    private initTrack() {
        this.track = {
            login: async (payload) => await this.trackInstance('login', payload),
            get_code: async (payload) => await this.trackInstance('get_code', payload),
            set_nickname: async (payload) => await this.trackInstance('set_nickname', payload),

            error_info: async (payload) => await this.trackInstance('error_info', payload),

            video_comment_click: async (payload) => await this.trackInstance('video_comment_click', payload),
            start_comment: async (payload) => await this.trackInstance('start_comment', payload),
            media_access_result: async (payload) => await this.trackInstance('media_access_result', payload),
            open_annotation: async (payload) => await this.trackInstance('open_annotation', payload),
            comment_status: async (payload) => await this.trackInstance('comment_status', payload),

            setting_panel: async (payload) => await this.trackInstance('setting_panel', payload),
            start_record: async (payload) => await this.trackInstance('start_record', payload),
            assist_operate: async (payload) => await this.trackInstance('assist_operate', payload),
            record_status: async (payload) => await this.trackInstance('record_status', payload),

            check_update: async (payload) => await this.trackInstance('check_update', payload),
            download_update: async (payload) => await this.trackInstance('download_update', payload),
            install_update: async (payload) => await this.trackInstance('install_update', payload),
            update_result: async (payload) => await this.trackInstance('update_result', payload),
            exit_update: async (payload) => await this.trackInstance('exit_update', payload),
            item_click: async (payload) => await this.trackInstance('item_click', payload),

            prd_pageview: async (payload) => await this.trackInstance('prd_pageview', payload),
            official_pageview: async (payload) => await this.trackInstance('official_pageview', payload),

            extension_installed: async (payload) => await this.trackInstance('extension_installed', payload),
            extension_uninstalled: async (payload) => await this.trackInstance('extension_uninstalled', payload),

            share_screen: async (payload) => await this.trackInstance('share_screen', payload),
            cancel_share_screen: async (payload) => await this.trackInstance('cancel_share_screen', payload),
            extension_open: async (payload) => await this.trackInstance('extension_open', payload),

            extension_crash: async (payload) => await this.trackInstance('extension_crash', payload),

            clip_start: async (payload) => await this.trackInstance('clip_start', payload),
            clip_operate: async (payload) => await this.trackInstance('clip_operate', payload),
            clip_save: async (payload) => await this.trackInstance('clip_save', payload),
            clip_cancel: async (payload) => await this.trackInstance('clip_cancel', payload),
        };
    }

    /**
     * 自定义事件上报
     * @param eventName 追踪事件名
     * @param payload 埋点追踪参数
     */
    async trackInstance(eventName: string, payload: any) {
        // sdk 实例化未完成时 放入队列滞后发送
        if (!this.sensors || !this.analytics) {
            this.push({
                type: eventName,
                payload,
            });

            return false;
        }

        // 提取 description 字段
        const description = payload.description || '';

        // before track hook
        if (this.beforeTrack && typeof this.beforeTrack === 'function') {
            this.beforeTrack(payload.description);
        }

        // 删除 神策不带
        delete payload.description;

        try {
            this.sensors.track(eventName, payload);

            const res = (await this.analytics.track(eventName, {
                general_attr: {
                    platform: {
                        name: this.options.platform_type,
                        version: this.options.platform_version,
                    },
                    user_info: {
                        id: this.userInfo._id,
                        name: this.userInfo.name,
                        phone: this.userInfo.phone,
                    },
                    extra_data: this.options.extra_data,
                },
                ...payload,
                description: `用户 <${this.userInfo.name || ''}> ${description}`,
            })) as DispatchedEvent;

            // after track hook
            if (this.afterTrack && typeof this.afterTrack === 'function') {
                this.afterTrack(description);
            }

            return res;
        } catch (error) {
            return false;
        }
    }

    /**
     * 获取匿名 id
     * @returns segment_id
     * @returns sensors_id
     * @returns segment_user_id
     */
    getAnonymousId() {
        return {
            segment_id: (localStorage.getItem('ajs_anonymous_id') || '').replace(/"/g, ''),
            segment_user_id: (localStorage.getItem('ajs_user_id') || '').replace(/"/g, ''),
            sensors_id: this.sensors ? (this.sensors.quick('getAnonymousID') as string) : '',
        };
    }

    /**
     * 设置公共属性 - extra_data
     * @param payload 自定义参数
     */
    setExtraData(payload: any) {
        this.options.extra_data = payload;
    }

    /**
     * 神策 - 设置用户属性
     * @param payload 用户属性（神策要求）
     */
    setProfile(payload: SensorsUserInfo) {
        if (this.sensors) {
            this.sensors.setProfile(payload);
        }
    }

    /**
     * 注册 trackBefore 钩子函数
     * @param callback
     */
    setBeforeTrack(callback: (description: string) => void) {
        this.beforeTrack = callback;
    }

    /**
     * 注册 afterTrack 钩子函数
     * @param callback
     */
    setAfterTrack(callback: (description: string) => void) {
        this.afterTrack = callback;
    }

    /**
     * 临时队列，存于内存中
     * @param val
     */
    push(val: { type: string; payload: any }) {
        this.queues.push(val);

        if (!this.timer) {
            this.queryQueueLoop();
        }
    }

    /**
     * 循环取出队列中的事件进行上报
     * @returns
     */
    queryQueueLoop() {
        if (!this.queues.length || this.counter >= 1200) {
            clearTimeout(this.timer);
            this.timer = null;
            this.counter = 0;

            return;
        }

        if (this.sensors && this.analytics) {
            const current = this.queues.shift();

            if (current?.type) {
                this.trackInstance(current.type, current.payload);
            }

            this.queryQueueLoop();
        } else {
            // 为加载完毕，或者加载失败
            this.timer = setTimeout(() => {
                this.counter++;

                this.queryQueueLoop();
            }, 100);
        }
    }
}

/**
 * 日志上报模块
 */
class Log {
    private options: LogOptions;
    private userInfo: UserInfo = {
        _id: 'unknown',
        name: '',
        phone: '',
        country_code: '',
    };
    private analyticsInfo: AnalyticsInfo = { 'sensors-distinct-id': '', ajs_anonymous_id: '', ajs_user_id: '' };

    axios!: AxiosInstance;

    constructor(options: LogOptions) {
        this.options = options;

        this.initAxios();
    }

    /**
     * 实例化 axios
     */
    initAxios() {
        const service = axios.create({
            baseURL: this.options.env === 'live' ? 'https://api.flix.visionwx.com' : 'https://api.tf.visionwx.com',
            timeout: 120 * 1000,
        });

        service.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        this.axios = service;
    }

    /**
     * 设置公共属性 - 用户信息
     * @param userInfo
     */
    setUserInfo(userInfo: UserInfo) {
        this.userInfo = {
            name: '',
            ...userInfo,
        };
    }

    /**
     * 设置公共属性 - sdk 匿名信息
     * @param analyticsInfo
     */
    setAnalyticsInfo(analyticsInfo: AnalyticsInfo) {
        this.analyticsInfo = {
            ...this.analyticsInfo,
            ...analyticsInfo,
        };
    }

    async debug(payload: LogPayload) {
        const logTag = payload.logTag || 'info';

        delete payload.logTag;

        return await this.request('DEBUG', logTag, payload);
    }

    async info(payload: LogPayload) {
        const logTag = payload.logTag || 'info';

        delete payload.logTag;

        return await this.request('INFO', logTag, payload);
    }

    async warn(payload: LogPayload) {
        const logTag = payload.logTag || 'info';

        delete payload.logTag;

        return await this.request('WARN', logTag, payload);
    }

    async error(payload: LogPayload) {
        const logTag = payload.logTag || 'info';

        delete payload.logTag;

        return await this.request('ERROR', logTag, payload);
    }

    async request(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', logTag: string, payload: LogPayload) {
        const url = `/mgmt/logs/app?userId=${this.userInfo._id}&application=${this.options.platform_type}&version=${this.options.platform_version}&logTag=${logTag}`;

        const data = {
            content: payload.content || '',
            level: level,
            extraData: {
                ...(payload.extraData || {}),
                userInfo: {
                    id: this.userInfo._id,
                    name: this.userInfo.name,
                    phone: this.userInfo.phone,
                    country_code: this.userInfo.country_code,
                },
                boomInfo: {
                    ...payload.extraData?.boomInfo,
                },
                analyticsInfo: this.analyticsInfo,
                sentAt: new Date().toISOString(),
            },
            timestamp: Date.now(),
            timezoneOffset: 0 - new Date().getTimezoneOffset() / 60,
        };

        return (await this.axios.post(url, data)) as unknown as Promise<ResponseData<ResponseDataData>>;
    }
}

export { Options, UserInfo, TrackEvents, SensorsUserInfo, AnalyticsInfo, ResponseData, Log, LogPayload, LogOptions };

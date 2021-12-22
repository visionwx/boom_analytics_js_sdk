import { Analytics, AnalyticsBrowser } from '@segment/analytics-next';
import { Options, UserInfo, TrackEvents, SensorsUserInfo } from './types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sensors = require('./sensors').default;

export { Options, UserInfo, TrackEvents, SensorsUserInfo };

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
            login: (payload) => this.trackInstance('login', payload),
            get_code: (payload) => this.trackInstance('get_code', payload),
            set_nickname: (payload) => this.trackInstance('set_nickname', payload),

            error_info: (payload) => this.trackInstance('error_info', payload),

            video_comment_click: (payload) => this.trackInstance('video_comment_click', payload),
            start_comment: (payload) => this.trackInstance('start_comment', payload),
            media_access_result: (payload) => this.trackInstance('media_access_result', payload),
            open_annotation: (payload) => this.trackInstance('open_annotation', payload),
            comment_status: (payload) => this.trackInstance('comment_status', payload),

            setting_panel: (payload) => this.trackInstance('setting_panel', payload),
            start_record: (payload) => this.trackInstance('start_record', payload),
            assist_operate: (payload) => this.trackInstance('assist_operate', payload),
            record_status: (payload) => this.trackInstance('record_status', payload),

            check_update: (payload) => this.trackInstance('check_update', payload),
            download_update: (payload) => this.trackInstance('download_update', payload),
            install_update: (payload) => this.trackInstance('install_update', payload),
            update_result: (payload) => this.trackInstance('update_result', payload),
            exit_update: (payload) => this.trackInstance('exit_update', payload),
            item_click: (payload) => this.trackInstance('item_click', payload),

            prd_pageview: (payload) => this.trackInstance('prd_pageview', payload),
            official_pageview: (payload) => this.trackInstance('official_pageview', payload),
        };
    }

    /**
     * 自定义事件上报
     * @param eventName 追踪事件名
     * @param payload 埋点追踪参数
     */
    trackInstance(eventName: string, payload: any) {
        // 提取 description 字段
        const description = payload.description || '';

        // 删除 神策不带
        delete payload.description;

        if (this.sensors) {
            this.sensors.track(eventName, payload);
        }

        if (this.analytics) {
            this.analytics.track(eventName, {
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
            });
        }
    }

    /**
     * 获取匿名 id
     * @returns segment_id
     * @returns sensors_id
     */
    getAnonymousId() {
        return {
            segment_id: (localStorage.getItem('ajs_anonymous_id') || '').replace(/"/g, ''),
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
}

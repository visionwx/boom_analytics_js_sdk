import { DispatchedEvent } from '@segment/analytics-next/dist/pkg/core/arguments-resolver';
export declare type Options = {
    env: 'live' | 'test';
    platform_type: 'web' | 'extension_chromium' | 'extension_safari' | 'mac-desktop' | 'win-desktop' | 'app';
    platform_version: string;
    channel_media?: string;
    channel?: string;
    extra_data?: any;
};
export declare type UserInfo = {
    _id: string;
    name?: string;
    phone: string;
};
export declare type SensorsUserInfo = {
    nickname?: string;
    phone?: string;
    user_location?: string;
    signup_time?: string;
};
export interface TrackEvents {
    login: (payload: {
        page_from: string;
        click_button: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    get_code: (payload: {
        description: string;
    }) => Promise<DispatchedEvent | false>;
    set_nickname: (payload: {
        description: string;
    }) => Promise<DispatchedEvent | false>;
    error_info: (payload: {
        page_from: string;
        error_module: string;
        error_type: string;
        error_msg: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    video_comment_click: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        description: string;
    }) => Promise<DispatchedEvent | false>;
    start_comment: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        video_device_id: string;
        audio_device_id: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    media_access_result: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        is_success: boolean;
        fail_info: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    open_annotation: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        description: string;
    }) => Promise<DispatchedEvent | false>;
    comment_status: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        operate: 'complete' | 'cancel';
        description: string;
    }) => Promise<DispatchedEvent | false>;
    setting_panel: (payload: {
        panel_name: 'extension_panel' | 'share_panel' | 'desktop_panel';
        description: string;
    }) => Promise<DispatchedEvent | false>;
    start_record: (payload: {
        video_device_id: string;
        audio_device_id: string;
        is_countdown: boolean;
        is_memo: boolean;
        source_type: 'screen' | 'application' | 'tab';
        description: string;
    }) => Promise<DispatchedEvent | false>;
    assist_operate: (payload: {
        operate_type: 'camera' | 'memo' | 'brush';
        using_status: 'open' | 'close';
        source_type: 'screen' | 'application' | 'tab';
        source_id: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    record_status: (payload: {
        source_type: 'screen' | 'application' | 'tab';
        source_id: string;
        video_device_id: string;
        audio_device_id: string;
        operate: 'complete' | 'cancel' | 'pause' | 'resume' | 'reset';
        remain_fragments_num: number;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    check_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        is_provide: boolean;
        version_latest: string;
        emit_type: 'manual' | 'auto';
        description: string;
    }) => Promise<DispatchedEvent | false>;
    download_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        net_type: '5g' | '4g' | '3g';
        description: string;
    }) => Promise<DispatchedEvent | false>;
    install_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    update_result: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        is_success: boolean;
        fail_info: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    exit_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        exit_info: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    item_click: (payload: {
        page_from: string;
        click_button: string;
        source_id: string;
        content_source: 'team' | 'personal' | '';
        author_id: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    prd_pageview: (payload: {
        page_name: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    official_pageview: (payload: {
        page_name: string;
        description: string;
    }) => Promise<DispatchedEvent | false>;
    installed: (payload: {
        description: string;
    }) => Promise<DispatchedEvent | false>;
    uninstalled: (payload: {
        duration: number;
        description: string;
    }) => Promise<DispatchedEvent | false>;
}

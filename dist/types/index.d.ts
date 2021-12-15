export declare type Options = {
    env: 'live' | 'test';
    platform_type: 'web' | 'extension' | 'mac-desktop' | 'win-desktop' | 'app';
    platform_version: string;
    channel_media?: string;
    channel?: string;
};
export declare type UserInfo = {
    _id: string;
    name?: string;
    phone: string;
};
export interface TrackEvents {
    login: (payload: {
        page_from: string;
        click_button: string;
        description: string;
    }) => void;
    get_code: (payload: {
        description: string;
    }) => void;
    set_nickname: (payload: {
        description: string;
    }) => void;
    error_info: (payload: {
        page_from: string;
        error_module: string;
        error_type: string;
        error_msg: string;
        description: string;
    }) => void;
    video_comment_click: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        description: string;
    }) => void;
    start_comment: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        video_device_id: string;
        audio_device_id: string;
        description: string;
    }) => void;
    media_access_result: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        is_success: boolean;
        fail_info: string;
        description: string;
    }) => void;
    open_annotation: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        description: string;
    }) => void;
    comment_status: (payload: {
        source_id: string;
        source_from: 'team' | 'personal';
        author_id: string;
        content_type: 'video' | 'document';
        operate: 'complete' | 'cancel';
        description: string;
    }) => void;
    setting_panel: (payload: {
        panel_name: 'extension_panel' | 'share_panel' | 'desktop_panel';
        description: string;
    }) => void;
    start_record: (payload: {
        video_device_id: string;
        audio_device_id: string;
        is_countdown: boolean;
        is_memo: boolean;
        source_type: 'screen' | 'application' | 'tab';
        description: string;
    }) => void;
    assist_operate: (payload: {
        operate_type: 'camera' | 'memo' | 'brush';
        using_status: 'open' | 'close';
        source_type: 'screen' | 'application' | 'tab';
        source_id: string;
        description: string;
    }) => void;
    record_status: (payload: {
        source_type: 'screen' | 'application' | 'tab';
        source_id: string;
        video_device_id: string;
        audio_device_id: string;
        operate: 'complete' | 'cancel' | 'pause' | 'resume' | 'reset';
        remain_fragments_num: number;
        description: string;
    }) => void;
    check_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        is_provide: boolean;
        version_latest: string;
        emit_type: 'manual' | 'auto';
        description: string;
    }) => void;
    download_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        net_type: '5g' | '4g' | '3g';
        description: string;
    }) => void;
    install_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        description: string;
    }) => void;
    update_result: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        is_success: boolean;
        fail_info: string;
        description: string;
    }) => void;
    exit_update: (payload: {
        version_id: string;
        version_arch: 'arm64' | 'x64';
        version_latest: string;
        exit_info: string;
        description: string;
    }) => void;
    item_click: (payload: {
        page_from: string;
        click_button: string;
        source_id: string;
        content_source: 'team' | 'personal' | '';
        author_id: string;
        description: string;
    }) => void;
    prd_pageview: (payload: {
        page_name: string;
        description: string;
    }) => void;
    official_pageview: (payload: {
        page_name: string;
        description: string;
    }) => void;
}

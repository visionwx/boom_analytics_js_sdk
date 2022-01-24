# Boom_Analytics_js_sdk

## Setup

```
# install
npm install @vision_intelligence/analytics-js


# import
import Analytics from '@vision_intelligence/analytics-js';

const analytics = new Analytics({
    env: 'live',
    ...
})

# 注册 beforeTrack 事件
analytics.setBeforeTrack((description) => {
    // do something
})

# 注册 afterTrack 事件
analytics.setAfterTrack((description) => {
    // do something
})

# 初始化后，在能获取到用户信息的地方调用该方法，确保后续的 track 事件能读取到用户信息
analytics.setUserInfo({
    _id: '',
    ...
})


# identify
analytics.identify();


# track events
analytics.track.login({
    ...
})

# 获取匿名 id
analytics.getAnonymousId();

// Log
import { Log } from '@vision_intelligence/analytics-js'

const log = new Log({
    env: 'test',
    ...
})

log.info({
    content: 'send a message',
    ...
})

```

## Change Log

#### 2022-01-25 Jeffrey

-   【新增】视频修剪功能模块自定义事件

#### 2022-01-14 Jeffrey

-   【新增】Log 模块
-   【优化】Analytics 模块上报事件新增延时处理
-   【新增】Analytics 模块新增多个插件事件

#### 2021-12-29 Jeffrey

-   【新增】设置 segment setting 接口地址为 oss url

#### 2021-12-27 Jeffrey

-   【新增】beforeTrack、afterTrack 钩子函数

#### 2021-12-23 Jeffrey

-   【新增】track 事件修改为 promise

#### 2021-12-22 Jeffrey

-   【修复】神策设置用户属性事件 优化部分事件字段类型

#### 2021-12-14 Jeffrey

-   【新增】神策 sdk、segment sdk 封装

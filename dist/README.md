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

# 初始化后，在能获取到用户信息的地方调用该方法填充公共属性，确保后续的 track 事件能读取到用户信息
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

```

import Analytics from '@vision_intelligence/analytics-js';

console.log('start', Date.now());

const analytics = new Analytics({
    env: 'test',
    platform_version: '0.1.0',
    platform_type: 'web',
});

analytics.setUserInfo({
    _id: '60d97e96a7a5d44ca382bab3',
    name: 'Jeffrey Zhan',
    phone: '13660493601',
});

console.log('secord', Date.now());

const btn = document.getElementById('btn'),
    btn2 = document.getElementById('btn2');

btn.addEventListener('click', () => {
    analytics.track.item_click({
        page_from: '测试',
        click_button: 'send track',
        source_id: '',
        author_id: '',
        description: '测试测试',
    });

    alert('send successfully');
});

btn2.addEventListener('click', () => {
    const ids = analytics.getAnonymousId();

    alert(`[segment]: ${ids.segment_id}, [sensors]: ${ids.sensors_id}`);
});

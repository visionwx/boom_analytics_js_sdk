import Analytics, { Log } from '../../dist';

console.time();

const analytics = new Analytics({
    env: 'test',
    platform_version: '0.1.0',
    platform_type: 'web',
});

analytics.setBeforeTrack((description) => {
    console.log('this is before track excu ', description);
});

analytics.setAfterTrack((description) => {
    console.log('this is after track excu ', description);
});

// analytics.track
//     .item_click({
//         page_from: '测试123',
//         click_button: 'send track',
//         source_id: '',
//         author_id: '',
//         description: '测试测试',
//     })
//     .then((res) => {
//         console.log('aaa res ', res);
//     });

const log = new Log({
    env: 'test',
    platform_type: 'web',
    platform_version: '0.9.55',
});

log.setUserInfo({
    _id: '60d97e96a7a5d44ca382bab3',
    name: 'Jeffrey Zhan',
    phone: '13660493601',
});

analytics.setUserInfo({
    _id: '60d97e96a7a5d44ca382bab3',
    name: 'Jeffrey Zhan',
    phone: '13660493601',
});

console.timeEnd();

const btn = document.getElementById('btn'),
    btn2 = document.getElementById('btn2'),
    btn3 = document.getElementById('btn3');

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

btn3.addEventListener('click', async () => {
    try {
        const res = await log.info({
            content: 'sdk test',
            logTag: 'info',
            extraData: {
                otherInfo: { a: '1' },
            },
        });

        console.log('log res = ', res);
    } catch (err) {
        console.log('errrrrr', err);
    }
});

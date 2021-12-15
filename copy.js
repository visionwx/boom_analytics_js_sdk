/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, './dist/sensors'))) {
    fs.mkdirSync(path.resolve(__dirname, './dist/sensors'));
}

fs.copyFileSync(path.resolve(__dirname, './lib/sensors/index.js'), path.resolve(__dirname, './dist/sensors/index.js'));

console.log('copy lib/sensors files successfully!');

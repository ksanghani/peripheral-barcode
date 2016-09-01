const debug   = require('debug')('peripheral');
const Barcode = require('../');

const barcode = new Barcode();

barcode.on('connected', () => debug('connected'));
barcode.on('disconnected', () => debug('disconnected'));
barcode.on('data', (data) => debug('data', data));

barcode.connect().then(() => {
    debug('Finished initialization.');
});

process.stdin.resume();

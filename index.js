const debug        = require('debug')('peripheral:barcode');
const EventEmitter = require('events');
const SerialPort   = require('serialport');

const defaults = {
    vendorId: '0x05e0',
    productId: '0x1701',
    baudrate: 115200,
    reconnectIntervalMs: 5000
};

class Barcode extends EventEmitter {
    constructor () {
        super();

        this.config = Object.assign({}, defaults);
        this.ports  = [];
    }

    connect () {
        return new Promise((resolve, reject) => {
            SerialPort.list((err, allPorts) => {
                if (err) return reject(err);

                const ports = allPorts.filter((port) => {
                    return port.vendorId  === this.config.vendorId &&
                           port.productId === this.config.productId;
                });

                ports.forEach((port) => {
                    const device = create.bind(this)(port);

                    this.ports.push(device);
                });

                resolve();
            });
        });
    }
}

function create (port) {
    let device = new SerialPort(port.comName, {
        baudrate: this.config.baudrate
    });

    device.on('open', (error) => {
        if (!error)
            clearInterval(port.reconnectInterval);

        debug('Device connected.');
        this.emit('connected');
    });

    device.on('disconnect', () => {
        debug('Device disconnected. Re-connecting...');
        this.emit('disconnected');

        port.reconnectInterval = setInterval(() => {
            debug('Trying to re-connect...');
            device = create.bind(this)(port);

            // intentionally dismiss re-connect error here
            device.on('error', () => { });
        }, this.config.reconnectIntervalMs);
    });

    device.on('data', (data) => {
        const barcode = data.toString();

        debug(`Barcode: ${barcode}`);
        this.emit('data', barcode);
    });

    return device;
}

module.exports = Barcode;

# WithMe Retail Peripheral Barcode Scanner

```sh
npm install --save wm-peripheral-barcode
```

## Usage
```js
const Barcode = require('wm-peripheral-barcode');

const barcode = new Barcode();

barcode.on('connected', () => { /* ... */ });
barcode.on('disconnected', () => { /* ... */ });
barcode.on('data', (data) => => { /* ... */ });

barcode.connect().then(() => {
    debug('Finished initialization.');
});
```

## API
`wm-peripheral-barcode` has a single default constructor function.

```sh
const barcode = new Barcode();
```

### Methods
#### `"connect"`
Initiates peripheral connection. Connects all devices matching the peripheral meta data. Returns a promise.

### Events
#### `"connected"`
Connection event for the peripheral. Fires once it is available.

#### `"disconnected"`
Disconnect event for the peripheral. Fires when device disconnects. Also, starts a re-connect loop until it finds the device again.

#### `"data"`
Data event for the peripheral. Fires every time the peripheral receives a data payload.

# simple-promise

A JavaScript library for a Promise-like solution to callbacks

## Usage

```javascript
const Promise = require("promise");

const promise = new SimplePromise((resolve, reject) => {
  get("http://www.google.com", function(err, res) {
    if (err) reject(err);
    else resolve(res);
  });
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
```

## License

MIT

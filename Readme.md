
# querystring

  Simple key / value pair query-string parser and formatter.

## Installation

```
$ component install component/querystring
```

## API

### .parse(string)

  Parse the given query `string`:

```js
var query = require('querystring');
query.parse('name=tobi&species=ferret');
// => { name: 'tobi', species: 'ferret' }
```

### .stringify(object)

  Stringify the given `object`:

```js
var query = require('querystring');
query.stringify({ name: 'tobi', species: 'ferret' });
// => "name=tobi&species=ferret"
```

## License

  MIT

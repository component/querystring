
# Query String

  Simple key / value pair query-string parser and formatter.

## Installation

```
$ component install component/query-string
```

## API

### .parse(string)

  Parse the given query `string`:

```js
var query = require('query-string');
query.parse('name=tobi&species=ferret');
// => { name: 'tobi', species: 'ferret' }
```

### .stringify(object)

  Stringify the given `object`:

```js
var query = require('query-string');
query.stringify({ name: 'tobi', species: 'ferret' });
// => "name=tobi&species=ferret"
```

## License

  MIT

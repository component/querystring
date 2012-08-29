
# Query String

  Simple key / value pair query-string parser and formatter.

## Installation

```
$ component install component/query-string
```

## Example

```js
var query = require('query-string');
query.parse('name=tobi&species=ferret');
// => { name: 'tobi', species: 'ferret' }
```
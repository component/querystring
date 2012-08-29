
# Query String

  Simple key/value pair query-string parsing.

## Installation

```
$ component install component/query-string
```

## Example

```js
var parse = require('query-string');
parse('name=tobi&species=ferret');
// => { name: 'tobi', species: 'ferret' }
```
# Terminal Parser

A terminal utility that its sole objective is to parse terminal-like arguments.

Its functionality is super simple to describe.

It turns this `['--environment=development', '--mode=2']` to `{environment: 'development', 'mode': '2'}`

## How to use

Install from npm

```bash
npm install terminal-parser --save
```

Include it in your project

```js
var Terminal = require('terminal-parser');
```

Start parsing arguments

```js
var args = Terminal.parseArgs(['--environment=development', '--mode=2']);
```

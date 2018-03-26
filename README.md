# Webpack Node Security Platform Plugin


Webpack plugin that runs the Node Security Platform audit on your package.json, package-lock.json or npm-shrinkwrap.json.

> NOTE: Webpack plugin is a wrapper for the [nodesecurity/nsp](https://github.com/nodesecurity/nsp) package.

## Install

```bash
npm install --save-dev webpack-nsp-plugin
```

## Usage

In your `webpack.config.js`

```javascript
var NspPlugin = require('webpack-nsp-plugin');

module.exports = {
    // ...
    plugins: [
      new NspPlugin()
    ]
};
```


## Options:

```js
module.exports = {
    // ...
  plugins: [
    new NspPlugin(options)
  ]
}
```

### `options.reporter`

Type: `String`<br>
Default: `summary`

Defines the output format of the vulnerabilities report. Available (built-in) reporters:

- table
- summary
- json
- codeclimate
- minimal

It is possible to install 3rd party reporters from npm or create your own.

For more information, go to [nodesecurity/nsp#output-reporters](https://github.com/nodesecurity/nsp#output-reporters)

### `options.verbose`

Type: `Boolean`<br>
Default: `false`

Provide more verbose output.

### `options.quiet`

Type: `Boolean`<br>
Default: `false`

### `options.stopOnError`

Instruct the build process to continue successfully regardless of errors.

Type: `Boolean`<br>
Default: `true`


## License

MIT © [Guneet Uppal](https://github.com/gunzzblazzing)

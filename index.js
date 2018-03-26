const nspCheck = require("nsp/commands/check");

function NspPlugin(options) {
  this.options = options || {};
  this.options.reporter = this.options.reporter || "summary";
  this.options.stopOnError = this.options.stopOnError !== false;
}

NspPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  var errorCode = 0;
  var originalExit = process.exit;

  var done = callback => {
    process.exit = originalExit;
    callback();
  };

  function checkErrorCode(errorCode, compilation) {
    switch (errorCode) {
      case 0:
        break;
      case 1:
        compilation.errors.push(new Error("Vulnerable packages found"));
        break;
      case 3:
        compilation.errors.push(new Error("Internal nsp error"));
        break;
      default:
        compilation.errors.push(new Error("Unhandled error"));
    }
    return compilation;
  }

  compiler.plugin("emit", (compilation, callback) => {
    process.exit = code => {
      errorCode = errorCode || code;
    };

    nspCheck.handler(options).then(() => {
      if (options.stopOnError) {
        compilation = checkErrorCode(errorCode, compilation);
      }

      done(callback);
    });
  });
};

module.exports = NspPlugin;
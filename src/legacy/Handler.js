const { Handler: ValidationHandler, ValidationError } = require('./ValidationHandler')
const ErrorHandler = require('./ErrorHandler')
const fs = require('fs-extra')
class Handler {
  /**
     *
     * @param {Object} configuration
     * @param {Object} obj
     */
  wrap (configuration, obj) {
    ValidationHandler.wrap(configuration, obj)
    ErrorHandler.wrap(obj)
    return obj
  }

  wrapUnenumerable (configuration, obj) {
    ValidationHandler.wrapUnenumerable(configuration, obj)
    ErrorHandler.wrapUnenumerable(obj)
    return obj
  }

  wrapLoad (configurationFile, obj) {
    const configuration = JSON.parse(fs.readFileSync(`${configurationFile}.json`).toString())
    return this.wrap(configuration, obj)
  }
}

module.exports = new Handler()
module.exports.ValidationError = ValidationError

const i18n = require("i18n")

function responseSuccess(result, code = 200) {
  return {
    result: result || i18n.__("SUCCESS"), code
  }
}

function responseError(error, code = 500) {
  return {
    error: error || i18n.__("UNKNOWN_ERROR"), code
  }
}

module.exports = {
  responseSuccess,
  responseError
}

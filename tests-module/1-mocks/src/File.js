const { readFile } = require('fs/promises')
const { join } = require('path')

const { DEFAULT_ENCODING } = require('./constants/encoding.js')
const { ERRORS } = require('./constants/errors.js')
const { UNIX_LINE_BREAK, DEFAULT_OPTIONS } = require('./constants/file.js')

class File {
  static async csvToJson(filePath) {
    const fileContentString = await this.getFileContentString(filePath)

    const { valid, error } = this.isValid(fileContentString)

    if (!valid) {
      throw new Error(error)
    }

    return fileContentString
  }

  static async getFileContentString(filePath) {
    const absoluteFilePath = join(__dirname, filePath)

    return (await readFile(absoluteFilePath)).toString(DEFAULT_ENCODING)
  }

  static isValid(fileContentString, options = DEFAULT_OPTIONS) {
    const [headers, ...items] = fileContentString.split(UNIX_LINE_BREAK)

    const hasValidHeaders = headers === options.fields.join(',')

    if (!hasValidHeaders) {
      return {
        error: ERRORS.FILE_HEADERS_ERROR_MESSAGE,
        valid: false,
      }
    }

    const hasEmptyFile = items.length === 0;
    const hasValidItemsQuantity = items.length <= options.maxItemsWithoutHeaders;

    if (hasEmptyFile) {
      return {
        error: ERRORS.FILE_EMPTY_ERROR_MESSAGE,
        valid: false,
      }
    }

    if (!hasValidItemsQuantity) {
      return {
        error: ERRORS.FILE_ITEMS_QUANTITY_ERROR_MESSAGE,
        valid: false
      }
    }

    return {
      valid: true
    }
  }
}

module.exports = File
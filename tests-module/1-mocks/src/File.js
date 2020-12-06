const { readFile } = require('fs/promises');

const { DEFAULT_ENCODING } = require('./constants/encoding');
const { ERRORS } = require('./constants/errors');
const { UNIX_LINE_BREAK, DEFAULT_OPTIONS } = require('./constants/file');
const User = require('./User');

class File {
  static async csvToJson(filePath) {
    const fileContentString = await this.getFileContentString(filePath);

    const { valid, error } = this.isValid(fileContentString);

    if (!valid) {
      throw new Error(error);
    }

    const json = this.parseCsvToJson(fileContentString);

    return json;
  }

  static async getFileContentString(filePath) {
    return (await readFile(filePath)).toString(DEFAULT_ENCODING);
  }

  static isValid(fileContentString, options = DEFAULT_OPTIONS) {
    const [headers, ...items] = fileContentString.split(UNIX_LINE_BREAK);

    const hasValidHeaders = headers === options.fields.join(',');

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

  static parseCsvToJson(fileContentString) {
    const lines = fileContentString.split(UNIX_LINE_BREAK);

    const firstLine = lines.shift();

    const headerColumns = firstLine.split(',');

    const json = lines.map(line => {
      const lineColumns = line.split(','); 

      let item = {};

      for (const index in lineColumns) {
        item[headerColumns[index]] = lineColumns[index];
      }

      return new User(item);
    });

    return json;
  }
}

module.exports = File
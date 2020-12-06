const { rejects, deepStrictEqual } = require('assert');

const { ERRORS } = require('./src/constants/errors');
const File = require('./src/File');
const User = require('./src/User');
const threeItemsWithoutHeadersJson = require('./mocks/threeItemsWithoutHeader.json');

(async () => {
  {
    const filePath = './mocks/headersQuantity-invalid.csv';
    const rejectedError = new Error(ERRORS.FILE_HEADERS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejectedError);
  }
  {
    const filePath = './mocks/fourItemsWithoutHeaders-invalid.csv';
    const rejectedError = new Error(ERRORS.FILE_ITEMS_QUANTITY_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejectedError);
  }
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejectedError = new Error(ERRORS.FILE_EMPTY_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejectedError)
  }
  {
    const filePath = './mocks/threeItemsWithoutHeaders-valid.csv';
    const result = await File.csvToJson(filePath);
    const expectedResult = threeItemsWithoutHeadersJson.map(item => new User(item));

    deepStrictEqual(result, expectedResult);
  }
})()
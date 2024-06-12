const fs = require('fs').promises;
// const { encrypt } = require('./encryption.js');
const { decrypt } = require('./decryption.js');

const encodedFilePath = process.env.ENCODED_FILE_PATH;

async function readEncodedFile() {
  try {
    const encodedData = await fs.readFile(encodedFilePath, 'utf8');
    const decodedData = decrypt(encodedData);
    return JSON.parse(decodedData);
  } catch (error) {
    throw new Error(`Error reading encoded file: ${error.message}`);
  }
}

// async function writeEncodedFile(data) {
//   try {
//     const jsonData = JSON.stringify(data, null, 2);
//     const encodedData = encrypt(jsonData);
//     await fs.writeFile(encodedFilePath, encodedData, 'utf8');
//   } catch (error) {
//     throw new Error(`Error writing encoded file: ${error.message}`);
//   }
// }

module.exports = {
  readEncodedFile,
//   writeEncodedFile
};
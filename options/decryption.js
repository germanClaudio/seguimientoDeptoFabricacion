const crypto = require('crypto');
require('dotenv').config();

const ENCRYPTION_KEY=process.env.ENCRYPTION_KEY
const algorithm = 'aes-256-ctr';
const encryptionKey = Buffer.from(ENCRYPTION_KEY, 'hex');

// Función para descifrar datos
function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString('utf8');
}   

module.exports = {
  decrypt
}
require('dotenv').config();
const crypto = require('crypto');

// Load key and IV from environment variables
const keyBase64 = "V3JV0G3+PJgm0vfOsiAx9Fv5HyStNL+Y6BXJYkS4i0s=";
const ivBase64 = "PgrGaf/pU0BGV4Q9yHcO7w==";

// Debug output to verify environment variables
console.log('Key (Base64):', keyBase64);
console.log('IV (Base64):', ivBase64);

// Check if the environment variables are undefined
if (!keyBase64 || !ivBase64) {
  throw new Error('ENCRYPTION_KEY or ENCRYPTION_IV is not defined in the .env file');
}

const key = Buffer.from(keyBase64, 'base64');
const iv = Buffer.from(ivBase64, 'base64');

// Function to encrypt text
function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

// Function to decrypt text
function decrypt(encryptedText) {
  let encryptedData = Buffer.from(encryptedText, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Example usage
const text = 'Hello, World!';
console.log('Original Text:', text);

const encryptedText = encrypt(text);
console.log('Encrypted Text:', encryptedText);

const decryptedText = decrypt(encryptedText);
console.log('Decrypted Text:', decryptedText);

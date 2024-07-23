const crypto = require("crypto");
require("dotenv").config();

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'base64');

const decrypt = (encryptedText) => {
  let encryptedData = Buffer.from(encryptedText, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};



module.exports = decrypt;

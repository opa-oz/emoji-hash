/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const emoji = require('emoji-named-characters');
const shuffle = require('shuffle-array');

const FILE_PATH = 'src/generated/table.js';

(async () => {
  const t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const keys = Object.keys(emoji).filter((key) => !!emoji[key].character);
  const shuffledArray = shuffle(keys);

  const table = Array.from(t).reduce((acc, symbol, key) => {
    acc[key] = emoji[shuffledArray[key]].character;
    return acc;
  }, {});

  await new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '..', FILE_PATH),
      `/* eslint-disable prettier/prettier */\nmodule.exports = ${JSON.stringify(table)}`,
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
})()
  .then(() => console.log('Done'))
  .catch((e) => {
    throw e;
  });

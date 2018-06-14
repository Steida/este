// @flow
// https://github.com/motdotla/dotenv
import fs from 'fs';

// `yarn env dev` will copy `.env.dev` file to `.env` file.
const name = process.argv[process.argv.length - 1];

fs.copyFileSync(`.env.${name}`, '.env');

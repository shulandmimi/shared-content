import { Console } from 'console';
import fs from 'fs';
import path from 'path';

// @ts-ignore
const LOG_FILE = LOG_PATH || utools.getPath('temp', './log.txt');
fs.writeFileSync(LOG_FILE, '');

const log_stream = fs.createWriteStream(LOG_FILE, { flags: 'a+' });

process.stdout.pipe(log_stream);
process.stderr.pipe(log_stream);
// @ts-ignore
process.stdout.write = process.stderr.write = log_stream.write.bind(log_stream);

window.console = new Console(log_stream);

console.log(new Date().toLocaleString());

import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';

const hash = (command, state) => {
  const [pathToFile] = command.args;
  const pathToFileAbsolute = path.join(path.isAbsolute(pathToFile) ? pathToFile : path.join(state.currentDir, path.normalize(pathToFile)));
  const stream = createReadStream(pathToFileAbsolute);
  const hash = createHash('sha256');
  hash.setEncoding('hex');
  stream.on('end', () => {
    hash.end();
    console.log(hash.read());
    console.log(`You are currently in ${state.currentDir}`);
  });
  stream.pipe(hash);
};

export default hash;

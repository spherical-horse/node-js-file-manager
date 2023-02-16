import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { access } from 'fs/promises';
import path from 'path';

const compress = async (command, state) => {
  const [pathToFile] = command.args;
  const pathToFileAbsolute = path.join(path.isAbsolute(pathToFile) ? pathToFile : path.join(state.currentDir, path.normalize(pathToFile)));
  try {
    await access(pathToFileAbsolute);
    const readStream = createReadStream(pathToFileAbsolute);
    const compressStream = createBrotliCompress();
    const compressedPath = pathToFileAbsolute + '.br';
    const writeStream = createWriteStream(compressedPath);
    try {
      await pipeline(
        readStream,
        compressStream,
        writeStream,
      );
    } catch (err) {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  }
}

export default compress;

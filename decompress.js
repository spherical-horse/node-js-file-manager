import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { access } from 'fs/promises';
import path from 'path';

const deCompress = async (command, state) => {
  const [pathToFile] = command.args;
  const pathToFileAbsolute = path.join(path.isAbsolute(pathToFile) ? pathToFile : path.join(state.currentDir, path.normalize(pathToFile)));
  try {
    await access(pathToFileAbsolute);
    const readStream = createReadStream(pathToFileAbsolute);
    const compressStream = createBrotliDecompress();
    const deCompressedPath = pathToFileAbsolute.replace(/\.br$/, '');
    const writeStream = createWriteStream(deCompressedPath);
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

export default deCompress;
import { access } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';

const isAbsolutePath = (filePath) => {
  return path.isAbsolute(filePath);
}

const cd = async (command, state) => {
  const [dir] = command.args;
  const dirPath = path.join(state.currentDir, isAbsolutePath(dir) ? dir : path.normalize(dir));
  try {
    await access(dirPath);
    state.currentDir = dirPath;
  } catch (err) {
    process.stdout.write('Operation failed' + EOL);
  }
}

export default cd;

import { createReadStream } from 'fs';
import { appendFile, rename } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';

const cat = async (command, state) => {
  const [pathToFile] = command.args;
  const pathToFileAbsolute = path.join(path.isAbsolute(pathToFile) ? pathToFile : path.join(state.currentDir, path.normalize(pathToFile)));
  const stream = createReadStream(pathToFileAbsolute);

  stream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  stream.on('end', () => {
    process.stdout.write(`You are currently in ${state.currentDir}${EOL}`);
    stream.destroy();
  });
}

const add = async (command, state) => {
  const [pathToFile] = command.args;
  try {
    const pathToFileAbsolute = path.join(path.isAbsolute(pathToFile) ? pathToFile : path.join(state.currentDir, path.normalize(pathToFile)));
    await appendFile(pathToFileAbsolute, '');
  } catch (error) {
    process.stdout.write('Operation failed' + EOL);
  }

}

const rn = async (command, state) => {
  const [oldName, newName] = command.args;
  try {
    const oldPathAbsolute = path.join(path.isAbsolute(oldName) ? oldName : path.join(state.currentDir, path.normalize(oldName)));
    const newPathAbsolute = path.join(path.isAbsolute(newName) ? newName : path.join(state.currentDir, path.normalize(newName)));
    await rename(oldPathAbsolute, newPathAbsolute);
  } catch (error) {
    process.stdout.write('Operation failed' + EOL);
  }
}

export { cat, add, rn };

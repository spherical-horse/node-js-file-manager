import { readdir, stat } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';
import process from 'process';

const getResultString = async (result) => {
  let str = '';
  for (const item of result) {
    const isDirectoryPromise = await item.isDirectory;
    const isDirectory = await isDirectoryPromise.isDirectory();
    str += `${item.index + 1} | ${item.name} | ${isDirectory ? 'directory' : 'file'} ${EOL}`;
  }
  return str
}

const ls = async (state) => {
  const { currentDir } = state;
  const filesAndDirs = await readdir(currentDir);
  const res = filesAndDirs.reduce((acc, fileOrDir, idx) => {
    const stats = stat(path.join(currentDir, fileOrDir));
    acc.push({
      index: idx,
      name: fileOrDir,
      isDirectory: stats,
    });
    return acc;
  }, []);
  const result = await getResultString(res);
  return result;
}

export default ls;

import { EOL, homedir } from 'os';
import path from 'path';
import process from 'process';
import cd from './cd.js';
import ls from './ls.js';
import { cat, add, rn, copy, move, del } from './fileOperations.js';
import osOperations from './osOperations.js';
import hash from './hash.js';
import compress from './compress.js';

const getNameFromArgs = () => {
  const args = process.argv.slice(2);
  const [str] = args;
  const [, name] = str.split('=');
  return name;
};

const getGreeting = (name) => {
  return (`Welcome to the File Manager, ${name}!`);
};

const onStart = () => {
  process.stdout.write(getGreeting(state.userName) + EOL);
  process.stdout.write(`You are currently in ${state.currentDir}${EOL}`);
};

const getCommand = (text) => {
  return {
    command: text.split(' ')[0].replace(EOL, ''),
    args: text.split(' ').slice(1).map(arg => arg.replace(EOL, '')),
  };
}

const state = {
  currentDir: homedir(),
  rootDir: path.parse(homedir()).root,
  userName: getNameFromArgs(),
};

onStart();

process.stdin.on('data', async (data) => {
  const command = getCommand(data.toString());
  switch (command.command) {
    case 'up':
      state.currentDir = path.join(state.currentDir, '..');
      break;
    case 'cd':
      await cd(command, state);
      break;
    case 'ls':
      const out = await ls(state);
      process.stdout.write(out);
      break;
    case 'cat':
      await cat(command, state);
      break;
    case 'add':
      await add(command, state);
      break;
    case 'rn':
      await rn(command, state);
      break;
    case 'cp':
      await copy(command, state);
      break;
    case 'mv':
      await move(command, state);
      break;
    case 'rm':
      await del(command, state);
      break;
    case 'os':
      const out1 = osOperations(command);
      console.log(out1 ? out1 : 'Operation failed' + EOL);
      break;
    case 'hash':
      hash(command, state);
      break;
    case 'compress':
      await compress(command, state);
      break;
    default:
      console.log('default');
  }
  process.stdout.write(`You are currently in ${state.currentDir}${EOL}`);
});

process.on('SIGINT', () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Thank you for using File Manager, ${state.userName}, goodbye!` + EOL);
  process.exit(0);
});
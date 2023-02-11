import { EOL, homedir } from 'os';
import path from 'path';
import process from 'process';
import cd from './cd.js';

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
    default:
      console.log(command);
  }
  process.stdout.write(`You are currently in ${state.currentDir}${EOL}`);
});

process.on('SIGINT', () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Thank you for using File Manager, ${state.userName}, goodbye!` + EOL);
  process.exit(0);
});
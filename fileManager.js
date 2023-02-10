import { EOL, homedir } from 'os';
import path from 'path';
import process from 'process';
import { pipeline } from 'stream';

let userName;
let currentDir;
let rootDir;

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
  const name = getNameFromArgs();
  currentDir = homedir();
  rootDir = path.parse(currentDir).root;
  userName = name;
  process.stdout.write(getGreeting(name) + EOL);
};

const getCommand = (text) => {
  return {
    command: text.split(' ')[0].replace(EOL, ''),
    args: text.split(' ').slice(1).map(arg => arg.replace(EOL, '')),
  };
}

onStart();

process.stdin.on('data', (data) => {
  console.log(getCommand(data.toString()));
});

process.on('SIGINT', () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!` + EOL);
  process.exit(0);
});
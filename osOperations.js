import { EOL, cpus, homedir, userInfo, arch } from 'os';

const osOperations = (command) => {
  const arg = command.args[0].slice(2);
  switch (arg) {
    case 'EOL':
      return EOL;
    case 'cpus':
      return cpus();
    case 'homedir':
      return homedir();
    case 'username':
      const { username } = userInfo();
      return username;
    case 'architecture':
      return arch();
    default:
      return null;
  }
};

export default osOperations;

import { firstNames, surnames } from './names';

function getRandomFirstName(): string {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function getRandomSurname(): string {
  return surnames[Math.floor(Math.random() * surnames.length)];
}

function getRandomAge(min: number = 1, max: number = 99): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomFirstName, getRandomSurname, getRandomAge };


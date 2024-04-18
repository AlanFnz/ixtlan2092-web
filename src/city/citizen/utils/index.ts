import { firstNames, surnames } from './names';

function getRandomFirstName(): string {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

/**
 * Retrieves a random surname from the surnames array.
 * @returns a string representing a surname
 */
function getRandomSurname(): string {
  return surnames[Math.floor(Math.random() * surnames.length)];
}

export { getRandomFirstName, getRandomSurname };


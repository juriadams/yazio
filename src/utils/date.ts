/**
 * Utility function to parse a date object to a string in the format "YYYY-MM-DD".
 *
 * @param date - The date object to parse.
 *
 * @returns - The date as a string.
 */
export const parseDate = (date: Date): string =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

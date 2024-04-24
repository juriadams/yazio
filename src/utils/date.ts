/**
 * Utility function to parse a date object to a string in the format "YYYY-MM-DD".
 *
 * @param date - The date object to parse.
 *
 * @returns - The date as a string.
 */
export const parseDate = (input: Date | string): string => {
  const date = typeof input === "string" ? new Date(input) : input;

  return date.toISOString().split("T")[0];
};

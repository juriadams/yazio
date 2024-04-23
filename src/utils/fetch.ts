import { YAZIO_BASE_URL } from "@/utils/constants";

/**
 * Utility function to automatically fetch from the given base URL. If an
 * explicit URL is provided (string starting with `http`), it will be used.
 *
 * @param input - The URL or endpoint to fetch from.
 * @param init - The fetch options.
 *
 * @returns - Promise resolving the JSON data of the response body.
 */
export const fetchYazio = <T>(
  input: Parameters<typeof fetch>[0],
  init: Parameters<typeof fetch>[1]
) =>
  fetch(
    typeof input === "string" && !input.startsWith("http")
      ? `${YAZIO_BASE_URL}${input}`
      : input,
    init
  ).then((res) => {
    if (!res.ok)
      throw new Error(
        `Error fetching \`${input}\`. (${res.status} ${res.statusText})`
      );

    return res.json() as Promise<T>;
  });

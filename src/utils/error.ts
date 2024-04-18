interface YazioApiErrorDetails {
  details?: string;
}

export class YazioApiError extends Error {
  details?: string;

  constructor(message: string, details?: YazioApiErrorDetails) {
    console.error(details?.details);

    super(message);

    this.name = "YazioApiError";
    this.details = details?.details;
  }
}

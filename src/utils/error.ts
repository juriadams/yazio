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

interface YazioAuthErrorDetails {
  details?: string;
}

export class YazioAuthError extends Error {
  details?: string;

  constructor(message: string, details?: YazioAuthErrorDetails) {
    console.error(details?.details);

    super(message);

    this.name = "YazioAuthError";
    this.details = details?.details;
  }
}

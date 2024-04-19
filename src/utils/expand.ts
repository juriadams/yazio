export const expand = <T>(obj: Record<string, any>): T => {
  const result: Record<string, any> = {};

  function recurse(current: Record<string, any>, prefix: string = "") {
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        const value = current[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && value !== null) {
          recurse(value, newKey);
        } else {
          result[newKey] = value;
        }
      }
    }
  }

  recurse(obj);
  return result as T;
};

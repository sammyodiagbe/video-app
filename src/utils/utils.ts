export const encodeJson = (rawJson: any) => {
  return JSON.stringify(rawJson);
};

export const decodeJson = (encoded: string) => {
  return JSON.parse(encoded);
};

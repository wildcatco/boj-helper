export const serialize = (data: object) => {
  return JSON.parse(JSON.stringify(data));
};

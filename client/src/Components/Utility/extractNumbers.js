export function extractNumbers(string) {
  if (string !== null && string !== undefined) {
    let pureString = string.toString();
    return parseInt(pureString.replace(/[^0-9\.]/g, ""));
  } else return 0;
}

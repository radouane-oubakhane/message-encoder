import constants from "../constants";

export function vigenereCipherEncryption(
  plainText: string,
  key: string
): string {
  const keyLength = key.length;
  key = key.toLowerCase();

  let cipherText = "";
  let index = 0;

  for (const char of plainText) {
    if (char.match(/[a-z]/i)) {
      const offset = char === char.toUpperCase() ? 65 : 97;
      const temp =
        ((char.charCodeAt(0) -
          offset +
          (key.charCodeAt(index % keyLength) - 97)) %
          constants.ALPHABET_SIZE) +
        offset;
      cipherText += String.fromCharCode(temp);
      index += 1;
    } else {
      cipherText += char;
      index += 1;
    }
  }

  return cipherText;
}

export function vigenereCipherDecryption(
  cipherText: string,
  key: string
): string {
  const keyLength = key.length;
  key = key.toLowerCase();

  let plainText = "";
  let index = 0;

  for (const char of cipherText) {
    if (char.match(/[a-z]/i)) {
      const offset = char === char.toUpperCase() ? 65 : 97;
      const temp =
        ((char.charCodeAt(0) -
          offset -
          (key.charCodeAt(index % keyLength) - 97) +
          constants.ALPHABET_SIZE) %
          constants.ALPHABET_SIZE) +
        offset;
      plainText += String.fromCharCode(temp);
      index += 1;
    } else {
      plainText += char;
      index += 1;
    }
  }

  return plainText;
}

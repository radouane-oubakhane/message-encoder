function pgcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  return pgcd(b, a % b);
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1;
}

function isPrime(num: number): boolean { 
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function generateKeys(
  p: number,
  q: number
): {
  publicKey: { e: number; n: number };
  privateKey: { d: number; n: number };
} {
  if (!isPrime(p) || !isPrime(q)) {
    throw new Error("p et q doivent être des nombres premiers");
  }
  if (p === q) {
    throw new Error("p et q ne doivent pas être égaux");
  }
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = 2;
  while (e < phi) {
    if (pgcd(e, phi) === 1) {
      break;
    }
    e++;
  }
  const d = modInverse(e, phi);
  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
}

export function rsaEncryption(
  message: string,
  p_q: { p: number; q: number }
): string {
  const { publicKey } = generateKeys(p_q.p, p_q.q);
  const { e, n } = publicKey;

  const messageCodes = Array.from(message, (char) => char.charCodeAt(0));
  const encryptedCodes = messageCodes.map((code) => {
    const encryptedInt = BigInt(code) ** BigInt(e) % BigInt(n);
    return encryptedInt.toString();
  });

  return encryptedCodes.join(",");
}

export function rsaDecryption(
  encryptedMessage: string,
  p_q: { p: number; q: number }
): string {
  const { privateKey } = generateKeys(p_q.p, p_q.q);
  const { d, n } = privateKey;

  const encryptedCodes = encryptedMessage.split(",");
  const decryptedMessage = encryptedCodes
    .map((code) => {
      const decryptedInt = BigInt(code) ** BigInt(d) % BigInt(n);
      return String.fromCharCode(Number(decryptedInt.toString()));
    })
    .join("");

  return decryptedMessage;
}

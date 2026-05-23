function toBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function randomBytes(len) {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return arr;
}

export function isWebAuthnSupported() {
  return typeof window !== "undefined" && typeof window.PublicKeyCredential !== "undefined" && !!navigator.credentials;
}

export async function registerPlatformCredential() {
  if (!isWebAuthnSupported()) {
    throw new Error("WebAuthn tidak didukung di browser ini.");
  }

  const userId = randomBytes(16);
  const challenge = randomBytes(32);

  const cred = await navigator.credentials.create({
    publicKey: {
      challenge,
      rp: { name: "Naposo ORJ" },
      user: {
        id: userId,
        name: "pengurus",
        displayName: "Pengurus"
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required"
      },
      timeout: 60000,
      attestation: "none"
    }
  });

  if (!cred || !cred.rawId) {
    throw new Error("Gagal membuat credential.");
  }

  return toBase64Url(cred.rawId);
}

export async function authenticateWithCredentialId(credentialIdBase64Url) {
  if (!isWebAuthnSupported()) {
    throw new Error("WebAuthn tidak didukung di browser ini.");
  }
  if (!credentialIdBase64Url) {
    throw new Error("Sidik jari belum terdaftar.");
  }

  const allowId = fromBase64Url(credentialIdBase64Url);
  const challenge = randomBytes(32);

  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge,
      timeout: 60000,
      userVerification: "required",
      allowCredentials: [
        {
          type: "public-key",
          id: allowId
        }
      ]
    }
  });

  if (!assertion) {
    throw new Error("Verifikasi gagal.");
  }

  return true;
}


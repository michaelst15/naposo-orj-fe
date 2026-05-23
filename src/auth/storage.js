const AUTH_KEY = "naposo_orj_auth";
const CRED_KEY = "naposo_orj_webauthn_cred";
const ACTIVE_KEY = "naposo_orj_active_session";
const SESSION_ID_KEY = "naposo_orj_session_id";
const ACTIVE_TTL_MS = 1000 * 60 * 5;

function now() {
  return Date.now();
}

function getSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(now()) + Math.random();
    sessionStorage.setItem(SESSION_ID_KEY, id);
    return id;
  } catch {
    return "session";
  }
}

function getActiveSession() {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.id || !parsed.ts) return null;
    if (now() - parsed.ts > ACTIVE_TTL_MS) {
      localStorage.removeItem(ACTIVE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function setActiveSession(sessionId) {
  try {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify({ id: sessionId, ts: now() }));
  } catch {
    return;
  }
}

function clearActiveSessionIfOwned(sessionId) {
  try {
    const active = getActiveSession();
    if (active && active.id === sessionId) {
      localStorage.removeItem(ACTIVE_KEY);
    }
  } catch {
    return;
  }
}

export function canLoginThisSession() {
  const sessionId = getSessionId();
  const active = getActiveSession();
  if (!active) return true;
  return active.id === sessionId;
}

export function getIsAuthed() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function touchActiveSession() {
  try {
    const sessionId = getSessionId();
    const active = getActiveSession();
    if (!active) return;
    if (active.id !== sessionId) return;
    localStorage.setItem(ACTIVE_KEY, JSON.stringify({ id: sessionId, ts: now() }));
  } catch {
    return;
  }
}

export function setIsAuthed(value) {
  try {
    const sessionId = getSessionId();
    if (value) {
      setActiveSession(sessionId);
      sessionStorage.setItem(AUTH_KEY, "1");
      touchActiveSession();
      return;
    }
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    return;
  }
}

export function clearAuth() {
  try {
    const sessionId = getSessionId();
    sessionStorage.removeItem(AUTH_KEY);
    clearActiveSessionIfOwned(sessionId);
  } catch {
    return;
  }
}

export function getCredentialId() {
  try {
    return localStorage.getItem(CRED_KEY) || "";
  } catch {
    return "";
  }
}

export function setCredentialId(id) {
  try {
    localStorage.setItem(CRED_KEY, id);
  } catch {
    return;
  }
}

export function clearCredentialId() {
  try {
    localStorage.removeItem(CRED_KEY);
  } catch {
    return;
  }
}

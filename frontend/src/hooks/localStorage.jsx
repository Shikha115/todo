import { useEffect, useState } from "react";

export const setLocal = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new StorageEvent("storage", { key }));
  } catch {}
};

export const getLocal = (key, fallback = null) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const removeLocal = (key) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new StorageEvent("storage", { key }));
  } catch {}
};

export function useGetLocalStorage(key, initialValue) {
  const read = () => getLocal(key, initialValue);
  const [value, setValue] = useState(read);
  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key || e.key === key) setValue(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);
  return value;
}

export function useSetLocalStorage(key) {
  const set = (next) => setLocal(key, next);
  const remove = () => removeLocal(key);
  return { set, remove };
}

export function useLocalStorageState(key, initialValue) {
  const value = useGetLocalStorage(key, initialValue);
  const { set, remove } = useSetLocalStorage(key);
  return [value, set, remove];
}

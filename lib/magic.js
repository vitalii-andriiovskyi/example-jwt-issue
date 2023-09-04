import { Magic } from "magic-sdk";

// Create client-side Magic instance
const createMagic = (key) => typeof window != "undefined" && new Magic(key);

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);

export const checkIsLoggedInMagic = async (
  successFn = () => {},
  logoutFn = () => {}
) => {
  try {
    const isLoggedIn = await magic?.user?.isLoggedIn();
    if (isLoggedIn === false) {
      logoutFn();
    } else successFn();
    return isLoggedIn;
  } catch {}
};

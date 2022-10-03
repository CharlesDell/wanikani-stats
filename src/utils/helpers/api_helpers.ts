import { logEvent } from "firebase/analytics";
import { doc, getDoc } from "firebase/firestore";
import { Firebase } from "../../firebase/firebase";

export async function getToken(token?: string) {
  // TODO: this is not a secure place to store api tokens, but for development
  // purposes I will allow it to reduce calls to Firebase. migrate to Firebase
  // secrets
  token ??= window.localStorage.getItem("wk_token") ?? undefined;

  if (!token) {
    const app = Firebase.Instance;
    const docRef = doc(app.db, "users", `${app.auth.currentUser?.uid}`);
    const userDocument = (await getDoc(docRef)).data();
    if (!userDocument) {
      throw new Error("Error occured while accessing user data.");
    }
    token = userDocument.wk_token;
    window.localStorage.setItem("wk_token", token!);
  }

  return token!;
}

export function isKey<T>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

export function paramString(params: {}) {
  let result = "";

  let selectedParams: string[] = [];

  Object.keys(params).forEach((param) => {
    if (isKey(params, param)) {
      if (param === "flags") {
        selectedParams[selectedParams.length] = `${param}`;
        return;
      }
      selectedParams[selectedParams.length] = `${param}=${params[param]}`;
    }
  });

  if (selectedParams.length > 0) {
    result =
      "?" +
      selectedParams.reduce((prev, curr, i) =>
        i === 0 ? prev + curr : prev + "&" + curr
      );
  }

  return result;
}

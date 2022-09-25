import { Analytics, getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

export class Firebase {
  analytics: Analytics;
  auth: Auth;
  db: Firestore;

  private static _instance: Firebase;

  private constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDyZy2Duyj8yNxAusRvy9fYbDGJ9Heg9y8",
      authDomain: "wanikani-stats-bd63d.firebaseapp.com",
      projectId: "wanikani-stats-bd63d",
      storageBucket: "wanikani-stats-bd63d.appspot.com",
      messagingSenderId: "979953928757",
      appId: "1:979953928757:web:3c4c8671ee5642cf59bf7c",
      measurementId: "G-CZBGZZRLMK",
    };

    const app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(app);
    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }

  public static get Instance() {
    return (this._instance ??= new this());
  }
}

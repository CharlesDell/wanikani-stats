import { doc, DocumentData, Firestore, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import axios from "axios";
import { Firebase } from "../firebase/firebase";
import { logEvent } from "firebase/analytics";

const app = Firebase.Instance;

// TODO: Refactor
export const getAllReviewStatistics = async (
  db: Firestore,
  user: User | null,
  document?: DocumentData,
  url?: string
) => {
  logEvent(app.analytics, "get_all_review_statistics");
  const docRef = doc(db, "users", `${user?.uid}`);
  const userData = document ?? (await getDoc(docRef)).data();
  if (userData) {
    const res = await axios({
      headers: { Authorization: `Bearer ${userData.wk_token}` },
      method: "get",
      url: url ?? "https://api.wanikani.com/v2/review_statistics",
    });
    const stats = res.data;
    let data = stats.data;
    if (stats?.pages?.next_url) {
      data = [
        ...data,
        ...(await getAllReviewStatistics(
          db,
          user,
          userData,
          stats.pages.next_url
        )),
      ];
    }
    return data;
  }
};

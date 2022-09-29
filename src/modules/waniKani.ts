import { doc, getDoc } from "firebase/firestore";
import { Firebase } from "../firebase/firebase";
import { logEvent } from "firebase/analytics";
import axios from "axios";

import * as api from "./waniKani.d";

export async function getAllAssignments() {
  return await _internalGetAllAssignments();
}

const _internalGetAllAssignments = async (token?: string, url?: string) => {
  const app = Firebase.Instance;
  logEvent(app.analytics, "get_all_assignments");
  if (!token) {
    const docRef = doc(app.db, "users", `${app.auth.currentUser?.uid}`);
    const userDocument = (await getDoc(docRef)).data();
    if (!userDocument) {
      throw new Error("Error occured while accessing user data.");
    }
    token = userDocument.wk_token;
  }

  let { data } = await axios.get<api.AssignmentCollection>(
    url ?? "https://api.wanikani.com/v2/assignments",
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    }
  );

  let assignments = data?.data;
  if (data?.pages?.next_url) {
    const nextPage = await _internalGetAllAssignments(
      token,
      data.pages.next_url
    );
    assignments.concat(nextPage);
  }

  return assignments;
};

export async function getAllReviewStatistics() {
  return await _internalGetAllReviewStatistics();
}

const _internalGetAllReviewStatistics = async (
  token?: string,
  url?: string
) => {
  const app = Firebase.Instance;
  logEvent(app.analytics, "get_all_review_statistics");
  if (!token) {
    const docRef = doc(app.db, "users", `${app.auth.currentUser?.uid}`);
    const userDocument = (await getDoc(docRef)).data();
    if (!userDocument) {
      throw new Error("Error occured while accessing user data.");
    }
    token = userDocument.wk_token;
  }

  let { data } = await axios.get<api.ReviewStatisticsCollection>(
    url ?? "https://api.wanikani.com/v2/review_statistics",
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    }
  );

  let reviewStatistics = data?.data;
  if (data?.pages?.next_url) {
    const nextPage = await _internalGetAllReviewStatistics(
      token,
      data.pages.next_url
    );
    reviewStatistics.concat(nextPage);
  }

  return reviewStatistics;
};

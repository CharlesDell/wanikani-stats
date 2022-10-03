import { createResource, Resource } from "solid-js";
import {
  AssignmentResource,
  ReviewStatisticResource,
} from "../../modules/waniKani.d";
import {
  getAllAssignments,
  getAllReviewStatistics,
} from "../../modules/waniKani";
import { Calendar } from "../tools/calendar";
import * as d3 from "d3";
import { Firebase } from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export interface DashboardData {
  lessonsCalendar: SVGSVGElement | null;
  reviewsCalendar: SVGSVGElement | null;
}

export function dashboardData(): Resource<DashboardData | undefined> {
  console.log("DashboardData called");
  const [resource, { mutate, refetch }] = createResource(_dashboardDataFetcher);
  return resource;
}

async function _dashboardDataFetcher(
  source: boolean,
  info: { value: DashboardData | undefined; refetching: boolean }
): Promise<DashboardData> {
  const app = Firebase.Instance;
  const docRef = doc(app.db, "users", `${app.auth.currentUser?.uid}`);
  const userDocument = (await getDoc(docRef)).data();

  let now = new Date();
  let start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  // Lessons
  // console.log(userDocument?.dashboard_lessons?.last_updated);
  let assignmentResources;
  if (
    Math.abs(userDocument?.dashboard_lessons?.last_updated - now.getTime()) <=
    86400000
  ) {
    console.log("got from firestore");
    assignmentResources = userDocument!.dashboard_lessons.data;
  } else {
    console.log("got from api");
    assignmentResources = await getAllAssignments({
      available_after: start.toISOString(),
    });
    await updateDoc(docRef, {
      dashboard_lessons: {
        last_updated: now.getTime(),
        data: assignmentResources,
      },
    });
    console.log("doc updated");
  }

  let data = processAssignmentDates(assignmentResources, now, start);
  const lessonsCalendar = Calendar(data, {
    colors: d3.interpolateRgb.gamma(3.3)(
      "rgb(252, 228, 244)",
      "rgb(255, 0, 170)"
    ),
  });

  // Reviews
  // console.log(userDocument?.review_lessons?.last_updated);
  let reviewResources;
  if (
    Math.abs(userDocument?.review_lessons?.last_updated - now.getTime()) <=
    86400000
  ) {
    console.log("got from firestore");
    reviewResources = userDocument!.review_lessons.data;
  } else {
    console.log("got from api");
    reviewResources = await getAllReviewStatistics({
      updated_after: start.toISOString(),
    });
    await updateDoc(docRef, {
      review_lessons: {
        last_updated: now.getTime(),
        data: reviewResources,
      },
    });
    console.log("doc updated");
  }

  data = processReviewDates(reviewResources, now, start);
  const reviewsCalendar = Calendar(data, {
    colors: d3.interpolateRgb.gamma(3.3)(
      "rgb(225, 245, 255)",
      "rgb(0, 170, 255)"
    ),
  });

  return { lessonsCalendar, reviewsCalendar };
}

const sameDate = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
};

function dateString(date: Date): string {
  return "" + date.getDay() + date.getMonth() + date.getFullYear();
}

function processAssignmentDates(
  resources: [AssignmentResource],
  now: Date,
  start: Date
) {
  const dates: Date[] = [];
  for (const resource of resources) {
    if (
      resource.data.passed_at &&
      new Date(resource.data.passed_at).getTime() >= start.getTime()
    ) {
      dates.push(new Date(resource.data.passed_at));
    }
  }

  const dateFreq: Map<string, number> = new Map();
  let i = 0;
  while (i < dates.length) {
    let j;
    for (j = 0; j < dates.length; j++) {
      if (!sameDate(dates[i], dates[i + j])) {
        dateFreq.set(dateString(dates[i]), j);
        break;
      }
      if (i + j === dates.length - 1) {
        dateFreq.set(dateString(dates[i]), j + 1);
        break;
      }
    }
    i += j || 1;
  }

  const data: [Date, number][] = [];

  for (let d = new Date(start); d < now; d.setDate(d.getDate() + 1)) {
    const copy = new Date(d);
    data.push([
      copy,
      dateFreq.get(dateString(copy)) ??
        (Math.random() > 0.8 ? Math.round(Math.random() * 100) : 0),
    ]);
  }

  return data;
}

function processReviewDates(
  resources: [ReviewStatisticResource],
  now: Date,
  start: Date
) {
  const dates: Date[] = [];
  for (const resource of resources) {
    if (
      resource.data.created_at &&
      new Date(resource.data.created_at).getTime() >= start.getTime()
    ) {
      dates.push(new Date(resource.data.created_at));
    }
  }

  const dateFreq: Map<string, number> = new Map();
  let i = 0;
  while (i < dates.length) {
    let j;
    for (j = 0; j < dates.length; j++) {
      if (!sameDate(dates[i], dates[i + j])) {
        dateFreq.set(dateString(dates[i]), j);
        break;
      }
      if (i + j === dates.length - 1) {
        dateFreq.set(dateString(dates[i]), j + 1);
        break;
      }
    }
    i += j || 1;
  }

  const data: [Date, number][] = [];

  for (let d = new Date(start); d < now; d.setDate(d.getDate() + 1)) {
    const copy = new Date(d);
    data.push([
      copy,
      dateFreq.get(dateString(copy)) ??
        (Math.random() > 0.8 ? Math.round(Math.random() * 100) : 0),
    ]);
  }

  return data;
}

import { json } from "d3";
import { createResource, Resource } from "solid-js";
import { getAllAssignments } from "../../modules/waniKani";
import { Calendar } from "../tools/calendar";

export interface DashboardData {
  calendar: SVGSVGElement | null;
}

export function dashboardData(): Resource<DashboardData | undefined> {
  console.log("DashboardData called");
  const [data] = createResource(_dashboardDataFetcher);
  return data;
}

async function _dashboardDataFetcher(
  source: boolean,
  info: { value: DashboardData | undefined; refetching: boolean }
): Promise<DashboardData> {
  // return {};
  let assignmentResources = await getAllAssignments();

  const dates: Date[] = [];
  for (const resource of assignmentResources) {
    if (resource.data.passed_at) {
      dates.push(new Date(resource.data.passed_at));
    }
  }

  // [1, 1, 2, 2, 3], [1, 1]
  //              ij
  // [[1, 2],[2, 2],[]]
  const data: [Date, number][] = [];
  let i = 0;
  while (i < dates.length) {
    let j;
    for (j = 0; j < dates.length; j++) {
      if (!sameDate(dates[i], dates[i + j])) {
        data.push([dates[i], j]);
        break;
      }
      if (i + j === dates.length - 1) {
        data.push([dates[i], j + 1]);
        break;
      }
    }
    i += j || 1;
  }

  const calendar = Calendar(data, {});
  console.log(typeof calendar);
  console.log(calendar);

  return { calendar };
}

// if sameDate
const sameDate = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA.getDay() === dateB.getDay() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
};

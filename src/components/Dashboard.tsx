import { useRouteData } from "@solidjs/router";
import { Component, Resource } from "solid-js";
import { DashboardData, dashboardData } from "../utils/data/dashboardData";

import lesson_header_waves from "../assets/lesson_header_waves.svg";
import review_header_waves from "../assets/review_header_waves.svg";

const Dashboard: Component = () => {
  const data = useRouteData<typeof dashboardData>();

  // bg-green-500
  return (
    <div class="h-full flex flex-col items-center">
      <CalendarHeatmap data={data} type={CalendarType.lessons} />
      <CalendarHeatmap data={data} type={CalendarType.reviews} />
    </div>
  );
};

export default Dashboard;

enum CalendarType {
  lessons,
  reviews,
}

const CalendarHeatmap: Component<{
  data: Resource<DashboardData | undefined>;
  type: CalendarType;
}> = ({ data, type }) => {
  return (
    <div class="w-fit h-fit my-5 bg-white drop-shadow rounded">
      <div
        class={`flex flex-row w-full h-content p-1 text-white text-lg font-bold rounded-t ${
          type === CalendarType.lessons ? "bg-pink-400" : "bg-blue-500"
        }`}
      >
        {type === CalendarType.lessons ? "Lessons" : "Reviews"}
        <div
          class={`w-fit grow ${
            type === CalendarType.lessons ? "bg-pink-400" : "bg-blue-500"
          }`}
        ></div>
      </div>
      <img
        src={
          type === CalendarType.lessons
            ? lesson_header_waves
            : review_header_waves
        }
        class="w-full bg-no-repeat bg-center bg-cover object-full"
      />
      <div class="w-fit ">
        {type === CalendarType.lessons
          ? data()?.lessonsCalendar
          : data()?.reviewsCalendar}
      </div>
    </div>
  );
};

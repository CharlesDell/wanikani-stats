import { useRouteData } from "@solidjs/router";
import { Component } from "solid-js";
import { dashboardData } from "../utils/data/dashboardData";

const Dashboard: Component = () => {
  const data = useRouteData<typeof dashboardData>();
  console.log("change");
  // bg-green-500
  return <div class="h-96">{data()?.calendar}</div>;
};

export default Dashboard;

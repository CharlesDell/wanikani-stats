import { useRouteData } from "@solidjs/router";
import { Component } from "solid-js";
import { dashboardData } from "../utils/data/dashboardData";

const Dashboard: Component = () => {
  const data = useRouteData<typeof dashboardData>();

  return <div class="bg-green-500 h-96">{data()?.calendar}</div>;
};

export default Dashboard;

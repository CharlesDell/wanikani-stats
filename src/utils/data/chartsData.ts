import { createResource, Resource } from "solid-js";

export type Charts = {};

export function ChartsData(): Resource<Charts | undefined> {
  console.log("ChartsData called");
  const [data] = createResource(_chartsDataFetcher);
  return data;
}

async function _chartsDataFetcher(): Promise<Charts> {
  return {};
}

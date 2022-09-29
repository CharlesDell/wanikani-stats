import { createResource, Resource } from "solid-js";

export type Progress = {};

export function ProgressData(): Resource<Progress | undefined> {
  console.log("ProgressData called");
  const [data] = createResource(_progressDataFetcher);
  return data;
}

async function _progressDataFetcher(): Promise<Progress> {
  return {};
}

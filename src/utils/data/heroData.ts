import { createResource, Resource } from "solid-js";

export type Hero = {};

export function HeroData(): Resource<Hero | undefined> {
  console.log("HeroData called");
  const [data] = createResource(_heroDataFetcher);
  return data;
}

async function _heroDataFetcher(): Promise<Hero> {
  return {};
}

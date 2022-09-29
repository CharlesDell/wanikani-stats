import { createResource, Resource } from "solid-js";

export type Settings = {};

export function SettingsData(): Resource<Settings | undefined> {
  console.log("SettingsData called");
  const [data] = createResource(_settingsDataFetcher);
  return data;
}

async function _settingsDataFetcher(): Promise<Settings> {
  return {};
}

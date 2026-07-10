import { createLeadFlow } from "./leadflow";
export const leadflow = createLeadFlow({
  apiBaseUrl: "https://track.askvalarrmathi.com",
  projectSlug: "dr-valar",
  cookieDomain: ".askvalarrmathi.com",
});
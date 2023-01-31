import { ReleaseDate } from "moviedb-promise";

export function isolateUS(
  releaseData:
    | {
        iso_3166_1?: string | undefined;
        release_dates?: ReleaseDate[] | undefined;
      }[]
    | undefined
) {
  if (releaseData) {
    return releaseData.find((data) => data.iso_3166_1 === "US");
  } else {
    return undefined;
  }
}

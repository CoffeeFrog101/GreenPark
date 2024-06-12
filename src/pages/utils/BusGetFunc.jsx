const buildBustopsApiUrl = (stopCodes) => {
  const baseUrl =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Bus_Stops/FeatureServer/13/query";
  const params = new URLSearchParams({
    where: `Stop_Code IN ('${stopCodes.join("','")}')`,
    outFields: "*",
    returnGeometry: "true",
    f: "pjson",
  });
  return `${baseUrl}?${params.toString()}`;
};

const busStopCodes = {
  phoenix: [
    "CI12",
    "CI13",
    "CI14",
    "CI15",
    "BA31",
    "BA32",
    "BA33",
    "BA34",
    "BA36",
    "BA37",
    "BA38",
    "FF03",
    "FF04",
    "FF05",
    "FO07",
    "FO08",
    "FO09",
    "FO10",
    "J1",
  ],
  "moor bridge": [
    "BU30",
    "BU31",
    "BU34",
    "BU35",
    "BU06",
    "BU45",
    "BU46",
    "BU47",
    "BU49",
    "AS01",
    "AS02",
    "AS04",
    "AS57",
    "AS58",
    "AS59",
    "AS60",
    "CI02",
    "CI03",
    "WM13",
    "WM14",
    "WM15",
    "WM16",
    "WM17",
    "RA24",
    "RA25",
    "RA26",
    "RA27",
    "RA28",
    "RA20",
    "RA21",
    "RA22",
    "RA23",
    "CC11",
    "Y5",
    "Y7",
  ],
  forest: ["FO07", "FO08", "FO09", "FO10", "J1", "G3", "P2"],
  queens: [
    "LI20",
    "ME10",
    "ME26",
    "ME27",
    "ME28",
    "ME29",
    "ME30",
    "ME31",
    "ME32",
    "S6",
    "M5",
    "B5",
  ],
  wilkinson: [
    "WM17",
    "RA24",
    "RA25",
    "RA26",
    "RA27",
    "RA28",
    "RA20",
    "RA21",
    "RA22",
    "RA23",
    "CC11",
    "Y5",
    "Y7",
    "M4",
  ],
};

export const getBusStopsApiUrl = (term) => {
  const lowerTerm = term.toLowerCase();
  for (const key in busStopCodes) {
    if (lowerTerm.includes(key)) {
      return buildBustopsApiUrl(busStopCodes[key]);
    }
  }
  return null;
};

//1610, 913,184,795,1313,487,1511,732,88,546,923

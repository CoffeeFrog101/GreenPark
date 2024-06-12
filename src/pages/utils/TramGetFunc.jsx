const buildTramStopsApiUrl = (objectIds) => {
  const baseUrl =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query";
  const params = new URLSearchParams({
    where: "1=1",
    objectIds: objectIds.join(","),
    outFields: "*",
    returnGeometry: "true",
    f: "pjson",
  });
  return `${baseUrl}?${params.toString()}`;
};

const tramStopObjectIds = {
  phoenix: [34, 61, 83, 6, 71, 4, 45, 47, 14, 16, 60, 57, 26],
  hucknall: [9, 44, 8, 13, 71, 14, 4, 45, 16, 69, 82, 26],
  forest: [37, 60, 82, 26],
  queens: [28, 52, 77, 10, 79, 7, 26],
  wilkinson: [71, 4, 45, 47, 14, 16, 60, 57, 26],
  "moor bridge": [78, 44, 61, 83, 6, 71, 4, 45, 47, 14, 16, 60, 57, 26],
};

export const getTramStopsApiUrl = (term) => {
  const lowerTerm = term.toLowerCase();
  for (const key in tramStopObjectIds) {
    if (lowerTerm.includes(key)) {
      return buildTramStopsApiUrl(tramStopObjectIds[key]);
    }
  }
  return null;
};

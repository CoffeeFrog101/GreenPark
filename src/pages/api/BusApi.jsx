const fetchBusStops = async (API) => {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    return responseData.features.map((mapper) => {
      const Stop_Name = mapper.attributes.Stop_Name;
      const Stop_Code = mapper.attributes.Stop_Code;
      const latitude = mapper.attributes.Long;
      const longitude = mapper.attributes.Lat;
      const position = [latitude, longitude];
      return {
        Id: mapper.attributes.OBJECTID,
        StopName: Stop_Name,
        StopCode: Stop_Code,
        position: position,
      };
    });
  } catch (error) {
    console.error("Error fetching tram stops:", error);
    return [];
  }
};

export default fetchBusStops;

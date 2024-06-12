const fetchTramStops = async (API) => {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    return responseData.features.map((mapper) => {
      const Stop_Name = mapper.attributes.Stop_Name;
      const latitude = mapper.attributes.Long;
      const longitude = mapper.attributes.Lat;
      const position = [latitude, longitude];
      return {
        Id: mapper.attributes.OBJECTID,
        StopName: Stop_Name,
        position: position,
      };
    });
  } catch (error) {
    console.error("Error fetching tram stops:", error);
    return [];
  }
};

export default fetchTramStops;

//Phonix park Json
//34,61,83,6,71,4,45,47,14,16,60,57,26

//Forest park
//

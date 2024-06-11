const fetchData = async (API) => {
  const response = await fetch(API);
  const responseData = await response.json();
  let displayData;
  displayData = responseData.carParks.carPark
    .map(function (mapper) {
      const parkRide =
        mapper.definition.parkingRecord.parkingRecord.parkingName.values.value[
          "#text"
        ];
      const numOfSpace =
        mapper.definition.parkingRecord.parkingRecord.parkingNumberOfSpaces;
      const numOfOccupiedSpaces =
        mapper.status.parkingRecord.parkingRecordStatus.parkingOccupancy
          .parkingNumberOfOccupiedSpaces;
      const status =
        mapper.status.parkingRecord.parkingRecordStatus
          .parkingSiteOpeningStatus;
      const position = [
        mapper.definition.parkingRecord.parkingRecord.parkingLocation
          .locationForDisplay["latitude"],
        mapper.definition.parkingRecord.parkingRecord.parkingLocation
          .locationForDisplay["longitude"],
      ];

      if (parkRide.includes("Park and Ride")) {
        return {
          id: mapper.id,
          name: parkRide,
          ParkingSpots: numOfSpace - numOfOccupiedSpaces,
          status: status,
          position: position,
        };
      }
      return null;
    })
    .filter(Boolean);
  return displayData;
};
export default fetchData;

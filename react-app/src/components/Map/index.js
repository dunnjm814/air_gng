import React, {useState} from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map() {

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [map, setMap] = useState();

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: lat || -3.745,
    lng: lng || -38.523,
  };


  // aircraftArray.forEach((aircraft) => {
  //   aircraft.lng = Number(aircraft.lng);
  //   aircraft.lat = Number(aircraft.lat);
  // });

  function handleMapLoad(currentMap) {
    setMap(currentMap);
  }

  function handleBoundsChanged() {
    const bounds = map.getBounds();
    const center = bounds.getCenter();

    setLat(center.lat());
    setLng(center.lng());
    // let shownAircraft = aircraftArray.filter((aircraft) =>
    //   bounds.contains(aircraft)
    // );
    // setAirServiceInWindow(shownAircraft);
  }
  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={handleMapLoad}
          onDragEnd={handleBoundsChanged}
          onClick={handleBoundsChanged}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;

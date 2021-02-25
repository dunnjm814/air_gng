import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getAllBiz } from "../../store/aircraft";




function Map() {
  const dispatch = useDispatch();
  const aircraft = useSelector( (state) => {
    return state.biz
  });

  const servicesArray = Object.values(aircraft)

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [map, setMap] = useState();
  console.log("asdasdasd", map)

    useEffect(() => {
      dispatch(getAllBiz());
    }, [dispatch, map]);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lng: lng || -114.34576,
    lat: lat || 34.81723,
  };


  // aircraftArray.forEach((aircraft) => {
  //   aircraft.lng = Number(aircraft.lng);
  //   aircraft.lat = Number(aircraft.lat);
  // });

  function handleMapLoad(currentMap) {
    setMap(currentMap);
  }

  let shownBiz;

  function handleBoundsChanged() {
    const bounds = map.getBounds();
    const center = bounds.getCenter();
    console.log("####map", map);
    console.log("servicesArray", servicesArray)
    setLat(center.lat());
    setLng(center.lng());
    shownBiz = servicesArray.filter((service) =>
      (bounds.contains({lat: service.lat, lng: service.lng}))
    );
    // setAirServiceInWindow(shownAircraft);
    console.log(shownBiz)
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
          {shownBiz && shownBiz.map((service) => {
            return <Marker id={service.id}
              className={`marker-${aircraft}`}
              key={service.id}
              position={{
                lat: service.lat,
                lng: service.lng
              }}
              title={`${service.business_name}`}
              // icon={service.biz_image}
              />;
          })}

        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;

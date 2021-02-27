import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { getAllBiz } from "../../store/aircraft";
import logo from "../../img/airbnb-logo.png"
import './map.css'


function Map() {
  const dispatch = useDispatch();
  const aircraft = useSelector( (state) => {
    return state.biz
  });
  const search = useSelector((state) => state.location.location)
  console.log('from search object', search)

  const servicesArray = Object.values(aircraft)

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [map, setMap] = useState();
  const [shownBiz, setBiz] = useState([]);
  const [selected, setSelected] = useState(null)

    useEffect(() => {
      dispatch(getAllBiz());
    }, [dispatch, map]);

  const containerStyle = {
    width: "50vw",
    height: "100vh",
    marginRight: "auto"
  };

  const center = {
    lat: lat || 34.81723,
    lng: lng || -114.34576,
  };

  function handleMapLoad(currentMap) {
    setMap(currentMap);
  }

  function handleBoundsChanged() {
    const bounds = map.getBounds();
    const center = bounds.getCenter();
    setLat(center.lat());
    setLng(center.lng());

    setBiz(servicesArray.filter((service) =>
      (bounds.contains({lat: service.lat, lng: service.lng}))
    ));
  }
  const options = {
    disableDefaultUI: true,
    zoomControl:true
  }
  return (
    <div className={"maps-biz-container"}>
      <div className={"split right"}>
          <GoogleMap
            className={"centered"}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={handleMapLoad}
            onDragEnd={handleBoundsChanged}
            onClick={handleBoundsChanged}
            options={options}
          >
            {shownBiz &&
              shownBiz.map((service) => {
                return (
                  <Marker
                    id={service.id}
                    className={`marker-${aircraft}`}
                    key={service.id}
                    position={{
                      lat: service.lat,
                      lng: service.lng,
                    }}
                    title={`${service.business_name}`}
                    icon={{
                      url: logo,
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                    onClick={() => {
                      setSelected(service);
                    }}
                  />
                );
              })}
            ;
            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h3>{selected.business_name}</h3>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={selected.biz_image}
                  />
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
      </div>
      <div className={"split left"}>
        <div className={"biz-container"}>
            {shownBiz.map((service) => (
              <div key={service.id} className={"service-card"}>
                <img className={'biz-image'} key={`${service.id}-img`} src={service.biz_image}/>
                <div className={"biz-info"}>
                  <h1>{service.business_name}</h1>
                  <h3>Calander component here</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Map;

import React, {useEffect, useState, useRef, useCallback} from "react";
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
  const searchRef = useRef(useSelector((state) => state.location.location));
  // searchRef =
  console.log('from search object', searchRef, searchRef.aircraft)

  const servicesArray = Object.values(aircraft)

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [map, setMap] = useState();
  const [shownBiz, setBiz] = useState([]);
  const [filterBiz, setFilterBiz] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (searchRef) {
      const { lat } = searchRef.location.lat
      const { lng } = searchRef.location.lng
      handleMapLoad()
      setLat(lat)
      setLng(lng)
      handleBoundsChanged()
    }
  },[searchRef])
  useEffect(() => {
    dispatch(getAllBiz());
  }, [dispatch, map]);

  const aircraftRef = useRef()

  useEffect(() => {
    if (!searchRef) {
      return
    } else {
      aircraftRef.current = searchRef.aircraft;
    }
    console.log("aircraftRef", aircraftRef)
    const filterAircraft = (array) => {
      if (!searchRef.aircraft) return array;
      const filteredService = array.filter((biz) => biz === aircraftRef);
      console.log("filter", filteredService);
      setFilterBiz(filteredService);
      return;
    }

  },[searchRef])

  const containerStyle = {
    width: "50vw",
    height: "100vh",
    marginRight: "auto"
  };

  const center = {
    lat: lat || 34.81723,
    lng: lng || -114.34576,
  };

  const handleMapLoad = useCallback((currentMap)=> {
    setMap(currentMap);
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    map.panTo({ lat, lng })
    map.setZoom(12);
    setLat(lat)
    setLng(lng)
    handleBoundsChanged()
  }, [])

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
                    onClick={
                      (() => {
                        setSelected(service);
                        panTo({
                          lat: service.lat,
                          lng: service.lng,
                        });
                      })
                    }
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

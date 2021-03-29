import React, {useEffect, useState, useRef, useCallback} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { getAllBiz } from "../../store/aircraft";
import logo from "../../img/sunrise-balloon.png"
import './map.css'


function Map() {
  const dispatch = useDispatch();
  const aircraft = useSelector( (state) => {
    return state.biz
  });
  const searchRef = useSelector((state) => state.location.location)

  const servicesArray = Object.values(aircraft)

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [map, setMap] = useState();
  const [zoom, clickZoom] = useState(10);
  const [shownBiz, setBiz] = useState([]);
  const [filterBiz, setFilterBiz] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (searchRef && (searchRef.location !== null)) {

      setLat(searchRef.location.lat)
      setLng(searchRef.location.lng)
      handleMapLoad(map)

      if (map !== undefined) {
        panTo({lat, lng})

      }
    } else {
      handleMapLoad(map)
    }
  }, [searchRef])

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
  const mapRef = useRef()
  const handleMapLoad = useCallback((currentMap) => {
    setMap(currentMap);
    mapRef.current = currentMap

  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14);
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

  useEffect(() => {
    if (selected !== null) {
      setLat(selected.lat);
      setLng(selected.lng)
      handleMapLoad(map)
    }
  }, [selected])

  return (
    <div className={"maps-biz-container"}>
      <div className={"split right"}>
        <GoogleMap
            id='map'
            className={"centered"}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
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
                      scaledSize: new window.google.maps.Size(30, 40),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                    onClick={(() => {
                      setSelected(service)
                      clickZoom(14)
                    })
                    }
                  />
                );
              })}
            ;
            {selected ? (
              <NavLink to={`/aircrafts/${selected.id}`}>
                <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div className="info-card">
                    <h3>{selected.business_name}</h3>
                    <img
                      style={{ width: "auto", height: "50px" }}
                      src={selected.biz_image}
                    />
                  </div>
                </InfoWindow>
              </NavLink>
            ) : null}
          </GoogleMap>
      </div>
      <div className={"split left"}>
        <div className={"biz-container"}>
            {shownBiz.map((service) => (
              <NavLink key={service.id} to={`/aircrafts/${service.id}`}>
                <div className={"service-card"}>
                  <img className={'biz-image'} key={`${service.id}-img`} src={service.biz_image}/>
                  <div className={"biz-info"}>
                    <h1>{service.business_name}</h1>
                    <h3>Calander component here</h3>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Map;

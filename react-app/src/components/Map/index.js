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
  const datesearchBiz = useSelector(state => Object.values(state.booking.datesearch))
  const mapRef = useRef()

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [map, setMap] = useState();
  const [zoom, clickZoom] = useState(10);
  const [shownBiz, setBiz] = useState([
    {
      address: "11934 N Russell Rd",
      aircraft: "HangGlider",
      biz_image:
        "https://s3-media0.fl.yelpcdn.com/bphoto/nJDQEdE6lrfB13Dlamq5tA/o.jpg",
      business_name: "Sonora Wings Tandem Hang Gliding",
      city: "Maricopa",
      description:
        "We specialize in introducing people to hang gliding. If you would like to experience a tandem hang gliding flight or learn to fly a hang glider, we can help you. ",
      id: 1,
      lat: 32.98831,
      lng: -111.9137,
      phone_number: "800-555-1212",
      state: "AZ",
      zip_code: 85138,
    },
  ]);
  const [filterBiz, setFilterBiz] = useState([])
  const [selected, setSelected] = useState(null)
  const [airCraftType, setAircraftType] = useState('')
  const [filterDate, setFilterDate] = useState([])

  const containerStyle = {
    width: "50vw",
    height: "100vh",
    marginRight: "auto"
  };
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  const center = {
    lat: lat || 35.199167,
    lng: lng || -111.631111,
  };

  useEffect(() => {
    dispatch(getAllBiz());
  }, [dispatch]);

  useEffect(() => {
    if (map) {
      const bounds = mapRef.current.getBounds();
      setBiz(
        servicesArray.filter((service) =>
          bounds.contains({ lat: service.lat, lng: service.lng })
        )
      );
    }
  }, [map]);

  const handleMapLoad = useCallback((currentMap) => {
    setMap(currentMap);
    mapRef.current = currentMap;
  }, []);


  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  function handleBoundsChanged() {
    const bounds = map.getBounds();
    const center = bounds.getCenter();
    setLat(center.lat());
    setLng(center.lng());

    let temp = servicesArray.filter((service) =>
      bounds.contains({ lat: service.lat, lng: service.lng })
    )
    let temp2;
    if (searchRef) {
      //if aircraft search provided and no services match search
      if(searchRef.aircraft && !searchRef.arrayId.length) {
      setAircraftType(searchRef.aircraft);
      temp2 = temp.filter((service) => {
        return service.aircraft === airCraftType
      })
    }

    //if no aircraft search
      if (searchRef.idArray.length) {
        setFilterDate(searchRef.idArray)
        temp2 = temp.filter((service) => {
          return !filterDate.includes(service.id)
        })
      }

    }
    setBiz(temp2);

  }


  useEffect(() => {
    if (searchRef && searchRef.location !== null) {
      setLat(searchRef.location.lat);
      setLng(searchRef.location.lng);
      handleMapLoad(map);

      if (map !== undefined) {
        panTo({ lat, lng });
      }
    } else {
      handleMapLoad(map);
    }
    console.log(searchRef);
  }, [searchRef]);

  useEffect(() => {
    if (selected !== null) {
      setLat(selected.lat);
      setLng(selected.lng);
      handleMapLoad(map);
    }
  }, [selected, handleMapLoad, map]);

  return (
    <div className={"maps-biz-container"}>
      <div className={"split right"}>
        <GoogleMap
          id="map"
          className={"centered"}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={handleMapLoad}
          onDragEnd={handleBoundsChanged}
          onClick={handleBoundsChanged}
          // onZoomChanged={handleBoundsChanged}
          options={options}
        >
          {shownBiz.length > 0 &&
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
                  onClick={() => {
                    setSelected(service);
                    clickZoom(14);
                  }}
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
                    alt="biz"
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
                <img
                  alt={`${service.id}-service card`}
                  className={"biz-image"}
                  key={`${service.id}-img`}
                  src={service.biz_image}
                />
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

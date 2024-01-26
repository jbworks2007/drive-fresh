import React, { useEffect, useState, useRef } from "react";
import ImagesPath from "./Imports";
import stores_data from "./stores.json";
import toilet_image from "../asset/images/toilet.png";

export function DetailSection(props) {
  console.log("Props ---", props);
  let map;
  let infoWindow;
  const google = (window.google = window.google ? window.google : {});
  const myContainer = useRef(null);

  const storid = props.storid ? props.storid : "0";
  //const storid = "1";
  console.log("store ID--->>", storid);

  const [image1, setimage1] = useState(null);
  const mapStyle = [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
        {
          lightness: 33,
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2e5d4",
        },
      ],
    },
    {
      featureType: "poi.Park",
      elementType: "geometry",
      stylers: [
        {
          color: "#c5dac6",
        },
      ],
    },
    {
      featureType: "poi.Park",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#c5c6c6",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#e4d7c6",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          color: "#fbfaf7",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#acbcc9",
        },
      ],
    },
  ];

  useEffect(() => {
    // var files = fs.readdir(`../asset/images/${storid}/`);
    // console.log("****", files);
    setimage1(
      `https://jockyboastorage.blob.core.windows.net/images/nft01.jpeg`
    );
    initMap();
  }, []);

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(res, rej);
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }
  let searchDistance = 150000;

  /**
   * Initialize the Google Map.
   */
  async function initMap() {
    // Create the map.
    // const userLocation = getUserLocation();
    const userLocation = await getPosition();

    let zoomvalue;

    if (window.innerWidth > 1000) {
      zoomvalue = 7;
    } else {
      zoomvalue = 12;
    }

    // let map = new google.maps.Map(document.getElementById("map"), {
    let map = new google.maps.Map(myContainer.current, {
      zoom: 15,
      center: {
        lat: props.coord[1],
        lng: props.coord[0],
      },
      // center: {
      //   lat: userLocation.coords.latitude,
      //   lng: userLocation.coords.longitude,
      // },
      styles: mapStyle,
    });

    // const marker = new google.maps.Marker({
    //   position: {
    //     lat: props.coord[1],
    //     lng: props.coord[0],
    //     // lat: userLocation.coords.latitude,
    //     // lng: userLocation.coords.longitude,
    //   },
    //   map: map,
    // });

    map.data.addGeoJson(stores_data, { idPropertyName: "storeid" });
    // map.data.loadGeoJson("National_stores.json", {
    //   idPropertyName: "storeid_National",
    // });

    // Define the custom marker icons, using the store's "category".

    map.data.setStyle((feature) => {
      return {
        icon: {
          url: toilet_image,
          scaledSize: new google.maps.Size(25, 32),
        },
      };
    });
  }

  useEffect(() => {
    console.log("image1 :", image1);
  }, [image1]);

  console.log("--->>", ImagesPath[`Image${storid}1`]);

  return (
    <>
      <h3 className="mt-5 container text-left text-mnblue">
        Details of Fuel Station
      </h3>
      <div className="container mt-3 text-left">
        <a role="button" href="../locate-us" class="btn btn-outline-dark">
          Back
        </a>
      </div>
      <div className="mt-5 container">
        <div className="row gy-3 mx-auto">
          <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
            <div className="mt-2 card-pic-st mx-auto">
              {ImagesPath[`Image${storid}1`] ? (
                <img
                  className="img-st"
                  // src={GasStation}
                  src={ImagesPath[`Image${storid}1`]} // store pic
                  alt="fuel station picture"
                />
              ) : (
                <img
                  className="img-st"
                  // src={GasStation}
                  src={ImagesPath[`Image31`]} // store pic
                  alt="fuel station picture"
                />
              )}
              <p className="mt-3 text-left">
                {" "}
                {/* Store Lower Text */}
                <span>
                  {" "}
                  <strong>Name of the Station: </strong> {props.nameOfStation}
                </span>
                <br></br>
                <span>
                  <strong>Address: </strong> {props.address}
                </span>
                <br></br>
                <span>
                  <strong>Distance: </strong>
                  {props.distance}
                </span>
                <br></br>
                {/* <span>
                  <strong>Store ID: </strong>
                  {props.storid}
                </span>
                <br></br> */}
                {/* <span>
                  <strong>Coord: </strong>
                  {`${props.coord[0]} , ${props.coord[1]}`}
                </span>
                <br></br> */}
                <h4 className="mt-3 text-primary">
                  <strong>Rated:</strong>
                  {"  "}
                </h4>
                <span className="circle">5/5</span>
              </p>
            </div>
          </div>

          {ImagesPath[`Image${storid}2`] ? (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img
                className="mt-1 img-corner"
                src={ImagesPath[`Image${storid}2`]} // if image
                alt="toilet picture"
              />
            </div>
          ) : (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img
                className="mt-1 img-corner"
                // image-1
                src={ImagesPath[`logo`]} // else logo image
                alt="fuel station picture"
              />
            </div>
          )}

          {ImagesPath[`Image${storid}3`] ? (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img
                className="mt-1 img-corner"
                src={ImagesPath[`Image${storid}3`]}
                width="300"
                height="340"
                alt="toilet picture"
              />
            </div>
          ) : (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img
                className="mt-1 img-corner"
                // src={GasStation}
                src={ImagesPath[`logo`]} // else logo image
                width="300"
                height="340"
                alt="fuel station picture"
              />
            </div>
          )}

          {ImagesPath[`Image${storid}4`] ? (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img
                className="mt-1 img-corner"
                src={ImagesPath[`Image${storid}4`]}
                width="300"
                height="340"
                alt="toilet picture"
              />
            </div>
          ) : (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img
                className="mt-1 img-corner"
                // src={GasStation}
                src={ImagesPath[`logo`]} // else logo image
                width="300"
                height="340"
                alt="fuel station picture"
              />
            </div>
          )}

          {/* {ImagesPath[`Image${storid}5`] ? (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto ">
              <img className="mt-1 img-corner"
                src={ImagesPath[`Image${storid}5`]}
                width="300"
                height="340"
                alt="toilet picture"
              />
            </div>
          ) : (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto ">
              <img className="mt-1 img-corner"
                // src={GasStation}
                src={ImagesPath[`logo`]} // else logo image
                width="300"
                height="340"
                alt="fuel station picture"
              />
            </div>
          )}

          {ImagesPath[`Image${storid}6`] ? (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img className="mt-1 img-corner"
                src={ImagesPath[`Image${storid}6`]}
                width="300"
                height="340"
                alt="toilet picture"
              />
            </div>
          ) : (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img className="mt-1 img-corner"
                // src={GasStation}
                src={ImagesPath[`logo`]} // else logo image
                width="300"
                height="340"
                alt="fuel station picture"
              />
            </div>
          )}

          {ImagesPath[`Image${storid}7`] ? (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img className="mt-1 img-corner"
                //style={{ height: "auto", width: "auto" }}
                src={ImagesPath[`Image${storid}7`]}
                width="300"
                height="340"
                alt="toilet picture"
              />
            </div>
          ) : (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img className="mt-1 img-corner"
                // src={GasStation}
                src={ImagesPath[`logo`]} // else logo image
                width="300"
                height="340"
                alt="fuel station picture"
              />
            </div>
          )}

          {ImagesPath[`Image${storid}8`] ? (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img className="mt-1 img-corner"
                //style={{ height: "auto", width: "auto" }}
                src={ImagesPath[`Image${storid}7`]}
                width="300"
                height="340"
                alt="toilet picture"
              />
            </div>
          ) : (
            <div className="col-sm-3 col-md-4 col-lg-3 card-pic me-auto">
              <img className="mt-1 img-corner"
                // src={GasStation}
                src={ImagesPath[`logo`]} // else logo image
                width="300"
                height="340"
                alt="fuel station picture"
              />
            </div>
          )} */}
        </div>
      </div>

      <div className="mt-4 col-sm-4 col-md-12 col-lg-8 mx-auto">
        <div className="container mx-auto" ref={myContainer} id="map">
          <div className="mt-5 px-2">
            <b>Please wait few moment to load the map,</b>
            <br></br>
            <p>
              If it still not loaded, kindly check and enable your device
              location and retry,
            </p>
            <br></br>
            <p>
              If still the map not loaded, please check and allow permission to
              your browser for location access.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

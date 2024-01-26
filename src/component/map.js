/*
 * Copyright 2017 Google Inc. All rights reserved.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// Style credit: https://snazzymaps.com/style/1/pale-dawn

import React from "react";
import { useEffect, useRef, useState } from "react";
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import nationa_Park from "./national_stores.json";
import city from "./city.json";
import cities from "./in.json";
import stores_data from "./stores.json";
import natpark from "./np__.json";
import toilet_image from "../asset/images/toilet.png";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import gif1 from "../images/loader.gif";
import { Details } from "../details.js";
import haversine from "haversine-distance";

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

export function InitGoogleMap() {
  let map;
  let infoWindow;
  const google = (window.google = window.google ? window.google : {});

  const NP_Data = natpark;

  const [viewdetails, setviewdetails] = useState(null);
  const [viewdetails_data, setviewdetails_data] = useState(null);

  const [imgCard, setImgCard] = useState(null);
  const [stationName, setStationName] = useState(null);
  const [distance, setDistance] = useState(0);
  const [desc, setDesc] = useState(null);
  const [storeid1, setstoreid1] = useState(null);
  const [coord1, setcord1] = useState(null);

  const [stationName1, setStationName1] = useState(null);
  const [distance1, setDistance1] = useState(0);
  const [desc1, setDesc1] = useState(null);
  const [storeid2, setstoreid2] = useState(null);
  const [coord2, setcord2] = useState(null);

  const myContainer = useRef(null);

  useEffect(() => {
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

  // Escapes HTML characters in a template literal string, to prevent XSS.
  // See https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet#RULE_.231_-_HTML_Escape_Before_Inserting_Untrusted_Data_into_HTML_Element_Content
  function sanitizeHTML(strings) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    let result = strings[0];
    for (let i = 1; i < arguments.length; i++) {
      result += String(arguments[i]).replace(/[&<>'"]/g, (char) => {
        return entities[char];
      });
      result += strings[i];
    }
    return result;
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
      zoom: zoomvalue,
      // center: { lat: 53.632469, lng: -1.689423 },
      center: {
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      },
      styles: mapStyle,
    });

    const marker = new google.maps.Marker({
      position: {
        // lat: 53.632469,
        // lng: -1.689423,
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      },
      map: map,
    });

    // Load the stores GeoJSON onto the map.
    // map.data.loadGeoJson("stores.json", { idPropertyName: "storeid" });

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

    const apiKey = "AIzaSyCOtRab6Lh2pNn7gYxvAqN5leETC24OXYQ";
    const infoWindow = new google.maps.InfoWindow();

    let National_json = nationa_Park;
    let city_json = city;
    let store_json = stores_data;

    // Show the information for a store when its marker is clicked.
    map.data.addListener("click", (event) => {
      const category = event.feature.getProperty("category");
      const name = event.feature.getProperty("name");
      const description = event.feature.getProperty("description");
      const hours = event.feature.getProperty("hours");
      const phone = event.feature.getProperty("phone");
      const position = event.feature.getGeometry().get();
      const content = sanitizeHTML`
        <div><img style="text-center; width:70px; margin-top:5px" src=${toilet_image}></div>
        <br>
        <div style= margin-bottom:20px;">
          <h5>${name}</h5><p>${description}</p>
        </div>
        `;

      infoWindow.setContent(content);
      infoWindow.setPosition(position);
      infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
      infoWindow.open(map);
    });

    async function route_to_Park(selectedIndex, json_filename) {
      // setDesc("");
      // setDesc1("");
      // setDistance("");
      // setDistance1("");
      // setStationName("");
      // setStationName1("");

      for (let i = 0; i < json_filename.features.length; i++) {
        if (json_filename.features[i].properties.storeid == selectedIndex) {
          originMarker.setVisible(false);
          map.setCenter(
            new google.maps.LatLng(
              json_filename.features[i].geometry.coordinates[1],
              json_filename.features[i].geometry.coordinates[0]
            )
          );
          map.setZoom(8);

          // originMarker.setPosition(originLocation);
          originMarker.setPosition(
            new google.maps.LatLng(
              json_filename.features[i].geometry.coordinates[1],
              json_filename.features[i].geometry.coordinates[0]
            )
          );
          originMarker.setVisible(true);

          const rankedStores = await calculateDistances(
            map.data,
            new google.maps.LatLng(
              json_filename.features[i].geometry.coordinates[1],
              json_filename.features[i].geometry.coordinates[0]
            )
          );

          showStoresList(map.data, rankedStores);
        }
      }
    }

    async function route_to_Park_new(coord) {
      // setDesc("");
      // setDesc1("");
      // setDistance("");
      // setDistance1("");
      // setStationName("");
      // setStationName1("");

      originMarker.setVisible(false);
      map.setCenter(new google.maps.LatLng(coord[1], coord[0]));
      map.setZoom(8);

      // originMarker.setPosition(originLocation);
      originMarker.setPosition(new google.maps.LatLng(coord[1], coord[0]));
      originMarker.setVisible(true);

      const rankedStores = await calculateDistances(
        map.data,
        new google.maps.LatLng(coord[1], coord[0])
      );

      showStoresList(map.data, rankedStores);
    }

    const f01 = document.getElementById("1");
    f01.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f02 = document.getElementById("2");
    f02.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f03 = document.getElementById("3");
    f03.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f04 = document.getElementById("4");
    f04.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f05 = document.getElementById("5");
    f05.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f06 = document.getElementById("6");
    f06.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f07 = document.getElementById("7");
    f07.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f08 = document.getElementById("8");
    f08.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f09 = document.getElementById("9");
    f09.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");

      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f10 = document.getElementById("10");
    f10.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f11 = document.getElementById("11");
    f11.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f12 = document.getElementById("12");
    f12.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f13 = document.getElementById("13");
    f13.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f14 = document.getElementById("14");
    f14.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f15 = document.getElementById("15");
    f15.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f16 = document.getElementById("16");
    f16.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f17 = document.getElementById("17");
    f17.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f18 = document.getElementById("18");
    f18.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f19 = document.getElementById("19");
    f19.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f20 = document.getElementById("20");
    f20.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f21 = document.getElementById("21");
    f21.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f22 = document.getElementById("22");
    f22.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f23 = document.getElementById("23");
    f23.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f24 = document.getElementById("24");
    f24.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f25 = document.getElementById("25");
    f25.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f26 = document.getElementById("26");
    f26.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f27 = document.getElementById("27");
    f27.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f28 = document.getElementById("28");
    f28.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f29 = document.getElementById("29");
    f29.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f30 = document.getElementById("30");
    f30.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f31 = document.getElementById("31");
    f31.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f32 = document.getElementById("32");
    f32.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f33 = document.getElementById("33");
    f33.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f34 = document.getElementById("34");
    f34.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f35 = document.getElementById("35");
    f35.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f36 = document.getElementById("36");
    f36.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f37 = document.getElementById("37");
    f37.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f38 = document.getElementById("38");
    f38.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f39 = document.getElementById("39");
    f39.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f40 = document.getElementById("40");
    f40.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f41 = document.getElementById("41");
    f41.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f42 = document.getElementById("42");
    f42.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f43 = document.getElementById("43");
    f43.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f44 = document.getElementById("44");
    f44.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f45 = document.getElementById("45");
    f45.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f46 = document.getElementById("46");
    f46.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f47 = document.getElementById("47");
    f47.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f48 = document.getElementById("48");
    f48.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f49 = document.getElementById("49");
    f49.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f50 = document.getElementById("50");
    f50.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f51 = document.getElementById("51");
    f51.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f52 = document.getElementById("52");
    f52.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f54 = document.getElementById("54");
    f54.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f55 = document.getElementById("55");
    f55.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f56 = document.getElementById("56");
    f56.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f57 = document.getElementById("57");
    f57.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f58 = document.getElementById("58");
    f58.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f59 = document.getElementById("59");
    f59.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f60 = document.getElementById("60");
    f60.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f61 = document.getElementById("61");
    f61.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f62 = document.getElementById("62");
    f62.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f63 = document.getElementById("63");
    f63.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f64 = document.getElementById("64");
    f64.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f65 = document.getElementById("65");
    f65.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f66 = document.getElementById("66");
    f66.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f67 = document.getElementById("67");
    f67.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f68 = document.getElementById("68");
    f68.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f69 = document.getElementById("69");
    f69.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f70 = document.getElementById("70");
    f70.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f71 = document.getElementById("71");
    f71.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f72 = document.getElementById("72");
    f72.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f73 = document.getElementById("73");
    f73.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f74 = document.getElementById("74");
    f74.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f75 = document.getElementById("75");
    f75.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f76 = document.getElementById("76");
    f76.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f77 = document.getElementById("77");
    f77.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f78 = document.getElementById("78");
    f78.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f79 = document.getElementById("79");
    f79.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f80 = document.getElementById("80");
    f80.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f81 = document.getElementById("81");
    f81.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f82 = document.getElementById("82");
    f82.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f83 = document.getElementById("83");
    f83.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f84 = document.getElementById("84");
    f84.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f85 = document.getElementById("85");
    f85.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f86 = document.getElementById("86");
    f86.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f87 = document.getElementById("87");
    f87.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f88 = document.getElementById("88");
    f88.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f89 = document.getElementById("89");
    f89.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f90 = document.getElementById("90");
    f90.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f91 = document.getElementById("91");
    f91.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f92 = document.getElementById("92");
    f92.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f93 = document.getElementById("93");
    f93.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f94 = document.getElementById("94");
    f94.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f95 = document.getElementById("95");
    f95.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f96 = document.getElementById("96");
    f96.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f97 = document.getElementById("97");
    f97.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f98 = document.getElementById("98");
    f98.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f99 = document.getElementById("99");
    f99.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f100 = document.getElementById("100");
    f100.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f101 = document.getElementById("101");
    f101.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f102 = document.getElementById("102");
    f102.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f103 = document.getElementById("103");
    f103.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f104 = document.getElementById("104");
    f104.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f105 = document.getElementById("105");
    f105.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    const f106 = document.getElementById("106");
    f106.addEventListener("click", async (e) => {
      document.getElementById("myDropdown").classList.remove("show");
      route_to_Park_new(NP_Data[e.target.text]);
    });

    // city route
    const firsttag1 = document.getElementById("C001");
    firsttag1.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "1";
      route_to_Park(selectedIndex, city_json);
    });
    const secondtag1 = document.getElementById("C002");
    secondtag1.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "2";
      route_to_Park(selectedIndex, city_json);
    });
    const thirdtag1 = document.getElementById("C003");
    thirdtag1.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "3";
      route_to_Park(selectedIndex, city_json);
    });
    const fourthtag1 = document.getElementById("C004");
    fourthtag1.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "4";
      route_to_Park(selectedIndex, city_json);
    });
    const fifthtag1 = document.getElementById("C005");
    fifthtag1.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "5";
      route_to_Park(selectedIndex, city_json);
    });
    const sixthtag1 = document.getElementById("C006");
    sixthtag1.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "6";
      route_to_Park(selectedIndex, city_json);
    });
    const sixthtag2 = document.getElementById("C007");
    sixthtag2.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "7";
      route_to_Park(selectedIndex, city_json);
    });
    const sixthtag8 = document.getElementById("C008");
    sixthtag8.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "8";
      route_to_Park(selectedIndex, city_json);
    });
    const sixthtag9 = document.getElementById("C009");
    sixthtag9.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "9";
      route_to_Park(selectedIndex, city_json);
    });

    const sixthtag10 = document.getElementById("C010");
    sixthtag10.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "10";
      route_to_Park(selectedIndex, city_json);
    });

    const sixthtag11 = document.getElementById("C011");
    sixthtag11.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "11";
      route_to_Park(selectedIndex, city_json);
    });

    const sixthtag12 = document.getElementById("C012");
    sixthtag12.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "12";
      route_to_Park(selectedIndex, city_json);
    });

    const sixthtag13 = document.getElementById("C013");
    sixthtag13.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "13";
      route_to_Park(selectedIndex, city_json);
    });

    const sixthtag14 = document.getElementById("C014");
    sixthtag14.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "14";
      route_to_Park(selectedIndex, city_json);
    });

    const sixthtag15 = document.getElementById("C015");
    sixthtag15.addEventListener("click", async (e) => {
      document.getElementById("myDropdown1").classList.remove("show");
      const selectedIndex = "15";
      route_to_Park(selectedIndex, city_json);
    });

    // const sixthtag16 = document.getElementById("C016");
    // sixthtag16.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "16";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag17 = document.getElementById("C017");
    // sixthtag17.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "17";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag18 = document.getElementById("C018");
    // sixthtag18.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "18";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag19 = document.getElementById("C019");
    // sixthtag19.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "19";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag20 = document.getElementById("C020");
    // sixthtag20.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "20";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag21 = document.getElementById("C021");
    // sixthtag21.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "21";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag22 = document.getElementById("C022");
    // sixthtag22.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "22";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag23 = document.getElementById("C023");
    // sixthtag23.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "23";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag24 = document.getElementById("C024");
    // sixthtag24.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "24";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag25 = document.getElementById("C025");
    // sixthtag25.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "25";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag26 = document.getElementById("C026");
    // sixthtag26.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "26";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag27 = document.getElementById("C027");
    // sixthtag27.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "27";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag28 = document.getElementById("C028");
    // sixthtag28.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "28";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag29 = document.getElementById("C029");
    // sixthtag29.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "29";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag30 = document.getElementById("C030");
    // sixthtag30.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "30";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag31 = document.getElementById("C031");
    // sixthtag31.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "31";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag32 = document.getElementById("C032");
    // sixthtag32.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "32";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag33 = document.getElementById("C033");
    // sixthtag33.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "33";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag34 = document.getElementById("C034");
    // sixthtag34.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "34";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag35 = document.getElementById("C035");
    // sixthtag35.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "35";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag36 = document.getElementById("C036");
    // sixthtag36.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "36";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag37 = document.getElementById("C037");
    // sixthtag37.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "37";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag38 = document.getElementById("C038");
    // sixthtag38.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "38";
    //   route_to_Park(selectedIndex, city_json);
    // });

    // const sixthtag39 = document.getElementById("C039");
    // sixthtag39.addEventListener("click", async (e) => {
    //   document.getElementById("myDropdown1").classList.remove("show");
    //   const selectedIndex = "39";
    //   route_to_Park(selectedIndex, city_json);
    // });


    // Set the origin point when the user selects an address
    const originMarker = new google.maps.Marker({ map: map });
    originMarker.setVisible(false);
    let originLocation = map.getCenter();

    const rankedStores = await calculateDistances(map.data, originLocation);
    showStoresList(map.data, rankedStores); //uncomment later very important
  }

  /**
   * Use Distance Matrix API to calculate distance from origin to each store.
   * @param {google.maps.Data} data The geospatial data object layer for the map
   * @param {google.maps.LatLng} origin Geographical coordinates in latitude
   * and longitude
   * @return {Promise<object[]>} n Promise fulfilled by an array of objects with
   * a distanceText, distanceVal, and storeid property, sorted ascending
   * by distanceVal.
   */

  async function calculateDistances(data, origin) {
    const destinations = [];
    const stores = [];
    const destinations_p = [];

    // Build parallel arrays for the store IDs and destinations
    data.forEach((store) => {
      const storeNum = store.getProperty("storeid");
      const storeLoc = store.getGeometry().get();

      destinations_p.push(storeLoc);
      stores.push(storeNum);
    });

    let new_distance_array = [];

    function float2int(value) {
      return value | 0;
    }

    for (let i = 0; i < stores_data["features"].length; i++) {
      var point1 = { lng: origin.lng(), lat: origin.lat() };

      //Second point in your haversine calculation
      var point2 = {
        lng: stores_data["features"][i]["geometry"]["coordinates"][0],
        lat: stores_data["features"][i]["geometry"]["coordinates"][1],
      };
      var haversine_m = haversine(point1, point2);

      new_distance_array.push({
        storeid: stores_data["features"][i]["properties"]["storeid"],
        distanceText: `${float2int(haversine_m) / 1000} Km`,
        distanceVal: float2int(haversine_m),
      });
    }
    new_distance_array.sort((first, second) => {
      // console.log("new_distance_array :", first, second);
      return first.distanceVal - second.distanceVal;
    });
    return new_distance_array;
  } // end function

  function showStoresList(data, stores) {
    if (stores.length == 0) {
      return;
    }

    let panel = document.createElement("div");
    panel.setAttribute("style", "float: left");
    let sideCard = document.createElement("div");
    panel.setAttribute("style", "float: left");

    // If the panel already exists, use it. Else, create it and add to the page.
    if (document.getElementById("panel")) {
      panel = document.getElementById("panel");

      // If panel is already open, close it
      if (panel.classList.contains("open")) {
        panel.classList.remove("open");
      }
    } else {
      panel.setAttribute("id", "panel");
      const body = document.body;
      body.insertBefore(panel, body.childNodes[0]);
    }

    // Clear the previous details
    while (panel.lastChild) {
      panel.removeChild(panel.lastChild);
    }

    var minval = 10000000;
    var maxval = 0;
    stores.forEach((store) => {
      if (minval > store.distanceVal) {
        minval = store.distanceVal;
      }

      if (maxval < store.distanceVal) {
        maxval = store.distanceVal;
      }
    });

    var avgdistance = (maxval + minval) / 2;

    console.log("store first  :", stores[0]);
    console.log("store second  :", stores[1]);

    setImgCard(toilet_image);
    const currentStore = data.getFeatureById(stores[0].storeid);
    setDesc(currentStore.getProperty("description"));
    setStationName(currentStore.getProperty("name"));
    setDistance(stores[0].distanceText);
    setstoreid1(stores[0].storeid);

    const storeLoc = currentStore.getGeometry().get();
    setcord1([storeLoc.lng(), storeLoc.lat()]);

    const currentStore1 = data.getFeatureById(stores[1].storeid);
    setDesc1(currentStore1.getProperty("description"));
    setStationName1(currentStore1.getProperty("name"));
    setDistance1(stores[1].distanceText);
    setstoreid2(stores[1].storeid);

    const storeLoc1 = currentStore1.getGeometry().get();
    setcord2([storeLoc1.lng(), storeLoc1.lat()]);

    return;
  }

  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show");
  }

  function filterFunction() {
    setImgCard(null);
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  function filterFunction1() {
    setImgCard(null);
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput1");
    filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown1");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  return (
    <>
      <script
        async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOtRab6Lh2pNn7gYxvAqN5leETC24OXYQ&libraries=places&callback=initMap&solution_channel=GMP_codelabs_simplestorelocator_v1_a"
      ></script>

      {viewdetails ? (
        <div>
          <Details
            nameOfStation={
              viewdetails_data ? viewdetails_data[0] : "not fetched"
            }
            address={viewdetails_data ? viewdetails_data[1] : "not fetched"}
            distance={viewdetails_data ? viewdetails_data[2] : "not fetched"}
            storid={viewdetails_data ? viewdetails_data[3] : "not fetched"}
            coord={viewdetails_data ? viewdetails_data[4] : "not fetched"}
          />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-4">
              <nav className="mt-3">
                <div
                  className="text-tab nav nav-tabs"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="false"
                    onClick={initMap}
                    style={{ fontSize: "1rem" }}
                  >
                    Near Me
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                    style={{ fontSize: "1rem" }}
                  >
                    Search by <br></br> National Parks
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                    style={{ fontSize: "1rem" }}
                  >
                    Search by <br></br> City
                  </a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  {/* side card */}
                  {/* <div
                          id="search-panel"
                          // style={{
                          //   border: "2px solid grey",
                          //   marginLeft: "72%",
                          //   display: "block",
                          //   justifyContent: "center",
                          //   alignContent: "center",
                          //   borderRadius: "15px",
                          // }}
                        >
                        </div> */}
                  {imgCard ? (
                    <div>
                        <div
                          id="card1-1"
                          className="mt-3 px-3 py-2 side-card text-left"
                        >
                          <p>
                            <span id="name1-1" className="mt-2">
                              <strong>Name of the Station</strong>
                              {`: ${stationName}`}
                            </span>
                            <br></br>
                            <span id="adres1-1">
                              {" "}
                              <strong>Address </strong> {`: ${desc}`}
                            </span>
                            <br></br>
                            <span id="storeid1-1">
                              {" "}
                              <strong>Store ID </strong> {`: ${storeid1}`}
                            </span>
                            <br></br>
                            <span id="dist1-1">
                              <strong>Distance </strong>
                              {` : ${distance}`}
                            </span>
                            <div className="text-right">
                              <a
                                type="button"
                                className="btn btn-primary btn-sm text-light"
                                //href="./details"
                                onClick={() => {
                                    setviewdetails_data([
                                    stationName,
                                    desc,
                                    distance,
                                    storeid1,
                                    coord1,
                                  ]);
                                  setviewdetails("do");
                                }}
                              >
                                View Details
                              </a>
                            </div>
                          </p>
                        </div>
                      
                        <div
                          id="card1-1"
                          className="mt-3 px-3 py-2 side-card text-left"
                        >
                          <p>
                            <span id="name1-1" className="mt-2">
                              <strong>Name of the Station</strong>
                              {` : ${stationName1}`}
                            </span>
                            <br></br>
                            <span id="adres1-1">
                              <strong>Address </strong> {` : ${desc1}`}
                            </span>
                            <br></br>
                            <span id="storeid1-1">
                              {" "}
                              <strong>Store ID </strong> {`: ${storeid2}`}
                            </span>
                            <br></br>
                            <span id="dist1-1">
                              <strong>Distance </strong>
                              {` : ${distance1}`}
                            </span>
                            <div className="text-right">
                              <a
                                type="button"
                                className="btn btn-primary btn-sm text-light"
                                //href="./details"
                                onClick={() => {
                                  setviewdetails_data([
                                    stationName1,
                                    desc1,
                                    distance1,
                                    storeid2,
                                    coord2,
                                  ]);
                                  setviewdetails("do");
                                }}
                              >
                                View Details
                              </a>
                            </div>
                          </p>
                        </div>
                    </div>
                    
                  ) : (
                    <div className="mt-5">
                      <img
                        style={{ height: "50px", weight: "50px" }}
                        src={gif1}
                        alt="loader.gif"
                      />
                      <p>
                        <b>Please Wait...</b>
                      </p>
                      <p>searching nearest location...</p>
                    </div>
                  )}

                  <div
                    className=""
                    //id="search-panel"
                    style={{
                      //border: "2px solid grey",
                      //marginLeft: "72%",
                      //display: "block",
                      justifyContent: "center",
                      alignContent: "center",
                      borderRadius: "15px",
                    }}
                  ></div>
                </div>
                <div
                  className="tab-pane fade "
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  {/* Park Dropdown */}
                  <div className="dropdown">
                    <button
                      onClick={myFunction}
                      className="mt-2 btn dropdown-toggle"
                      style={{ borderRadius: "5px 5px 0px 0px", width: "300px" }}
                    >
                      Search By National Park
                    </button>
                    {/* <MdOutlineArrowDropDownCircle size={20} onClick={myFunction} /> */}
                    <div
                      id="myDropdown"
                      className="dropdown-content"
                      style={{ borderRadius: "0px 0px 5px 5px" }}
                    >
                      <input
                        type="text"
                        placeholder="Search.."
                        id="myInput"
                        onKeyUp={filterFunction}
                      />
                      <a id="1">Anshi National Park</a>
                      <a id="2">Arignar Anna Zoological Park</a>
                      <a id="3">Bandhavgarh National Park</a>
                      <a id="4">Bandipur</a>
                      <a id="5">Bandipur National Park</a>
                      <a id="6">Banerghatta National Park</a>
                      <a id="7">Bannerghatta National Park</a>
                      <a id="8">Betla National Park</a>
                      <a id="9">Bhitarkanika National Park</a>
                      <a id="10">Bison National Park</a>
                      <a id="11">Bison National Park</a>
                      <a id="12">Blackbuck National Park</a>
                      <a id="13">City forest (Salim Ali) National Park</a>
                      <a id="14">Clouded Leopard National Park</a>
                      <a id="15">Corbett National Park</a>
                      <a id="16">Dachigam National Park</a>
                      <a id="17">Desert National Park</a>
                      <a id="18">Dudhwa National Park</a>
                      <a id="19">Eravikulam National Park</a>
                      <a id="20">Fossil National Park</a>
                      <a id="21">Gangotri National Park</a>
                      <a id="22">Gir National forest</a>
                      <a id="23">Gir National Park</a>
                      <a id="24">Gorumara National Park</a>
                      <a id="25">Govind National Park</a>
                      <a id="26">Great Himalayan National Park</a>
                      <a id="27">Great Himalyan National Park</a>
                      <a id="28">Guindy National Park</a>
                      <a id="29">Gulf of Mannar Marine National Park</a>
                      <a id="30">Guru Ghasidas (Sanjay) National Park</a>
                      <a id="31">Hemis National Park</a>
                      <a id="32">Inderkilla National Park</a>
                      <a id="33">Indira Gandhi (Annamalai) National Park</a>
                      <a id="34">Indira Priyadarshini Pench National Park</a>
                      <a id="35">Indravati National Park</a>
                      <a id="36">Jaldapara National Park</a>
                      <a id="37">Kalesar National Park</a>
                      <a id="38">Kanger National Park/Indravati National Park</a>
                      <a id="39">Kanger Valley National Park</a>
                      <a id="40">Kanha National Park</a>
                      <a id="41">Karandala Wild Life Sanctury</a>
                      <a id="42">Kasu Brahmananda Reddy National Park</a>
                      <a id="43">Kasu Brahmananda Reddy (KBR) National Park</a>
                      <a id="44">Kaziranga National Park</a>
                      <a id="45">KBR National Park</a>
                      <a id="46">Keibul Lamjao National Park</a>
                      <a id="47">Keoladeo Ghana National Park</a>
                      <a id="48">Keoladeo Ghana National Park Rajasthan</a>
                      <a id="49">Khangchendzonga National Park</a>
                      <a id="50">Khirganga National Park</a>
                      <a id="51">Kishtwar National Park</a>
                      <a id="52">Kudremukh National Park</a>
                      <a id="53">Madhav National Park</a>
                      <a id="54">Madumalai National Park</a>
                      <a id="55">Mahananda Wildlife sanctuary</a>
                      <a id="56">Mahatma Gandhi Marine National Park</a>
                      <a id="57">Mahaveer Harina Vanasthali</a>
                      <a id="58">Mahaveer Harina Vanasthali National Park</a>
                      <a id="59">Manas National Park</a>
                      <a id="60">Marine National Park</a>
                      <a id="61">Mathikettan Shola National Park</a>
                      <a id="62">Middle Button Island National Park</a>
                      <a id="63">Mrugavani National Park</a>
                      <a id="64">Mrugavani National Park : Chilkur</a>
                      <a id="65">Mudumalai National Park</a>
                      <a id="66">Mukurthi National Park</a>
                      <a id="67">Nagarahole National Park</a>
                      <a id="68">Nagarahole (Rajiv Gandhi) National Park</a>
                      <a id="69">Nagzira Wildlife Sanctury</a>
                      <a id="70">Namdapha National Park</a>
                      <a id="71">Nameri National Park</a>
                      <a id="72">Navegao Bandh Wildlife Sanctury</a>
                      <a id="73">Navegaon National Park</a>
                      <a id="74">Neora Valley National Park</a>
                      <a id="75">Nokrek National Park</a>
                      <a id="76">Panna National Park</a>
                      <a id="77">Papikonda National Park</a>
                      <a id="78">Pench National Park</a>
                      <a id="79">Periyar National Park</a>
                      <a id="80">Phawngpui Blue Mountain National Park</a>
                      <a id="81">Raja ji National Park</a>
                      <a id="82">Rajaji National Park</a>
                      <a id="83">Rajiv Gandhi (Rameswaram) National</a>
                      <a id="84">Rajiv Gandhi (Rameswaram) National Park</a>
                      <a id="85">Ranthambore National Park</a>
                      <a id="86">Sanjay Gandhi National Park</a>
                      <a id="87">Sanjay National Park</a>
                      <a id="88">Sariska National Park</a>
                      <a id="89">Satpura National Park</a>
                      <a id="90">Silent Valley National Park</a>
                      <a id="91">Simbalbara National Park</a>
                      <a id="92">Simlipal National Park</a>
                      <a id="93">Singalila National Park</a>
                      <a id="94">South Button Island National Park</a>
                      <a id="95">Sri Venkateswara National Park</a>
                      <a id="96">Sultan National Park</a>
                      <a id="97">Sultanpur National bank (Bird Sanctuary)</a>
                      <a id="98">Sunderban National Park</a>
                      <a id="99">Tadoba National Park</a>
                      <a id="100">Tadoba Wildlife Sanctury</a>
                      <a id="101">Valley of Flowers National Park</a>
                      <a id="102">Valmiki National Park</a>
                      <a id="103">Valmiki Tiger Reserve</a>
                      <a id="104">Van Vihar National Park</a>
                      <a id="105">Vansda National Park</a>
                      <a id="106">Velavadar Blackbuck National Park</a>
                    </div>
                  </div>

                  {imgCard ? (
                    <div>
                      <div
                        id="card1-1"
                        className="mt-3 px-3 py-2 side-card text-left"
                      >
                        <p>
                          <span id="name1-1" className="mt-2">
                            <strong>Name of the Station</strong>
                            {`: ${stationName}`}
                          </span>
                          <br></br>
                          <span id="adres1-1">
                            {" "}
                            <strong>Address </strong> {`: ${desc}`}
                          </span>
                          <br></br>
                          <span id="storeid1-1">
                            {" "}
                            <strong>Store ID </strong> {`: ${storeid1}`}
                          </span>
                          <br></br>
                          <span id="dist1-1">
                            <strong>Distance </strong>
                            {` : ${distance}`}
                          </span>
                          <div className="text-right">
                            <a
                              type="button"
                              className="btn btn-primary btn-sm text-light"
                              //href="./details"
                              onClick={() => {
                                  setviewdetails_data([
                                  stationName,
                                  desc,
                                  distance,
                                  storeid1,
                                  coord1,
                                ]);
                                setviewdetails("do");
                              }}
                            >
                              View Details
                            </a>
                          </div>
                        </p>
                      </div>

                      <div
                        id="card1-1"
                        className="mt-3 px-3 py-2 side-card text-left"
                      >
                        <p>
                          <span id="name1-1" className="mt-2">
                            <strong>Name of the Station</strong>
                            {` : ${stationName1}`}
                          </span>
                          <br></br>
                          <span id="adres1-1">
                            <strong>Address </strong> {` : ${desc1}`}
                          </span>
                          <br></br>
                          <span id="storeid1-1">
                            {" "}
                            <strong>Store ID </strong> {`: ${storeid2}`}
                          </span>
                          <br></br>
                          <span id="dist1-1">
                            <strong>Distance </strong>
                            {` : ${distance1}`}
                          </span>
                          <div className="text-right">
                            <a
                              type="button"
                              className="btn btn-primary btn-sm text-light"
                              //href="./details"
                              onClick={() => {
                                setviewdetails_data([
                                  stationName1,
                                  desc1,
                                  distance1,
                                  storeid2,
                                  coord2,
                                ]);
                                setviewdetails("do");
                              }}
                            >
                              View Details
                            </a>
                          </div>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <img
                        style={{ height: "50px", weight: "50px" }}
                        src={gif1}
                        alt="loader.gif"
                      />
                      <p>
                        <b>Please Wait...</b>
                      </p>
                      <p>searching nearest location...</p>
                    </div>
                  )}




                  {/* <div
                  id="card1-1"
                  className="mt-3 px-3 py-2 side-card text-left"
                >
                  <p>
                    <span
                      id="name1-1"
                      className="mt-2"
                    >{`Name of the Station : ${stationName?stationName:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="adres1-1"> {`Address : ${desc?desc:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="dist1-1">{`Distance : ${distance?distance:"feching please wait..."}`}</span>
                    <div className="text-right">
                      <a
                        type="button"
                        className="btn btn-primary btn-sm text-light"
                        href="./details"
                      >
                        View Details
                      </a>
                    </div>
                  </p>
                </div>
                <div
                  id="card1-1"
                  className="mt-3 px-3 py-2 side-card text-left"
                >
                  <p>
                    <span
                      id="name1-1"
                      className="mt-2"
                    >{`Name of the Station : ${stationName1?stationName1:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="adres1-1"> {`Address : ${desc1?desc1:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="dist1-1">{`Distance : ${distance1?distance1:"feching please wait..."}`}</span>
                    <div className="text-right">
                      <a
                        type="button"
                        className="btn btn-primary btn-sm text-light"
                        href="./details"
                      >
                        View Details
                      </a>
                    </div>
                  </p>
                </div> */}
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  {/* City Dropdown */}
                  <div
                    className="dropdown"
                    // style={{ marginTop: "1rem", zIndex: "3000", marginLeft: "0.5rem" }}
                  >
                    <button
                      //
                      onClick={myFunction1}
                      className="mt-2 btn dropdown-toggle"
                      style={{ borderRadius: "5px 5px 0px 0px" }}
                    >
                      Search By City
                    </button>
                    {/* <MdOutlineArrowDropDownCircle size={40} onClick={myFunction1} /> */}
                    <div
                      id="myDropdown1"
                      className="dropdown-content"
                      style={{ borderRadius: "0px 0px 5px 5px" }}
                    >
                      <input
                        type="text"
                        placeholder="Search.."
                        id="myInput1"
                        onKeyUp={filterFunction1}
                      />
                      {
                        cities.map((elem, index) => (
                          console.log("element :", elem) 
                          //<a href={elem} className={classnames[index]}>{tabnames[index]}</a>
                        ))
                      }
                      {/* <a id="C016">Agartala</a> */}
                      <a id="C009">Ahmedabad</a>
                      <a id="C004">Bangalore</a>
                      <a id="C003">Bhopal</a>
                      {/* <a id="C017">Bhubaneshvar</a> */}
                      {/* <a id="C018">Chandigarh</a> */}
                      <a id="C006">Chennai</a>
                      {/* <a id="C019">Coimbatore</a> */}
                      {/* <a id="C020">Dehradun</a> */}
                      {/* <a id="C021">Dispur</a> */}
                      <a id="C012">Delhi</a>
                      {/* <a id="C022">Gangtok</a> */}
                      <a id="C005">Hyderabad</a>
                      {/* <a id="C024">Imphal</a> */}
                      <a id="C011">Indore</a>
                      {/* <a id="C025">Jabalpur</a> */}
                      {/* <a id="C026">Jasailmer</a> */}
                      <a id="C008">Jaipur</a>
                      {/* <a id="C027">Kanpur</a> */}
                      <a id="C007">Kolkata</a>
                      {/* <a id="C029">Lucknow</a> */}
                      <a id="C001">Mumbai</a>
                      <a id="C013">Nagpur</a>
                      <a id="C015">Nashik</a>
                      {/* <a id="C030">Mysore</a> */}
                      {/* <a id="C031">Panaji</a>
                      <a id="C032">Patna</a>
                      <a id="C033">Port Blair</a> */}
                      <a id="C002">Pune</a>
                      {/* <a id="C034">Raipur</a>
                      <a id="C035">Rajkot</a>
                      <a id="C036">Ranchi</a>
                      <a id="C037">Rewa</a>*/}
                      <a id="C010">Surat</a> 
                      {/*<a id="C038">Shillong</a>
                      <a id="C039">Shimla</a>
                      <a id="C028">Srinagar</a>
                      <a id="C023">Thiruvananthapuram</a> */}
                      <a id="C014">Vadodara</a>
                    </div>
                  </div>

                  {imgCard ? (
                    <div>
                      <div
                        id="card1-1"
                        className="mt-3 px-3 py-2 side-card text-left"
                      >
                        <p>
                          <span id="name1-1" className="mt-2">
                            <strong>Name of the Station</strong>
                            {`: ${stationName}`}
                          </span>
                          <br></br>
                          <span id="adres1-1">
                            {" "}
                            <strong>Address </strong> {`: ${desc}`}
                          </span>
                          <br></br>
                          <span id="storeid1-1">
                            {" "}
                            <strong>Store ID </strong> {`: ${storeid1}`}
                          </span>
                          <br></br>
                          <span id="dist1-1">
                            <strong>Distance </strong>
                            {` : ${distance}`}
                          </span>
                          <div className="text-right">
                            <a
                              type="button"
                              className="btn btn-primary btn-sm text-light"
                              //href="./details"
                              onClick={() => {
                                  setviewdetails_data([
                                  stationName,
                                  desc,
                                  distance,
                                  storeid1,
                                  coord1,
                                ]);
                                setviewdetails("do");
                              }}
                            >
                              View Details
                            </a>
                          </div>
                        </p>
                      </div>

                      <div
                        id="card1-1"
                        className="mt-3 px-3 py-2 side-card text-left"
                      >
                        <p>
                          <span id="name1-1" className="mt-2">
                            <strong>Name of the Station</strong>
                            {` : ${stationName1}`}
                          </span>
                          <br></br>
                          <span id="adres1-1">
                            <strong>Address </strong> {` : ${desc1}`}
                          </span>
                          <br></br>
                          <span id="storeid1-1">
                            {" "}
                            <strong>Store ID </strong> {`: ${storeid2}`}
                          </span>
                          <br></br>
                          <span id="dist1-1">
                            <strong>Distance </strong>
                            {` : ${distance1}`}
                          </span>
                          <div className="text-right">
                            <a
                              type="button"
                              className="btn btn-primary btn-sm text-light"
                              //href="./details"
                              onClick={() => {
                                setviewdetails_data([
                                  stationName1,
                                  desc1,
                                  distance1,
                                  storeid2,
                                  coord2,
                                ]);
                                setviewdetails("do");
                              }}
                            >
                              View Details
                            </a>
                          </div>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <img
                        style={{ height: "50px", weight: "50px" }}
                        src={gif1}
                        alt="loader.gif"
                      />
                      <p>
                        <b>Please Wait...</b>
                      </p>
                      <p>searching nearest location...</p>
                    </div>
                  )}




                  {/* <div
                  id="card1-1"
                  className="mt-3 px-3 py-2 side-card text-left"
                >
                  <p>
                    <span
                      id="name1-1"
                      className="mt-2"
                    >{`Name of the Station : ${stationName?stationName:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="adres1-1"> {`Address : ${desc?desc:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="dist1-1">{`Distance : ${distance?distance:"feching please wait..."}`}</span>
                    <div className="text-right">
                      <a
                        type="button"
                        className="btn btn-primary btn-sm text-light"
                        href="./details"
                      >
                        View Details
                      </a>
                    </div>
                  </p>
                </div>
                <div
                  id="card1-1"
                  className="mt-3 px-3 py-2 side-card text-left"
                >
                  <p>
                    <span
                      id="name1-1"
                      className="mt-2"
                    >{`Name of the Station : ${stationName1?stationName1:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="adres1-1"> {`Address : ${desc1?desc1:"feching please wait..."}`}</span>
                    <br></br>
                    <span id="dist1-1">{`Distance : ${distance1?distance1:"feching please wait..."}`}</span>
                    <div className="text-right">
                      <a
                        type="button"
                        className="btn btn-primary btn-sm text-light"
                        href="./details"
                      >
                        View Details
                      </a>
                    </div>
                  </p>
                </div> */}
                </div>
              </div>
            </div>

            <div className="mt-3 col-sm-4 col-md-12 col-lg-8">
              <div
                // style={{ width: "100%", float: "left" }}
                ref={myContainer}
                id="map"
              >
                <div className="mt-5 px-2">
                  <b>Please wait few moment to load the map,</b>
                  <br></br>
                  <p>
                    If it still not loaded, kindly check and enable your device
                    location and retry,
                  </p>
                  <br></br>
                  <p>
                    If still the map not loaded, please check and allow
                    permission to your browser for location access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

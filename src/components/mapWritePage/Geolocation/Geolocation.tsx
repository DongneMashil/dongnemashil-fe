import { Map } from 'components/common';
import React, { useEffect, useRef } from 'react';
import Marker from 'assets/icons/Marker.png';

interface IProps {
  selectedAddress?: string;
  onAddressUpdate?: (address: string) => void;
  disableCurrentLocation?: boolean;
}

interface IMarkerOptions {
  map: kakao.maps.Map;
  position: kakao.maps.LatLng;
  draggable: boolean;
  image?: kakao.maps.MarkerImage;
}

export const Geolocation: React.FC<IProps> = ({
  selectedAddress,
  onAddressUpdate,
  disableCurrentLocation = false,
}) => {
  let mapInstance: kakao.maps.Map | null = null;
  const currentMarker = useRef<kakao.maps.Marker | null>(null);

  const addMarkerClick = (map: kakao.maps.Map) => {
    kakao.maps.event.addListener(
      map,
      'click',
      (mouseEvent: kakao.maps.event.MouseEvent) => {
        console.log('Map clicked at:', mouseEvent.latLng.toString());
        const clickedPosition = mouseEvent.latLng;
        displayMarker(map, clickedPosition);
      }
    );
  };

  const initMap = (map: kakao.maps.Map) => {
    mapInstance = map;

    if (!disableCurrentLocation) {
      getCurrentLocation(map);
    } else if (selectedAddress) {
      moveToAddressLocation(map, selectedAddress);
    } else {
      const defaultPosition = new kakao.maps.LatLng(37.545043, 127.039245);
      displayMarker(map, defaultPosition);
    }

    addMarkerClick(map);
  };

  useEffect(() => {
    if (mapInstance) {
      if (!disableCurrentLocation) {
        getCurrentLocation(mapInstance);
      } else if (selectedAddress) {
        moveToAddressLocation(mapInstance, selectedAddress);
      } else {
        const defaultPosition = new kakao.maps.LatLng(37.545043, 127.039245);
        displayMarker(mapInstance, defaultPosition);
      }
    }
  }, [selectedAddress, disableCurrentLocation]);

  const getCurrentLocation = (map: kakao.maps.Map, onClick?: () => void) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);
          displayMarker(map, locPosition, onClick);
        },
        () => {
          const locPosition = new kakao.maps.LatLng(37.545043, 127.039245);
          displayMarker(map, locPosition, onClick);
        }
      );
    } else {
      const locPosition = new kakao.maps.LatLng(37.545043, 127.039245);
      displayMarker(map, locPosition, onClick);
    }
  };

  const moveToAddressLocation = (map: kakao.maps.Map, address: string) => {
    new kakao.maps.services.Geocoder().addressSearch(
      address,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const locPosition = new kakao.maps.LatLng(
            parseFloat(result[0].y),
            parseFloat(result[0].x)
          );
          displayMarker(map, locPosition);
        }
      }
    );
  };

  const displayMarker = (
    map: kakao.maps.Map,
    locPosition: kakao.maps.LatLng,
    onClick?: () => void
  ) => {
    if (currentMarker.current) {
      currentMarker.current.setMap(null);
    }

    const svgMarkerImageSrc = Marker;
    const markerSize = new kakao.maps.Size(36, 48);
    const markerImage = new kakao.maps.MarkerImage(
      svgMarkerImageSrc,
      markerSize
    );

    const markerOptions: IMarkerOptions = {
      map: map,
      position: locPosition,
      draggable: true,
      image: markerImage,
    };

    const marker = new kakao.maps.Marker(markerOptions);

    currentMarker.current = marker;

    const updateAddressFromPosition = (position: kakao.maps.LatLng) => {
      new kakao.maps.services.Geocoder().coord2Address(
        position.getLng(),
        position.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const detailAddr =
              result[0].road_address?.address_name ||
              result[0].address?.address_name ||
              '';
            if (onAddressUpdate) {
              onAddressUpdate(detailAddr);
            }
          }
        }
      );
    };

    updateAddressFromPosition(locPosition);

    kakao.maps.event.addListener(marker, 'click', () => {
      if (onClick) onClick();
    });

    kakao.maps.event.addListener(marker, 'dragend', () => {
      const position = marker.getPosition();
      updateAddressFromPosition(position);
    });

    map.setCenter(locPosition);
  };

  return <Map width="100%" height="100%" initMap={initMap} />;
};

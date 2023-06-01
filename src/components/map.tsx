import { useCallback, useRef } from 'react';

import { GoogleMap, Marker } from '@react-google-maps/api';

import { defaultMapOptions, mapContainer, shopCoordinates } from '../constants';
import { useShop } from '../context/shop-context';
import { ShopIconsPath } from '../enums';
import { Coordinates } from '../types/coordinates.types';

type MapProps = {
  isLoaded: boolean;
  coordinates: Coordinates;
};

function Map({ isLoaded, coordinates }: MapProps): JSX.Element {
  const { shopId } = useShop();
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainer}
      center={coordinates}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultMapOptions}
    >
      <Marker position={coordinates} />
      {!!shopId && <Marker position={shopCoordinates[shopId]} icon={{ url: ShopIconsPath[shopId] }} />}
    </GoogleMap>
  ) : (
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Map;

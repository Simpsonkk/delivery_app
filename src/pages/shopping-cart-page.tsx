import { useCallback, useState } from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import Header from '../components/header';
import Map from '../components/map';
import Products from '../components/products';
import UserForm from '../components/user-form';
import { defaultMapCoordinates, libraries, MAP_API_KEY } from '../constants';
import { Coordinates } from '../types/coordinates.types';

function ShoppingCartPage(): JSX.Element {
  const [coordinates, setCoordinates] = useState<Coordinates>(defaultMapCoordinates);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAP_API_KEY,
    libraries,
  });

  const handlePlaceSelect = useCallback((coordinates: Coordinates) => {
    setCoordinates(coordinates);
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex p-2 pt-1 bg-warning-subtle">
        <UserForm isLoaded={isLoaded} handlePlaceSelect={handlePlaceSelect} />
        <div className="d-flex flex-column w-100">
          <Products shoppingCart />
          <Map isLoaded={isLoaded} coordinates={coordinates} />
        </div>
      </div>
    </>
  );
}

export default ShoppingCartPage;

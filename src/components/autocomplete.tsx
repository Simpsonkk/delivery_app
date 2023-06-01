import { ChangeEvent, useEffect } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import {
  ClearSuggestions, getGeocode, getLatLng, Init, SetValue, Status
} from 'use-places-autocomplete';

import { Coordinates } from '../types/coordinates.types';

type AutocompleteProps = {
  isLoaded: boolean;
  ready: boolean;
  value: string;
  suggestions: { status: Status; data: google.maps.places.AutocompletePrediction[] };
  setValue: SetValue;
  clearSuggestions: ClearSuggestions;
  init: Init;
  handlePlaceSelect: (coordinates: Coordinates) => void;
};

function Autocomplete({
  isLoaded,
  clearSuggestions,
  init,
  ready,
  setValue,
  suggestions: { data, status },
  value,
  handlePlaceSelect,
}: AutocompleteProps): JSX.Element {
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        handlePlaceSelect({ lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <button
          key={place_id}
          className="list-group-item list-group-item-action list-group-item-light"
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </button>
      );
    });

  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded]);

  return (
    <div className="form-floating mb-4" ref={ref}>
      <div className="form-floating mb-1">
        <input
          className="form-control"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Address"
          required
        />
        <label>Address</label>
      </div>

      {status === 'OK' && (
        <ul className="list-group position-absolute z-3 p-0 w-100">{renderSuggestions()}</ul>
      )}
    </div>
  );
}

export default Autocomplete;

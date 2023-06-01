import { CoordinatesMap } from './types/coordinates.types';

export const defaultMapOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollWheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
};

export const defaultMapCoordinates = {
  lat: 49.999005316077216,
  lng: 36.237759515225065,
};

export const mapContainer = {
  width: '100%',
  height: '250px',
};

export const previewAppImg =
  'https://images.unsplash.com/photo-1486485764572-92b96f21882a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';

export const shopCoordinates: CoordinatesMap = {
  0: defaultMapCoordinates,
  1: {
    lat: 49.97,
    lng: 36.23,
  },
  2: {
    lat: 49.96,
    lng: 36.2,
  },
  3: {
    lat: 49.96,
    lng: 36.28,
  },
};

export const emptyOrder = {
  shopId: 0,
  productsIdsAndQuantity: [],
  totalPrice: '',
  name: '',
  email: '',
  phone: '',
  address: '',
};

export const MAP_API_KEY = 'AIzaSyC8DSBubf3lvtRtevA1XLmqvALUVv4GYlE';

export const libraries: ('places' | 'geometry')[] = ['places'];

export const CAPTCHA_KEY = '6LekXFsmAAAAAB0Kli569wSHYJgPSzAgiVxmhvhH';

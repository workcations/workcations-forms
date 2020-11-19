import { PropertiesActionTypes } from "./properties.action-types";

import {
  getListOfStates,
  getListOfCities,
  getListOfProperties,
  getListOfCitiesByState,
  getListOfPropertiesByState,
  getListOfPropertiesByCity,
} from "./properties.utils";

const INITIAL_STATE = {
  propertyListData: [],
  stateList: [],
  cityList: [],
  propertyList: [],
  nameOfState: "",
  city: "",
  property: "",
  propertyData: null,
  bookingId: null,
  bookingLink: null,
  bookingCreated: false,
};

const propertiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PropertiesActionTypes.GET_PROPERTY_LIST_SUCCESS:
      return {
        ...state,
        propertyListData: action.payload,
      };
    case PropertiesActionTypes.GET_PROPERTY_LIST_FAILURE:
      return {
        ...state,
        propertyListData: "error",
      };
    case PropertiesActionTypes.SET_STATE_LIST:
      return {
        ...state,
        stateList: getListOfStates(state.propertyListData),
      };
    case PropertiesActionTypes.SET_CITY_LIST:
      return {
        ...state,
        cityList: getListOfCities(state.propertyListData),
      };
    case PropertiesActionTypes.SET_PROPERTY_LIST:
      return {
        ...state,
        propertyList: getListOfProperties(state.propertyListData),
      };
    case PropertiesActionTypes.SET_STATE:
      return {
        ...state,
        nameOfState: action.payload,
        cityList: getListOfCitiesByState(
          state.propertyListData,
          action.payload
        ),
        propertyList: getListOfPropertiesByState(
          state.propertyListData,
          action.payload
        ),
      };
    case PropertiesActionTypes.SET_CITY:
      return {
        ...state,
        city: action.payload,
        propertyList: getListOfPropertiesByCity(
          state.propertyListData,
          action.payload
        ),
      };
    case PropertiesActionTypes.SET_PROPERTY:
      return {
        ...state,
        propertyData: action.payload,
      };
    case PropertiesActionTypes.GET_PROPERTY_DATA_SUCCESS:
      return {
        ...state,
        propertyData: action.payload,
      };
    case PropertiesActionTypes.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        bookingId: action.payload.bookingId,
        bookingLink: action.payload.slug,
        bookingCreated: true,
      };
    case PropertiesActionTypes.CREATE_BOOKING_FAILURE:
      return {
        ...state,
        bookingId: action.payload,
        bookingCreated: true,
      };
    default:
      return state;
  }
};

export default propertiesReducer;

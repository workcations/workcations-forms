import { PropertiesActionTypes } from "./properties.action-types";

export const getPropertyListStart = () => ({
  type: PropertiesActionTypes.GET_PROPERTY_LIST_START,
});

export const getPropertyListSuccess = (list) => ({
  type: PropertiesActionTypes.GET_PROPERTY_LIST_SUCCESS,
  payload: list,
});

export const getPropertyListFailure = (error) => ({
  type: PropertiesActionTypes.GET_PROPERTY_LIST_FAILURE,
  payload: error,
});

export const setStateList = () => ({
  type: PropertiesActionTypes.SET_STATE_LIST,
});

export const setCityList = () => ({
  type: PropertiesActionTypes.SET_CITY_LIST,
});

export const setPropertyList = () => ({
  type: PropertiesActionTypes.SET_PROPERTY_LIST,
});

export const setState = (state) => ({
  type: PropertiesActionTypes.SET_STATE,
  payload: state,
});

export const setCity = (city) => ({
  type: PropertiesActionTypes.SET_CITY,
  payload: city,
});

export const setProperty = (slug) => ({
  type: PropertiesActionTypes.SET_PROPERTY,
  payload: slug,
});

export const getPropertyDataStart = (slug) => ({
  type: PropertiesActionTypes.GET_PROPERTY_DATA_START,
  payload: slug,
});

export const getPropertyDataSuccess = (property) => ({
  type: PropertiesActionTypes.GET_PROPERTY_DATA_SUCCESS,
  payload: property,
});

export const getPropertyDataFailure = (error) => ({
  type: PropertiesActionTypes.GET_PROPERTY_DATA_FAILURE,
  payload: error,
});

export const createBookingStart = (data) => ({
  type: PropertiesActionTypes.CREATE_BOOKING_START,
  payload: data,
});

export const createBookingSuccess = (id) => ({
  type: PropertiesActionTypes.CREATE_BOOKING_SUCCESS,
  payload: id,
});

export const createBookingFailure = (error) => ({
  type: PropertiesActionTypes.CREATE_BOOKING_FAILURE,
  payload: "error",
});

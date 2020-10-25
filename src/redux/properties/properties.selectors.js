import { createSelector } from "reselect";

const selectProperties = (state) => state.properties;

export const selectPropertyListData = createSelector(
  [selectProperties],
  (properties) => properties.propertyListData
);

export const selectStateList = createSelector(
  [selectProperties],
  (properties) => properties.stateList
);

export const selectCityList = createSelector(
  [selectProperties],
  (properties) => properties.cityList
);

export const selectPropertyList = createSelector(
  [selectProperties],
  (properties) => properties.propertyList
);

export const selectState = createSelector(
  [selectProperties],
  (properties) => properties.nameOfState
);

export const selectCity = createSelector(
  [selectProperties],
  (properties) => properties.city
);

export const selectProperty = createSelector(
  [selectProperties],
  (properties) => properties.property
);

export const selectPropertyData = createSelector(
  [selectProperties],
  (properties) => properties.propertyData
);

export const selectCreatingBooking = createSelector(
  [selectProperties],
  (properties) => properties.bookingCreated
);

export const selectBookingId = createSelector(
  [selectProperties],
  (properties) => properties.bookingId
);

export const selectBookingLink = createSelector(
  [selectProperties],
  (properties) => properties.bookingLink
);

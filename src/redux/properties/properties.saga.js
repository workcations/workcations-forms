import { all, call, takeLatest, put } from "redux-saga/effects";
import { PropertiesActionTypes } from "./properties.action-types";
import {
  getPropertyListSuccess,
  getPropertyListFailure,
  getPropertyDataSuccess,
  getPropertyDataFailure,
  createBookingSuccess,
  createBookingFailure,
} from "./properties.actions";
import {
  getPropertiesListExcel,
  getPropertyExcel,
  getBookingId,
} from "./properties.utils";

export function* createBooking({ payload: data }) {
  try {
    const response = yield getBookingId(data);
    yield put(createBookingSuccess(JSON.parse(response)));
  } catch (error) {
    yield put(createBookingFailure(error));
  }
}

export function* onCreateBookingStart() {
  yield takeLatest(PropertiesActionTypes.CREATE_BOOKING_START, createBooking);
}

export function* getProperty({ payload: slug }) {
  try {
    const property = yield getPropertyExcel(slug);
    yield put(getPropertyDataSuccess(property));
  } catch (error) {
    yield put(getPropertyDataFailure(error));
  }
}

export function* onGetPropertyStart() {
  yield takeLatest(PropertiesActionTypes.GET_PROPERTY_DATA_START, getProperty);
}

export function* getProperties() {
  try {
    const properties = yield getPropertiesListExcel();
    yield put(getPropertyListSuccess(properties));
  } catch (error) {
    yield put(getPropertyListFailure(error));
  }
}

export function* onGetPropertiesStart() {
  yield takeLatest(
    PropertiesActionTypes.GET_PROPERTY_LIST_START,
    getProperties
  );
}

export function* propertiesSagas() {
  yield all([
    call(onGetPropertiesStart),
    call(onGetPropertyStart),
    call(onCreateBookingStart),
  ]);
}

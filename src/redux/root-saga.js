import { all, call } from "redux-saga/effects";

import { propertiesSagas } from "./properties/properties.saga";

export default function* rootSaga() {
  yield all([call(propertiesSagas)]);
}

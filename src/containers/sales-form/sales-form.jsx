import React, { useState, useEffect, Fragment } from "react";
import SelectSearch from "react-select-search";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";

import {
  getPropertyListStart,
  setStateList,
  setCityList,
  setPropertyList,
  setState,
  setCity,
  setProperty,
  getPropertyDataStart,
  createBookingStart,
} from "../../redux/properties/properties.actions";

import {
  selectPropertyListData,
  selectStateList,
  selectCityList,
  selectPropertyList,
  selectPropertyData,
  selectCreatingBooking,
  selectBookingId,
  selectBookingLink,
} from "../../redux/properties/properties.selectors";

import "./selectsearch.css";
import "../sales-form-new/node_modules/react-datepicker/dist/react-datepicker.css";

import FormInput from "../../components/form-input-text/form-input-text";
import FormInputTextArea from "../../components/form-input-text-area/form-input-text-area";
import Button from "../../components/button/button";
import { CheckBox } from "../../components/checkbox/checkbox";

import {
  PageContainer,
  SectionContainer,
  ClientDetails,
  PropertyDetails,
  SelectOptions,
  CinCoutContainer,
  CinCoutLabel,
  CinCoutWrapper,
  DatePickerDiv,
  RoomsContainer,
  RoomContainer,
  RoomType,
  RoomSharing,
  SharingDetails,
  SharingTitle,
  SharingPrice,
  AddButton,
  PlusMinus,
  Plus,
  PaymentDetails,
  Grid,
  FlexItem,
  Summary,
  PropertyTitle,
  CheckInCheckOut,
  SummaryItem,
  Image,
  CartSharingTitle,
  Sharing,
  SharingItem,
  CartSharingSharingTitle,
  SharingCount,
  SharingTotal,
  CartTotal,
  Line,
  GenerateBooking,
  Title,
  MealsGrid,
  MealsItem,
} from "./sales-form.style";

const DateInput = ({ value, onClick }) => (
  <DatePickerDiv onClick={onClick}>{value}</DatePickerDiv>
);

const getNoOfDays = (date1, date2) => {
  return (date2.getTime() - date1.getTime()) / 86400000;
};

const getTotal = (total, num) => {
  return total + num;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SalesForm = () => {
  const [isForm, setForm] = useState(true);

  const dispatch = useDispatch();
  const propertyListData = useSelector(selectPropertyListData);
  const stateList = useSelector(selectStateList);
  const cityList = useSelector(selectCityList);
  const propertyList = useSelector(selectPropertyList);
  const propertyData = useSelector(selectPropertyData);
  const isBookingCreated = useSelector(selectCreatingBooking);
  const bookingId = useSelector(selectBookingId);
  const bookingLink = useSelector(selectBookingLink);

  useEffect(() => {
    if (propertyListData.length === 0) {
      dispatch(getPropertyListStart());
    } else if (stateList.length === 0) {
      dispatch(setStateList());
      dispatch(setCityList());
      dispatch(setPropertyList());
    }
  }, [dispatch, propertyListData, stateList]);

  const today = new Date();
  let endDateInitial = new Date();

  endDateInitial.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(endDateInitial);
  const [minEndDate, setMinEndDate] = useState(endDateInitial);

  const setCheckInDate = (date) => {
    if (date > today) {
      const checkInDate = date;
      let newMinDate = new Date(date);
      newMinDate.setDate(checkInDate.getDate() + 1);
      setMinEndDate(newMinDate);
      if (newMinDate > endDate) {
        setEndDate(newMinDate);
      }
    }
  };

  const [formPosition, setFormPosition] = useState(0);
  const [clientButton, setClientButton] = useState(false);
  const [bookingButton, setBookingButton] = useState(false);
  const [paymentButton, setPaymentButton] = useState(false);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [cart, setCartFinal] = useState(null);

  const [cartDetails, setCart] = useState(null);

  useEffect(() => {
    if (
      propertyData &&
      propertyData[0] &&
      propertyData[0].slug === selectedProperty
    ) {
      setCart(
        propertyData[0].inventory.map((room, roomIndex) => {
          return {
            type: room.type,
            image: room.image,
            max: room.max,
            isMaxed: false,
            rooms: room.short.map((roomSharing, i) => {
              return {
                sharing: roomSharing.sharing,
                ultrashort:
                  propertyData[0].inventory[roomIndex].ultrashort[i].cost,
                short: roomSharing.cost,
                normal: propertyData[0].inventory[roomIndex].normal[i].cost,
                long: propertyData[0].inventory[roomIndex].long[i].cost,
                ultralong:
                  propertyData[0].inventory[roomIndex].ultralong[i].cost,
                count: 0,
              };
            }),
          };
        })
      );
    } else {
      setCart(null);
    }
  }, [dispatch, propertyData, selectedProperty]);

  useEffect(() => {
    if (cartDetails && cartDetails[0]) {
      setCartFinal(
        cartDetails
          .map((room) => {
            return {
              type: room.type,
              image: room.image,
              rooms: room.rooms.filter((sharing) => sharing.count > 0),
            };
          })
          .filter((room) => room.rooms.length > 0)
      );
    } else {
      setCartFinal(null);
    }
  }, [dispatch, cartDetails]);

  const addRoom = (roomIndex, sharingIndex) => {
    const newCount = cartDetails[roomIndex].rooms[sharingIndex].count + 1;

    let newTotal = 0;

    for (let i = 0; i < cartDetails[roomIndex].rooms.length; i++) {
      newTotal += cartDetails[roomIndex].rooms[i].count;
    }

    newTotal++;

    let isCountMax = false;

    if (newTotal === Number(cartDetails[roomIndex].max)) {
      isCountMax = true;
    }

    const newTotalPax = cartDetails
      .map((roomType, i) =>
        i === roomIndex
          ? {
              type: roomType.type,
              image: roomType.image,
              max: roomType.max,
              isMaxed: isCountMax,
              rooms: roomType.rooms.map((roomSharing, j) =>
                j === sharingIndex
                  ? {
                      sharing: roomSharing.sharing,
                      ultrashort: roomSharing.ultrashort,
                      short: roomSharing.short,
                      normal: roomSharing.normal,
                      long: roomSharing.long,
                      ultralong: roomSharing.ultralong,
                      count: newCount,
                    }
                  : roomSharing
              ),
            }
          : roomType
      )
      .map((room) => {
        return {
          type: room.type,
          image: room.image,
          rooms: room.rooms.filter((sharing) => sharing.count > 0),
        };
      })
      .filter((room) => room.rooms.length > 0)
      .map((item) =>
        item.rooms
          .map((room) =>
            room.sharing === "Single Sharing"
              ? room.count * 1
              : room.sharing === "Double Sharing"
              ? room.count * 2
              : room.sharing === "Triple Sharing"
              ? room.count * 3
              : room.sharing === "Dorm Bed"
              ? room.count * 1
              : 0
          )
          .reduce(getTotal, 0)
      )
      .reduce(getTotal, 0);
    if (
      newTotal <= cartDetails[roomIndex].max &&
      newTotalPax <= noOfPax.value
    ) {
      setCart(
        cartDetails.map((roomType, i) =>
          i === roomIndex
            ? {
                type: roomType.type,
                image: roomType.image,
                max: roomType.max,
                isMaxed: isCountMax,
                rooms: roomType.rooms.map((roomSharing, j) =>
                  j === sharingIndex
                    ? {
                        sharing: roomSharing.sharing,
                        ultrashort: roomSharing.ultrashort,
                        short: roomSharing.short,
                        normal: roomSharing.normal,
                        long: roomSharing.long,
                        ultralong: roomSharing.ultralong,
                        count: newCount,
                      }
                    : roomSharing
                ),
              }
            : roomType
        )
      );
      setTotalPax({ ...noOfPax, warningMessage: "" });
    } else if (newTotalPax > noOfPax.value) {
      setTotalPax({
        ...noOfPax,
        warningMessage: "The new total will exceed the number of pax",
      });
    } else {
      setTotalPax({
        ...noOfPax,
        warningMessage: "There are no more this type of rooms available",
      });
    }

    setBookingButton(true);
  };

  const removeRoom = (roomIndex, sharingIndex) => {
    const newCount = cartDetails[roomIndex].rooms[sharingIndex].count - 1;

    if (newCount >= 0) {
      setCart(
        cartDetails.map((roomType, i) =>
          i === roomIndex
            ? {
                type: roomType.type,
                image: roomType.image,
                max: roomType.max,
                isMaxed: roomType.isMaxed,
                rooms: roomType.rooms.map((roomSharing, j) =>
                  j === sharingIndex
                    ? {
                        sharing: roomSharing.sharing,
                        ultrashort: roomSharing.ultrashort,
                        short: roomSharing.short,
                        normal: roomSharing.normal,
                        long: roomSharing.long,
                        ultralong: roomSharing.ultralong,
                        count: newCount,
                      }
                    : roomSharing
                ),
              }
            : roomType
        )
      );
      setTotalPax({ ...noOfPax, warningMessage: "" });
    }

    if (
      cartDetails
        .map((room) =>
          room.rooms
            .map((sharing) =>
              Math.round(getNoOfDays(startDate, endDate)) < 15
                ? Math.round(getNoOfDays(startDate, endDate)) < 15
                  ? Math.round(getNoOfDays(startDate, endDate)) *
                    1 *
                    sharing.count
                  : Math.round(getNoOfDays(startDate, endDate)) *
                    1 *
                    sharing.count
                : Math.round(getNoOfDays(startDate, endDate)) *
                  1 *
                  sharing.count
            )
            .reduce(getTotal, 0)
        )
        .reduce(getTotal, 0) === 1
    ) {
      setBookingButton(false);
    }
  };

  const [fullName, setName] = useState({
    value: "",
    warningMessage: "",
  });

  const [phone, setPhone] = useState({
    value: "",
    warningMessage: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "name") {
      setName({ ...fullName, value: value });
    } else if (name === "phone" && value.length !== 11)
      setPhone({ ...phone, value: value });
  };

  useEffect(() => {
    if (fullName.value.length > 0 && phone.value.length === 10) {
      setClientButton(true);
    } else {
      setClientButton(false);
    }
  }, [phone, fullName]);

  useEffect(() => {
    if (selectedState) {
      dispatch(setState(selectedState));
    }
  }, [dispatch, selectedState]);

  useEffect(() => {
    if (selectedCity) {
      dispatch(setCity(selectedCity));
    }
  }, [dispatch, selectedCity]);

  useEffect(() => {
    if (selectedProperty) {
      dispatch(setProperty(selectedProperty));
      dispatch(getPropertyDataStart(selectedProperty));
    }
  }, [dispatch, selectedProperty]);

  /*const submitClientDetails = () => {
    if (clientButton) {
      setFormPosition(1);
      dispatch(setStateList());
      dispatch(setCityList());
      dispatch(setPropertyList());
    }
  };*/

  const [noOfPax, setTotalPax] = useState({
    value: null,
    warningMessage: "",
  });

  const [advanceAmount, setAdvanceAmount] = useState({
    value: null,
    warningMessage: "",
  });

  const [sellingAmount, setSellingAmount] = useState({
    value: null,
    warningMessage: "",
  });

  const [advanceAccount, setAdvanceAccount] = useState({
    value: "",
    warningMessage: "",
  });

  const [salesEmail, setSalesEmail] = useState({
    value: "",
    warningMessage: "",
  });

  const [leadSource, setLeadSource] = useState({
    value: "",
    warningMessage: "",
  });

  const [transportation, setTransportation] = useState({
    value: "",
    warningMessage: "",
  });

  const [remarks, setRemarks] = useState("");

  const handleChangeAdvance = (event) => {
    const { value, name } = event.target;

    if (name === "advanceAccount") {
      setAdvanceAccount({ ...advanceAccount, value: value });
    } else if (name === "sellingAmount") {
      setSellingAmount({ ...sellingAmount, value: value });
    } else if (name === "advanceAmount") {
      setAdvanceAmount({ ...advanceAmount, value: value });
    } else if (name === "salesEmail") {
      setSalesEmail({ ...salesEmail, value: value });
    } else if (name === "leadSource") {
      setLeadSource({ ...leadSource, value: value });
    } else if (name === "totalPax") {
      setTotalPax({ ...noOfPax, value: value });
    } else if (name === "transportation") {
      setTransportation({ ...transportation, value: value });
    } else if (name === "remarks") {
      setRemarks(value);
    }

    if (
      advanceAccount.value.length > 0 &&
      advanceAmount.value.length > 0 &&
      sellingAmount.value.length > 0 &&
      salesEmail.value.length > 0 &&
      leadSource.value.length > 0 &&
      transportation.value.length > 0
    ) {
      setPaymentButton(true);
    } else {
      setPaymentButton(false);
    }
  };

  const [breakfastBox, setBreakfast] = useState({ state: false, value: 0 });
  const [lunchBox, setLunch] = useState({ state: false, value: 0 });
  const [dinnerBox, setDinner] = useState({ state: false, value: 0 });
  const [mealsTotalValue, setMealsTotalValue] = useState(0);

  useEffect(() => {
    let mealsTotalValueLocal = 0;

    if (breakfastBox.state) {
      mealsTotalValueLocal += Number(breakfastBox.value);
    }

    if (lunchBox.state) {
      mealsTotalValueLocal += Number(lunchBox.value);
    }

    if (dinnerBox.state) {
      mealsTotalValueLocal += Number(dinnerBox.value);
    }

    setMealsTotalValue(mealsTotalValueLocal);
  }, [breakfastBox, lunchBox, dinnerBox]);

  useEffect(() => {
    if (propertyData && propertyData[0] && propertyData[0].breakfast) {
      if (propertyData[0].breakfast === "-1") {
        setBreakfast({
          state: false,
          value: 0,
        });
      } else if (propertyData[0].breakfast === "0") {
        setBreakfast({
          state: true,
          value: 0,
        });
      } else {
        setBreakfast({
          state: false,
          value: propertyData[0].breakfast,
        });
      }
    }
  }, [propertyData]);

  useEffect(() => {
    if (propertyData && propertyData[0] && propertyData[0].lunch) {
      if (propertyData[0].lunch === "-1") {
        setLunch({
          state: false,
          value: 0,
        });
      } else if (propertyData[0].lunch === "0") {
        setLunch({
          state: true,
          value: 0,
        });
      } else {
        setLunch({
          state: false,
          value: propertyData[0].lunch,
        });
      }
    }
  }, [propertyData]);

  useEffect(() => {
    if (propertyData && propertyData[0] && propertyData[0].dinner) {
      if (propertyData[0].dinner === "-1") {
        setDinner({
          state: false,
          value: 0,
        });
      } else if (propertyData[0].dinner === "0") {
        setDinner({
          state: true,
          value: 0,
        });
      } else {
        setDinner({
          state: false,
          value: propertyData[0].dinner,
        });
      }
    }
  }, [propertyData]);

  const handleChangeMeals = (event) => {
    const { value, name } = event.target;

    if (name === "breakfastValue") {
      setBreakfast({ state: breakfastBox.state, value: value });
    } else if (name === "lunchValue") {
      setLunch({ state: lunchBox.state, value: value });
    } else if (name === "dinnerValue") {
      setDinner({ state: dinnerBox.state, value: value });
    }
  };

  return (
    <PageContainer formPosition={formPosition}>
      {isForm ? (
        <Fragment>
          <SectionContainer>
            <ClientDetails>
              <Title>Client Details</Title>
              <FormInput
                name="name"
                type="text"
                value={fullName.value}
                required
                label="Full Name"
                warningMessage={fullName.warningMessage}
                handleChange={handleChange}
              />
              <FormInput
                name="phone"
                type="number"
                value={phone.value}
                required
                label="WhatsApp No"
                warningMessage={phone.warningMessage}
                handleChange={handleChange}
              />
            </ClientDetails>
          </SectionContainer>
          <SectionContainer>
            <PropertyDetails>
              <Title>Booking Details</Title>
              <SelectOptions>
                <SelectSearch
                  options={stateList}
                  search
                  placeholder="Select State"
                  onChange={setSelectedState}
                />
                <SelectSearch
                  options={cityList}
                  search
                  placeholder="Select City"
                  onChange={setSelectedCity}
                />
                <SelectSearch
                  options={propertyList}
                  search
                  placeholder="Select Property"
                  onChange={setSelectedProperty}
                />
              </SelectOptions>
              <CinCoutContainer>
                <CinCoutWrapper>
                  <CinCoutLabel>
                    <span>Check In</span>
                  </CinCoutLabel>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setCheckInDate(date);
                    }}
                    popperModifiers={{
                      offset: {
                        enabled: true,
                        offset: "0px, 10px",
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "viewport",
                      },
                    }}
                    customInput={<DateInput />}
                    minDate={new Date()}
                  />
                </CinCoutWrapper>
                <CinCoutWrapper>
                  <CinCoutLabel>
                    <span>Check Out</span>
                  </CinCoutLabel>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    popperModifiers={{
                      offset: {
                        enabled: true,
                        offset: "-100px, 10px",
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "viewport",
                      },
                    }}
                    customInput={<DateInput />}
                    minDate={minEndDate}
                  />
                </CinCoutWrapper>
              </CinCoutContainer>
              <FormInput
                name="totalPax"
                type="number"
                value={noOfPax.value}
                required
                label="Total No of Pax"
                warningMessage={noOfPax.warningMessage}
                handleChange={handleChangeAdvance}
              />
              {!cartDetails ? null : (
                <RoomsContainer className="carousel">
                  {propertyData[0].inventory.map((room, i) => (
                    <RoomContainer key={room.type}>
                      <RoomType>
                        <span>{room.type}</span>
                      </RoomType>
                      {room.short.map((sharing, j) => (
                        <RoomSharing key={sharing + j}>
                          <SharingTitle>
                            <span>{sharing.sharing}</span>
                          </SharingTitle>
                          <SharingDetails>
                            <SharingPrice>
                              ₹{" "}
                              {Math.round(getNoOfDays(startDate, endDate)) < 21
                                ? Math.round(getNoOfDays(startDate, endDate)) <
                                  16
                                  ? Math.round(
                                      getNoOfDays(startDate, endDate)
                                    ) < 11
                                    ? Math.round(
                                        getNoOfDays(startDate, endDate)
                                      ) < 6
                                      ? room.ultrashort[j].cost
                                      : sharing.cost
                                    : room.normal[j].cost
                                  : room.long[j].cost
                                : room.ultralong[j].cost}
                              /-
                            </SharingPrice>
                            <span>per {room.unit} per night</span>
                          </SharingDetails>
                          <PlusMinus>
                            {cartDetails[i].rooms[j].count > 0 ? (
                              <div>
                                <span
                                  onClick={() => {
                                    removeRoom(i, j);
                                  }}
                                >
                                  -
                                </span>
                                <span>{cartDetails[i].rooms[j].count}</span>
                                <Plus
                                  isMaxed={cartDetails[i].isMaxed}
                                  onClick={() => {
                                    addRoom(i, j);
                                  }}
                                >
                                  +
                                </Plus>
                              </div>
                            ) : (
                              <AddButton
                                isMaxed={cartDetails[i].isMaxed}
                                onClick={() => {
                                  addRoom(i, j);
                                }}
                              >
                                ADD
                              </AddButton>
                            )}
                          </PlusMinus>
                        </RoomSharing>
                      ))}
                    </RoomContainer>
                  ))}
                </RoomsContainer>
              )}
              {propertyData[0] && propertyData[0].breakfast ? (
                <MealsGrid>
                  <MealsItem>
                    <CheckBox
                      name="breakfast"
                      label={"Breakfast"}
                      handleChange={() => {
                        setBreakfast({
                          value: breakfastBox.value,
                          state: !breakfastBox.state,
                        });
                      }}
                      checked={breakfastBox.state}
                    />
                    <FormInput
                      name="breakfastValue"
                      type="number"
                      value={breakfastBox.value}
                      required
                      label="Cost"
                      warningMessage={""}
                      handleChange={handleChangeMeals}
                    />
                  </MealsItem>
                  <MealsItem>
                    <CheckBox
                      name="lunch"
                      label={"Lunch"}
                      handleChange={() => {
                        setLunch({
                          value: lunchBox.value,
                          state: !lunchBox.state,
                        });
                      }}
                      checked={lunchBox.state}
                    />
                    <FormInput
                      name="lunchValue"
                      type="number"
                      value={lunchBox.value}
                      required
                      label="Cost"
                      warningMessage={""}
                      handleChange={handleChangeMeals}
                    />
                  </MealsItem>
                  <MealsItem>
                    <CheckBox
                      name="dinner"
                      label={"Dinner"}
                      handleChange={() => {
                        setDinner({
                          value: dinnerBox.value,
                          state: !dinnerBox.state,
                        });
                      }}
                      checked={dinnerBox.state}
                    />
                    <FormInput
                      name="dinnerValue"
                      type="number"
                      value={dinnerBox.value}
                      required
                      label="Cost"
                      warningMessage={""}
                      handleChange={handleChangeMeals}
                    />
                  </MealsItem>
                </MealsGrid>
              ) : null}
            </PropertyDetails>
          </SectionContainer>
          <SectionContainer>
            <PaymentDetails>
              <Title>Payment Details</Title>
              <Grid>
                <div>
                  <FormInput
                    name="sellingAmount"
                    type="number"
                    value={sellingAmount.value}
                    required
                    label="Selling Amount"
                    warningMessage={sellingAmount.warningMessage}
                    handleChange={handleChangeAdvance}
                  />
                  <FormInput
                    name="advanceAmount"
                    type="number"
                    value={advanceAmount.value}
                    required
                    label="Advance Received"
                    warningMessage={advanceAmount.warningMessage}
                    handleChange={handleChangeAdvance}
                  />
                  <FormInput
                    name="advanceAccount"
                    type="text"
                    value={advanceAccount.value}
                    required
                    label="Account"
                    warningMessage={advanceAccount.warningMessage}
                    handleChange={handleChangeAdvance}
                  />
                  <FormInput
                    name="salesEmail"
                    type="email"
                    value={salesEmail.value}
                    required
                    label="Sales Person Email"
                    warningMessage={salesEmail.warningMessage}
                    handleChange={handleChangeAdvance}
                  />
                  <FormInput
                    name="leadSource"
                    type="text"
                    value={leadSource.value}
                    required
                    label="Lead Source"
                    warningMessage={leadSource.warningMessage}
                    handleChange={handleChangeAdvance}
                  />
                  <FormInput
                    name="transportation"
                    type="text"
                    value={transportation.value}
                    required
                    label="Transportation"
                    warningMessage={transportation.warningMessage}
                    handleChange={handleChangeAdvance}
                  />
                  <FormInputTextArea
                    name="remarks"
                    type="textarea"
                    value={remarks.value}
                    label="Remarks"
                    warningMessage=""
                    handleChange={handleChangeAdvance}
                  />
                </div>
                {cart ? (
                  <FlexItem className="carousel">
                    <h2>Booking Summary</h2>
                    <Summary>
                      <PropertyTitle>{propertyData[0].title}</PropertyTitle>
                      <CheckInCheckOut>
                        <div>
                          Check In
                          <span>
                            {startDate.getDate()}{" "}
                            {monthNames[startDate.getMonth()]}
                            {", "}
                            {startDate.getFullYear()}
                          </span>
                        </div>
                        <div>
                          Check Out
                          <span>
                            {endDate.getDate()} {monthNames[endDate.getMonth()]}
                            {", "}
                            {endDate.getFullYear()}
                          </span>
                        </div>
                      </CheckInCheckOut>
                      {cart.map((cartItem, i) => (
                        <SummaryItem key={i}>
                          <Image
                            src={
                              "https://assets.workcations.in/" +
                              propertyData[0].slug +
                              "/" +
                              cartItem.image +
                              ".jpg"
                            }
                            alt={cartItem.image}
                          />
                          <CartSharingTitle>{cartItem.type}</CartSharingTitle>
                          <Sharing>
                            {cartItem.rooms.map((room, j) => (
                              <SharingItem key={i + "room" + j}>
                                <CartSharingSharingTitle>
                                  {room.sharing}
                                  <span>
                                    INR{" "}
                                    {Math.round(
                                      getNoOfDays(startDate, endDate)
                                    ) < 21
                                      ? Math.round(
                                          getNoOfDays(startDate, endDate)
                                        ) < 16
                                        ? Math.round(
                                            getNoOfDays(startDate, endDate)
                                          ) < 11
                                          ? Math.round(
                                              getNoOfDays(startDate, endDate)
                                            ) < 6
                                            ? room.ultrashort
                                            : room.short
                                          : room.normal
                                        : room.long
                                      : room.ultralong}
                                    /- per night
                                  </span>
                                </CartSharingSharingTitle>
                                <SharingCount>X {room.count}</SharingCount>
                                <SharingTotal>
                                  =&nbsp;&nbsp;&nbsp;
                                  {(
                                    room.count *
                                    (Math.round(
                                      getNoOfDays(startDate, endDate)
                                    ) < 21
                                      ? Math.round(
                                          getNoOfDays(startDate, endDate)
                                        ) < 16
                                        ? Math.round(
                                            getNoOfDays(startDate, endDate)
                                          ) < 11
                                          ? Math.round(
                                              getNoOfDays(startDate, endDate)
                                            ) < 6
                                            ? room.ultrashort
                                            : room.short
                                          : room.normal
                                        : room.long
                                      : room.ultralong)
                                  ).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  })}
                                </SharingTotal>
                              </SharingItem>
                            ))}
                          </Sharing>
                        </SummaryItem>
                      ))}
                      <CartTotal>
                        {breakfastBox.state &&
                        Number(breakfastBox.value) > 0 ? (
                          <div>
                            <span>Breakfast</span>
                            <span>
                              {(
                                Number(breakfastBox.value) *
                                Number(noOfPax.value) *
                                Math.round(getNoOfDays(startDate, endDate))
                              ).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </div>
                        ) : null}
                        {lunchBox.state && Number(lunchBox.value) > 0 ? (
                          <div>
                            <span>Lunch</span>
                            <span>
                              {(
                                Number(lunchBox.value) *
                                Number(noOfPax.value) *
                                Math.round(getNoOfDays(startDate, endDate))
                              ).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </div>
                        ) : null}
                        {dinnerBox.state && Number(dinnerBox.value) > 0 ? (
                          <div>
                            <span>Dinner</span>
                            <span>
                              {(
                                Number(dinnerBox.value) *
                                Number(noOfPax.value) *
                                Math.round(getNoOfDays(startDate, endDate))
                              ).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </div>
                        ) : null}
                        <div>
                          <span>Total</span>
                          <span>
                            {(
                              cart
                                .map((cartItem) =>
                                  cartItem.rooms
                                    .map((room) =>
                                      Math.round(
                                        getNoOfDays(startDate, endDate)
                                      ) < 21
                                        ? Math.round(
                                            getNoOfDays(startDate, endDate)
                                          ) < 16
                                          ? Math.round(
                                              getNoOfDays(startDate, endDate)
                                            ) < 11
                                            ? Math.round(
                                                getNoOfDays(startDate, endDate)
                                              ) < 6
                                              ? room.ultrashort *
                                                room.count *
                                                Math.round(
                                                  getNoOfDays(
                                                    startDate,
                                                    endDate
                                                  )
                                                )
                                              : room.short *
                                                room.count *
                                                Math.round(
                                                  getNoOfDays(
                                                    startDate,
                                                    endDate
                                                  )
                                                )
                                            : room.normal *
                                              room.count *
                                              Math.round(
                                                getNoOfDays(startDate, endDate)
                                              )
                                          : room.long *
                                            room.count *
                                            Math.round(
                                              getNoOfDays(startDate, endDate)
                                            )
                                        : room.ultralong *
                                          room.count *
                                          Math.round(
                                            getNoOfDays(startDate, endDate)
                                          )
                                    )
                                    .reduce(getTotal, 0)
                                )
                                .reduce(getTotal, 0) +
                              mealsTotalValue *
                                Number(noOfPax.value) *
                                Math.round(getNoOfDays(startDate, endDate))
                            ).toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </div>
                        <div>
                          <span>GST(5%)</span>
                          <span>
                            {(
                              cart
                                .map((cartItem) =>
                                  cartItem.rooms
                                    .map((room) =>
                                      Math.round(
                                        getNoOfDays(startDate, endDate)
                                      ) < 21
                                        ? Math.round(
                                            getNoOfDays(startDate, endDate)
                                          ) < 16
                                          ? Math.round(
                                              getNoOfDays(startDate, endDate)
                                            ) < 11
                                            ? Math.round(
                                                getNoOfDays(startDate, endDate)
                                              ) < 6
                                              ? room.ultrashort *
                                                room.count *
                                                0.05 *
                                                Math.round(
                                                  getNoOfDays(
                                                    startDate,
                                                    endDate
                                                  )
                                                )
                                              : room.short *
                                                room.count *
                                                0.05 *
                                                Math.round(
                                                  getNoOfDays(
                                                    startDate,
                                                    endDate
                                                  )
                                                )
                                            : room.normal *
                                              room.count *
                                              0.05 *
                                              Math.round(
                                                getNoOfDays(startDate, endDate)
                                              )
                                          : room.long *
                                            room.count *
                                            0.05 *
                                            Math.round(
                                              getNoOfDays(startDate, endDate)
                                            )
                                        : room.ultralong *
                                          room.count *
                                          0.05 *
                                          Math.round(
                                            getNoOfDays(startDate, endDate)
                                          )
                                    )
                                    .reduce(getTotal, 0)
                                )
                                .reduce(getTotal, 0) +
                              mealsTotalValue *
                                Number(noOfPax.value) *
                                Math.round(getNoOfDays(startDate, endDate)) *
                                0.05
                            ).toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </div>
                        <div>
                          <span>Discount</span>
                          <span>
                            {(
                              cart
                                .map((cartItem) =>
                                  cartItem.rooms
                                    .map((room) =>
                                      Math.round(
                                        getNoOfDays(startDate, endDate)
                                      ) < 21
                                        ? Math.round(
                                            getNoOfDays(startDate, endDate)
                                          ) < 16
                                          ? Math.round(
                                              getNoOfDays(startDate, endDate)
                                            ) < 11
                                            ? Math.round(
                                                getNoOfDays(startDate, endDate)
                                              ) < 6
                                              ? room.ultrashort *
                                                room.count *
                                                1.05 *
                                                Math.round(
                                                  getNoOfDays(
                                                    startDate,
                                                    endDate
                                                  )
                                                )
                                              : room.short *
                                                room.count *
                                                1.05 *
                                                Math.round(
                                                  getNoOfDays(
                                                    startDate,
                                                    endDate
                                                  )
                                                )
                                            : room.normal *
                                              room.count *
                                              1.05 *
                                              Math.round(
                                                getNoOfDays(startDate, endDate)
                                              )
                                          : room.long *
                                            room.count *
                                            1.05 *
                                            Math.round(
                                              getNoOfDays(startDate, endDate)
                                            )
                                        : room.ultralong *
                                          room.count *
                                          1.05 *
                                          Math.round(
                                            getNoOfDays(startDate, endDate)
                                          )
                                    )
                                    .reduce(getTotal, 0)
                                )
                                .reduce(getTotal, 0) +
                              mealsTotalValue *
                                Number(noOfPax.value) *
                                Math.round(getNoOfDays(startDate, endDate)) *
                                1.05 -
                              Number(sellingAmount.value)
                            ).toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </div>
                        <Line />
                        <div>
                          <span>Grand Total</span>
                          <span>
                            {Number(sellingAmount.value).toLocaleString(
                              "en-IN",
                              {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              }
                            )}
                          </span>
                        </div>
                        <Line />
                      </CartTotal>
                    </Summary>
                  </FlexItem>
                ) : null}
              </Grid>

              <Button
                onClick={() => {
                  if (clientButton && bookingButton && paymentButton) {
                    let TotalPax = cart
                      .map((item) =>
                        item.rooms
                          .map((room) =>
                            room.sharing === "Single Sharing"
                              ? room.count * 1
                              : room.sharing === "Double Sharing"
                              ? room.count * 2
                              : room.sharing === "Triple Sharing"
                              ? room.count * 3
                              : room.sharing === "Dorm Bed"
                              ? room.count * 1
                              : null
                          )
                          .reduce(getTotal, 0)
                      )
                      .reduce(getTotal, 0);

                    let totalPax;

                    if (
                      cart[0].rooms[0].sharing === "Entire Apartment" ||
                      TotalPax === 0
                    ) {
                      totalPax = noOfPax;
                    } else {
                      totalPax = {
                        value: TotalPax,
                        warningMessage: "",
                      };
                    }
                    const data = {
                      name: fullName.value,
                      phone: phone.value,
                      totalPax,
                      salesPerson: salesEmail.value,
                      advance: advanceAmount.value,
                      account: advanceAccount.value,
                      amount: sellingAmount.value,
                      leadSource: leadSource.value,
                      transportation: transportation.value,
                      checkIn: startDate,
                      checkOut: endDate,
                      property: propertyData[0],
                      breakfast: breakfastBox,
                      lunch: lunchBox,
                      dinner: dinnerBox,
                      cart: cart,
                      cartDetails: cartDetails,
                      customer: false,
                      remarks: remarks,
                    };
                    dispatch(createBookingStart(JSON.stringify(data)));
                    setForm(false);
                    setFormPosition(3);
                  }
                }}
                value="Generate Booking"
                isActive={paymentButton}
              />
            </PaymentDetails>
          </SectionContainer>
        </Fragment>
      ) : (
        <SectionContainer>
          <GenerateBooking>
            <Title>Booking Generated</Title>
            {isBookingCreated ? (
              bookingId === "error" ? (
                <div>There is an error.</div>
              ) : (
                <div>
                  Booking has been generated with Booking Id: {bookingId}
                  <br />
                  Here is the link for customer form:{" "}
                  <a
                    href={"https://www.workcations.in/bookings/" + bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.workcations.in/bookings/{bookingLink}
                  </a>
                </div>
              )
            ) : (
              <div>Booking is being created</div>
            )}
          </GenerateBooking>
        </SectionContainer>
      )}
    </PageContainer>
  );
};

export default SalesForm;


/*

ravik@wanderon.onmicrosoft.com
10P13ea0105__

*/
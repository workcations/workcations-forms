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
import "react-datepicker/dist/react-datepicker.css";

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

const propertyTypes = [
  "apartment",
  "campsite",
  "homestay",
  "hotel",
  "hostel",
  "resort",
  "villa",
];

const convertDate = (date) =>
  `${date.split("-")[0]}-${
    date.split("-")[1].length === 1
      ? "0" + date.split("-")[1]
      : date.split("-")[1]
  }-${
    date.split("-")[2].length === 1
      ? "0" + date.split("-")[2]
      : date.split("-")[2]
  }`;

const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const addDays = (days, currentDate) => {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + days);
  return date;
};

const getDatesBetweenPricing = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  let dateArray = [];
  let currentDate = fromDate;

  while (currentDate < toDate) {
    dateArray.push(
      convertDate(
        `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`
      )
    );
    currentDate = addDays(1, currentDate);
  }

  return dateArray;
};

const getDatesBetween = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  let dateArray = [];
  let currentDate = fromDate;

  while (currentDate <= toDate) {
    dateArray.push(
      convertDate(
        `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`
      )
    );
    currentDate = addDays(1, currentDate);
  }

  return dateArray;
};

const mappingTree = [
  "Single Sharing",
  "Double Sharing",
  "Triple Sharing",
  "Quad Sharing",
  "Entire Apartment",
  "Dorm Bed",
  "Single Room",
  "Entire Room",
];

const typesOfViews = [
  "Mountain View",
  "Beach View",
  "Forest View",
  "Lake View",
  "River View",
];

const typesOfUnit = ["Room", "Unit", "Bed", "Cottage"];

const getRoomSharing = (unit, occupancy) => {
  const mappingIndex =
    unit === 0 || unit === 3
      ? occupancy === 1
        ? 0
        : occupancy === 2
        ? 1
        : occupancy === 3
        ? 2
        : 3
      : unit === 1
      ? 4
      : 5;

  return mappingIndex;
};

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

  const [paymentButton, setPaymentButton] = useState(false);

  const [formDetails, setFormDetails] = useState({
    fullName: "",
    phone: "",
    totalPax: null,
    sellingAmount: "",
    advanceAmount: "",
    advanceAccount: "",
    salesEmail: "",
    leadSource: "",
    transportation: "",
    remarks: "",
  });

  const {
    fullName,
    phone,
    totalPax,
    sellingAmount,
    advanceAmount,
    advanceAccount,
    salesEmail,
    leadSource,
    transportation,
    remarks,
  } = formDetails;

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  const [startDateCosting, setStartDateCosting] = useState(
    convertDate(
      `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    )
  );
  const [endDateCosting, setEndDateCosting] = useState(
    convertDate(
      `${endDateInitial.getFullYear()}-${
        endDateInitial.getMonth() + 1
      }-${endDateInitial.getDate()}`
    )
  );

  useEffect(() => {
    setStartDateCosting(
      convertDate(
        `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`
      )
    );
  }, [startDate]);

  useEffect(() => {
    setEndDateCosting(
      convertDate(
        `${endDate.getFullYear()}-${
          endDate.getMonth() + 1
        }-${endDate.getDate()}`
      )
    );
  }, [endDate]);

  const [pricingDuration, setPricingDuration] = useState("ultraShort");

  useEffect(() => {
    if (!!startDateCosting && !!endDateCosting) {
      const startingDate = new Date(startDateCosting);
      const endingDate = new Date(endDateCosting);
      const noOfDays = Math.round(getNoOfDays(startingDate, endingDate));

      noOfDays > 29
        ? setPricingDuration("monthly")
        : noOfDays > 20
        ? setPricingDuration("ultraLong")
        : noOfDays > 15
        ? setPricingDuration("long")
        : noOfDays > 10
        ? setPricingDuration("normal")
        : noOfDays > 5
        ? setPricingDuration("short")
        : setPricingDuration("ultraShort");
    }
  }, [startDateCosting, endDateCosting]);

  const [pricingArray, setPricingArray] = useState([]);

  useEffect(() => {
    if (!!propertyData && !!propertyData.id) {
      setPricingArray(
        propertyData.inventory.map((item) =>
          item.pricing.map((pricingItem, i) => {
            return {
              from: pricingItem.from,
              to: pricingItem.to,
              dates:
                pricingItem.from !== 0
                  ? getDatesBetween(pricingItem.from, pricingItem.to)
                  : [],
              available: pricingItem.available,
              roomOnly: pricingItem.roomOnly,
              extraBed: pricingItem.extraBed,
            };
          })
        )
      );
    }
  }, [propertyData]);

  const [allDatesData, setAllDatesData] = useState([]);

  useEffect(() => {
    if (!!propertyData && !!propertyData.id && pricingArray.length > 0) {
      setAllDatesData(
        getDatesBetween(
          convertDate(
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
          ),
          "2021-12-31"
        )
          .map((item) => {
            return {
              date: item,
              pricing: pricingArray.map((pricingItem) => {
                for (let i = 1; i < pricingItem.length; i++) {
                  const pricingItemDates = pricingItem[
                    i
                  ].dates.map((dateItem) => convertDate(dateItem));
                  if (pricingItemDates.indexOf(item) !== -1) {
                    return {
                      available: pricingItem[i].available,
                      roomOnly: pricingItem[i].roomOnly,
                      extraBed: pricingItem[i].extraBed,
                    };
                  }
                }
                return {
                  available: pricingItem[0].available,
                  roomOnly: pricingItem[0].roomOnly,
                  extraBed: pricingItem[0].extraBed,
                };
              }),
            };
          })
          .map((item) => {
            return {
              date: item.date,
              pricing: item.pricing,
              availability: item.pricing
                .map((pricingItem) => Number(pricingItem.available))
                .reduce((total, num) => total + num, 0),
            };
          })
      );
    }
  }, [pricingArray]);

  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    if (
      !!startDateCosting &&
      !!endDateCosting &&
      !!propertyData &&
      !!propertyData.id &&
      pricingArray.length > 0 &&
      allDatesData.length > 0
    ) {
      const startingDate = new Date(convertDate(startDateCosting));
      const endingDate = new Date(convertDate(endDateCosting));
      const datesList = allDatesData.map((item) => item.date);

      const newCartDetails = propertyData.inventory.map((room, i) => {
        return {
          id: room.id,
          max: room.max,
          name: room.name,
          occupancy: room.occupancy,
          unit: room.unit,
          images: room.images,
          pricing: getDatesBetweenPricing(startingDate, endingDate).map(
            (dateItem, j) => {
              const index = datesList.indexOf(dateItem);
              return {
                date: dateItem,
                available: allDatesData[index].pricing[i].available,
                roomOnly: allDatesData[index].pricing[i].roomOnly,
                extraBed: allDatesData[index].pricing[i].extraBed,
              };
            }
          ),
          available: Math.min(
            ...getDatesBetweenPricing(startingDate, endingDate)
              .map((dateItem, j) => {
                const index = datesList.indexOf(dateItem);
                return {
                  date: dateItem,
                  available: allDatesData[index].pricing[i].available,
                  roomOnly: allDatesData[index].pricing[i].roomOnly,
                  extraBed: allDatesData[index].pricing[i].extraBed,
                };
              })
              .map((pricingItem) => pricingItem.available)
          ),
        };
      });
      setCartDetails(newCartDetails);
    }
  }, [startDateCosting, endDateCosting, allDatesData]);

  const getRoomPrice = (roomIndex, pricingDuration) => {
    if (!!cartDetails && cartDetails.length > 0) {
      return (
        Math.ceil(
          arrAvg(
            cartDetails[roomIndex].pricing.map(
              (pricingItem) => pricingItem.roomOnly[pricingDuration]
            )
          ) / 50
        ) * 50
      );
    }
    return propertyData.inventory[roomIndex].pricing[0].roomOnly[
      pricingDuration
    ];
  };

  const getExtraBedPrice = (roomIndex, extraBedIndex, pricingDuration) => {
    if (!!cartDetails && cartDetails.length > 0) {
      switch (extraBedIndex) {
        case 0:
          return (
            Math.ceil(
              arrAvg(
                cartDetails[roomIndex].pricing.map(
                  (pricingItem) =>
                    pricingItem.roomOnly[pricingDuration] +
                    pricingItem.extraBed[0][pricingDuration]
                )
              ) / 50
            ) * 50
          );
        case 1:
          return (
            Math.ceil(
              arrAvg(
                cartDetails[roomIndex].pricing.map(
                  (pricingItem) =>
                    pricingItem.roomOnly[pricingDuration] +
                    pricingItem.extraBed[0][pricingDuration] +
                    pricingItem.extraBed[1][pricingDuration]
                )
              ) / 50
            ) * 50
          );
        case 2:
          return (
            Math.ceil(
              arrAvg(
                cartDetails[roomIndex].pricing.map(
                  (pricingItem) =>
                    pricingItem.roomOnly[pricingDuration] +
                    pricingItem.extraBed[0][pricingDuration] +
                    pricingItem.extraBed[1][pricingDuration] +
                    pricingItem.extraBed[2][pricingDuration]
                )
              ) / 50
            ) * 50
          );
        case 3:
          return (
            Math.ceil(
              arrAvg(
                cartDetails[roomIndex].pricing.map(
                  (pricingItem) =>
                    pricingItem.roomOnly[pricingDuration] +
                    pricingItem.extraBed[0][pricingDuration] +
                    pricingItem.extraBed[1][pricingDuration] +
                    pricingItem.extraBed[2][pricingDuration] +
                    pricingItem.extraBed[3][pricingDuration]
                )
              ) / 50
            ) * 50
          );
        case 4:
          return (
            Math.ceil(
              arrAvg(
                cartDetails[roomIndex].pricing.map(
                  (pricingItem) =>
                    pricingItem.roomOnly[pricingDuration] +
                    pricingItem.extraBed[0][pricingDuration] +
                    pricingItem.extraBed[1][pricingDuration] +
                    pricingItem.extraBed[2][pricingDuration] +
                    pricingItem.extraBed[3][pricingDuration] +
                    pricingItem.extraBed[4][pricingDuration]
                )
              ) / 50
            ) * 50
          );
        case 5:
          return (
            Math.ceil(
              arrAvg(
                cartDetails[roomIndex].pricing.map(
                  (pricingItem) =>
                    pricingItem.roomOnly[pricingDuration] +
                    pricingItem.extraBed[0][pricingDuration] +
                    pricingItem.extraBed[1][pricingDuration] +
                    pricingItem.extraBed[2][pricingDuration] +
                    pricingItem.extraBed[3][pricingDuration] +
                    pricingItem.extraBed[4][pricingDuration] +
                    pricingItem.extraBed[5][pricingDuration]
                )
              ) / 50
            ) * 50
          );
        default:
          return;
      }
    }

    switch (extraBedIndex) {
      case 0:
        return (
          propertyData.inventory[roomIndex].pricing[0].roomOnly[
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[0][
            pricingDuration
          ]
        );
      case 1:
        return (
          propertyData.inventory[roomIndex].pricing[0].roomOnly[
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[0][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[1][
            pricingDuration
          ]
        );
      case 2:
        return (
          propertyData.inventory[roomIndex].pricing[0].roomOnly[
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[0][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[1][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[2][
            pricingDuration
          ]
        );
      case 3:
        return (
          propertyData.inventory[roomIndex].pricing[0].roomOnly[
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[0][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[1][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[2][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[3][
            pricingDuration
          ]
        );
      case 4:
        return (
          propertyData.inventory[roomIndex].pricing[0].roomOnly[
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[0][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[1][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[2][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[3][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[4][
            pricingDuration
          ]
        );
      case 5:
        return (
          propertyData.inventory[roomIndex].pricing[0].roomOnly[
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[0][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[1][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[2][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[3][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[4][
            pricingDuration
          ] +
          propertyData.inventory[roomIndex].pricing[0].extraBed[5][
            pricingDuration
          ]
        );
      default:
        return;
    }
  };

  const [totalPaxErrorMessage, setTotalPaxErrorMessage] = useState("");

  const [sharingCounts, setSharingCounts] = useState([]);

  useEffect(() => {
    if (!!propertyData && !!propertyData.id) {
      setSharingCounts(
        propertyData.inventory.map((room, i) =>
          new Array(room.pricing[0].extraBed.length + 1).fill(0)
        )
      );
    }
  }, [propertyData]);

  const [roomCount, setRoomCount] = useState(sharingCounts);
  const [noOfPax, setNoOfPax] = useState(0);

  useEffect(() => {
    setRoomCount(sharingCounts);
  }, [startDateCosting, endDateCosting, sharingCounts]);

  const addRoom = (roomIndex, sharingIndex) => {
    const newRoomCount = roomCount.map((item, i) =>
      item.map((subItem, j) =>
        roomIndex === i &&
        sharingIndex === j &&
        item.reduce((a, b) => a + b, 0) < cartDetails[i].available
          ? subItem + 1
          : subItem
      )
    );

    const newNoOfPax = newRoomCount
      .map((item, i) =>
        item.map((subItem, j) => subItem * (cartDetails[i].occupancy + j))
      )
      .map((item) => item.reduce((a, b) => a + b, 0))
      .reduce((a, b) => a + b, 0);

    if (newNoOfPax > totalPax) {
      setTotalPaxErrorMessage("The new total will exceed the number of pax");
    } else {
      setTotalPaxErrorMessage("");
      setRoomCount(
        roomCount.map((item, i) =>
          item.map((subItem, j) =>
            roomIndex === i &&
            sharingIndex === j &&
            item.reduce((a, b) => a + b, 0) < cartDetails[i].available
              ? subItem + 1
              : subItem
          )
        )
      );
    }
  };

  const removeRoom = (roomIndex, sharingIndex) => {
    setTotalPaxErrorMessage("");
    setRoomCount(
      roomCount.map((item, i) =>
        item.map((subItem, j) =>
          roomIndex === i && sharingIndex === j && subItem > 0
            ? subItem - 1
            : subItem
        )
      )
    );
  };

  useEffect(() => {
    if (!!cartDetails && cartDetails.length > 0) {
      setNoOfPax(
        roomCount
          .map((item, i) =>
            item.map((subItem, j) => subItem * (cartDetails[i].occupancy + j))
          )
          .map((item) => item.reduce((a, b) => a + b, 0))
          .reduce((a, b) => a + b, 0)
      );
    }
  }, [roomCount]);

  const [breakfast, setBreakfast] = useState({
    available: false,
    value: -1,
  });

  const [lunch, setLunch] = useState({
    available: false,
    value: -1,
  });

  const [dinner, setDinner] = useState({
    available: false,
    value: -1,
  });

  useEffect(() => {
    if (!!propertyData && !!propertyData.id) {
      setBreakfast({
        available: propertyData.meals.breakfast.available,
        value: propertyData.meals.breakfast.value,
      });

      setLunch({
        available: propertyData.meals.lunchVeg.available,
        value: propertyData.meals.lunchVeg.value,
      });

      setDinner({
        available: propertyData.meals.dinnerVeg.available,
        value: propertyData.meals.dinnerVeg.value,
      });
    }
  }, [propertyData]);

  const [breakfastBox, setBreakfastBox] = useState({
    state: false,
    value: 0,
  });

  const [lunchBox, setLunchBox] = useState({
    state: false,
    value: 0,
  });

  const [dinnerBox, setDinnerBox] = useState({
    state: false,
    value: 0,
  });

  useEffect(() => {
    if (breakfast.available && breakfast.value === 0) {
      setBreakfastBox({
        state: true,
        value: 0,
      });
    } else if (breakfast.available && breakfast.value > 0) {
      setBreakfastBox({
        state: false,
        value: breakfast.value,
      });
    } else {
      setBreakfastBox({
        state: false,
        value: 0,
      });
    }
  }, [breakfast]);

  useEffect(() => {
    if (lunch.available && lunch.value === 0) {
      setLunchBox({
        state: true,
        value: 0,
      });
    } else if (lunch.available && lunch.value > 0) {
      setLunchBox({
        state: false,
        value: lunch.value,
      });
    } else {
      setLunchBox({
        state: false,
        value: 0,
      });
    }
  }, [lunch]);

  useEffect(() => {
    if (dinner.available && dinner.value === 0) {
      setDinnerBox({
        state: true,
        value: 0,
      });
    } else if (dinner.available && dinner.value > 0) {
      setDinnerBox({
        state: false,
        value: dinner.value,
      });
    } else {
      setDinnerBox({
        state: false,
        value: 0,
      });
    }
  }, [dinner]);

  const handleChangeMeals = (event) => {
    const { value, name } = event.target;

    if (name === "breakfastValue") {
      setBreakfastBox({ state: breakfastBox.state, value: value });
    } else if (name === "lunchValue") {
      setLunchBox({ state: lunchBox.state, value: value });
    } else if (name === "dinnerValue") {
      setDinnerBox({ state: dinnerBox.state, value: value });
    }
  };

  const [mealsPrice, setMealsPrice] = useState(0);

  useEffect(() => {
    setMealsPrice(
      Number(breakfastBox.state) * breakfastBox.value +
        Number(lunchBox.state) * lunchBox.value +
        Number(dinnerBox.state) * dinnerBox.value
    );
  }, [breakfastBox, lunchBox, dinnerBox]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!!cartDetails && cartDetails.length > 0) {
      const roomsTotal = roomCount
        .map((item, i) =>
          item.map(
            (subItem, j) =>
              subItem *
              (j === 0
                ? getRoomPrice(i, pricingDuration)
                : getExtraBedPrice(i, j - 1, pricingDuration))
          )
        )
        .map((item) => item.reduce((a, b) => a + b, 0))
        .reduce((a, b) => a + b, 0);

      setTotalPrice(
        (roomsTotal + mealsPrice * totalPax) * cartDetails[0].pricing.length
      );
    }
  }, [mealsPrice, totalPax, roomCount]);

  const handleFormChanges = (e) => {
    if (e.target.name !== "phone" || `${e.target.value}`.length < 11) {
      setFormDetails({
        ...formDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (
      totalPrice > 0 &&
      fullName.length > 0 &&
      phone.length === 10 &&
      totalPax.length > 0 &&
      advanceAccount.length > 0 &&
      advanceAmount.length > 0 &&
      sellingAmount.length > 0 &&
      salesEmail.length > 0 &&
      leadSource.length > 0 &&
      transportation.length > 0
    ) {
      setPaymentButton(true);
    } else {
      setPaymentButton(false);
    }
  }, [
    totalPrice,
    fullName,
    phone,
    totalPax,
    advanceAccount,
    advanceAmount,
    sellingAmount,
    salesEmail,
    leadSource,
    transportation,
  ]);

  return (
    <PageContainer>
      {isForm ? (
        <Fragment>
          <SectionContainer>
            <ClientDetails>
              <Title>Client Details</Title>
              <FormInput
                name="fullName"
                type="text"
                value={fullName}
                required
                label="Full Name"
                warningMessage=""
                handleChange={handleFormChanges}
              />
              <FormInput
                name="phone"
                type="number"
                value={phone}
                required
                label="WhatsApp No"
                warningMessage=""
                handleChange={handleFormChanges}
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
                value={totalPax}
                required
                label="Total No of Pax"
                warningMessage={totalPaxErrorMessage}
                handleChange={handleFormChanges}
              />
              {!!propertyData && !!propertyData.id ? (
                <RoomsContainer className="carousel">
                  {propertyData.inventory.map((room, i) => (
                    <RoomContainer key={`${room.name}`}>
                      <RoomType>
                        <span>{room.name}</span>
                      </RoomType>
                      <RoomSharing
                        key={`${room.name} ${
                          mappingTree[getRoomSharing(room.unit, room.occupancy)]
                        }`}
                      >
                        <SharingTitle>
                          <span>
                            {
                              mappingTree[
                                getRoomSharing(room.unit, room.occupancy)
                              ]
                            }
                          </span>
                        </SharingTitle>
                        <SharingDetails>
                          <SharingPrice>
                            ₹ {getRoomPrice(i, pricingDuration)}/-
                          </SharingPrice>
                          <span>per {typesOfUnit[room.unit]} per night</span>
                        </SharingDetails>
                        <PlusMinus>
                          {roomCount.length > 0 && roomCount[i].length > 0 ? (
                            roomCount[i][0] > 0 ? (
                              <div>
                                <span
                                  onClick={() => {
                                    removeRoom(i, 0);
                                  }}
                                >
                                  -
                                </span>
                                <span>{roomCount[i][0]}</span>
                                <Plus
                                  isMaxed={
                                    roomCount[i].reduce((a, b) => a + b, 0) >=
                                    propertyData.inventory[i].max
                                  }
                                  onClick={() => {
                                    addRoom(i, 0);
                                  }}
                                >
                                  +
                                </Plus>
                              </div>
                            ) : (
                              <AddButton
                                isMaxed={
                                  roomCount[i].reduce((a, b) => a + b, 0) >=
                                  propertyData.inventory[i].max
                                }
                                onClick={() => {
                                  addRoom(i, 0);
                                }}
                              >
                                ADD
                              </AddButton>
                            )
                          ) : null}
                        </PlusMinus>
                      </RoomSharing>
                      {room.pricing[0].extraBed.map((item, j) => (
                        <RoomSharing
                          key={`${room.name} ${
                            mappingTree[
                              getRoomSharing(room.unit, room.occupancy + j + 1)
                            ]
                          }`}
                        >
                          <SharingTitle>
                            <span>
                              {
                                mappingTree[
                                  getRoomSharing(
                                    room.unit,
                                    room.occupancy + j + 1
                                  )
                                ]
                              }
                            </span>
                          </SharingTitle>
                          <SharingDetails>
                            <SharingPrice>
                              ₹ {getExtraBedPrice(i, j, pricingDuration)}/-
                            </SharingPrice>
                            <span>per {typesOfUnit[room.unit]} per night</span>
                          </SharingDetails>
                          <PlusMinus>
                            {roomCount.length > 0 && roomCount[i].length > 0 ? (
                              roomCount[i][j + 1] > 0 ? (
                                <div>
                                  <span
                                    onClick={() => {
                                      removeRoom(i, j + 1);
                                    }}
                                  >
                                    -
                                  </span>
                                  <span>{roomCount[i][j + 1]}</span>
                                  <Plus
                                    isMaxed={
                                      roomCount[i].reduce((a, b) => a + b, 0) >=
                                      propertyData.inventory[i].max
                                    }
                                    onClick={() => {
                                      addRoom(i, j + 1);
                                    }}
                                  >
                                    +
                                  </Plus>
                                </div>
                              ) : (
                                <AddButton
                                  isMaxed={
                                    roomCount[i].reduce((a, b) => a + b, 0) >=
                                    propertyData.inventory[i].max
                                  }
                                  onClick={() => {
                                    addRoom(i, j + 1);
                                  }}
                                >
                                  ADD
                                </AddButton>
                              )
                            ) : null}
                          </PlusMinus>
                        </RoomSharing>
                      ))}
                    </RoomContainer>
                  ))}
                </RoomsContainer>
              ) : null}
              <MealsGrid>
                <MealsItem>
                  <CheckBox
                    name="breakfast"
                    label={"Breakfast"}
                    handleChange={() => {
                      setBreakfastBox({
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
                      setLunchBox({
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
                      setDinnerBox({
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
            </PropertyDetails>
          </SectionContainer>
          <SectionContainer>
            <PaymentDetails>
              <Title>Payment Details</Title>
              <Grid>
                {" "}
                <div>
                  <FormInput
                    name="sellingAmount"
                    type="number"
                    value={sellingAmount}
                    required
                    label="Selling Amount"
                    warningMessage=""
                    handleChange={handleFormChanges}
                  />
                  <FormInput
                    name="advanceAmount"
                    type="number"
                    value={advanceAmount}
                    required
                    label="Advance Received"
                    warningMessage=""
                    handleChange={handleFormChanges}
                  />
                  <FormInput
                    name="advanceAccount"
                    type="text"
                    value={advanceAccount}
                    required
                    label="Account"
                    warningMessage=""
                    handleChange={handleFormChanges}
                  />
                  <FormInput
                    name="salesEmail"
                    type="email"
                    value={salesEmail}
                    required
                    label="Sales Person Email"
                    warningMessage=""
                    handleChange={handleFormChanges}
                  />
                  <FormInput
                    name="leadSource"
                    type="text"
                    value={leadSource}
                    required
                    label="Lead Source"
                    warningMessage=""
                    handleChange={handleFormChanges}
                  />
                  <FormInput
                    name="transportation"
                    type="text"
                    value={transportation}
                    required
                    label="Transportation"
                    warningMessage=""
                    handleChange={handleFormChanges}
                  />
                  <FormInputTextArea
                    name="remarks"
                    type="textarea"
                    value={remarks}
                    label="Remarks"
                    warningMessage=""
                    handleChange={handleFormChanges}
                  />
                </div>
                <FlexItem className="carousel">
                  <h2>Booking Summary</h2>
                  <Summary>
                    {!!propertyData && !!propertyData.id ? (
                      <Fragment>
                        <PropertyTitle>{`Workcations ${propertyData.id} - ${propertyData.shortTitle}`}</PropertyTitle>
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
                              {endDate.getDate()}{" "}
                              {monthNames[endDate.getMonth()]}
                              {", "}
                              {endDate.getFullYear()}
                            </span>
                          </div>
                        </CheckInCheckOut>
                        {roomCount.map((item, i) =>
                          item.reduce((a, b) => a + b, 0) === 0 ? null : (
                            <SummaryItem key={`Summary room no ${i + 1}`}>
                              <Image
                                src={
                                  "https://d1xmqx9e0b6ljd.cloudfront.net/" +
                                  propertyData.slug +
                                  "/" +
                                  cartDetails[i].images[0] +
                                  ".jpg"
                                }
                                alt={cartDetails[i].images[0]}
                              />
                              <CartSharingTitle>
                                {cartDetails[i].name}
                              </CartSharingTitle>
                              <Sharing>
                                {item.map((subItem, j) =>
                                  subItem === 0 ? null : (
                                    <SharingItem
                                      key={`Summary room no ${i + 1} sharing ${
                                        j + 1
                                      }`}
                                    >
                                      <CartSharingSharingTitle>
                                        {
                                          mappingTree[
                                            getRoomSharing(
                                              cartDetails[i].unit,
                                              cartDetails[i].occupancy + j
                                            )
                                          ]
                                        }
                                        <span>
                                          INR{" "}
                                          {j === 0
                                            ? getRoomPrice(i, pricingDuration)
                                            : getExtraBedPrice(
                                                i,
                                                j - 1,
                                                pricingDuration
                                              )}
                                          /- per night
                                        </span>
                                      </CartSharingSharingTitle>
                                      <SharingCount>X {subItem}</SharingCount>
                                      <SharingTotal>
                                        =&nbsp;&nbsp;&nbsp;
                                        {(
                                          subItem *
                                          (j === 0
                                            ? getRoomPrice(i, pricingDuration)
                                            : getExtraBedPrice(
                                                i,
                                                j - 1,
                                                pricingDuration
                                              ))
                                        ).toLocaleString("en-IN", {
                                          style: "currency",
                                          currency: "INR",
                                        })}
                                      </SharingTotal>
                                    </SharingItem>
                                  )
                                )}
                              </Sharing>
                            </SummaryItem>
                          )
                        )}
                        <CartTotal>
                          <div>
                            <span>Total</span>
                            <span>
                              {totalPrice.toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </div>
                          <div>
                            <span>GST(5%)</span>
                            <span>
                              {(totalPrice * 0.05).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </div>
                          {totalPrice * 1.05 - sellingAmount > 0 ? (
                            <div>
                              <span>Discount</span>
                              <span>
                                {(
                                  totalPrice * 1.05 -
                                  sellingAmount
                                ).toLocaleString("en-IN", {
                                  maximumFractionDigits: 2,
                                  style: "currency",
                                  currency: "INR",
                                })}
                              </span>
                            </div>
                          ) : null}
                          <Line />
                          <div>
                            <span>Grand Total</span>
                            <span>
                              {Number(sellingAmount).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </div>
                          <Line />
                        </CartTotal>
                      </Fragment>
                    ) : null}
                  </Summary>
                </FlexItem>
              </Grid>
            </PaymentDetails>
            <Button
              onClick={() => {
                if (paymentButton) {
                  const data = {
                    name: fullName,
                    phone: phone,
                    totalPax: {
                      value: totalPax,
                      warningMessage: "",
                    },
                    salesPerson: salesEmail,
                    advance: advanceAmount,
                    account: advanceAccount,
                    amount: sellingAmount,
                    leadSource: leadSource,
                    transportation: transportation,
                    checkIn: startDate,
                    checkOut: endDate,
                    property: {
                      about: propertyData.description.about.value,
                      address: propertyData.location.address,
                      breakfast: propertyData.meals.breakfast.available
                        ? propertyData.meals.breakfast.value
                        : -1,
                      lunch: propertyData.meals.lunchVeg.available
                        ? propertyData.meals.lunchVeg.value
                        : -1,
                      dinner: propertyData.meals.dinnerVeg.available
                        ? propertyData.meals.dinnerVeg.value
                        : -1,
                      email: propertyData.owner.email,
                      phone: propertyData.owner.contactPerson[0].phone,
                      slug: propertyData.slug,
                      title: `Workcations ${propertyData.id} - ${propertyData.shortTitle}`,
                      titleShort: propertyData.titleShort,
                      type: propertyTypes[propertyData.type],
                      nearby: propertyData.features.nearby,
                      name: propertyData.location.title,
                      minDuration: propertyData.features.minDuration,
                      location: {
                        city: propertyData.location.city,
                        state: propertyData.location.state,
                      },
                      link: propertyData.location.location,
                      inventory: propertyData.inventory,
                      inclusions: propertyData.features.inclusions,
                      exclusions: propertyData.features.exclusions,
                      images: propertyData.images,
                      features: propertyData.features.amenities,
                      essentials: propertyData.features.essentials,
                    },
                    breakfast: breakfastBox,
                    lunch: lunchBox,
                    dinner: dinnerBox,
                    cart: roomCount
                      .map((item, i) => {
                        return {
                          image: cartDetails[i].images[0],
                          type: cartDetails[i].name,
                          rooms: item.map((subItem, j) => {
                            return {
                              count: subItem,
                              sharing:
                                mappingTree[
                                  getRoomSharing(
                                    cartDetails[i].unit,
                                    cartDetails[i].occupancy + j
                                  )
                                ],
                              ultrashort:
                                j === 0
                                  ? getRoomPrice(i, "ultraShort")
                                  : getExtraBedPrice(i, j - 1, "ultraShort"),
                              short:
                                j === 0
                                  ? getRoomPrice(i, "short")
                                  : getExtraBedPrice(i, j - 1, "short"),
                              normal:
                                j === 0
                                  ? getRoomPrice(i, "normal")
                                  : getExtraBedPrice(i, j - 1, "normal"),
                              long:
                                j === 0
                                  ? getRoomPrice(i, "long")
                                  : getExtraBedPrice(i, j - 1, "long"),
                              ultralong:
                                j === 0
                                  ? getRoomPrice(i, "ultraLong")
                                  : getExtraBedPrice(i, j - 1, "ultraLong"),
                              monthly:
                                j === 0
                                  ? getRoomPrice(i, "monthly")
                                  : getExtraBedPrice(i, j - 1, "monthly"),
                            };
                          }),
                        };
                      })
                      .map((item) => {
                        return {
                          ...item,
                          rooms: item.rooms.filter(
                            (subItem) => subItem.count !== 0
                          ),
                        };
                      })
                      .filter((item) => item.rooms.length > 0),
                    cartDetails: cartDetails,
                    customer: false,
                    remarks: remarks,
                  };
                  const dataFinal = {
                    approval: {
                      status: true,
                      approvedBy: 3485742,
                    },
                    data: data,
                  };
                  dispatch(createBookingStart(JSON.stringify(dataFinal)));
                  setForm(false);
                }
              }}
              value="Generate Booking"
              isActive={paymentButton}
            />
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

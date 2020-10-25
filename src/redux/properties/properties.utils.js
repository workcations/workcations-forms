export const getListOfStates = (properties) =>
  properties
    .map((item) => item.location.state)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .map((item) => {
      return {
        value: item,
        name: item.replace(/\w\S*/g, (w) =>
          w.replace(/^\w/, (c) => c.toUpperCase())
        ),
      };
    });

export const getListOfCities = (properties) =>
  properties
    .map((item) => item.location.city)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .map((item) => {
      return {
        value: item,
        name: item.replace(/\w\S*/g, (w) =>
          w.replace(/^\w/, (c) => c.toUpperCase())
        ),
      };
    });

export const getListOfProperties = (properties) =>
  properties.map((item) => {
    return {
      value: item.slug,
      name: item.title,
    };
  });

export const getListOfCitiesByState = (properties, state) =>
  properties
    .filter((item) => item.location.state === state)
    .map((item) => item.location.city)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .map((item) => {
      return {
        value: item,
        name: item.replace(/\w\S*/g, (w) =>
          w.replace(/^\w/, (c) => c.toUpperCase())
        ),
      };
    });

export const getListOfPropertiesByState = (properties, state) =>
  properties
    .filter((item) => item.location.state === state)
    .map((item) => {
      return {
        value: item.slug,
        name: item.title,
      };
    });

export const getListOfPropertiesByCity = (properties, city) =>
  properties
    .filter((item) => item.location.city === city)
    .map((item) => {
      return {
        value: item.slug,
        name: item.title,
      };
    });

const getProperties = async (url, requestOptions) =>
  await fetch(url, requestOptions)
    .then((res) => res.text())
    .then((res) => JSON.parse(res).feed.entry)
    .then((obj) => {
      return obj.map((item) => {
        return {
          slug: item.gsx$slug.$t,
          title: item.gsx$title.$t,
          titleShort: item.gsx$titleshort.$t,
          type: item.gsx$type.$t,
          location: { city: item.gsx$city.$t, state: item.gsx$state.$t },
          images: [
            item.gsx$imagefirst.$t,
            item.gsx$imagesecond.$t,
            item.gsx$imagethird.$t,
            item.gsx$imagefourth.$t,
          ],
          features: [
            item.gsx$featurefirst.$t,
            item.gsx$featuresecond.$t,
            item.gsx$featurethird.$t,
            item.gsx$featurefourth.$t,
          ],
          ultrashort: item.gsx$ultrashort.$t,
          short: item.gsx$short.$t,
          normal: item.gsx$normal.$t,
          long: item.gsx$long.$t,
          ultralong: item.gsx$ultralong.$t,
        };
      });
    });

export const getPropertiesListExcel = async () => {
  const url =
    "https://spreadsheets.google.com/feeds/list/1ElB8__7-aR5ncoxSsWgtmbaInzxCE5eiww6WL6s1Vhs/1/public/values?alt=json";

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return await getProperties(url, requestOptions);
};

const getProperty = async (url, requestOptions) =>
  await fetch(url, requestOptions)
    .then((res) => res.text())
    .then((result) => JSON.parse(result).feed.entry)
    .then((obj) => {
      return [
        {
          slug: obj[0].gsx$slug.$t,
          title: obj[0].gsx$title.$t,
          breakfast: obj[0].gsx$breakfast.$t,
          lunch: obj[0].gsx$lunch.$t,
          dinner: obj[0].gsx$dinner.$t,
          titleShort: obj[0].gsx$titleshort.$t,
          type: obj[0].gsx$type.$t,
          location: { city: obj[0].gsx$city.$t, state: obj[0].gsx$state.$t },
          minDuration: obj[0].gsx$minduration.$t,
          about: obj[0].gsx$about.$t,
          features: obj
            .filter((item) => item.gsx$features.$t !== "")
            .map((item) => item.gsx$features.$t),
          inventory: [
            ...new Set(
              obj
                .filter((item) => item.gsx$roomtype.$t !== "")
                .map((item) => item.gsx$roomtype.$t)
            ),
          ].map((roomType) => {
            const index = obj
              .map((item) => item.gsx$roomtype.$t)
              .indexOf(roomType);
            return {
              type: roomType,
              image: obj[index].gsx$image.$t.split(",")[0],
              max: obj[index].gsx$max.$t,
              unit: obj[index].gsx$unit.$t,
              ultrashort: obj
                .filter((item) => item.gsx$roomtype.$t === roomType)
                .map((item) => {
                  return {
                    sharing: item.gsx$sharing.$t,
                    cost: item.gsx$ultrashort.$t,
                  };
                }),
              short: obj
                .filter((item) => item.gsx$roomtype.$t === roomType)
                .map((item) => {
                  return {
                    sharing: item.gsx$sharing.$t,
                    cost: item.gsx$short.$t,
                  };
                }),
              normal: obj
                .filter((item) => item.gsx$roomtype.$t === roomType)
                .map((item) => {
                  return {
                    sharing: item.gsx$sharing.$t,
                    cost: item.gsx$normal.$t,
                  };
                }),
              long: obj
                .filter((item) => item.gsx$roomtype.$t === roomType)
                .map((item) => {
                  return {
                    sharing: item.gsx$sharing.$t,
                    cost: item.gsx$long.$t,
                  };
                }),
              ultralong: obj
                .filter((item) => item.gsx$roomtype.$t === roomType)
                .map((item) => {
                  return {
                    sharing: item.gsx$sharing.$t,
                    cost: item.gsx$ultralong.$t,
                  };
                }),
            };
          }),

          images: obj
            .filter((item) => item.gsx$images.$t !== "")
            .map((item) => item.gsx$images.$t),
          inclusions: obj
            .filter((item) => item.gsx$inclusions.$t !== "")
            .map((item) => item.gsx$inclusions.$t),
          exclusions: obj
            .filter((item) => item.gsx$exclusions.$t !== "")
            .map((item) => item.gsx$exclusions.$t),
          nearby: obj
            .filter((item) => item.gsx$nearbytitle.$t !== "")
            .map((item) => {
              return {
                image: item.gsx$nearbyimage.$t,
                title: item.gsx$nearbytitle.$t,
                distance: item.gsx$nearbydistance.$t,
              };
            }),
          essentials: obj
            .filter((item) => item.gsx$essentialstitle.$t !== "")
            .map((item) => {
              return {
                title: item.gsx$essentialstitle.$t,
                distance: item.gsx$essentialsdistance.$t,
              };
            }),
          address: obj[0].gsx$address.$t,
          phone: obj[0].gsx$phone.$t,
          email: obj[0].gsx$email.$t,
          name: obj[0].gsx$name.$t,
          link: obj[0].gsx$link.$t,
        },
      ];
    });

export const getPropertyExcel = async (slug) => {
  let sheetNo = 5;

  await getProperties(
    "https://spreadsheets.google.com/feeds/list/1ElB8__7-aR5ncoxSsWgtmbaInzxCE5eiww6WL6s1Vhs/1/public/values?alt=json",
    {
      method: "GET",
      redirect: "follow",
    }
  ).then((res) => {
    sheetNo = res.map((item) => item.slug).indexOf(slug) + 3;
  });

  const url =
    "https://spreadsheets.google.com/feeds/list/1ElB8__7-aR5ncoxSsWgtmbaInzxCE5eiww6WL6s1Vhs/" +
    sheetNo +
    "/public/values?alt=json";

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return await getProperty(url, requestOptions);
};

export const getBookingId = async (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  return await fetch(
    "https://data.workcations.in/createBooking",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => error);
};

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
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url =
    "https://1sdx3eq12j.execute-api.ap-south-1.amazonaws.com/dev/properties";

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

const getProperty = async (url, requestOptions) =>
  await fetch(url, requestOptions)
    .then((res) => res.text())
    .then((result) => JSON.parse(result))
    .then((obj) => {
      return obj;
    });

export const getPropertyExcel = async (slug) => {
  const url =
    "https://1sdx3eq12j.execute-api.ap-south-1.amazonaws.com/dev/propertyData/" +
    slug.split("-")[0];

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
    "https://workcationsbackend.herokuapp.com/booking",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => error);
};

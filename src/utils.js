/** @format */

//handle api request for login, register, getReservations, getStaysByHost, searchStays, deleteStay, bookStay, cancelReservation, getReservationsByStay, uploadStay
const domain = "https://linear-encoder-382002.ue.r.appspot.com";
export const login = (credential, asHost) => {
  /*
    fetch()方法接受两个参数，第一个参数是请求的地址，第二个参数是请求的配置对象。
    fetch返回带status的promise对象, then返回带json形式的response的body.
    fetch -> 返回status -> then -> 返回json 所以最后返回的是json
    */
  return fetch(`${domain}/authenticate/${asHost ? "host" : "guest"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //用来说明发送的数据格式，这里是json格式，如果是表单格式，就是"Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify(credential),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Login failed");
    }
    return res.json();
  });
  //.then(token => localStorage.setItem("authToken", token); <= 在UI做了,是指在app.js里面加载ui的时候处理了，也是存在localstorage里面
};

export const register = (credential, asHost) => {
  return fetch(`${domain}/register/${asHost ? "host" : "guest"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Register failed");
    }
    //return res.json(); 不需要返回json，按照逻辑。
  });
};

export const getReservations = () => {
  const token = localStorage.getItem("authToken");
  return fetch(`${domain}/reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Get reservations failed");
    }
    return res.json();
  });
};

export const getStaysByHost = () => {
  const token = localStorage.getItem("authToken");
  return fetch(`${domain}/stays`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Get stays failed");
    }
    return res.json();
  });
};

export const searchStays = (query) => {
  const token = localStorage.getItem("authToken");
  // create url based on query including lat, lon, checkin_date, checkout_date, guests_number
  const url = new URL(`${domain}/search`);
  // ? 是query的开始，=> searchParams.
  url.searchParams.append("guest_number", query.guest_number);
  url.searchParams.append(
    "checkin_date",
    query.checkin_date.format("YYYY-MM-DD")
  );
  url.searchParams.append(
    "checkout_date",
    query.checkout_date.format("YYYY-MM-DD")
  );
  url.searchParams.append("lat", 37); //37
  url.searchParams.append("lon", -122); //-122
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Search stays failed");
    }
    return res.json();
  });
};

export const deleteStay = (stayId) => {
  const token = localStorage.getItem("authToken");
  return fetch(`${domain}/stays/${stayId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Delete stay failed");
    }
  });
};

export const bookStay = (data) => {
  const token = localStorage.getItem("authToken");
  return fetch(`${domain}/reservations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Book reservation failed");
    }
    // return res.json();
  });
};

export const cancelReservation = (reservationId) => {
  const token = localStorage.getItem("authToken");
  return fetch(`${domain}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Cancel reservation failed");
    }
    // return res.json();
  });
};

export const getReservationsByStay = (stayId) => {
  const token = localStorage.getItem("authToken");
  return fetch(`${domain}/stays/reservations/${stayId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Get reservations by stay failed");
    }
    return res.json();
  });
};

export const uploadStay = (data) => {
  const token = localStorage.getItem("authToken");
  return fetch(`${domain}/stays`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      //"Content-Type": "application/json",
    },
    body: data,
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Upload stay failed");
    }
    // return res.json();
  });
};

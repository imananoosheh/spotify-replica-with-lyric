import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  // console.log(refreshToken)

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const timeInterval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          // setRefreshToken(res.data.refreshToken)
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          // window.location = '/'
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(timeInterval)
  }, [refreshToken, expiresIn]);

  return accessToken;
}

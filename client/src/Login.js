import { React, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/client_id")
      .then(async (res) => {
        setClientId(res.data.client_id);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=" +
    clientId +
    "&response_type=code&redirect_uri=http://localhost:3000" +
    "&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </Container>
  );
}

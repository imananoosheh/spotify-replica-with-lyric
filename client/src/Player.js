import { React, useState, useEffect } from "react";
//TODO: check the difference between require() fucntion and import specially in getting class instance
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(true);
  }, [trackUri]);

  var styles = {
    activeColor: "#1cb954",
    bgColor: "#333",
    color: "#fff",
    loaderColor: "#fff",
    sliderColor: "#1cb954",
    trackArtistColor: "#ccc",
    trackNameColor: "#fff",
  };

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlaying(false);
      }}
      play={playing}
      uris={trackUri ? [trackUri] : []}
      styles={styles}
    />
  );
}

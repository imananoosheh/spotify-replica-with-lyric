import {React, useState, useEffect} from "react";
//TODO: check the difference between require() fucntion and import specially in getting class instance
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
      setPlaying(true)
  },[trackUri])

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveicon
      callback={state => {
          if(!state.isPlaying) setPlaying(false);
      }}
      play={playing}
      uris={trackUri ? [trackUri] : []}
    />
  );
}

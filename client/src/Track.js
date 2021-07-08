import React from "react";

export default function Track({ track, chooseTrack }) {
  function playTheTrack() {
    chooseTrack(track);
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={playTheTrack}
    >
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
        alt={`Track artwork with the title of ${track.title} by ${track.artist}`}
      />
      <div className="ms-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}

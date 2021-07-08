import { React, useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "./Track"
import Player from "./Player"
import axios from "axios";

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const spotifyApi = new SpotifyWebApi({
    clientId: "4853e5d8e9ba4c119bddea0635ad446c",
  });

  function chooseTrack(track){
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    if(!playingTrack) return 
    axios.get('http://localhost:3001/lyrics', {
        params:{
            track: playingTrack.title,
            artist: playingTrack.artist
        }
    }).then(res => {
        setLyrics(res.data.lyrics)
    })
  }, [playingTrack])

  //TODO: check if removed make difference and why seAccessToken is not working individually and need to be set again in the next useEffect below
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    let cancel = false
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        if (cancel) return
        setSearchResults(
          res.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
      return () => cancel = true
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="search a song or an artist"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {/*
      TODO: read about flex-grow-1 and how it works
      */}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => {
            return <Track track={track} key={track.uri} chooseTrack={chooseTrack} />
        })}
        {searchResults.length === 0 && (
            <div className="text-center" style={{whiteSpace: "pre"}}>
                {lyrics}
            </div>
        )
        }
      </div>
      <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
    </Container>
  );
}

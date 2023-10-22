import { User } from "./User";
import { ArtistHeader } from "./ArtistHeader";
import { ArtistTracks } from "./ArtistTracks";
import { ArtistAlbums } from "./ArtistAlbums";
import { RelatedArtists } from "./RelatedArtists";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const ArtistDetails = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    divRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2 overflow-hidden">
      <User />
      <div ref={divRef} className="h-[75vh]  overflow-auto">
        <ArtistHeader />
        <ArtistTracks />
        <ArtistAlbums artistPage />
        <RelatedArtists artistPage />
      </div>
    </div>
  );
};

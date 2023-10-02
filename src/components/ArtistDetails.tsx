import { User } from "./User";
import { ArtistHeader } from "./ArtistHeader";
import { ArtistTracks } from "./ArtistTracks";
import { ArtistAlbums } from "./ArtistAlbums";

export const ArtistDetails = () => {
  return (
    <div className="col-span-3 overflow-hidden">
      <User />
      <div className="h-[75vh] max-h-full overflow-auto">
        <ArtistHeader />
        <ArtistTracks />
        <ArtistAlbums artistPage />
      </div>
    </div>
  );
};

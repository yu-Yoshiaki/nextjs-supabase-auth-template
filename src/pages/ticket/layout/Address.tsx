import { GoogleMap, LoadScript } from "@react-google-maps/api";
import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export const Address: VFC<{ data: ReadTicket["metadata"] }> = (props) => {
  // マップの初期情報
  const mapData = {
    center: {
      lat: props.data.lat ?? 0,
      lng: props.data.lng ?? 0,
    },
    zoom: 9,
  };
  return (
    <div className="bg-gray">
      <div className="flex py-5  px-2 space-x-2">
        <p className="font-bold">開催場所</p>
        <p>{props.data.address}</p>
      </div>

      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapData.center}
          zoom={mapData.zoom}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

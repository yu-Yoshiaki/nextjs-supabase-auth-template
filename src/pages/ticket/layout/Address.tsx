import { GoogleMap, InfoWindow, LoadScript } from "@react-google-maps/api";
import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

const divStyle = {
  background: "white",
  fontSize: 7.5,
};

// マップの初期情報
const mapData = {
  center: {
    lat: 35.69575,
    lng: 139.77521,
  },
  zoom: 9,
};

export const Address: VFC<{ address: ReadTicket["address"] }> = (props) => {
  return (
    <div className="bg-gray">
      <div className="flex py-5  px-2 space-x-2">
        <p className="font-bold">開催場所</p>
        <p>{props.address?.address}</p>
      </div>

      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapData.center}
          zoom={mapData.zoom}
        >
          <InfoWindow position={positionAkiba}>
            <div style={divStyle}>
              <h1>秋葉原オフィス</h1>
            </div>
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

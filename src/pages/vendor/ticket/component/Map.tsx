import { GoogleMap, LoadScript } from "@react-google-maps/api";
import type { VFC } from "react";
import { useState } from "react";
import type { UseFormRegister } from "react-hook-form/dist/types";

const defaultMapData = {
  center: {
    lat: 35.69575,
    lng: 139.77521,
  },
  zoom: 9,
};

type Map = {
  register: UseFormRegister<Record<string, any>>;
};

export const Map: VFC<Map> = (props) => {
  const [serchAddress, setSerchAddress] = useState<string>();
  const [mapData, setMapData] = useState(defaultMapData);

  const handleChange = (e: any) => {
    setSerchAddress(e.target.value);
  };

  const handleGenerateGeocode = () => {
    if (typeof window != "undefined") {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: serchAddress }, (result, status) => {
        if (status == "OK" && result) {
          const lat = result[0].geometry.location.lat();
          const lng = result[0].geometry.location.lng();

          setMapData({
            center: {
              lat,
              lng,
            },
            zoom: 15,
          });
        }
      });
    }
  };

  return (
    <div className="col-span-6">
      <label className="block text-sm font-medium ">開催場所</label>
      <div className="flex mb-1 space-x-1">
        {serchAddress && (
          <div>
            <input
              type="hidden"
              {...props.register("lat")}
              value={mapData.center.lat}
            />
            <input
              type="hidden"
              {...props.register("lng")}
              value={mapData.center.lng}
            />
          </div>
        )}

        <input
          {...props.register("Address")}
          className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue-400 focus:ring-2 transition-colors duration-200 ease-in-out"
          type="text"
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={handleGenerateGeocode}
          className="p-1 whitespace-nowrap border"
        >
          住所検索
        </button>
      </div>

      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
      >
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
          center={mapData.center}
          zoom={mapData.zoom}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

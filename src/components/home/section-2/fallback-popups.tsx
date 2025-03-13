import { useState } from "react";

import Popup from "@/components/globe-map/popup";

const FallbackPopups = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="FallbackPopups absolute flex h-screen w-screen items-end justify-center">
      <Popup isFallback setSelectedMarker={(i) => setIndex(i)} index={index} />
    </div>
  );
};

export default FallbackPopups;

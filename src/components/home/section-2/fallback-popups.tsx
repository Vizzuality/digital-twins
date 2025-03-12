import { useState } from "react";

import Popup from "@/components/globe-map/popup";

const FallbackPopups = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex h-screen w-screen items-end">
      <Popup isFallback setSelectedMarker={(i) => setIndex(i)} index={index} />
    </div>
  );
};

export default FallbackPopups;

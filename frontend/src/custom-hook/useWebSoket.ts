import { useState } from "react";

export function useWebSoket() {
  const [listenedData, setListenedData] = useState({});

  return listenedData;
}

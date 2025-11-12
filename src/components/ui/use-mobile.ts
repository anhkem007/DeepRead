import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  useEffect(() => {
    const handler = () => {
      const { width } = Dimensions.get("window");
      setIsMobile(width < 768);
    };
    const sub = Dimensions.addEventListener("change", handler);
    handler();
    return () => sub?.remove();
  }, []);
  return isMobile;
}

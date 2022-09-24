import { useState, useEffect } from "react";
import { getTimeDifferenceString } from "../utils";

interface UseTimeUntilAthanProps {
  date: Date;
  isEnabled: boolean;
}

export function useTimeUntilAthan({ date, isEnabled }: UseTimeUntilAthanProps) {
  const [timeUntilAthanString, setTimeUntilAthanString] = useState("");

  useEffect(() => {
    setTimeUntilAthanString(getTimeDifferenceString(date, new Date()));

    let id: NodeJS.Timer | undefined;
    if (isEnabled)
      id = setInterval(() => {
        setTimeUntilAthanString(getTimeDifferenceString(date, new Date()));
      }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [date, isEnabled]);

  return timeUntilAthanString;
}

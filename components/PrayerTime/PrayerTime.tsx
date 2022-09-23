import styles from "./PrayerTime.module.css";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { getTimeDifferenceString } from "../../utils";

export interface PrayerTimeProps {
  periodName: string;
  date: Date;
  showTimeUntilPrayer: boolean;
}

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  timeStyle: "short",
};

export const PrayerTime = ({
  periodName,
  date,
  showTimeUntilPrayer,
}: PrayerTimeProps) => {
  const { t, lang } = useTranslation("index");
  const [timeUntilAthanString, setTimeUntilAthanString] = useState("");

  const isFuture = date.getTime() > new Date().getTime();

  useEffect(() => {
    setTimeUntilAthanString(getTimeDifferenceString(date, new Date()));

    let id: NodeJS.Timer | undefined;
    if (showTimeUntilPrayer)
      id = setInterval(() => {
        setTimeUntilAthanString(getTimeDifferenceString(date, new Date()));
      }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [date, showTimeUntilPrayer]);

  const formatedTime = date.toLocaleTimeString([lang], timeFormatOptions);
  return (
    <div className={styles.prayerTimeCard}>
      <div>
        <p>{t(periodName.toLocaleLowerCase())}</p>
        <p>{formatedTime}</p>
      </div>
      {showTimeUntilPrayer && isFuture && (
        <p className={styles.timeUntilAthan}>
          {t("time-until-athan")}:{" "}
          <span className={styles.time}>{timeUntilAthanString}</span>
        </p>
      )}
    </div>
  );
};

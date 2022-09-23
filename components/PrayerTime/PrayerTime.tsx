import styles from "./PrayerTime.module.css";
import useTranslation from "next-translate/useTranslation";

export interface PrayerTimeProps {
  periodName: string;
  time: string;
}

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  timeStyle: "short",
};

export const PrayerTime = ({ periodName, time }: PrayerTimeProps) => {
  const { t, lang } = useTranslation("index");

  const formatedTime = new Date(time.split("(")[0].trim()).toLocaleTimeString(
    [lang],
    timeFormatOptions
  );
  return (
    <div className={styles.prayerTimeCard}>
      <p>{t(periodName.toLocaleLowerCase())}</p>
      <p>{formatedTime}</p>
    </div>
  );
};

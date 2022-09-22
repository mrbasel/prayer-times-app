import styles from "./PrayerTime.module.css";

export interface PrayerTimeProps {
  periodName: string;
  time: string;
}

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  timeStyle: "short",
};

export const PrayerTime = ({ periodName, time }: PrayerTimeProps) => {
  const formatedTime = new Date(time.split("(")[0].trim()).toLocaleTimeString(
    [],
    timeFormatOptions
  );
  return (
    <div className={styles.prayerTimeCard}>
      <p>{periodName}</p>
      <p>{formatedTime}</p>
    </div>
  );
};

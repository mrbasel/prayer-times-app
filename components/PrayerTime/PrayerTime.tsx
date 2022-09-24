import styles from "./PrayerTime.module.css";
import useTranslation from "next-translate/useTranslation";
import { useTimeUntilAthan } from "../../hooks/useTimeUntilAthan";

export interface PrayerTimeProps {
  periodName: string;
  date: Date;
  isNextPrayer: boolean;
}

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  timeStyle: "short",
};

export const PrayerTime = ({
  periodName,
  date,
  isNextPrayer,
}: PrayerTimeProps) => {
  const { t, lang } = useTranslation("index");
  const timeUntilAthanString = useTimeUntilAthan({
    date,
    isEnabled: isNextPrayer,
  });

  const isFuture = date.getTime() > new Date().getTime();
  const showTimeUntilAthan = isNextPrayer && isFuture;
  const formatedTime = date.toLocaleTimeString([lang], timeFormatOptions);

  return (
    <div className={styles.prayerTimeCard}>
      <div>
        <p>{t(periodName.toLocaleLowerCase())}</p>
        <p>{formatedTime}</p>
      </div>
      {showTimeUntilAthan && (
        <p className={styles.timeUntilAthan}>
          {t("time-until-athan")}:{" "}
          <span className={styles.time}>{timeUntilAthanString}</span>
        </p>
      )}
    </div>
  );
};

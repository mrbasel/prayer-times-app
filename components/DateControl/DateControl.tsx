import useTranslation from "next-translate/useTranslation";
import { ArrowLeft } from "../ArrowLeft";
import { ArrowRight } from "../ArrowRight";
import styles from "./DateControl.module.css";

interface DateControlProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const DateControl = ({
  currentDate,
  setCurrentDate,
}: DateControlProps) => {
  const { lang } = useTranslation("index");

  const nextDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    setCurrentDate(date);
  };

  const previousDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    setCurrentDate(date);
  };

  const currentDateString = currentDate.toLocaleString([lang], {
    dateStyle: "long",
  });
  const hijriDateString = currentDate.toLocaleString([lang], {
    dateStyle: "long",
    calendar: "islamic-civil",
  });

  return (
    <div className={styles.headerContainer} dir="ltr">
      <button onClick={previousDay}>
        <ArrowLeft />
      </button>
      <div>
        <h3 className={styles.currentDate}>{currentDateString}</h3>
        <p>{hijriDateString}</p>
      </div>
      <button onClick={nextDay}>
        <ArrowRight />
      </button>
    </div>
  );
};

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { PrayerTime } from "../components/PrayerTime";
import styles from "../styles/Home.module.css";
import useTranslation from "next-translate/useTranslation";

import { lookup } from "fast-geoip";
import { useState } from "react";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { ArrowLeft } from "../components/ArrowLeft";
import { ArrowRight } from "../components/ArrowRight";
import { Loading } from "../components/Loading/Loading";

const periods = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

interface HomeProps {
  country: string;
  city: string;
}

const Home: NextPage<HomeProps> = ({ country, city }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { timings, isLoading, error } = usePrayerTimes({
    date: currentDate,
    country,
    city,
  });

  const { lang, t } = useTranslation("index");
  const direction = lang === "ar" ? "rtl" : "ltr";

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

  const rg = new Intl.DisplayNames([lang], { type: "region" });

  if (error) return <div className={styles.status}>Something went wrong.</div>;

  return (
    <div className={styles.container} dir={direction} lang={lang}>
      <Head>
        <title>Prayer times</title>
        <meta name="description" content="A simple prayer times website " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainContainer}>
        <div>
          <header>
            <h1>{t("prayer-times")}</h1>
            <div className={styles.headerContainer} dir="ltr">
              <button onClick={previousDay}>
                <ArrowLeft />
              </button>
              <h2 className={styles.currentDate}>{currentDateString}</h2>
              <button onClick={nextDay}>
                <ArrowRight />
              </button>
            </div>
            <p className="current-location">
              {rg.of(country)}, {city}
            </p>
          </header>
          {isLoading ? (
            <div className={styles.status}>
              <Loading />
            </div>
          ) : (
            <div className={styles.times}>
              {periods.map((period, i) => (
                <PrayerTime
                  key={i}
                  periodName={period}
                  time={timings[period]}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;

// @ts-ignore
export async function getServerSideProps({ req }: GetServerSideProps) {
  const forwarded = req.headers["x-forwarded-for"];

  const ip =
    typeof forwarded === "string"
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress;

  let res;
  console.log(process.env.IP);

  res = await lookup(ip);

  return {
    props: {
      country: res?.country ?? "SA",
      city: res?.city ?? "Makkah",
    },
  };
}

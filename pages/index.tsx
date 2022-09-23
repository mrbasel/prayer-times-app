import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { PrayerTime } from "../components/PrayerTime";
import styles from "../styles/Home.module.css";
import useTranslation from "next-translate/useTranslation";

import { lookup } from "fast-geoip";
import { useState } from "react";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { Loading } from "../components/Loading/Loading";
import { PERIODS } from "../constants";
import { MosqueIcon } from "../components/MosqueIcon";
import { DateControl } from "../components/DateControl/DateControl";
import { Footer } from "../components/Footer/Footer";
import { getClosestDate } from "../utils";

interface HomeProps {
  country: string;
  city: string;
}

const Home: NextPage<HomeProps> = ({ country, city }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { dateTimings, isLoading, error } = usePrayerTimes({
    date: currentDate,
    country,
    city,
  });

  const { lang, t } = useTranslation("index");
  const direction = lang === "ar" ? "rtl" : "ltr";
  const rg = new Intl.DisplayNames([lang], { type: "region" });

  const allDates = Object.values(dateTimings);
  const nextPrayer = getClosestDate(allDates);

  if (error) return <div className={styles.status}>Something went wrong.</div>;

  return (
    <>
      <div className={styles.container} dir={direction} lang={lang}>
        <Head>
          <title>Prayer times</title>
          <meta name="description" content="A simple prayer times website " />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.mainContainer}>
          <div>
            <header>
              <div className={styles.innerContainer}>
                <div>
                  <h1>{t("prayer-times")}</h1>
                  <p className="current-location">
                    {rg.of(country)}, {city}
                  </p>
                </div>
                <MosqueIcon />
              </div>
            </header>
            <div className={styles.dateControl}>
              <DateControl
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />
            </div>
            {isLoading ? (
              <div className={styles.status}>
                <Loading />
              </div>
            ) : (
              <div className={styles.times}>
                {PERIODS.map((period, i) => (
                  <PrayerTime
                    key={i}
                    periodName={period}
                    date={dateTimings[period]}
                    showTimeUntilPrayer={
                      nextPrayer?.getTime() === dateTimings[period].getTime()
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
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

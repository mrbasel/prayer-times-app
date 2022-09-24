import { useState } from "react";
import useSWR from "swr";
import { API_ROUTE } from "../constants";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Something went wrong");
  return response.json();
};

interface usePrayerTimesProps {
  date: Date;
  country: string;
  city: string;
}

export function usePrayerTimes({ date, city, country }: usePrayerTimesProps) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const url = new URL(`${API_ROUTE}/calendarByCity`);
  url.searchParams.set("city", city);
  url.searchParams.set("country", country);
  url.searchParams.set("month", month.toString(10));
  url.searchParams.set("year", year.toString(10));
  url.searchParams.set("method", "8");
  url.searchParams.set("iso8601", "true");

  const { data, error } = useSWR(url.toString(), fetcher);

  const isLoading = !error && !data;
  const timings: Record<string, string> =
    data?.data?.[day - 1]?.timings ?? null;

  const dateTimings = Object.entries(timings ?? {}).reduce((prev, curr) => {
    const [period, iso8601String] = curr;
    const date = new Date(iso8601String.split("(")[0].trim());

    prev[period] = date;
    return prev;
  }, {} as Record<string, Date>);

  return {
    dateTimings,
    isLoading,
    error,
  };
}

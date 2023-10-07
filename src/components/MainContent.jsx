import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayerCard from "./PrayerCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/ar-dz";
import TopRowComponent from "./TopRowComponent";
import SelectedCity from "./SelectedCity";
import SelectedCountry from "./SelectedCountry";
moment.locale("ar");

export default function MainContent() {
  // ====== STATES AND  VARIABLES ============//
  const [timings, setTimings] = useState({});
  const [today, setToday] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const remainingTimeRef = useRef(remainingTime);
  const [city, setCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });
  const [country, setCountry] = useState({
    displayName: "مصر",
    apiName: "EG",
  });

  const availableCities = [
    { displayName: "القاهرة", apiName: "Cairo" },
    { displayName: "الاسكندرية", apiName: "Alexandria" },
    { displayName: "اسوان", apiName: "Aswan" },
    { displayName: "المدينة", apiName: "Medina" },
    { displayName: "الرياض", apiName: "Riyadh" },
    { displayName: "مكة المكرمة", apiName: "Makkah al-Mukarramah" },
  ];
  const availableCountry = [
    { displayName: "مصر", apiName: "EG" },
    { displayName: "السعودية", apiName: "SA" },
  ];
  const prayersArray = useMemo(
    () => [
      { key: "Fajr", displayName: "الفجر" },
      { key: "Dhuhr", displayName: "الظهر" },
      { key: "Asr", displayName: "العصر" },
      { key: "Maghrib", displayName: "المغرب" },
      { key: "Isha", displayName: "العشاء" },
    ],
    []
  );

  // CHANGE CITY WHEN CHANGE
  const handleCity = (event) => {
    const cityObject = availableCities.find((city) => {
      return city.apiName === event.target.value;
    });
    setCity(cityObject);
  };
  // CHANGE COUNTRY WHEN CHANGE
  const handleCountry = (event) => {
    const cityObject = availableCountry.find((country) => {
      return country.apiName === event.target.value;
    });
    setCountry(cityObject);
  };
  // ====== GET INDEX OF CURRENT PRAYER
  const getCurrentPrayerIndex = () => {
    const now = moment();
    for (let i = 0; i < prayersArray.length; i++) {
      const prayerTime = moment(timings[prayersArray[i].key], "hh:mm");
      if (now.isBefore(prayerTime)) {
        return i;
      }
    }
    return 0; // Default to the first prayer if none is upcoming.
  };
  const nextPrayerIndex = getCurrentPrayerIndex();

  // ===== GET THE REMAINING TIME UNTIL THE NEXT PRAYER IS COMES
  const getCurrentRemainingTime = useCallback(() => {
    const nextPrayerTime = moment(
      timings[prayersArray[nextPrayerIndex].key],
      "HH:mm"
    );
    const now = moment();
    let remainingTime = moment(nextPrayerTime, "HH:mm").diff(now);
    if (nextPrayerIndex === 0) {
      const midnightDiff = moment("23:59:59", "HH:mm:ss").diff(now);
      const fajrToMidnightDiff = moment(nextPrayerTime, "HH:mm:ss").diff(
        moment("00:00:00", "HH:mm:ss")
      );
      const totalDiff = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDiff;
    }
    const durationRemainingTime = moment.duration(remainingTime);
    return `${durationRemainingTime.hours()}:${durationRemainingTime.minutes()}:${durationRemainingTime.seconds()}`;
  }, [nextPrayerIndex, prayersArray, timings]);

  //  ===== GET THE TIMINGS OF ALL PRAYER BY CITY FOR API
  const handleData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city.apiName}&country=${country.apiName}`
      );
      setTimings(response?.data?.data?.timings);
    } catch (error) {
      console.log(error.response);
    }
  }, [city.apiName, country.apiName]);


  useEffect(() => {
    handleData();
  }, [city, handleData]);

  useEffect(() => {
    setToday(moment().format("DD MMMM YYYY | hh:mm"));
  }, []);

  useEffect(() => {
    remainingTimeRef.current = remainingTime;
    setRemainingTime(getCurrentRemainingTime());

    const remainingTimeInterval = setInterval(() => {
      setRemainingTime(getCurrentRemainingTime()); 
    }, 1000);

    return () => clearInterval(remainingTimeInterval);
  }, [getCurrentRemainingTime, remainingTime]);

  return (
    <div>
      {/* TOP ROW  */}
      <TopRowComponent
        today={today}
        cityDisplayName={city.displayName}
        remainingTime={remainingTime}
        prayerName={prayersArray[nextPrayerIndex].displayName}
      />
      {/*==== TOP ROW ====== */}
      <Divider variant="middle" color="grey" style={{ opacity: "0.3" }} />
      {/* PRAYERS TIMING CARDS  */}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        style={{ marginTop: "50px", width: "90vw" }}
      >
        <PrayerCard
          prayerImage="/src/assets/fajr-prayer.png"
          prayerName="الفجر"
          prayerTime={timings?.Fajr}
        />
        <PrayerCard
          prayerImage="/src/assets/dhhr-prayer-mosque.png"
          prayerName="الظهر"
          prayerTime={timings?.Dhuhr}
        />
        <PrayerCard
          prayerImage="/src/assets/asr-prayer-mosque.png"
          prayerName="العصر"
          prayerTime={timings?.Asr}
        />
        <PrayerCard
          prayerImage="/src/assets/sunset-prayer-mosque.png"
          prayerName="المغرب"
          prayerTime={timings?.Maghrib}
        />
        <PrayerCard
          prayerImage="/src/assets/night-prayer-mosque.png"
          prayerName="العشاء"
          prayerTime={timings?.Isha}
        />
      </Stack>
      {/* ===== PRAYERS TIMING CARDS=======  */}
      {/*SELECT CITY  */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        justifyContent="space-evenly"
        alignContent="center"
        style={{ marginTop: "50px" }}
      >
        <SelectedCity
          cityApiName={city.apiName}
          availableCities={availableCities}
          onChange={handleCity}
        />
        <SelectedCountry
          countryApiName={country.apiName}
          availableCountry={availableCountry}
          onChange={handleCountry}
        />
      </Stack>
      {/* ===== SELECT CITY ======= */}
    </div>
  );
}

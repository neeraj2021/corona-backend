import express from "express";
import Puppeteer from "puppeteer";

async function getCountryData() {
  const browser = await Puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
    ignoreDefaultArgs: ["--disable-extensions"],
  });

  const page = await browser.newPage();
  await page.goto("https://www.mohfw.gov.in/");

  const countryTodayData = await page.$$eval(
    "#site-dashboard > div > div > div:nth-child(1) > div.col-xs-8.site-stats-count > ul > li > span",
    (pt) => {
      return pt.map((x) => x.textContent);
    }
  );

  const countryTodayDataRes = [];
  for (let i = 0; i < countryTodayData.length; i = i + 3) {
    let obj = {
      status: countryTodayData[i],
      patientInPercent: countryTodayData[i + 1]?.slice(1, -2),
      patientInNumber: countryTodayData[i + 2]?.slice(0, -1)?.split("("),
    };
    countryTodayDataRes.push(obj);
  }

  return countryTodayDataRes;
}

async function getStateData() {
  const browser = await Puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
    ignoreDefaultArgs: ["--disable-extensions"],
  });

  const page = await browser.newPage();
  await page.goto("https://www.mohfw.gov.in/");

  const stateWiseData = await page.$$eval(
    "#state-data > div > div > div > div > table > tbody > tr > td",
    (pt) => {
      return pt.map((x) => x.textContent);
    }
  );

  const stateWiseDataRes = [];

  for (let i = 0; i < 360; i = i + 10) {
    let obj = {
      sno: stateWiseData[i],
      stateName: stateWiseData[i + 1],
      activeCases: stateWiseData[i + 2],
      activeChangeSinceYesterday: stateWiseData[i + 3],
      curedCases: stateWiseData[i + 4],
      curedChangeSinceYesterday: stateWiseData[i + 5],
      deathCases: stateWiseData[i + 6],
      deathDuringDay: stateWiseData[i + 7],
      deathReconciled: stateWiseData[i + 8],
      deathTotal: stateWiseData[i + 9],
    };
    stateWiseDataRes.push(obj);
  }
  return stateWiseDataRes;
}

const route = express.Router();

route.get("/", (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    res.send(error);
  }
});

route.get("/country", async (req, res) => {
  try {
    const data = await getCountryData();
    res.json(data);
  } catch (error) {
    res.send(error);
  }
});

route.get("/state", async (req, res) => {
  try {
    const data = await getStateData();
    res.json(data);
  } catch (error) {
    res.send(error);
  }
});

export default route;

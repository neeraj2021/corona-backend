import axios from "axios";
import * as cheerio from "cheerio";
import "reflect-metadata";
import {
  Controller,
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";

const website = "https://www.mohfw.gov.in/";

async function getCountryData() {
  const response = await axios.get(website);
  const $ = cheerio.load(response.data);

  const activeCases = $(".bg-blue > strong:nth-child(2)").text();
  const dischargeCases = $(".bg-green > strong:nth-child(2)").text().trim();
  const deathCases = $(".bg-red > strong:nth-child(2)").text().trim();

  const countryTodaydataRes = [
    {
      status: "Active",
      patientInNumber: activeCases.split("(")[0],
      patientChangeInNumber: activeCases.split("(")[1].slice(0, -1),
    },
    {
      status: "Discharge",
      patientInNumber: dischargeCases.split("(")[0],
      patientChangeInNumber: dischargeCases.split("(")[1].slice(0, -1),
    },
    {
      status: "Death",
      patientInNumber: deathCases.split("(")[0],
      patientChangeInNumber: deathCases.split("(")[1].slice(0, -1),
    },
  ];

  return countryTodaydataRes;
}

async function getStateWData() {
  const response = await axios.get(website);
  const $ = cheerio.load(response.data);
  const ttt = $('div[class=".open-table"]');
  const stateWiseDataList = $(
    "#state-data > div > div > div > div > table > tbody > tr > td"
  ).each((index, element) => {
    console.log($(element));
  });

  console.log(stateWiseDataList);

  return stateWiseDataList;
  // document.querySelector("#state-data > div > div > div > div > table > tbody")
}

@JsonController()
export class CaseController {
  @Get("/case")
  async getAll() {
    return await getCountryData();
  }
  @Get("/state")
  async getStatedata() {
    return await getStateWData();
  }
}

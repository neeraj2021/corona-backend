import * as cheerio from "cheerio";
import "reflect-metadata";
export declare class CaseController {
    getAll(): Promise<{
        status: string;
        patientInNumber: string;
        patientChangeInNumber: string;
    }[]>;
    getStatedata(): Promise<cheerio.Cheerio<cheerio.Element>>;
}

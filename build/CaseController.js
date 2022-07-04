"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseController = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const website = "https://www.mohfw.gov.in/";
function getCountryData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(website);
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
    });
}
function getStateWData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(website);
        const $ = cheerio.load(response.data);
        const ttt = $('div[class=".open-table"]');
        const stateWiseDataList = $("#state-data > div > div > div > div > table > tbody > tr > td").each((index, element) => {
            console.log($(element));
        });
        console.log(stateWiseDataList);
        return stateWiseDataList;
        // document.querySelector("#state-data > div > div > div > div > table > tbody")
    });
}
let CaseController = class CaseController {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield getCountryData();
        });
    }
    getStatedata() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield getStateWData();
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/case"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/state"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "getStatedata", null);
CaseController = __decorate([
    (0, routing_controllers_1.JsonController)()
], CaseController);
exports.CaseController = CaseController;

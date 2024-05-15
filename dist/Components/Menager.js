"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Floor_1 = __importDefault(require("./Floor"));
const Elevator_1 = __importDefault(require("./Elevator"));
const config_1 = require("../config");
const Building_js_1 = __importDefault(require("./Building.js"));
const EleavatorController_js_1 = __importDefault(require("./EleavatorController.js"));
const ElevatorApp_1 = __importDefault(require("./ElevatorApp"));
class ElevatorApp {
    createTheApp(numFloors, numElevators, buildingIndex) {
        const buildings = new ElevatorApp_1.default();
        for (let buildingIndex = 0; buildingIndex < config_1.numBuildings; buildingIndex++) {
            const building = new Building_js_1.default(buildingIndex);
            building.buildingNumber = buildingIndex;
            for (let i = numFloors - 1; i >= 0; i--) {
                const floor = new Floor_1.default(i, buildingIndex);
                building.addFloor(floor);
            }
            for (let i = 0; i < numElevators; i++) {
                const elevator = new Elevator_1.default(i);
                building.addElevator(elevator);
            }
            const elevatorsControl = new EleavatorController_js_1.default(building.getFloors(), building.getElevators());
            building.setElevatorsController(elevatorsControl);
            buildings.addBuilding(building);
        }
        return buildings;
    }
}
exports.default = ElevatorApp;

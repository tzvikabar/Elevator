"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Building_js_1 = __importDefault(require("./Building.js"));
const Floor_js_1 = __importDefault(require("./Floor.js"));
const Elevator_js_1 = __importDefault(require("./Elevator.js"));
const EleavatorController_js_1 = __importDefault(require("./EleavatorController.js"));
class Factory {
    constructor() {
        this.floorFactory = new Floor_js_1.default();
        this.elevatorFactory = new Elevator_js_1.default();
        this.elevatorsControllerFactory = new EleavatorController_js_1.default();
    }
    createBuilding(numFloors, numElevators, buildingIndex, elevatorType) {
        const building = new Building_js_1.default(buildingIndex);
        building.buildingNumber = buildingIndex;
        // Allocation to the building of its floors
        for (let i = numFloors - 1; i >= 0; i--) {
            const floor = this.floorFactory.createFloor(i, buildingIndex);
            building.addFloor(floor);
        }
        // Allocation to the building of its elevators
        for (let i = 0; i < numElevators; i++) {
            const elevator = this.elevatorFactory.createElevator(elevatorType, i);
            console.log("velo", elevator.velocity);
            building.addElevator(elevator);
        }
        // Allocation to the building of its elevatorsController
        building.setElevatorsController(this.elevatorsControllerFactory.createElevatorsController(building.getFloors(), building.getElevators()));
        return building;
    }
}
exports.default = Factory;

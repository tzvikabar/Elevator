"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Buildings {
    constructor() {
        this.buildings = [];
    }
    addBuilding(building) {
        this.buildings.push(building);
    }
    // Function to activate the elevator controller from a building received as an argument to a floor received as an argument
    assignFloorToElevator(buildingIndex, floorNumber) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            console.log("buildingIndexArgument :", buildingIndex);
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}
exports.default = Buildings;

import Building from "./Building.js";

export default class Buildings {
    buildings: Building[];

    constructor() {
        this.buildings = [];
    }

    addBuilding(building : Building) {
        this.buildings.push(building);
    }

// activates the elevator controller for a specified building and floor
    assignFloorToElevator(buildingIndex: number, floorNumber: number) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}
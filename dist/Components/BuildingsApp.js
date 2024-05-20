export default class Buildings {
    constructor() {
        this.buildings = [];
    }
    addBuilding(building) {
        this.buildings.push(building);
    }
    // activates the elevator controller for a specified building and floor
    assignFloorToElevator(buildingIndex, floorNumber) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}

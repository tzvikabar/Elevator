export default class Buildings {
    constructor() {
        this.buildings = [];
    }
    addBuilding(building) {
        this.buildings.push(building);
    }
    assignFloorToElevator(buildingIndex, floorNumber) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}

import Floor from './Floor.js';
import Elevator from './Elevator.js';
import Building from './Building.js';
import ElevatorsController from './EleavatorController.js';
import Buildings from './ElevatorApp.js';
export default class ElevatorApp {
    createTheApp(numFloors, numElevators, numBuildings) {
        const buildings = new Buildings();
        for (let buildingIndex = 0; buildingIndex < numBuildings; buildingIndex++) {
            console.log("build: " + numBuildings + "elev: " + numElevators + "floor: " + numFloors);
            const building = new Building(buildingIndex);
            building.buildingNumber = buildingIndex;
            for (let i = numFloors - 1; i >= 0; i--) {
                const floor = new Floor(i, buildingIndex);
                building.addFloor(floor);
            }
            for (let i = 0; i < numElevators; i++) {
                const elevator = new Elevator(i);
                building.addElevator(elevator);
            }
            const elevatorsControl = new ElevatorsController(building.getFloors(), building.getElevators());
            building.setElevatorsController(elevatorsControl);
            buildings.addBuilding(building);
        }
        return buildings;
    }
}

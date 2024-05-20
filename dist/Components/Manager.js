import Floor from './Floor.js';
import Elevator from './Elevator.js';
import Building from './Building.js';
import ElevatorsController from './EleavatorController.js';
import Buildings from './BuildingsApp.js';
export default class ElevatorApp {
    createTheApp(numFloors, numElevators, numBuildings) {
        const buildings = new Buildings();
        // loop for building
        for (let buildingIndex = 0; buildingIndex < numBuildings; buildingIndex++) {
            const building = new Building(buildingIndex);
            building.buildingNumber = buildingIndex;
            // add floors
            for (let i = numFloors - 1; i >= 0; i--) {
                const floor = new Floor(i, buildingIndex);
                building.addFloor(floor);
            }
            // add elevators
            for (let i = 0; i < numElevators; i++) {
                const elevator = new Elevator(i);
                building.addElevator(elevator);
            }
            // add controller for the app
            const elevatorsControl = new ElevatorsController(building.getFloors(), building.getElevators());
            building.setElevatorsController(elevatorsControl);
            buildings.addBuilding(building);
        }
        return buildings;
    }
}

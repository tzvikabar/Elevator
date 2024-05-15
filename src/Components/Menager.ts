import Floor from './Floor';
import Elevator from './Elevator';
import { numFloors, numElevators, numBuildings } from '../config';
import Building from './Building.js';
import ElevatorsController from './EleavatorController.js';
import Buildings from './ElevatorApp';



export default class ElevatorApp {

    createTheApp(numFloors: number, numElevators: number, buildingIndex: number): Buildings {
        const buildings = new Buildings();

        for (let buildingIndex = 0; buildingIndex < numBuildings; buildingIndex++) {

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
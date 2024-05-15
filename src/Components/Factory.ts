import Building from './Building.js';
import Floor from './Floor.js';
import Elevator from './Elevator.js';
import ElevatorsController from './EleavatorController.js';



export default class Factory  {
    private floorFactory: Floor;
    private elevatorFactory: Elevator;
    private elevatorsControllerFactory: ElevatorsController;

    constructor() {
        this.floorFactory = new Floor();
        this.elevatorFactory = new Elevator();
        this.elevatorsControllerFactory = new ElevatorsController();
    }

    public createBuilding(numFloors: number, numElevators: number, buildingIndex: number, elevatorType: string): Building {
        const building = new Building(buildingIndex);
        building.buildingNumber = buildingIndex;

        // Allocation to the building of its floors
        for (let i = numFloors - 1; i >= 0; i--) {
            const floor = this.floorFactory.createFloor(i, buildingIndex);
            building.addFloor(floor);
        }

        // Allocation to the building of its elevators
        for (let i = 0; i < numElevators; i++) {
            const elevator = this.elevatorFactory.createElevator(elevatorType, i);
            console.log("velo", elevator.velocity)
            building.addElevator(elevator);
        }

        // Allocation to the building of its elevatorsController
        building.setElevatorsController(this.elevatorsControllerFactory.createElevatorsController(building.getFloors(), building.getElevators()));

        return building;
    }

}
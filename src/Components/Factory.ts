// import Building from './Building.js';
// import Floor from './Floor.js';
// import Elevator from './Elevator.js';
// import ElevatorsController from './EleavatorController.js';



// export default class Factory  {
//     private floorFactory: Floor;
//     private elevatorFactory: Elevator;
//     private elevatorsControllerFactory: ElevatorsController;

//     constructor() {
//         this.floorFactory = new Floor();
//         this.elevatorFactory = new Elevator();
//         this.elevatorsControllerFactory = new ElevatorsController();
//     }

//     public createBuilding(numFloors: number, numElevators: number, buildingIndex: number, elevatorType: string): Building {
//         const building = new Building(buildingIndex);
//         building.buildingNumber = buildingIndex;

//         // add floors
//         for (let i = numFloors - 1; i >= 0; i--) {
//             const floor = this.floorFactory.createFloor(i, buildingIndex);
//             building.addFloor(floor);
//         }

//         // add elevators
//         for (let i = 0; i < numElevators; i++) {
//             const elevator = this.elevatorFactory.createElevator(elevatorType, i);
//             building.addElevator(elevator);
//         }

//         return building;
//     }

// }
import Building from './Building.js';
import Elevator from './Elevator.js';
import Floor from './Floor.js';

export default class ElevatorsController {
    private building!: Building;
    private buildingFloors: Floor[];
    private buildingElevators: Elevator[];
    private waitingFloorsList: number[] = [];
    private waitingFloors: { floorNumber: number, elevatorNumber: number, waitingTime: number }[] = [];

    constructor(floors: Floor[], elevators: Elevator[]) {
        this.buildingFloors = floors;
        this.buildingElevators = elevators;
    }

    public setBuilding(building: Building): void {
        this.building = building;
    }

    public assignFloorToElevator(floorNumber: number): void {
        if (this.buildingElevators.length > 0) {
            
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].isWaiting = true;
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender();
            
            let closestElevatorIndex = 0;
            let minimalWaitingTime = Infinity;
            
            // Check for each elevator in the building the time to arrive at the calling floor
            for (let i = 0; i < this.buildingElevators.length; i++) {
                const elevator = this.buildingElevators[i];
                const elevatorPosition = elevator.currentPosition;
                
                let movingTime ;
                let totalWaitingTime ;
                
                // if the elevator is moving
                if (elevator.movingTime > 0) {
                    console.log("floor num "+floorNumber);
                    movingTime = elevator.movingTime + ((elevator.floorDestinationNumber- elevator.currentPosition)/2);
                    totalWaitingTime = movingTime + elevator.waitingTime;
                }
                // if the elevator is not moving
                else {
                    movingTime = floorNumber / 2;
                    totalWaitingTime = movingTime + elevator.waitingTime;
                }

                if (totalWaitingTime < minimalWaitingTime) {
                    closestElevatorIndex = i;
                    minimalWaitingTime = totalWaitingTime;
                }
            }
        
            if (minimalWaitingTime !== Infinity) {
                // Assign the waiting time to the calling floor
                this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].calculateTime(minimalWaitingTime);

                // If available, sends the elevator to the calling floor
                if (this.buildingElevators[closestElevatorIndex].isAvailable === true) {
                    this.buildingElevators[closestElevatorIndex].goToFloor(this.building.buildingNumber, floorNumber, minimalWaitingTime);
                    console.log("move");
                }
                // If not available, recording of the calling floor, elevator and waiting time in the queue
                else {
                    this.waitingFloorsList.push(floorNumber);
                    this.waitingFloors.push({ floorNumber: floorNumber, elevatorNumber: closestElevatorIndex, waitingTime: minimalWaitingTime });
                }
            }

        }
    }
}
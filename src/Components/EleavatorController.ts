import { secondsPerFloor } from '../config.js';
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
            
            // check for each elevator in the building the time to arrive at the calling floor
            for (let i = 0; i < this.buildingElevators.length; i++) {
                const elevator = this.buildingElevators[i];
                const elevatorPosition = elevator.currentPosition;
                
                let movingTime ;
                let totalWaitingTime ;
                
                // if the elevator is moving
                if (elevator.movingTime > 0) {
                    movingTime = elevator.movingTime + ((elevator.floorDestinationNumber- elevator.currentPosition)* secondsPerFloor);
                    totalWaitingTime = movingTime + elevator.waitingTime;
                }
                // if the elevator is not moving
                else {
                    movingTime = floorNumber * secondsPerFloor;
                    totalWaitingTime = movingTime + elevator.waitingTime;
                }
                // Keep the minimum time and the elevator index
                if (totalWaitingTime < minimalWaitingTime) {
                    closestElevatorIndex = i;
                    minimalWaitingTime = totalWaitingTime;
                }
            }
        
            if (minimalWaitingTime !== Infinity) {
                // present the waiting time on the floor
                this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].calculateTime(minimalWaitingTime);

                // send the avilable elevator or add to queue
                if (this.buildingElevators[closestElevatorIndex].isAvailable === true) {
                    this.buildingElevators[closestElevatorIndex].goToFloor(floorNumber, minimalWaitingTime);
                }
                else {
                    this.waitingFloorsList.push(floorNumber);
                    this.waitingFloors.push({ floorNumber: floorNumber, elevatorNumber: closestElevatorIndex, waitingTime: minimalWaitingTime });
                }
            }

        }
    }
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { floorHeightConfig, arrivalSound } from '../config.js';
export default class Elevator {
    constructor(elevatorNumber) {
        this.waitingTime = 0;
        this.isMoving = false;
        this.movingTime = 0;
        this.floorDestinationNumber = null;
        this.isAvailable = true;
        this.elevatorNumber = elevatorNumber;
    }
    setBuilding(building) {
        this.building = building;
    }
    render() {
        return `<img id="elevator${this.elevatorNumber}" src="../assets/elv.png" class="elevator" style="left: ${this.elevatorNumber * 90}px;">`;
    }
    goToFloor(buildingNumber, floorNumber, movingTime) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the elevator is moving
            while (this.isMoving) {
                yield new Promise(resolve => setTimeout(resolve, 500)); // Wait 500 ms before checking again
            }
            const moveElevator = () => {
                // Update the elevator data
                this.isMoving = true;
                this.waitingTime = 2;
                this.movingTime = movingTime;
                this.floorDestinationNumber = floorNumber;
                this.isAvailable = false;
                const currentPosition = this.getCurrentPosition();
                const newPosition = Math.round(floorNumber * floorHeightConfig);
                // Keep the elevator to move
                const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`);
                if (elevator) {
                    const velocity = Math.round(1000 / 1.5);
                    // Calculate the duration of the animation : the animation time for a floor multiplied by the number of floors
                    const duration = Math.abs(velocity * (floorNumber - Math.round(currentPosition / floorHeightConfig)));
                    //  Duration in milliseconds of the interval between each rendering of the elevator so that the animation is smooth
                    const interval = 10;
                    const steps = Math.ceil(duration / interval);
                    const distance = newPosition - currentPosition;
                    const stepDistance = distance / steps; // Calculation of the distance to move the elevator on each step
                    let currentStep = 0;
                    const sound = arrivalSound;
                    let previousPosition = currentPosition;
                    const animate = () => {
                        // If the number of movements necessary for the elevator to reach the calling floor has not yet been reached
                        if (currentStep < steps) {
                            const nextPosition = currentPosition + stepDistance * currentStep;
                            elevator.style.bottom = `${nextPosition}px`;
                            currentStep++;
                            if (Math.abs(nextPosition - previousPosition) >= floorHeightConfig) {
                                // Decrements this.movingTime by 0.5 for each 110 pixels moved
                                this.movingTime -= 0.5;
                                previousPosition = nextPosition; // Update the previous position
                                // console.log("MovingTime : " + this.movingTime)
                            }
                            // Activate the animation after the defined time interval between each animation
                            setTimeout(animate, interval);
                        }
                        else {
                            elevator.style.bottom = `${newPosition}px`;
                            sound.play();
                            // Update the elevator state
                            this.building.getElevatorsController().elevatorArrival(floorNumber);
                            const intervalId = setInterval(() => {
                                if (this.waitingTime > 0) {
                                    this.waitingTime -= 0.5;
                                    // console.log("ArrivalWaiting : ", this.arrivalWaiting);
                                }
                                else {
                                    // console.log("ArrivalWaiting : ", this.arrivalWaiting);
                                    clearInterval(intervalId); // Stop updating when arrivalWaitingTimeInSeconds have passed
                                }
                            }, 500);
                            // Update the elevator data
                            this.isMoving = false;
                            this.movingTime = 0;
                            this.floorDestinationNumber = null;
                            this.isAvailable = true;
                            this.building.getElevatorsController().elevatorIsAvailable(this.elevatorNumber);
                        }
                    };
                    animate();
                }
            };
            // Function to wait until arrivalWaiting is zero before moving the elevator
            const waitUntilArrivalWaitingZero = () => {
                if (this.waitingTime <= 0) {
                    moveElevator();
                }
                else {
                    setTimeout(waitUntilArrivalWaitingZero, 500);
                }
            };
            waitUntilArrivalWaitingZero();
        });
    }
    getCurrentPosition() {
        // Keep the elevator to move
        const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`);
        if (elevator) {
            const currentPositionString = window.getComputedStyle(elevator).getPropertyValue('bottom');
            const currentPositionInt = parseInt(currentPositionString, 10);
            // Rounds the elevator position to the bottom of the floor it is on
            const currentPositionByFloor = currentPositionInt - (currentPositionInt % floorHeightConfig);
            return currentPositionByFloor;
        }
        return 0;
    }
}

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
        this.isActive = false;
        this.movingTime = 0;
        this.floorDestinationNumber = null;
        this.isAvailable = true;
        this.currentPosition = 0;
        this.elevatorNumber = elevatorNumber;
    }
    setBuilding(building) {
        this.building = building;
    }
    render() {
        return `<img id="elevator${this.elevatorNumber}" 
        src="../assets/elv.png" 
        class="elevator" >
        `;
    }
    goToFloor(buildingNumber, floorNumber, movingTime) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the elevator is moving
            while (this.isActive) {
                yield new Promise(resolve => setTimeout(resolve, 500));
            }
            const moveElevator = () => {
                // Update data
                this.isActive = true;
                this.waitingTime = 2;
                this.movingTime = movingTime;
                this.floorDestinationNumber = floorNumber;
                this.isAvailable = false;
                const currentPosition = this.currentPosition;
                const newPosition = Math.round(floorNumber * floorHeightConfig);
                // Keep the elevator to move
                const elevator = document.querySelector(`#elevator${this.elevatorNumber}`);
                if (elevator) {
                    const distance = newPosition - currentPosition;
                    const sound = arrivalSound;
                    const time = Math.abs(this.currentPosition - this.floorDestinationNumber) / 2;
                    elevator.style.transform = `translateY(-${this.floorDestinationNumber * (floorHeightConfig + 7)}px`;
                    elevator.style.transitionDuration = `${time}s`;
                    setTimeout(() => {
                        sound.play();
                        this.isActive = false;
                        this.isAvailable = true;
                    }, time * 1000);
                    this.currentPosition = this.floorDestinationNumber;
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
                }
            };
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
}

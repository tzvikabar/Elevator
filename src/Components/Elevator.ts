import Building from "./Building.js";
import { floorHeightConfig, arrivalSound, secondsPerFloor} from '../config.js';

export default class Elevator {

    private building!: Building;
    private elevatorNumber: number;
    public waitingTime: number = 0;
    public isActive: boolean = false;
    public movingTime: number = 0;
    public floorDestinationNumber: number  = 0;
    public isAvailable: boolean = true;
    public currentPosition: number = 0;

    constructor(elevatorNumber: number) {
        this.elevatorNumber = elevatorNumber;
    }

    public setBuilding(building: Building): void {
        this.building = building;
}

    public render(): string {
        return `<img id="elevator${this.elevatorNumber}" 
        src="../assets/elv.png" 
        class="elevator"
        buildingNumberData="${this.building.buildingNumber}" >
        `;
    }


    public async goToFloor(floorNumber: number, movingTime: number): Promise<void> {

    // check if the elevator is moving
    while (this.isActive) {
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const moveElevator = () => {
        // update data
        this.isActive = true;
        this.waitingTime = 2;
        this.movingTime = movingTime; 
        this.floorDestinationNumber = floorNumber;
        this.isAvailable = false;

        // find the element
        const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`) as HTMLElement | null;
        
        if (elevator) {
            
            const sound = arrivalSound; 
            const time = Math.abs(this.currentPosition - this.floorDestinationNumber) * secondsPerFloor;
            // make the elevator movement
            elevator.style.transform = `translateY(-${this.floorDestinationNumber*(floorHeightConfig+7)}px`
            elevator.style.transitionDuration = `${time}s`;
            
            setTimeout(() => {
                sound.play();
                this.isActive = false; 
                this.isAvailable = true;
                this.building.getElevatorsController().freeElevator(this.elevatorNumber);
                
            }, time * 1000);
            this.currentPosition = this.floorDestinationNumber;
            // updating the waiting time
            const intervalId = setInterval(() => {
                if (this.waitingTime > 0) {
                    this.waitingTime -= 0.5;
                } else {
                    clearInterval(intervalId); // stop updating when arrival
                }
            }, 500);
        }
    };
    
    const waitUntilArrivalWaitingZero = () => {
        if (this.waitingTime <= 0) {
            moveElevator();
        } else {
            setTimeout(waitUntilArrivalWaitingZero, 500);
        }
    };

    waitUntilArrivalWaitingZero();
}
}


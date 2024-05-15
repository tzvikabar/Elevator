import Building from "./Building.js";
import { floorHeightConfig, arrivalSound} from '../config.js';

export default class Elevator {

    private building!: Building;
    private elevatorNumber: number;
    public waitingTime: number = 0;
    public isMoving: boolean = false;
    public movingTime: number = 0;
    public floorDestinationNumber: number | null = null;
    public isAvailable: boolean = true;

    constructor(elevatorNumber: number) {
        this.elevatorNumber = elevatorNumber;
    }

    public setBuilding(building: Building): void {
        this.building = building;
}

    public render(): string {
        return `<img id="elevator${this.elevatorNumber}" 
        src="../assets/elv.png" 
        class="elevator" >`;
    }


    public async goToFloor(buildingNumber: number, floorNumber: number, movingTime: number): Promise<void> {

    // Check if the elevator is moving
    while (this.isMoving) {
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const moveElevator = () => {
        // Update data
        this.isMoving = true;
        this.waitingTime = 2;
        this.movingTime = movingTime; 
        this.floorDestinationNumber = floorNumber;
        this.isAvailable = false;

        const currentPosition = this.getCurrentPosition();
        const newPosition = Math.round(floorNumber * floorHeightConfig);

        // Keep the elevator to move
        const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`) as HTMLElement | null;

        if (elevator) {

            const distance = newPosition - currentPosition;
            let currentStep = 0;
            const sound = arrivalSound; 
            let previousPosition = currentPosition;

            const movement = () => {


            movement();
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
getCurrentPosition() : number {
    throw new Error("Method not implemented yet.");
}
}


import Building from "./Building.js";
import { floorHeightConfig, arrivalSound, numFloors} from '../config.js';

export default class Elevator {

    private building!: Building;
    private elevatorNumber: number;
    public waitingTime: number = 0;
    public isActive: boolean = false;
    public movingTime: number = 0;
    public floorDestinationNumber: number | null = null;
    public isAvailable: boolean = true;
    public currentPosition: number = 0;
    public transitionDuration: number = numFloors;
    public transition: number = 0;

    constructor(elevatorNumber: number) {
        this.elevatorNumber = elevatorNumber;
    }

    public setBuilding(building: Building): void {
        this.building = building;
}

    public render(): string {
        return `<img id="elevator${this.elevatorNumber}" 
        src="../assets/elv.png" 
        class="elevator" >
        `;
    }


    public async goToFloor(buildingNumber: number, floorNumber: number, movingTime: number): Promise<void> {

    // Check if the elevator is moving
    while (this.isActive) {
        await new Promise(resolve => setTimeout(resolve, 500));
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
        const elevator = document.querySelector(`#elevator${this.elevatorNumber}`) as HTMLElement | null;

        if (elevator) {

            const distance = newPosition - currentPosition;
            let currentStep = 0;
            const sound = arrivalSound; 
            let previousPosition = currentPosition;

            const time = Math.abs(this.currentPosition - this.floorDestinationNumber) / 2;
            elevator.style.transform = `translateY(-${this.floorDestinationNumber*floorHeightConfig}px`
            elevator.style.transitionDuration = `${time}s`;

            setTimeout(() => {
                sound.play();
                this.isActive = false;                

            }, time * 1000);
            this.currentPosition = this.floorDestinationNumber;
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


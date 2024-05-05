import Floor from './floor.ts';
import Elevator from './elevator.ts';
import { numFloors, numElevators, numBuildings } from '../config.ts';


const elevator = new Elevator(numElevators);
const floors: Floor[] = [];

for (let i = 1; i <= numFloors; i++) {
    floors.push(new Floor(i));
}

// floors[2].callElevator();

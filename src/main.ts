import ElevatorApp from './Components/Menager';
import { numBuildings, numElevators, numFloors } from './config.js';

function renderElevatorApp() {

    const elevatorAppInit = new ElevatorApp();
    const elevatorApp = elevatorAppInit.createTheApp(numBuildings, numFloors, numElevators);

    const buildingsContainer = document.getElementById('buildings');

    if (buildingsContainer) {
        for (let i = 0; i < elevatorApp.buildings.length; i++) {
            const building = elevatorApp.buildings[i];
            const buildingElement = document.createElement('div');
            buildingElement.classList.add('building');
            
            buildingElement.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target.classList.contains('floor-button')) {
                    const floorNumberAttribute = target.getAttribute('floorNumberData');
                    // Get the floor number
                    const buildingIndexAttribute = parseInt(target.getAttribute('buildingIndexData')!);
                    console.log("floorNumberAttribute :", floorNumberAttribute)
                    // Check the index of the building calling the elevator
                    if (floorNumberAttribute !== null && building.buildingNumber == buildingIndexAttribute) {
                        console.log("buildingIndexData :", buildingIndexAttribute)
    
                        const floorNumber = parseInt(floorNumberAttribute);
                        if (!isNaN(floorNumber)) {
                            elevatorApp.assignFloorToElevator(buildingIndexAttribute, floorNumber);
                        }
                    }
                }
            });
            
            buildingElement.innerHTML = building.render(numFloors);
            buildingsContainer.appendChild(buildingElement);
        }
    }
}
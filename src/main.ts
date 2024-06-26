import ElevatorAppFactory from './Components/Factory.js';
import { numBuildings, numElevators, numFloors } from './config.js';

function renderApp() {

    const elevatorAppInit = new ElevatorAppFactory();
    const elevatorApp = elevatorAppInit.createTheApp(numFloors,numElevators,numBuildings);

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
                    const buildingIndexAttribute = parseInt(target.getAttribute('buildingIndexData')!);

                    if (floorNumberAttribute !== null && building.buildingNumber == buildingIndexAttribute) {    
                        const floorNumber = parseInt(floorNumberAttribute);
                        if (!isNaN(floorNumber)) {
                            elevatorApp.assignFloorToElevator(buildingIndexAttribute, floorNumber);
                        }
                    }
                }
            });
            
            buildingElement.innerHTML = building.render(numFloors[i]);
            buildingsContainer.appendChild(buildingElement);
        }
    }
}
renderApp();
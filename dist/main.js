"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Menager_1 = __importDefault(require("./Components/Menager"));
const config_js_1 = require("./config.js");
function renderElevatorApp() {
    const elevatorAppInit = new Menager_1.default();
    const elevatorApp = elevatorAppInit.createTheApp(config_js_1.numBuildings, config_js_1.numFloors, config_js_1.numElevators);
    const buildingsContainer = document.getElementById('buildings');
    if (buildingsContainer) {
        for (let i = 0; i < elevatorApp.buildings.length; i++) {
            const building = elevatorApp.buildings[i];
            const buildingElement = document.createElement('div');
            buildingElement.classList.add('building');
            buildingElement.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('floor-button')) {
                    const floorNumberAttribute = target.getAttribute('floorNumberData');
                    // Get the floor number
                    const buildingIndexAttribute = parseInt(target.getAttribute('buildingIndexData'));
                    console.log("floorNumberAttribute :", floorNumberAttribute);
                    // Check the index of the building calling the elevator
                    if (floorNumberAttribute !== null && building.buildingNumber == buildingIndexAttribute) {
                        console.log("buildingIndexData :", buildingIndexAttribute);
                        const floorNumber = parseInt(floorNumberAttribute);
                        if (!isNaN(floorNumber)) {
                            elevatorApp.assignFloorToElevator(buildingIndexAttribute, floorNumber);
                        }
                    }
                }
            });
            buildingElement.innerHTML = building.render(config_js_1.numFloors);
            buildingsContainer.appendChild(buildingElement);
        }
    }
}

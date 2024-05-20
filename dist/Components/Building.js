export default class Building {
    constructor(buildingNum) {
        this.floors = [];
        this.elevators = [];
        this.buildingNumber = buildingNum;
    }
    setElevatorsController(elevatorsController) {
        elevatorsController.setBuilding(this);
        this.elevatorsController = elevatorsController;
    }
    addFloor(floor) {
        this.floors.push(floor);
    }
    addElevator(elevator) {
        elevator.setBuilding(this);
        this.elevators.push(elevator);
    }
    getFloors() {
        return this.floors;
    }
    getElevators() {
        return this.elevators;
    }
    getElevatorsController() {
        return this.elevatorsController;
    }
    // render the building to an html div
    render(numFloors) {
        const marginRight = (numFloors * 85);
        let buildingHTML = `<div 
            style="margin-right: ${marginRight}px; 
            display: flex; 
            position: relative;" 
            class="building-container">`;
        buildingHTML += '<div class="floors-container">';
        for (const floor of this.floors) {
            buildingHTML += floor.render();
        }
        buildingHTML += '</div>';
        buildingHTML += '<div class="elevators-container">';
        for (const elevator of this.elevators) {
            buildingHTML += elevator.render();
        }
        buildingHTML += '</div>';
        buildingHTML += '</div>';
        return buildingHTML;
    }
}

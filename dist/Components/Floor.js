"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Floor {
    constructor(floorNumber, buildingIndex) {
        this.floorNumber = floorNumber;
        this.isWaiting = false;
        this.buildingIndex = buildingIndex;
        this.timeToWait = 0;
        this.timer = null;
    }
    render() {
        const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
        const timeToDisplay = this.timeToWait > 0 ? `<span class="time-to-wait">${this.timeToWait}</span>` : '';
        return `
        <div class="floor">
            <div class="floor-content">
                <button class="${buttonClass}" floorNumberData="${this.floorNumber}" buildingIndexData="${this.buildingIndex}">
                    ${this.floorNumber}
                </button>
                <div class="time-to-wait">
                    ${timeToDisplay}
                </div>
            </div>
        </div>`;
    }
    updateRender() {
        const element = document.querySelector(`.floor-button[floorNumberData="${this.floorNumber}"][buildingIndexData="${this.buildingIndex}"]`);
        if (element) {
            const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
            element.className = buttonClass;
            const timeDisplay = this.timeToWait > 0 ? `<span class="time-to-wait" >${this.timeToWait}</span>` : '';
            element.innerHTML = `${this.floorNumber} ${timeDisplay}`;
        }
    }
    // manage a countdown timer
    calculateTime(secondsToWait) {
        this.timeToWait = secondsToWait;
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.timeToWait > 0) {
            this.timer = setInterval(() => {
                if (this.timeToWait >= 0.5) {
                    this.timeToWait -= 0.5;
                    this.updateRender();
                }
                if (this.timeToWait <= 0) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }, 500); // update every 500 milliseconds = 0.5 seconds
        }
        this.updateRender();
    }
}
exports.default = Floor;

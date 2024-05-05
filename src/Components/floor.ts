export default class Floor {
    private floorNumber: number;
    public isWaiting: boolean;


    constructor(floorNumber: number) {
        this.floorNumber = floorNumber;
        this.isWaiting = false;
    }


    public render(): string {

    const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
        return `
        <div class="floor">
            <div class="floor-content">
                <button class="${buttonClass}" floorNumberData="${this.floorNumber}">
                    ${this.floorNumber}
                </button>
            </div>
        </div>`;
        }

    public updateRender(): void {
        const element = document.querySelector(`.floor-button[floorNumberData="${this.floorNumber}"]`) as HTMLElement | null;
        if (element) {
            const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
            element.className = buttonClass;
            element.innerHTML = `${this.floorNumber}`;
        }
    }
}
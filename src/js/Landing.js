import Popup from './Popup.js';
import Storage from './Storage.js';

export default class Landing {
    
    constructor(fleetsRoot) {
        this.fleetsRoot = fleetsRoot;
        this.popup = new Popup();

        this.popup.getElement().addEventListener('color-picked', (event) => {
            this.updateRow(event);
        });

        this.popup.init();
    }

    getFleetRows() {
        let fleetTable = this.fleetsRoot.getElementsByClassName('layout listing btnlisting tbllisting1 sorttable');
        let tbody = fleetTable[0].getElementsByTagName('tbody')[0];
 
        return tbody.getElementsByTagName('tr');
    }

    async createTableColumn(row) {
        let id = this.getId(row);
        let color = await this.getItem(id);
        let sign = color ? 'x' : '+';
        row.style.backgroundColor = color ? color : '';

        let td = document.createElement('td');
        let textnode = document.createTextNode(sign);
        td.className = 'action-text';
        td.appendChild(textnode); 

        td.addEventListener('click', async (event) => {
            let tr = event.target.parentElement;

            if (await this.getItem(id)) {
                this.removeItem(id);
                tr.style.backgroundColor = '';
                tr.lastChild.innerText = '+';
                this.updateActiveElement(undefined);
                return true;
            }
            
            this.popup.show(event.pageX - 150, event.pageY);
            this.updateActiveElement(tr);
        });

        return td;
    }

    async sort() {
        let fleetRows = this.getFleetRows();

        for (let row of fleetRows) {
            let td = await this.createTableColumn(row);
            row.appendChild(td);
        }
    }

    getId(row) {
        let url = row.firstChild.firstChild.href;
        let id = url.split('=');
        return id[1];
    }

    setItem(id, color) {
        Storage.setItem(id, color);
    }

    removeItem(id) {
        Storage.removeItem(id);
    }

    async getItem(id) {
        return await Storage.getItem(id);
    }

    updateActiveElement(element) {
        this.activeElement = element;
    }

    updateRow(event) {
        this.activeElement.style.backgroundColor = event.detail.color;
        let id = this.getId(this.activeElement);

        this.setItem(id, event.detail.color);
        this.popup.hide();
        this.activeElement.lastChild.innerText = 'x';
        this.activeElement = undefined;
    }

    showClearFleet() {
        let moveHere = document.getElementById('link_fleet_move_here');

        let parent = moveHere.parentElement;

        let span = document.createElement('span');
        let close = document.createTextNode('Click to clear ALL marked fleets');

        span.addEventListener('click', async () => {
            await Storage.clearAllItems();
            location.reload();
        });

        span.className = 'action-text ml-5';
        span.appendChild(close);

        parent.appendChild(span);
    }
}
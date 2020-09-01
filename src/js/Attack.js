import Storage from './Storage.js';

export default class Landing {
    constructor(fleetsRoot) {
        this.fleetTable = fleetsRoot.getElementsByClassName('layout listing btnlisting tbllisting1');
    }

    markSelectedTargets() {
        if (!this.fleetTable) {
            return false;
        }

        let tbody = this.fleetTable[0].getElementsByTagName('tbody');
            tbody = tbody[0];
            
        let fleetRows = tbody.getElementsByTagName('tr');

        for (let row of fleetRows) {
            if (row.className === 'listing-header') {
                continue;
            }

            let id = this.getId(row);
            let color = Storage.getItem(id);

            if (color) {
                row.style.backgroundColor = color;
            } 
        }
    }

    getId(row) {
        let url = row.firstChild.firstChild.href;
        let id = url.split('=');
            id = id[1];
        
        return id;
    }
}
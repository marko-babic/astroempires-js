/* eslint-disable class-methods-use-this */
import Storage from './Storage';

export default class Landing {
  constructor(fleetsRoot) {
    this.fleetTable = fleetsRoot.getElementsByClassName('layout listing btnlisting tbllisting1');
  }

  markSelectedTargets() {
    if (!this.fleetTable) {
      return false;
    }

    const tbody = this.fleetTable[0].getElementsByTagName('tbody');
    const [trow] = tbody;

    const fleetRows = trow.getElementsByTagName('tr');

    // eslint-disable-next-line no-restricted-syntax
    for (const row of fleetRows) {
      if (row.className !== 'listing-header') {
        const id = this.getId(row);
        const color = Storage.getItem(id);

        if (color) {
          row.style.backgroundColor = color;
        }
      }
    }

    return true;
  }

  getId(row) {
    const url = row.firstChild.firstChild.href;
    const [, id] = url.split('=');

    return id;
  }
}

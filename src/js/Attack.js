/* eslint-disable class-methods-use-this */
import Storage from './Storage';

export default class Landing {
  constructor(fleetsRoot, styleSelector) {
    this.styleSelector = styleSelector;
    this.fleetTable = fleetsRoot.getElementsByClassName(this.styleSelector.style.fleetTable);
  }

  async markSelectedTargets() {
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

        if (id === null) {
          continue;
        }

        const color = await Storage.getItem(id);

        if (color) {
          row.style.backgroundColor = color;
        }
      }
    }

    return true;
  }

  getId(row) {
    const tr = row.firstElementChild;

    if (tr.firstElementChild && tr.firstElementChild.href) {
      const url = tr.firstElementChild.href;
      const [, id] = url.split('=');
  
      return id;
    }

    return null;
  }
}

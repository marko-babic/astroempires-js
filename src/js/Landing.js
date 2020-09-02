/* eslint-disable class-methods-use-this */
import Popup from './Popup';
import Storage from './Storage';

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
    const fleetTable = this.fleetsRoot.getElementsByClassName('layout listing btnlisting tbllisting1 sorttable');
    const tbody = fleetTable[0].getElementsByTagName('tbody')[0];

    return tbody.getElementsByTagName('tr');
  }

  async createTableColumn(row) {
    const rowCopy = row;
    const id = this.getId(row);
    const color = await this.getItem(id);
    const sign = color ? 'x' : '+';
    rowCopy.style.backgroundColor = color || '';

    const td = document.createElement('td');
    const textnode = document.createTextNode(sign);
    td.className = 'action-text';
    td.appendChild(textnode);

    td.addEventListener('click', async (event) => {
      const tr = event.target.parentElement;

      if (await this.getItem(id)) {
        this.removeItem(id);
        tr.style.backgroundColor = '';
        tr.lastChild.innerText = '+';
        this.updateActiveElement(undefined);
        return true;
      }

      this.popup.show(event.pageX - 150, event.pageY);
      this.updateActiveElement(tr);

      return true;
    });

    return td;
  }

  async sort() {
    const fleetRows = this.getFleetRows();

    // eslint-disable-next-line no-restricted-syntax
    for (const row of fleetRows) {
      this.createTableColumn(row)
        .then((column) => {
          row.appendChild(column);
        });
    }
  }

  getId(row) {
    const url = row.firstChild.firstChild.href;
    const id = url.split('=');
    return id[1];
  }

  setItem(id, color) {
    Storage.setItem(id, color);
  }

  removeItem(id) {
    Storage.removeItem(id);
  }

  async getItem(id) {
    return Storage.getItem(id);
  }

  updateActiveElement(element) {
    this.activeElement = element;
  }

  updateRow(event) {
    this.activeElement.style.backgroundColor = event.detail.color;
    const id = this.getId(this.activeElement);

    this.setItem(id, event.detail.color);
    this.popup.hide();
    this.activeElement.lastChild.innerText = 'x';
    this.activeElement = undefined;
  }

  showClearFleet() {
    const moveHere = document.getElementById('link_fleet_move_here');

    const parent = moveHere.parentElement;

    const span = document.createElement('span');
    const close = document.createTextNode('Click to clear ALL marked fleets');

    span.addEventListener('click', async () => {
      await Storage.clearAllItems();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });

    span.className = 'action-text ml-5';
    span.appendChild(close);

    parent.appendChild(span);
  }
}

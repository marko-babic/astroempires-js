/* eslint-disable class-methods-use-this */
export default class Popup {
  constructor() {
    this.div = document.createElement('div');
    this.div.className = 'popup';
    this.div.id = 'colors';
  }

  init() {
    const colorFlex = this.createColorPallete();

    this.div.appendChild(colorFlex);
    this.div.appendChild(this.createCancelButton());

    document.body.appendChild(this.div);
  }

  createColorPallete() {
    const colorFlex = document.createElement('div');
    colorFlex.className = 'flex';
    const colorOptions = ['blue', 'black', 'white', 'red', 'orange'];

    // eslint-disable-next-line no-restricted-syntax
    for (const color of colorOptions) {
      const colorOption = document.createElement('div');
      colorOption.style = `background-color:${color}`;
      colorOption.className = 'color-option';

      colorOption.addEventListener('click', () => {
        colorOption.dispatchEvent(new CustomEvent('color-picked', {
          bubbles: true,
          detail: { color },
        }));
      });

      colorFlex.appendChild(colorOption);
    }

    return colorFlex;
  }

  createCancelButton() {
    const span = document.createElement('span');
    const close = document.createTextNode('x');

    span.addEventListener('click', () => {
      this.hide();
    });

    span.className = 'action-text';
    span.appendChild(close);

    return span;
  }

  getElement() {
    return this.div;
  }

  show(x, y) {
    const element = this.getElement();

    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
    element.style.display = 'block';
  }

  hide() {
    this.getElement().style.display = 'none';
  }
}

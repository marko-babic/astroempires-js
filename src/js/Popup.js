export default class Popup{
    constructor() {
        this.div = document.createElement('div');
        this.div.className = 'popup';
        this.div.id = 'colors';
    }
    
    init() {
        let colorFlex = this.createColorPallete();

        this.div.appendChild(colorFlex);
        this.div.appendChild(this.createCancelButton());

        document.body.appendChild(this.div);
    }

    createColorPallete() {
        let colorFlex = document.createElement('div');
        colorFlex.className = 'flex';
        let colorOptions = ['blue', 'black', 'white', 'red', 'orange'];

        for (let color of colorOptions) {
            let colorOption = document.createElement('div');
            colorOption.style = 'background-color:' + color;
            colorOption.className = 'color-option';

            colorOption.addEventListener('click', () => {
                colorOption.dispatchEvent(new CustomEvent('color-picked', {
                    bubbles: true,
                    detail: { color: color }
                }));
            });
            
            colorFlex.appendChild(colorOption);
        }

        return colorFlex;
    }

     createCancelButton() {
        let span = document.createElement('span');
        let close = document.createTextNode('x');

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
        let element = this.getElement();

        element.style.top = y + 'px';
        element.style.left = x + 'px';
        element.style.display = 'block';
    }

    hide() {
        this.getElement().style.display = 'none';
    }
}
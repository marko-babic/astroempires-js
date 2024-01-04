export default class StyleSelector {
    constructor() {
        this.style = null;
      }

    setStyle() {
        const head = document.getElementsByTagName('head')[0];
    
        for (let i = 0; i < head.children.length; i++) {
          if (head.children[i].tagName === "LINK") {
            if (head.children[i].href.includes('darkAstros')) {
              this.setDarkAstros();
            } else if (head.children[i].href.includes('AE_Original')) {
              this.setAeOriginal();
            } else if (head.children[i].href.includes('BlueNova_v2')) {
              this.setBlueNova1();
            } else if (head.children[i].href.includes('BlueNova_v3')) {
              this.setBlueNova2();
            } else if (head.children[i].href.includes('BlueNova_mobile')) {
              this.setBlueNovaMobile();
            }
          }
        }
    }

    setDarkAstros() {
        this.style = {
            fleetsRoot: 'map_fleets',
            attackList: 'fleets_attack-list',
            fleetRows: 'layout listing btnlisting tbllisting1 sorttable',
            fleetTable: 'layout listing btnlisting tbllisting1',
        }
    }

    setAeOriginal(){
        this.style = {
            fleetsRoot: 'map_fleets',
            attackList: 'fleets_attack-list',
            fleetRows: 'layout listing btnlisting tbllisting1 sorttable', 
            fleetTable: 'layout listing btnlisting tbllisting1',
        }
    }

    setBlueNova1(){
        this.style = {
            fleetsRoot: 'map_fleets',
            attackList: 'fleets_attack-list',
            fleetRows: 'layout listing btnlisting tbllisting1 sorttable',
            fleetTable: 'layout listing btnlisting tbllisting1',
        }
    }
    
    setBlueNova2(){
        this.style = {
            fleetsRoot: 'map_fleets',
            attackList: 'fleets_attack-list',
            fleetRows: 'layout listing btnlisting tbllisting1 sorttable',
            fleetTable: 'layout listing btnlisting tbllisting1',
        }
    }

    setBlueNovaMobile(){
        this.style = {
            fleetsRoot: 'map_fleets',
            attackList: 'fleets_attack-list',
            fleetRows: 'layout listing btnlisting tbllisting1 sorttable',
            fleetTable: 'layout listing btnlisting tbllisting1',
        }
    }
}
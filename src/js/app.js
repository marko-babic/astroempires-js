import Landing from './Landing.js';
import Attack from './Attack.js';

browser.storage.local.get('isEnabled').then((item) => {
    if (item.isEnabled) {
        let fleetsRoot =  document.getElementById("map_fleets");
        let attackList = document.getElementById("fleets_attack-list");
    
        if (fleetsRoot) {
            let landing = new Landing(fleetsRoot);
            landing.sort();
            landing.showClearFleet();
        }
    
        if (attackList) {
            let attack = new Attack(attackList);
            attack.markSelectedTargets();
        }
    }
});
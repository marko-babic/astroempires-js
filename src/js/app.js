import Landing from './Landing';
import Attack from './Attack';

browser.storage.local.get('isEnabled').then((item) => {
  if (item.isEnabled) {
    const fleetsRoot = document.getElementById('map_fleets');
    const attackList = document.getElementById('fleets_attack-list');

    if (fleetsRoot) {
      const landing = new Landing(fleetsRoot);
      landing.sort();
      landing.showClearFleet();
    }

    if (attackList) {
      const attack = new Attack(attackList);
      attack.markSelectedTargets();
    }
  }
});

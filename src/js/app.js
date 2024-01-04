import Landing from './Landing';
import Attack from './Attack';
import StyleSelector from './StyleSelector';

browser.storage.local.get('isEnabled').then((item) => {
  if (item.isEnabled) {
    const styleSelector = new StyleSelector();
    styleSelector.setStyle();

    const fleetsRoot = document.getElementById(styleSelector.style.fleetsRoot);
    const attackList = document.getElementById(styleSelector.style.attackList);

    if (fleetsRoot) {
      const landing = new Landing(fleetsRoot, styleSelector);
      landing.sort();
      landing.showClearFleet();
    }

    if (attackList) {
      const attack = new Attack(attackList, styleSelector);
      attack.markSelectedTargets();
    }
  }
});

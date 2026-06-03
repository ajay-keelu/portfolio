const packs = ['fa', 'fa6', 'io', 'io5', 'md', 'ti', 'go', 'fi', 'lu', 'gi', 'tb', 'si', 'di', 'ai', 'bs', 'cg', 'ci', 'fc', 'hi', 'hi2', 'im', 'lia', 'rx', 'ri', 'sl', 'tfi', 'vsc', 'wi'];
packs.forEach(pack => {
  try {
    const iconPack = require(`react-icons/${pack}`);
    const matches = Object.keys(iconPack).filter(k => k.toLowerCase().includes('oracle'));
    if (matches.length > 0) {
      console.log(`Found Oracle in ${pack}:`, matches);
    }
  } catch (e) {
    // Pack not installed or error
  }
});

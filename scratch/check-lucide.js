const lucide = require('lucide-react');
console.log('Keys containing link/linkedin:', Object.keys(lucide).filter(k => k.toLowerCase().includes('link')));
console.log('Keys containing github:', Object.keys(lucide).filter(k => k.toLowerCase().includes('github')));

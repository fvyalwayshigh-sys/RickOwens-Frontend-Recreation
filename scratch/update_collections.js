import fs from 'fs';

const files = [
  'src/pages/Shoes.jsx',
  'src/pages/Bag.jsx',
  'src/pages/DrMartin.jsx',
  'src/pages/Fw26.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('FilterSort')) {
    // Add import right after the first import
    content = content.replace(/import .*;/, match => `${match}\nimport FilterSort from '../components/FilterSort';`);
    
    if (content.includes('<Footer />')) {
      content = content.replace('<Footer />', '<FilterSort />\n        <Footer />');
    } else {
      content = content.replace('</>', '  <FilterSort />\n    </>');
    }
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

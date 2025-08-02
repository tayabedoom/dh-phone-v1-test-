const fs = require('fs');

// Read the Algeria cities data
const algeriaData = JSON.parse(fs.readFileSync('algeria_cities.json', 'utf8'));

// Process the data to get unique wilayas and their dairas
const wilayasMap = new Map();

algeriaData.forEach(city => {
    const wilayaName = city.wilaya_name_ascii;
    const dairaName = city.daira_name_ascii;
    const wilayaNameAr = city.wilaya_name;
    const dairaNameAr = city.daira_name;
    
    if (!wilayasMap.has(wilayaName)) {
        wilayasMap.set(wilayaName, {
            wilaya_name: wilayaName,
            wilaya_name_ar: wilayaNameAr,
            daira_names: new Set(),
            daira_names_ar: new Set()
        });
    }
    
    const wilaya = wilayasMap.get(wilayaName);
    wilaya.daira_names.add(dairaName);
    wilaya.daira_names_ar.add(dairaNameAr);
});

// Convert to the format needed for the website
const processedData = Array.from(wilayasMap.values()).map(wilaya => ({
    wilaya_name: wilaya.wilaya_name,
    wilaya_name_ar: wilaya.wilaya_name_ar,
    daira_names: Array.from(wilaya.daira_names).sort(),
    daira_names_ar: Array.from(wilaya.daira_names_ar).sort()
}));

// Sort by wilaya name
processedData.sort((a, b) => a.wilaya_name.localeCompare(b.wilaya_name));

// Generate the JavaScript code for the website
let jsCode = '// Complete Algeria Wilayas and Dairas data from official source\n';
jsCode += '// Source: https://github.com/othmanus/algeria-cities\n\n';
jsCode += 'const algeriaData = [\n';

processedData.forEach((wilaya, index) => {
    jsCode += `    {\n`;
    jsCode += `        "wilaya_name": "${wilaya.wilaya_name}",\n`;
    jsCode += `        "wilaya_name_ar": "${wilaya.wilaya_name_ar}",\n`;
    jsCode += `        "daira_names": [${wilaya.daira_names.map(d => `"${d}"`).join(', ')}],\n`;
    jsCode += `        "daira_names_ar": [${wilaya.daira_names_ar.map(d => `"${d}"`).join(', ')}]\n`;
    jsCode += `    }${index < processedData.length - 1 ? ',' : ''}\n`;
});

jsCode += '];\n\n';
jsCode += 'console.log("Loaded complete Algeria data:", algeriaData.length, "wilayas");\n';

// Write the processed data
fs.writeFileSync('algeria_processed_data.js', jsCode);

// Also create a JSON version
fs.writeFileSync('algeria_processed_data.json', JSON.stringify(processedData, null, 2));

console.log(`Processed ${processedData.length} wilayas with their dairas`);
console.log('Generated files:');
console.log('- algeria_processed_data.js (JavaScript format for website)');
console.log('- algeria_processed_data.json (JSON format)');

// Show some statistics
console.log('\nStatistics:');
processedData.forEach(wilaya => {
    console.log(`${wilaya.wilaya_name}: ${wilaya.daira_names.length} dairas`);
}); 
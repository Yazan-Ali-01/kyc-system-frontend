const fs = require('fs');
const path = require('path');


function generateFolderStructure(dir, result = '', depth = 0) {

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);


    if (file !== '.git' && file !== 'node_modules' && file !== 'dist') {
      const indent = ' '.repeat(depth * 2); // Add indentation based on depth
      result += `${indent}${file}\n`; // Add the file/folder name to the result


      if (stats.isDirectory()) {
        result = generateFolderStructure(filePath, result, depth + 1);
      }
    }
  });

  return result;
}


function createFolderStructureFile() {
  const rootDir = process.cwd(); // Start from the current working directory
  const folderStructure = generateFolderStructure(rootDir);


  fs.writeFileSync('folder_structure.txt', folderStructure, 'utf-8');
  console.log('Folder structure has been written to folder_structure.txt');
}


createFolderStructureFile();

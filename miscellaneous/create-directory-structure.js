// The script will create a folder named krishi-rental-services in the same directory where you run the script.

const fs = require('fs');
const path = require('path');

const directories = [
  "backend/controllers",
  "backend/models",
  "backend/routes",
  "backend/middleware",
  "backend/services",
  "backend/config",
  "backend/tests",
  "web-frontend/src/components",
  "web-frontend/src/pages",
  "web-frontend/src/services",
  "web-frontend/src/utils",
  "web-frontend/public",
  "app-frontend/lib",
  "app-frontend/assets",
  "database/migrations",
  "docs"
];

const files = [
  "backend/server.js",
  "web-frontend/src/App.js",
  "web-frontend/src/index.js",
  "app-frontend/pubspec.yaml",
  "database/schema.sql",
  "docs/API-spec.md",
  "docs/README.md",
  ".gitignore",
  "package.json",
  "README.md"
];

function createDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`Created directory: ${directory}`);
  }
}

function createFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
    console.log(`Created file: ${filePath}`);
  }
}

// Create directories
directories.forEach(dir => createDirectory(path.join(__dirname, "krishi-rental-services", dir)));

// Create files
files.forEach(file => createFile(path.join(__dirname, "krishi-rental-services", file)));

console.log("Project structure created successfully!");

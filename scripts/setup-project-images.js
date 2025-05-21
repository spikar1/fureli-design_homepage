const fs = require('fs');
const path = require('path');

// Configuration
const PROJECTS_DIR = path.join(__dirname, '../public/projects');
const REQUIRED_IMAGES = ['main', 'thumbnail'];
const OPTIONAL_IMAGES = ['video.mp4'];

// Get all project IDs from projects.ts
function getProjectIds() {
  const projectsFile = path.join(__dirname, '../src/data/projects.ts');
  const content = fs.readFileSync(projectsFile, 'utf8');
  const projectMatches = content.match(/id: ['"]([^'"]+)['"]/g);
  return projectMatches.map(match => match.match(/['"]([^'"]+)['"]/)[1]);
}

// Create project directory if it doesn't exist
function createProjectDirectory(projectId) {
  const projectDir = path.join(PROJECTS_DIR, projectId);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
    console.log(`Created directory for project: ${projectId}`);
  }
  return projectDir;
}

// Check if all required images exist
function checkRequiredImages(projectDir) {
  const missing = [];
  for (const image of REQUIRED_IMAGES) {
    if (!fs.existsSync(path.join(projectDir, `${image}.png`)) && !fs.existsSync(path.join(projectDir, `${image}.jpg`))) {
      missing.push(image);
    }
  }
  return missing;
}

// Setup project images
function setupProjectImages(projectId) {
  const projectDir = createProjectDirectory(projectId);
  const missingImages = checkRequiredImages(projectDir);

  if (missingImages.length > 0) {
    console.log(`\nMissing required images for project ${projectId}:`);
    missingImages.forEach(image => console.log(`- ${image}.png or ${image}.jpg`));
    console.log('\nPlease add the missing images to:', projectDir);
  } else {
    console.log(`\nAll required images present for project ${projectId}`);
  }

  // Check optional images
  const optionalImages = OPTIONAL_IMAGES.filter(image => 
    fs.existsSync(path.join(projectDir, image))
  );
  
  if (optionalImages.length > 0) {
    console.log('\nOptional images found:');
    optionalImages.forEach(image => console.log(`- ${image}`));
  }

  return { projectId, missingImages, optionalImages };
}

// Check all projects
function checkAllProjects() {
  console.log('Checking all projects for missing images...\n');
  
  const projectIds = getProjectIds();
  const results = projectIds.map(setupProjectImages);
  
  // Summary
  console.log('\n=== SUMMARY ===');
  const projectsWithMissingImages = results.filter(r => r.missingImages.length > 0);
  
  if (projectsWithMissingImages.length === 0) {
    console.log('All projects have their required images! 🎉');
  } else {
    console.log(`\nFound ${projectsWithMissingImages.length} projects with missing images:`);
    projectsWithMissingImages.forEach(({ projectId, missingImages }) => {
      console.log(`\n${projectId}:`);
      missingImages.forEach(image => console.log(`  - ${image}.png or ${image}.jpg`));
    });
  }
}

// Get project ID from command line argument
const projectId = process.argv[2];

if (projectId === '--all') {
  checkAllProjects();
} else if (!projectId) {
  console.log('Please provide a project ID as an argument');
  console.log('Usage:');
  console.log('  node setup-project-images.js <project-id>  - Check specific project');
  console.log('  node setup-project-images.js --all         - Check all projects');
  process.exit(1);
} else {
  setupProjectImages(projectId);
} 
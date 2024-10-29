const fs = require('fs');
const axios = require('axios');

// Function to fetch and save HTML content
async function fetchAndSaveHtml(urlString) {
  try {
    const response = await axios.get(urlString);
    const hostname = new URL(urlString).hostname;

    try {
      fs.writeFileSync(`${hostname}.html`, response.data, 'utf8');
      console.log(`Saved HTML content from ${urlString} to ${hostname}.html`);
    } catch (writeError) {
      console.error(`Error writing to file ${hostname}.html:`, writeError.message);
    }
  } catch (fetchError) {
    console.error(`Error fetching ${urlString}:`, fetchError.message);
  }
}

// Main function to read URLs from file and process them
async function processUrlsFromFile(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const urls = fileContent.split('\n').filter(line => line.trim() !== '');

    // Use Promise.all to handle fetching concurrently
    await Promise.all(urls.map(urlString => fetchAndSaveHtml(urlString)));
  } catch (fileError) {
    console.error(`Error reading file ${filename}:`, fileError.message);
    process.exit(1); // Exit the script if there's an error reading the file
  }
}

// Get the filename from command line arguments and process it
const filename = process.argv[2];
if (!filename) {
  console.error('Please provide a filename as the first argument.');
  process.exit(1);
}

// Validate URL function
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Process URLs
async function main() {
  const fileContent = fs.readFileSync(filename, 'utf8');
  const urls = fileContent.split('\n').filter(line => line.trim() !== '');

  // Filter invalid URLs and log them
  const validUrls = urls.filter(url => isValidUrl(url));
  const invalidUrls = urls.filter(url => !isValidUrl(url));
  
  if (invalidUrls.length > 0) {
    console.warn('Invalid URLs found:');
    invalidUrls.forEach(url => console.warn(` - ${url}`));
  }

  await processUrlsFromFile(filename);
}

main();

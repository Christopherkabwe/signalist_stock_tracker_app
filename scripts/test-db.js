// simple DB connection tester (node script)
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

function loadEnvFromFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  return content.split(/\r?\n/).reduce((acc, line) => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) return acc;
    let [, key, val] = match;
    // strip surrounding quotes
    if ((val.startsWith("\"") && val.endsWith("\"")) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    acc[key] = val;
    return acc;
  }, {});
}

async function main() {
  const env = { ...process.env };
  if (!env.MONGODB_URI) {
    const filesToCheck = ['.env.local', '.env'];
    for (const f of filesToCheck) {
      const p = path.join(process.cwd(), f);
      const parsed = loadEnvFromFile(p);
      if (parsed.MONGODB_URI) {
        env.MONGODB_URI = parsed.MONGODB_URI;
        break;
      }
    }
  }

  if (!env.MONGODB_URI) {
    console.error('\nError: MONGODB_URI environment variable not found.\n' +
      'Set MONGODB_URI in your environment or create a .env.local file at the project root with MONGODB_URI=<your_uri>\n');
    process.exit(1);
  }

  console.log('Testing MongoDB connection to:', env.MONGODB_URI.replace(/(.{30}).+/, '$1...'));

  try {
    // use a short timeout so test is quick
    const opts = { connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 };
    await mongoose.connect(env.MONGODB_URI, opts);
    console.log('✅ Connected to MongoDB successfully!');
    await mongoose.disconnect();
    console.log('Disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('⛔ Failed to connect to MongoDB:');
    console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
}

main();

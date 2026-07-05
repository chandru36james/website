const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

async function main() {
  try {
    // 1. Load service account
    if (!fs.existsSync('firebase-adminsdk.json')) {
      throw new Error('firebase-adminsdk.json file not found in root directory.');
    }
    const sa = JSON.parse(fs.readFileSync('firebase-adminsdk.json', 'utf8'));

    console.log('Authenticating service account...');
    // 2. Create JWT
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const now = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(JSON.stringify({
      iss: sa.client_email,
      sub: sa.client_email,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
      scope: 'https://www.googleapis.com/auth/cloud-platform'
    })).toString('base64url');

    const signInput = `${header}.${payload}`;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signInput);
    const signature = signer.sign(sa.private_key, 'base64url');
    const jwt = `${signInput}.${signature}`;

    // Helper to make https calls
    const request = (method, url, data, headers = {}) => {
      return new Promise((resolve, reject) => {
        const u = new URL(url);
        const options = {
          method: method,
          hostname: u.hostname,
          path: u.pathname + u.search,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        };
        const req = https.request(options, (res) => {
          let body = '';
          res.on('data', d => body += d);
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(JSON.parse(body || '{}'));
            } else {
              reject(new Error(`Status ${res.statusCode}: ${body}`));
            }
          });
        });
        req.on('error', reject);
        if (data) {
          req.write(typeof data === 'string' ? data : JSON.stringify(data));
        }
        req.end();
      });
    };

    // Exchange JWT for access token
    const tokenRes = await request('POST', 'https://oauth2.googleapis.com/token', `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const accessToken = tokenRes.access_token;
    console.log('Authentication successful.');

    // Load local firestore rules
    console.log('Reading firestore.rules...');
    if (!fs.existsSync('firestore.rules')) {
      throw new Error('firestore.rules file not found.');
    }
    const rulesContent = fs.readFileSync('firestore.rules', 'utf8');

    // Create a new ruleset
    console.log('Uploading ruleset...');
    const rulesetData = {
      source: {
        files: [
          {
            name: 'firestore.rules',
            content: rulesContent
          }
        ]
      }
    };
    const createRulesetUrl = `https://firebaserules.googleapis.com/v1/projects/${sa.project_id}/rulesets`;
    const rulesetRes = await request('POST', createRulesetUrl, rulesetData, {
      'Authorization': `Bearer ${accessToken}`
    });
    const rulesetName = rulesetRes.name;
    console.log('Created ruleset:', rulesetName);

    // Release the ruleset
    console.log('Releasing ruleset to cloud.firestore...');
    const updateReleaseUrl = `https://firebaserules.googleapis.com/v1/projects/${sa.project_id}/releases/cloud.firestore`;
    const releaseData = {
      release: {
        name: `projects/${sa.project_id}/releases/cloud.firestore`,
        rulesetName: rulesetName
      }
    };
    await request('PATCH', updateReleaseUrl, releaseData, {
      'Authorization': `Bearer ${accessToken}`
    });
    console.log('Firestore Security Rules deployed successfully to production.');

  } catch (err) {
    console.error('Deployment failed:', err.message);
    process.exit(1);
  }
}

main();

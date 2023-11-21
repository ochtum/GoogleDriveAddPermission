# GoogleDriveAddPermission
Batch grant of GoogleDrive access rights script.

# Setup Procedure for Development Environment
## (1) Install Node.js
[Node.js website](https://nodejs.org/en)

## (2) Execute the following command in PowerShell to install Clasp.
```bash
npm install @google/clasp -g
```
## (3) Execute the following command in PowerShell to install npm.
```bash
npm install -g npm@latest
```

## (4) In the folder containing .clasp.json, execute the command to log in to Clasp.
```bash
clasp login
```

# The following settings are required before execution
## (1) Enable Google Drive API in GCP
## (2) Create authentication credentials in GCP (API Key, OAuth 2.0 Client ID, Service Account)
## (3) Modify the values in the Source Code
- .clasp.json
YOUR_SCRIPT_ID
YOUR_ROOT_DIRECTORY
- index.js
example@example.com
YOUR_PRIVATE_KEY
YOUR_CLIENT_EMAIL
YOUR_API_KEY

# Deployment Method
## Verify the settings in .clasp.json and adjust the [rootDir] setting to match the local path where the source code is located.

## Execute the following command
```bash
clasp push
```

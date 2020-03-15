#! /usr/local/bin/node
const fs = require('fs');
const path = require('path');
require('dotenv').config();

interface DotenvDestination {
  path: string;
  prefixes: string[];
  json: Object;
  production: boolean;
}

const dotenvDestinations: DotenvDestination[] = [
  {
    path: 'apps/pwa/src/environments/environment.ts',
    prefixes: ['PUBLIC_DEV_', 'PUBLIC_ALL_'],
    json: {},
    production: false
  },
  {
    path: 'apps/pwa/src/environments/environment.prod.ts',
    prefixes: ['PUBLIC_PROD_', 'PUBLIC_ALL_'],
    json: {},
    production: true
  },
  {
    path: 'apps/api/src/environments/environment.ts',
    prefixes: ['PRIVATE_DEV_', 'PUBLIC_DEV_', 'PUBLIC_ALL_'],
    json: {},
    production: false
  },
  {
    path: 'apps/api/src/environments/environment.prod.ts',
    prefixes: ['PRIVATE_PROD_', 'PUBLIC_PROD_', 'PUBLIC_ALL_'],
    json: {},
    production: true
  }
];

const dotenv = Object.keys(process.env);

dotenvDestinations.forEach(destination => {
  destination.json['production'] = destination.production;
  dotenv.forEach(key => {
    destination.prefixes.forEach(prefix => {
      if (key.startsWith(prefix)) {
        setKeyValue(key, destination, prefix);
      }
    });
  });
  const tsString = `export const environment = ${JSON.stringify(
    destination.json,
    null,
    '  '
  )}`;
  console.log('Writing variables from process.env: ' + destination.path);
  fs.writeFileSync(destination.path, tsString);
});

function setKeyValue(
  key: string,
  dotenvDestination: DotenvDestination,
  prefix: string
) {
  const currentValue = process.env[key];
  const booleanValue = currentValue.toLowerCase();
  const environmentProperty = key.substr(prefix.length);
  if (booleanValue === 'true' || booleanValue === 'false') {
    dotenvDestination.json[environmentProperty] = booleanValue === 'true';
  } else if (isNaN(+currentValue)) {
    dotenvDestination.json[environmentProperty] = currentValue;
  } else {
    dotenvDestination.json[environmentProperty] = +currentValue;
  }
}

console.log('Finished');

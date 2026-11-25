const { withDangerousMod } = require('expo/config-plugins');
const fs = require('node:fs/promises');
const path = require('node:path');
module.exports = function withKioskAssets(config) {
  return withDangerousMod(config, ['android', async config => {
    const source = path.join(config.modRequest.projectRoot, 'Kisok');
    const dest = path.join(config.modRequest.platformProjectRoot, 'app/src/main/assets/kiosk');
    await fs.access(path.join(source, 'index.html'));
    await fs.rm(dest, { recursive: true, force: true });
    await fs.mkdir(dest, { recursive: true });
    await fs.cp(source, dest, { recursive: true });
    return config;
  }]);
};

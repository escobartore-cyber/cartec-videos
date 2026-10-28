import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
Config.setCrf(16);
Config.setConcurrency(4);
Config.setChromiumOpenGlRenderer('swangle');

// En los contenedores de Claude Code el Chromium viene preinstalado:
// REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}

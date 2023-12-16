import inject from '@rollup/plugin-inject';
import modify from 'rollup-plugin-modify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const module = '@dgret/engine-miniprogram-adapter';

function register(name) {
  return [module, name];
}

const adapterArray = [
  'btoa',
  'URL',
  'Blob',
  'window',
  'atob',
  'devicePixelRatio',
  'document',
  'Element',
  'Event',
  'EventTarget',
  'HTMLCanvasElement',
  'HTMLElement',
  'HTMLMediaElement',
  'HTMLVideoElement',
  'Image',
  'navigator',
  'Node',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'screen',
  'XMLHttpRequest',
  'performance',
  'WebGLRenderingContext',
  'WebGL2RenderingContext',
  'ImageData',
  'location',
  'OffscreenCanvas'
];
const adapterVars = {};

adapterArray.forEach((name) => {
  adapterVars[name] = register(name);
});

const packages = fs
  .readdirSync(path.join(__dirname, 'packages'))
  .map((dir) => path.join('packages', dir, `package.json`))
  .map(async (pkgPath) =>  JSON.parse(fs.readFileSync(path.join(__dirname, pkgPath))))
  .map((pkg) => pkg.name)
  .map((name) => `"${name}"`);

const regStr = packages.join('|');

export default [
  inject(adapterVars),
  modify({
    find: new RegExp(regStr, 'g'),
    replace: (match, moduleName) => {
      return `${match.substr(0, match.length - 1)}/dist/miniprogram"`;
    }
  })
];

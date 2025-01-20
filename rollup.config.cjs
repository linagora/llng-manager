/**
 * rollup configuration file that reproduce `react-scripts build`
 *
 * @copyright Yadd <yadd@debian.org>
 * license MIT
 */
const babel =require('@rollup/plugin-babel');
const commonjs =require('@rollup/plugin-commonjs');
const html =require('@rollup/plugin-html');
const image =require('@rollup/plugin-image');
const inject =require('@rollup/plugin-inject');
const json =require('@rollup/plugin-json');
const { nodeResolve } =require('@rollup/plugin-node-resolve');
const replace =require('@rollup/plugin-replace');
const svgr =require('@svgr/rollup');
const postcssModules =require('postcss-modules');
const postcssPresetEnv =require('postcss-preset-env');
const postcss =require('rollup-plugin-postcss');
const terser =require('@rollup/plugin-terser');
const ts = require('@rollup/plugin-typescript');

module.exports = [{
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'iife',
    sourcemap: true,
    entryFileNames: 'static/js/[name]-[hash].js',
    inlineDynamicImports: true,
  },
  plugins: [
    ts(),
    svgr(),
    image(),
    nodeResolve({
      browser: true,
      extensions: ['.js', '.jsx', '.json'],
    }),
    json(),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV === 'development'
        ? JSON.stringify('development')
        : JSON.stringify('production'),
      preventAssignment: true,
    }),
    postcss({
      plugins: [
        postcssModules({
          generateScopedName: '[local]',
        }),
        postcssPresetEnv({
          stage: 0,
        }),
      ],
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-react-jsx'],
      babelHelpers: 'bundled',
    }),
    commonjs(),
    inject({
      React: 'react',
    }),
    //terser(),
    html({
      fileName: 'index.html',
      title: 'LLNG configuration manager',
      template: ({ attributes, bundle, files, publicPath, title }) => {
        let scripts = '';
        files.js.forEach(bundle => {
          scripts += `<script src="${bundle.fileName}"></script>`;
        });
        return `<!DOCTYPE html>
<html ${attributes}>
  <head>
    <title>${title}</title>
  </head>
  <body>
   <div id="root" />
   ${scripts}
  </body>
</html>`;
      },
    }),
    terser(),
  ],
}];

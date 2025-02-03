/**
 * rollup configuration file that reproduce `react-scripts build`
 *
 * @copyright Yadd <yadd@debian.org>
 * license MIT
 */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image';
import inject from '@rollup/plugin-inject';
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import svgr from '@svgr/rollup';
import postcssModules from 'postcss-modules'
import postcssPresetEnv from 'postcss-preset-env'
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: ['src/index.tsx'],
  output: {
    dir: 'dist',
    format: 'iife',
    sourcemap: true,
    entryFileNames: '[name]-[hash].js',
    inlineDynamicImports: true,
  },
  plugins: [
    svgr(),
    image(),
    nodeResolve({
      browser: true,
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    }),   
     babel({
      // exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-react-jsx'],
      babelHelpers: 'bundled',
    }),
    json(),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV === 'development'
        ? JSON.stringify('development')
        : JSON.stringify('production'),
      preventAssignment: true,
    }),  
    replace({
      'process.env.HTMLNAME': '',
      preventAssignment: true,
    }),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: 'dist',
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
    commonjs(),
    inject({
      React: 'react',
    }),
    //terser(),
    html({
      fileName: 'index.html',
      title: 'React app built with rollup',
      template: ({ attributes, bundle, files, publicPath, title }) => {
        let scripts = '';
        files.js.forEach(bundle => {
          scripts += `<script src="${bundle.fileName}"></script>`;
        });
        return `<!DOCTYPE html>
<html ${JSON.stringify(attributes)}>
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
    // terser(),
  ],  external: ['react', 'react-dom'],

};
import * as webpack from 'webpack';
import hash from 'hash-sum';
import * as path from 'path';
import * as loaderUtils from 'loader-utils';
import * as t from '@babel/types';
import { parse } from '@babel/parser';
import { isDefineComponentCall, parseComponentDecls } from './utils';

export default function loader(
  this: webpack.loader.LoaderContext,
  source: string,
) {
  const loaderContext = this;
  loaderContext.cacheable?.();

  if (!(loaderContext.mode === 'development')) {
    return source;
  }

  const webpackRemainingChain = loaderUtils.getRemainingRequest(loaderContext).split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const filename = path.relative(process.cwd(), fullPath);

  const file = parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] });

  if (!(filename.endsWith('.jsx') || filename.endsWith('.tsx'))) {
    return source;
  }

  const declaredComponents: { name: string }[] = [];
  const hotComponents: {
    local: string;
    id: string;
  }[] = [];
  let hasDefault = false;

  for (const node of file.program.body) {
    if (t.isVariableDeclaration(node)) {
      declaredComponents.push(...parseComponentDecls(node));
    } else if (t.isExportNamedDeclaration(node)) {
      const { specifiers = [], declaration } = node;
      if (t.isVariableDeclaration(declaration)) {
        hotComponents.push(...parseComponentDecls(declaration).map(({ name }) => ({
          local: name,
          id: hash(`${filename}-${name}`),
        })));
      } else if (specifiers.length) {
        for (const spec of specifiers) {
          if (t.isExportSpecifier(spec) && t.isIdentifier(spec.exported)) {
            if (declaredComponents.find(d => d.name === spec.local.name)) {
              hotComponents.push({
                local: spec.local.name,
                id: hash(`${filename}-${spec.exported.name}`)
              });
            }
          }
        }
      }
    } else if (t.isExportDefaultDeclaration(node)) {
      const { declaration } = node;
      if (t.isIdentifier(declaration)) {
        if (declaredComponents.find(d => d.name === declaration.name)) {
          hotComponents.push({
            local: '__default__',
            id: hash(`${filename}-default`)
          })
        }
      } else if (isDefineComponentCall(declaration)) {
        hotComponents.push({
          local: '__default__',
          id: hash(`${filename}-default`)
        });
      }
    }
  }

  if (hotComponents.length) {
    if (hasDefault) {
      source = source.replace(
        /export default defineComponent/g,
        `const __default__ = defineComponent`
      ) + `\nexport default __default__`
    }

    let callbackCode = '';
    for (const { local, id } of hotComponents) {
      source +=
        `\n${local}.__hmrId = '${id}'` +
        `\n__VUE_HMR_RUNTIME__.createRecord('${id}', ${local})`
      callbackCode += `\n__VUE_HMR_RUNTIME__.reload("${id}", ${local})`
    }

    source +=
      `\n/* hot reload */` +
      `\nif (module.hot) {` +
      `\n  module.hot.accept()` +
      `\n  ${callbackCode}` +
      `\n}`
  }

  return source;
};

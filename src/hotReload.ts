export function genHotReloadCode(
  id: string,
  jsxRequest?: string
): string {
  return `
/* hot reload */
if (module.hot) {
  script.__hmrId = "${id}"
  const api = __VUE_HMR_RUNTIME__
  module.hot.accept()
  if (!api.createRecord('${id}')) {
    api.reload('${id}', script)
  }
  ${jsxRequest ? genTemplateHotReloadCode(id, jsxRequest) : ''}
}
`
}

function genTemplateHotReloadCode(id: string, request: string) {
  return `
  module.hot.accept(${request}, () => {
    api.rerender('${id}', render)
  })
`
};

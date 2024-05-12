import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // ...fg.sync('src/commands/*.ts').map(i => i.slice(0, -3)),
    'src/commands/press-export-pdf.ts',
    'src/index.ts',
  ],
  externals: ['vitepress'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})

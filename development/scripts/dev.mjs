import fs from 'fs-extra'
import webpack from 'webpack'

import resolvePath from '../utils/resolvePath.mjs'
import configFactory from '../webpack/config.mjs'

const config = configFactory('development')

const compiler = webpack(config)

fs.emptyDirSync(resolvePath('build'))

compiler.run((err, stats) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
  if (stats.errors) {
    // eslint-disable-next-line no-console
    console.log(stats.errors)
  }
  if (stats.warnings) {
    // eslint-disable-next-line no-console
    console.log(stats.warnings)
  }
})

import fs from 'fs-extra'
import webpack from 'webpack'

import resolvePath from '../utils/resolvePath.mjs'
import configFactory from '../webpack/config.mjs'

const config = configFactory('production')

const compiler = webpack(config)

fs.emptyDirSync(resolvePath('build'))

compiler.run((err, stats) => {
  // eslint-disable-next-line no-console
  if (err) {
    console.log(err)
    return
  }
  // const { errors } = stats
  // if (errors) {
  console.log(stats)
  // }
})

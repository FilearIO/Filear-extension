import fs from 'fs'
import path from 'path'
import process from 'process'

const appDirectory = fs.realpathSync(process.cwd())

export default relativePath => path.resolve(appDirectory, relativePath)

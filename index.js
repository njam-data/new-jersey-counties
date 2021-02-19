import * as fs from 'fs/promises'
import * as path from 'path'

const { pathname: countiesDataDirectoryPath } = new URL('data', import.meta.url)

const countiesGeojsonFilePath = path.join(countiesDataDirectoryPath, 'new-jersey-counties.geojson')
const countiesJsonFilePath = path.join(countiesDataDirectoryPath, 'new-jersey-counties.json')

/**
 * @param {string} filePath path to file
 * @returns {Promise}
 */
async function readJsonFile (filePath) {
  const data = await fs.readFile(filePath, 'utf8')
  return JSON.parse(data)
}

/**
 * Get counties data as GeoJSON or JSON
 * @param {string} fileType - Valid file types: `geojson` or `json`. Default: 'json'
 * @returns {Promise}
 */
export async function getCounties (fileType = 'json') {
  if (fileType === 'geojson') {
    return readJsonFile(countiesGeojsonFilePath)
  }

  if (fileType === 'json') {
    return readJsonFile(countiesJsonFilePath)
  }

  throw new Error(`File type ${fileType} not available`)
}

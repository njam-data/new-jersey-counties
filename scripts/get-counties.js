import * as fs from 'fs/promises'
import * as path from 'path'
import request from 'got'

const result = await request('https://opendata.arcgis.com/datasets/ed7887264b054f4e82a4afb23a9214a4_0.geojson')
const countiesGeojson = JSON.parse(result.body)

countiesGeojson.features = countiesGeojson.features.map((feature) => {
  const properties = {}

  for (const key in feature.properties) {
    const newKey = key.toLowerCase()
    properties[newKey] = feature.properties[key]
  }

  feature.properties = properties
  return feature
})

const { pathname: countiesDataDirectoryPath } = new URL('../data', import.meta.url)
const countiesGeoJsonFilePath = path.join(countiesDataDirectoryPath, 'new-jersey-counties.geojson')
const countiesJsonFilePath = path.join(countiesDataDirectoryPath, 'new-jersey-counties.json')

/**
* @param {string} filePath - file path that will be written
* @param {object} data - object that will be serialized with JSON.stringify
* @returns {Promise}
*/
async function writeJsonFile (filePath, data) {
  const json = JSON.stringify(data)
  return fs.writeFile(filePath, json)
}

// Write GeoJSON file
await writeJsonFile(countiesGeoJsonFilePath, countiesGeojson)

// Write JSON file
const countiesJson = countiesGeojson.features.map((county) => {
  return county.properties
})

await writeJsonFile(countiesJsonFilePath, countiesJson)

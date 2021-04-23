# New Jersey Counties

> A reusable package providing New Jersey counties as json or geojson

## Source data
NJGIN Open Data https://njogis-newjersey.opendata.arcgis.com/datasets/county-boundaries-of-nj-hosted-3857/data

## Usage

```js
import { getCounties } from '@njam-data/new-jersey-counties'

const geojsonCounties = await getCounties('geojson')
const jsonCounties = await getCounties('json')
```

import { EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Globe Layers" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=globe-layers
const setup: EChartSetup = () => {
  let option: any
  option = {
    backgroundColor: '#000',
    globe: {
      baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
      heightTexture: ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',

      displacementScale: 0.1,

      shading: 'lambert',

      environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',

      light: {
        ambient: {
          intensity: 0.1
        },
        main: {
          intensity: 1.5
        }
      },

      layers: [
        {
          type: 'blend',
          blendTo: 'emission',
          texture: ROOT_PATH + '/data-gl/asset/night.jpg'
        },
        {
          type: 'overlay',
          texture: ROOT_PATH + '/data-gl/asset/clouds.png',
          shading: 'lambert',
          distance: 5
        }
      ]
    },
    series: []
  };
  return option
}

export function EchartsGlobeLayers() {
  return <EChart setup={setup} />
}

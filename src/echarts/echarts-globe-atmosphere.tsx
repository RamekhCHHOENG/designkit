import { EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Globe with Atmosphere" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=globe-atmosphere
const setup: EChartSetup = () => {
  let option: any
  option = {
    backgroundColor: '#000',
    globe: {
      baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',

      shading: 'lambert',

      environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',

      atmosphere: {
        show: true
      },

      light: {
        ambient: {
          intensity: 0.1
        },
        main: {
          intensity: 1.5
        }
      }
    },
    series: []
  };
  return option
}

export function EchartsGlobeAtmosphere() {
  return <EChart setup={setup} />
}

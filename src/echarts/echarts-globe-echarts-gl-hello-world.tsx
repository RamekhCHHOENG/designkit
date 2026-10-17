import { EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "ECharts-GL Hello World" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=globe-echarts-gl-hello-world
const setup: EChartSetup = () => {
  let option: any
  option = {
    backgroundColor: '#000',
    globe: {
      baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
      heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
      displacementScale: 0.04,
      shading: 'realistic',
      environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
      realisticMaterial: {
        roughness: 0.9
      },
      postEffect: {
        enable: true
      },
      light: {
        main: {
          intensity: 5,
          shadow: true
        },
        ambientCubemap: {
          texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
          diffuseIntensity: 0.2
        }
      }
    }
  };
  return option
}

export function EchartsGlobeEchartsGlHelloWorld() {
  return <EChart setup={setup} />
}

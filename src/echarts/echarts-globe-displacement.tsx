import { EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Globe Displacement" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=globe-displacement
const setup: EChartSetup = () => {
  let option: any
  option = {
    globe: {
      displacementTexture:
        ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',

      displacementScale: 0.1,
      displacementQuality: 'ultra',

      shading: 'realistic',
      realisticMaterial: {
        roughness: 0.8,
        metalness: 0
      },

      postEffect: {
        enable: true,
        SSAO: {
          enable: true,
          radius: 2,
          intensity: 1.5,
          quality: 'high'
        }
      },
      temporalSuperSampling: {
        enable: true
      },
      light: {
        ambient: {
          intensity: 0
        },
        main: {
          intensity: 1,
          shadow: true
        },
        ambientCubemap: {
          texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
          exposure: 1,
          diffuseIntensity: 0.2
        }
      },
      viewControl: {
        autoRotate: false
      },
      debug: {
        wireframe: {
          show: true
        }
      }
    },
    series: []
  };
  return option
}

export function EchartsGlobeDisplacement() {
  return <EChart setup={setup} />
}

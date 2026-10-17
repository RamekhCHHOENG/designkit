import { EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Moon" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=globe-moon
const setup: EChartSetup = () => {
  let option: any
  option = {
    globe: {
      baseTexture: ROOT_PATH + '/data-gl/asset/moon-base.jpg',
      heightTexture: ROOT_PATH + '/data-gl/asset/moon-bump.jpg',

      displacementScale: 0.05,
      displacementQuality: 'medium',

      environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',

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
          intensity: 1,
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
          intensity: 2,
          shadow: true
        },
        ambientCubemap: {
          texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
          exposure: 0,
          diffuseIntensity: 0.02
        }
      },
      viewControl: {
        autoRotate: false
      }
    },
    series: []
  };
  return option
}

export function EchartsGlobeMoon() {
  return <EChart setup={setup} />
}

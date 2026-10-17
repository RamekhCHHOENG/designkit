import { registerBuiltinMap, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Geo3D" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=geo3d
const setup: EChartSetup = async ({ myChart }) => {
  let option: any
  await registerBuiltinMap("world")
  option = {
    geo3D: {
      map: 'world',
      lambertMaterial: {
        baseTexture: ROOT_PATH + '/data-gl/asset/woods.jpg',
        textureTiling: 10
      },

      postEffect: {
        enable: true,
        SSAO: {
          enable: true,
          radius: 1
        }
      },
      groundPlane: {
        show: true
      },
      light: {
        main: {
          intensity: 1,
          shadow: true
        },
        ambientCubemap: {
          texture: ROOT_PATH + '/data-gl/asset/canyon.hdr'
        }
      },
      viewControl: {
        distance: 50
      },

      itemStyle: {
        borderColor: '#000',
        borderWidth: 0.5
      },

      boxHeight: 1.0
    }
  };

  myChart.on('click', function () {
    alert('click');
  });
  return option
}

export function EchartsGeo3d() {
  return <EChart setup={setup} />
}

import { $, registerBuiltinMap, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Geo3D with Different Height" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=geo3d-with-different-height
const setup: EChartSetup = async ({ myChart }) => {
  let option: any
  await registerBuiltinMap("world")
  $.getJSON(
    ROOT_PATH + '/data-gl/asset/data/world-population.json',
    function (populationData: any) {
      var max = -Infinity;
      var min = Infinity;
      populationData.forEach(function (item: any) {
        max = Math.max(Math.log(item.value), max);
        min = Math.min(Math.log(item.value), min);
      });

      var regions = populationData.map(function (item: any) {
        return {
          name: item.name,
          height: ((Math.log(item.value) - min) / (max - min)) * 3
        };
      });

      myChart.setOption(
        (option = {
          backgroundColor: '#cdcfd5',
          geo3D: {
            map: 'world',
            shading: 'lambert',

            lambertMaterial: {
              detailTexture: ROOT_PATH + '/data-gl/asset/woods.jpg',
              textureTiling: 20
            },

            postEffect: {
              enable: true,
              SSAO: {
                enable: true,
                radius: 3,
                quality: 'high'
              }
            },
            groundPlane: {
              show: true
            },
            light: {
              main: {
                intensity: 1,
                shadow: true,
                shadowQuality: 'high',
                alpha: 30
              },
              ambient: {
                intensity: 0
              },
              ambientCubemap: {
                texture: ROOT_PATH + '/data-gl/asset/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 0.3
              }
            },
            viewControl: {
              distance: 50
            },

            regionHeight: 0.5,

            regions: regions
          }
        })
      );
    }
  );
  return option
}

export function EchartsGeo3dWithDifferentHeight() {
  return <EChart setup={setup} />
}

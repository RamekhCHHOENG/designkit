import { $, registerBuiltinMap, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Map3D - Alcohol Consumption" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=map3d-alcohol-consumption
const setup: EChartSetup = async ({ myChart }) => {
  await registerBuiltinMap("world")
  $.getJSON(ROOT_PATH + '/data-gl/asset/data/alcohol.json', function (data: any) {
    var regionData = data.map(function (item: any) {
      return {
        name: item[0],
        value: item[1]
      };
    });
    console.log(regionData);

    myChart.setOption({
      backgroundColor: '#cdcfd5',
      visualMap: {
        min: 0,
        max: 15,
        realtime: true,
        calculable: true,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        }
      },
      series: [
        {
          type: 'map3D',
          map: 'world',
          shading: 'lambert',
          realisticMaterial: {
            roughness: 0.2,
            metalness: 0
          },
          postEffect: {
            enable: true,
            SSAO: {
              enable: true,
              radius: 2,
              intensity: 1
            }
          },
          groundPlane: {
            show: true
          },
          light: {
            main: {
              intensity: 2,
              shadow: true,
              shadowQuality: 'high',
              alpha: 30
            },
            ambient: {
              intensity: 0
            },
            ambientCubemap: {
              texture: ROOT_PATH + '/data-gl/asset/canyon.hdr',
              exposure: 1,
              diffuseIntensity: 1
            }
          },
          viewControl: {
            distance: 50
          },

          regionHeight: 1,

          data: regionData
        }
      ]
    });
  });
}

export function EchartsMap3dAlcoholConsumption() {
  return <EChart setup={setup} />
}

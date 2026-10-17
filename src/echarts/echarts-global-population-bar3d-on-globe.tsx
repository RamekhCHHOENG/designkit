import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Global Population - Bar3D on Globe" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=global-population-bar3d-on-globe
const setup: EChartSetup = ({ myChart }) => {
  let option: any
  $.getJSON(ROOT_PATH + '/data-gl/asset/data/population.json', function (data: any) {
    data = data
      .filter(function (dataItem: any) {
        return dataItem[2] > 0;
      })
      .map(function (dataItem: any) {
        return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
      });

    option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        shading: 'lambert',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        light: {
          main: {
            intensity: 2
          }
        },
        viewControl: {
          autoRotate: false
        }
      },
      visualMap: {
        max: 40,
        calculable: true,
        realtime: false,
        inRange: {
          colorLightness: [0.2, 0.9]
        },
        textStyle: {
          color: '#fff'
        },
        controller: {
          inRange: {
            color: 'orange'
          }
        },
        outOfRange: {
          colorAlpha: 0
        }
      },
      series: [
        {
          type: 'bar3D',
          coordinateSystem: 'globe',
          data: data,
          barSize: 0.6,
          minHeight: 0.2,
          silent: true,
          itemStyle: {
            color: 'orange'
          }
        }
      ]
    };

    myChart.setOption(option);
  });
  return option
}

export function EchartsGlobalPopulationBar3dOnGlobe() {
  return <EChart setup={setup} />
}

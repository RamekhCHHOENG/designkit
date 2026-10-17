import { $, registerBuiltinMap, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Flights on Geo3D" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=lines3d-flights-on-geo3d
const setup: EChartSetup = async ({ myChart }) => {
  await registerBuiltinMap("world")
  $.getJSON(ROOT_PATH + '/data-gl/asset/data/flights.json', function (data: any) {
    function getAirportCoord(idx: any) {
      return [data.airports[idx][3], data.airports[idx][4]];
    }
    var routes = data.routes.map(function (airline: any) {
      return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
    });

    myChart.setOption({
      geo3D: {
        map: 'world',
        shading: 'color',

        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',

        silent: true,

        groundPlane: {
          show: false
        },
        light: {
          main: {
            intensity: 0
          },
          ambient: {
            intensity: 0
          }
        },
        viewControl: {
          distance: 50
        },

        itemStyle: {
          color: '#111'
        },

        boxHeight: 0.5
      },
      series: [
        {
          type: 'lines3D',

          coordinateSystem: 'geo3D',

          effect: {
            show: true,
            trailWidth: 2,
            trailLength: 0.2
          },

          blendMode: 'lighter',

          lineStyle: {
            width: 0,
            color: 'rgb(50, 50, 150)',
            opacity: 0.2
          },

          data: routes
        }
      ]
    });
  });

  window.addEventListener('keydown', function () {
    myChart.dispatchAction({
      type: 'lines3DToggleEffect',
      seriesIndex: 0
    });
  });
}

export function EchartsLines3dFlightsOnGeo3d() {
  return <EChart setup={setup} />
}

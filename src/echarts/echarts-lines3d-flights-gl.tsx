import { $, registerBuiltinMap, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Flights GL" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=lines3d-flights-gl
const setup: EChartSetup = async ({ myChart }) => {
  await registerBuiltinMap("world")
  var uploadedDataURL = ROOT_PATH + '/data-gl/asset/data/flights.json';

  myChart.showLoading();

  $.getJSON(uploadedDataURL, function (data: any) {
    myChart.hideLoading();

    function getAirportCoord(idx: any) {
      return [data.airports[idx][3], data.airports[idx][4]];
    }
    var routes = data.routes.map(function (airline: any) {
      return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
    });

    myChart.setOption({
      geo3D: {
        map: 'world',
        shading: 'realistic',
        silent: true,
        environment: '#333',
        realisticMaterial: {
          roughness: 0.8,
          metalness: 0
        },
        postEffect: {
          enable: true
        },
        groundPlane: {
          show: false
        },
        light: {
          main: {
            intensity: 1,
            alpha: 30
          },
          ambient: {
            intensity: 0
          }
        },
        viewControl: {
          distance: 70,
          alpha: 89,

          panMouseButton: 'left',
          rotateMouseButton: 'right'
        },

        itemStyle: {
          color: '#000'
        },

        regionHeight: 0.5
      },
      series: [
        {
          type: 'lines3D',

          coordinateSystem: 'geo3D',

          effect: {
            show: true,
            trailWidth: 1,
            trailOpacity: 0.5,
            trailLength: 0.2,
            constantSpeed: 5
          },

          blendMode: 'lighter',

          lineStyle: {
            width: 0.2,
            opacity: 0.05
          },

          data: routes
        }
      ]
    });

    window.addEventListener('keydown', function () {
      myChart.dispatchAction({
        type: 'lines3DToggleEffect',
        seriesIndex: 0
      });
    });
  });
}

export function EchartsLines3dFlightsGl() {
  return <EChart setup={setup} />
}

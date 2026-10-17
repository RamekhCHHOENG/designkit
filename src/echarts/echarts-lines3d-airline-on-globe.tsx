import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Airline on Globe" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=lines3d-airline-on-globe
const setup: EChartSetup = ({ myChart }) => {
  $.getJSON(ROOT_PATH + '/data-gl/asset/data/flights.json', function (data: any) {
    function getAirportCoord(idx: any) {
      return [data.airports[idx][3], data.airports[idx][4]];
    }
    var routes = data.routes.map(function (airline: any) {
      return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
    });

    myChart.setOption({
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        heightTexture:
          ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',

        shading: 'lambert',

        light: {
          ambient: {
            intensity: 0.4
          },
          main: {
            intensity: 0.4
          }
        },

        viewControl: {
          autoRotate: false
        }
      },
      series: {
        type: 'lines3D',

        coordinateSystem: 'globe',

        blendMode: 'lighter',

        lineStyle: {
          width: 1,
          color: 'rgb(50, 50, 150)',
          opacity: 0.1
        },

        data: routes
      }
    });
  });
}

export function EchartsLines3dAirlineOnGlobe() {
  return <EChart setup={setup} />
}

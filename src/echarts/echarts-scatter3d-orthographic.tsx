import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

declare const SimplexNoise: any
const CDN_PATH = "https://cdn.jsdelivr.net/npm/"

// Adapted from the Apache ECharts example "Scatter3D - Orthographic" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=scatter3d-orthographic
const setup: EChartSetup = ({ myChart }) => {
  let option: any
  $.getScript(CDN_PATH + 'simplex-noise@2.4.0/simplex-noise.js').done(
    function () {
      var noise = new SimplexNoise(Math.random);
      function generateData(theta: any, min: any, max: any) {
        var data: any[] = [];
        for (var i = 0; i <= 40; i++) {
          for (var j = 0; j <= 40; j++) {
            for (var k = 0; k <= 40; k++) {
              var value = noise.noise3D(i / 20, j / 20, k / 20);
              valMax = Math.max(valMax, value);
              valMin = Math.min(valMin, value);
              data.push([i, j, k, value * 2 + 4]);
            }
          }
        }
        return data;
      }
      var valMin = Infinity;
      var valMax = -Infinity;
      var data = generateData(2, -5, 5);
      console.log(valMin, valMax);

      myChart.setOption(
        (option = {
          visualMap: {
            show: false,
            min: 2,
            max: 6,
            inRange: {
              symbolSize: [0.5, 15],
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
              ],
              colorAlpha: [0.2, 1]
            }
          },
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value'
          },
          grid3D: {
            axisLine: {
              lineStyle: { color: '#fff' }
            },
            axisPointer: {
              lineStyle: { color: '#fff' }
            },
            viewControl: {
              projection: 'orthographic'
            }
          },
          series: [
            {
              type: 'scatter3D',
              data: data
            }
          ]
        })
      );
    }
  );
  return option
}

export function EchartsScatter3dOrthographic() {
  return <EChart setup={setup} theme="dark" />
}

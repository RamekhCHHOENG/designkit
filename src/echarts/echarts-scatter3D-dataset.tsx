import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "3D Scatter with Dataset" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=scatter3D-dataset
const setup: EChartSetup = ({ myChart }) => {
  let option: any
  $.get(
    ROOT_PATH + '/data/asset/data/life-expectancy-table.json',
    function (data: any) {
      var symbolSize = 2.5;
      option = {
        grid3D: {},
        xAxis3D: {
          type: 'category'
        },
        yAxis3D: {},
        zAxis3D: {},
        dataset: {
          dimensions: [
            'Income',
            'Life Expectancy',
            'Population',
            'Country',
            { name: 'Year', type: 'ordinal' }
          ],
          source: data
        },
        series: [
          {
            type: 'scatter3D',
            symbolSize: symbolSize,
            encode: {
              x: 'Country',
              y: 'Life Expectancy',
              z: 'Income',
              tooltip: [0, 1, 2, 3, 4]
            }
          }
        ]
      };

      myChart.setOption(option);
    }
  );
  return option
}

export function EchartsScatter3DDataset() {
  return <EChart setup={setup} />
}

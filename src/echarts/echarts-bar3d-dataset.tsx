import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "3D Bar with Dataset" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=bar3d-dataset
const setup: EChartSetup = ({ myChart }) => {
  let option: any
  $.get(
    ROOT_PATH + '/data/asset/data/life-expectancy-table.json',
    function (data: any) {
      option = {
        grid3D: {},
        tooltip: {},
        xAxis3D: {
          type: 'category'
        },
        yAxis3D: {
          type: 'category'
        },
        zAxis3D: {},
        visualMap: {
          max: 1e8,
          dimension: 'Population'
        },
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
            type: 'bar3D',
            // symbolSize: symbolSize,
            shading: 'lambert',
            encode: {
              x: 'Year',
              y: 'Country',
              z: 'Life Expectancy',
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

export function EchartsBar3dDataset() {
  return <EChart setup={setup} />
}

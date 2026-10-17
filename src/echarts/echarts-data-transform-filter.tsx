import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Data Transform Filter" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=data-transform-filter
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  $.get(
    ROOT_PATH + '/data/asset/data/life-expectancy-table.json',
    function (_rawData) {
      run(_rawData);
    }
  );

  function run(_rawData: any) {
    option = {
      dataset: [
        {
          id: 'dataset_raw',
          source: _rawData
        },
        {
          id: 'dataset_since_1950_of_germany',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Year', gte: 1950 },
                { dimension: 'Country', '=': 'Germany' }
              ]
            }
          }
        },
        {
          id: 'dataset_since_1950_of_france',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Year', gte: 1950 },
                { dimension: 'Country', '=': 'France' }
              ]
            }
          }
        }
      ],
      title: {
        text: 'Income of Germany and France since 1950'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle'
      },
      yAxis: {
        name: 'Income'
      },
      series: [
        {
          type: 'line',
          datasetId: 'dataset_since_1950_of_germany',
          showSymbol: false,
          encode: {
            x: 'Year',
            y: 'Income',
            itemName: 'Year',
            tooltip: ['Income']
          }
        },
        {
          type: 'line',
          datasetId: 'dataset_since_1950_of_france',
          showSymbol: false,
          encode: {
            x: 'Year',
            y: 'Income',
            itemName: 'Year',
            tooltip: ['Income']
          }
        }
      ]
    };

    myChart.setOption<echarts.EChartsOption>(option);
  }
  return option
}

export function EchartsDataTransformFilter() {
  return <EChart setup={setup} />
}

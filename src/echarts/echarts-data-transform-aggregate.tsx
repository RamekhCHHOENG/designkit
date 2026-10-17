import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
// @ts-ignore
import ecSimpleTransform from "echarts-simple-transform"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"
const CDN_PATH = "https://cdn.jsdelivr.net/npm/"

// Adapted from the Apache ECharts example "Data Transform Simple Aggregate" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=data-transform-aggregate
const setup: EChartSetup = ({ myChart }) => {
  let option: any
  $.when(
    $.get(ROOT_PATH + '/data/asset/data/life-expectancy-table.json'),
    $.getScript(
      CDN_PATH + 'echarts-simple-transform/dist/ecSimpleTransform.min.js'
    )
  ).done(function (res: any) {
    run(res[0]);
  });

  function run(_rawData: any) {
    echarts.registerTransform(ecSimpleTransform.aggregate);

    option = {
      dataset: [
        {
          id: 'raw',
          source: _rawData
        },
        {
          id: 'since_year',
          fromDatasetId: 'raw',
          transform: [
            {
              type: 'filter',
              config: {
                dimension: 'Year',
                gte: 1950
              }
            }
          ]
        },
        {
          id: 'income_aggregate',
          fromDatasetId: 'since_year',
          transform: [
            {
              type: 'ecSimpleTransform:aggregate',
              config: {
                resultDimensions: [
                  { name: 'min', from: 'Income', method: 'min' },
                  { name: 'Q1', from: 'Income', method: 'Q1' },
                  { name: 'median', from: 'Income', method: 'median' },
                  { name: 'Q3', from: 'Income', method: 'Q3' },
                  { name: 'max', from: 'Income', method: 'max' },
                  { name: 'Country', from: 'Country' }
                ],
                groupBy: 'Country'
              }
            },
            {
              type: 'sort',
              config: {
                dimension: 'Q3',
                order: 'asc'
              }
            }
          ]
        }
      ],
      title: {
        text: 'Income since 1950'
      },
      tooltip: {
        trigger: 'axis',
        confine: true
      },
      xAxis: {
        name: 'Income',
        nameLocation: 'middle',
        nameGap: 30,
        scale: true
      },
      yAxis: {
        type: 'category'
      },
      grid: {
        bottom: 140
      },
      legend: {
        selected: { detail: false }
      },
      dataZoom: [
        {
          type: 'inside'
        },
        {
          type: 'slider',
          height: 20,
          bottom: 60
        }
      ],
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          datasetId: 'income_aggregate',
          itemStyle: {
            color: '#b8c5f2'
          },
          encode: {
            x: ['min', 'Q1', 'median', 'Q3', 'max'],
            y: 'Country',
            itemName: ['Country'],
            tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
          }
        },
        {
          name: 'detail',
          type: 'scatter',
          datasetId: 'since_year',
          symbolSize: 6,
          tooltip: {
            trigger: 'item'
          },
          label: {
            show: true,
            position: 'top',
            align: 'left',
            verticalAlign: 'middle',
            rotate: 90,
            fontSize: 12
          },
          itemStyle: {
            color: '#d00000'
          },
          encode: {
            x: 'Income',
            y: 'Country',
            label: 'Year',
            itemName: 'Year',
            tooltip: ['Country', 'Year', 'Income']
          }
        }
      ]
    };

    myChart.setOption(option);
  }
  return option
}

export function EchartsDataTransformAggregate() {
  return <EChart setup={setup} />
}

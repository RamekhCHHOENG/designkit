import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Default arrangement" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=dataset-default
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
        ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
        ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
      ]
    },
    series: [
      {
        type: 'pie',
        radius: '20%',
        center: ['25%', '30%']
        // No encode specified, by default, it is '2012'.
      },
      {
        type: 'pie',
        radius: '20%',
        center: ['75%', '30%'],
        encode: {
          itemName: 'product',
          value: '2013'
        }
      },
      {
        type: 'pie',
        radius: '20%',
        center: ['25%', '75%'],
        encode: {
          itemName: 'product',
          value: '2014'
        }
      },
      {
        type: 'pie',
        radius: '20%',
        center: ['75%', '75%'],
        encode: {
          itemName: 'product',
          value: '2015'
        }
      }
    ]
  };
  return option
}

export function EchartsDatasetDefault() {
  return <EChart setup={setup} />
}

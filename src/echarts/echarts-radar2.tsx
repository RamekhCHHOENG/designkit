import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Proportion of Browsers" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=radar2
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    title: {
      text: 'Proportion of Browsers',
      subtext: 'Fake Data',
      top: 10,
      left: 10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      bottom: 10,
      data: (function () {
        var list = [];
        for (var i = 1; i <= 28; i++) {
          list.push(i + 2000 + '');
        }
        return list;
      })()
    },
    visualMap: {
      top: 'middle',
      right: 10,
      inRange: {
        color: ['red', 'yellow']
      },
      calculable: true
    },
    radar: {
      indicator: [
        { text: 'IE8-', max: 400 },
        { text: 'IE9+', max: 400 },
        { text: 'Safari', max: 400 },
        { text: 'Firefox', max: 400 },
        { text: 'Chrome', max: 400 }
      ]
    },
    series: (function () {
      var series = [];
      for (var i = 1; i <= 28; i++) {
        series.push({
          type: 'radar',
          symbol: 'none',
          lineStyle: {
            width: 1
          },
          emphasis: {
            areaStyle: {
              color: 'rgba(0,250,0,0.3)'
            }
          },
          data: [
            {
              value: [
                (40 - i) * 10,
                (38 - i) * 4 + 60,
                i * 5 + 10,
                i * 9,
                (i * i) / 2
              ],
              name: i + 2000 + ''
            }
          ]
        });
      }
      return series as echarts.RadarSeriesOption;
    })()
  };
  return option
}

export function EchartsRadar2() {
  return <EChart setup={setup} />
}

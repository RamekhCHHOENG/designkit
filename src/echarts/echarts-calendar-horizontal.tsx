import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Calendar Heatmap Horizontal" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=calendar-horizontal
const setup: EChartSetup = () => {
  let option!: EChartsOption
  function getVirtualData(year: string) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 1000)
      ]);
    }
    return data;
  }

  option = {
    tooltip: {
      position: 'top'
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      top: 'top'
    },

    calendar: [
      {
        range: '2017',
        cellSize: ['auto', 20]
      },
      {
        top: 260,
        range: '2016',
        cellSize: ['auto', 20]
      },
      {
        top: 450,
        range: '2015',
        cellSize: ['auto', 20],
        right: 5
      }
    ],

    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: getVirtualData('2017')
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 1,
        data: getVirtualData('2016')
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 2,
        data: getVirtualData('2015')
      }
    ]
  };
  return option
}

export function EchartsCalendarHorizontal() {
  return <EChart setup={setup} />
}

import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Calendar Heatmap Vertical" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=calendar-vertical
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
      position: 'top',
      formatter: function (p: any) {
        const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
        return format + ': ' + p.data[1];
      }
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'vertical',
      left: '670',
      top: 'center'
    },

    calendar: [
      {
        orient: 'vertical',
        range: '2015'
      },
      {
        left: 300,
        orient: 'vertical',
        range: '2016'
      },
      {
        left: 520,
        cellSize: [20, 'auto'],
        bottom: 10,
        orient: 'vertical',
        range: '2017',
        dayLabel: {
          margin: 5
        }
      }
    ],

    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: getVirtualData('2015')
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
        data: getVirtualData('2017')
      }
    ]
  };
  return option
}

export function EchartsCalendarVertical() {
  return <EChart setup={setup} />
}

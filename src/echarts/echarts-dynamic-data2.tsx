import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Dynamic Data + Time Axis" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=dynamic-data2
const setup: EChartSetup = ({ myChart, setInterval }) => {
  let option!: EChartsOption
  interface DataItem {
    name: string;
    value: [string, number];
  }

  function randomData(): DataItem {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value)
      ]
    };
  }

  let data: DataItem[] = [];
  let now = new Date(1997, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (var i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  option = {
    title: {
      text: 'Dynamic Data & Time Axis'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        params = params[0];
        var date = new Date(params.name);
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear() +
          ' : ' +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data
      }
    ]
  };

  setInterval(function () {
    for (var i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }

    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          data: data
        }
      ]
    });
  }, 1000);
  return option
}

export function EchartsDynamicData2() {
  return <EChart setup={setup} />
}

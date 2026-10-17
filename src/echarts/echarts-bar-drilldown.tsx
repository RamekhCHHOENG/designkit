import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Bar Chart Drilldown Animation" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=bar-drilldown
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  interface DataItem {
    value: number;
    groupId: string;
  }
  option = {
    xAxis: {
      data: ['Animals', 'Fruits', 'Cars']
    },
    yAxis: {},
    dataGroupId: '',
    animationDurationUpdate: 500,
    series: {
      type: 'bar',
      id: 'sales',
      data: [
        {
          value: 5,
          groupId: 'animals'
        },
        {
          value: 2,
          groupId: 'fruits'
        },
        {
          value: 4,
          groupId: 'cars'
        }
      ] as DataItem[],
      universalTransition: {
        enabled: true,
        divideShape: 'clone'
      }
    }
  };

  const drilldownData = [
    {
      dataGroupId: 'animals',
      data: [
        ['Cats', 4],
        ['Dogs', 2],
        ['Cows', 1],
        ['Sheep', 2],
        ['Pigs', 1]
      ]
    },
    {
      dataGroupId: 'fruits',
      data: [
        ['Apples', 4],
        ['Oranges', 2]
      ]
    },
    {
      dataGroupId: 'cars',
      data: [
        ['Toyota', 4],
        ['Opel', 2],
        ['Volkswagen', 2]
      ]
    }
  ];

  myChart.on('click', function (event) {
    if (event.data) {
      var subData = drilldownData.find(function (data) {
        return data.dataGroupId === (event.data as DataItem).groupId;
      });
      if (!subData) {
        return;
      }
      myChart.setOption<echarts.EChartsOption>({
        xAxis: {
          data: subData.data.map(function (item) {
            return item[0];
          })
        },
        series: {
          type: 'bar',
          id: 'sales',
          dataGroupId: subData.dataGroupId,
          data: subData.data.map(function (item) {
            return item[1];
          }),
          universalTransition: {
            enabled: true,
            divideShape: 'clone'
          }
        },
        graphic: [
          {
            type: 'text',
            left: 50,
            top: 20,
            style: {
              text: 'Back',
              fontSize: 18
            },
            onclick: function () {
              myChart.setOption<echarts.EChartsOption>(option);
            }
          }
        ]
      });
    }
  });
  return option
}

export function EchartsBarDrilldown() {
  return <EChart setup={setup} />
}

import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Disk Usage" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=treemap-disk
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();

  $.get(ROOT_PATH + '/data/asset/data/disk.tree.json', function (diskData) {
    myChart.hideLoading();

    const formatUtil = echarts.format;

    function getLevelOption() {
      return [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 5
          }
        },
        {
          itemStyle: {
            gapWidth: 1
          }
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            gapWidth: 1,
            borderColorSaturation: 0.6
          }
        }
      ];
    }

    myChart.setOption(
      (option = {
        title: {
          text: 'Disk Usage',
          left: 'center'
        },

        tooltip: {
          formatter: function (info: any) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];

            for (var i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }

            return [
              '<div class="tooltip-title">' +
                formatUtil.encodeHTML(treePath.join('/')) +
                '</div>',
              'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
            ].join('');
          }
        },

        series: [
          {
            name: 'Disk Usage',
            type: 'treemap',
            visibleMin: 300,
            label: {
              show: true,
              formatter: '{b}'
            },
            itemStyle: {
              borderColor: '#fff'
            },
            levels: getLevelOption(),
            data: diskData
          }
        ]
      })
    );
  });
  return option
}

export function EchartsTreemapDisk() {
  return <EChart setup={setup} />
}

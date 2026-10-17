import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Transition between Treemap and Sunburst" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=treemap-sunburst-transition
const setup: EChartSetup = ({ myChart, setInterval }) => {
  $.getJSON(
    ROOT_PATH + '/data/asset/data/echarts-package-size.json',
    function (data) {
      const treemapOption: echarts.EChartsOption = {
        series: [
          {
            type: 'treemap',
            id: 'echarts-package-size',
            animationDurationUpdate: 1000,
            roam: false,
            nodeClick: undefined,
            data: data.children,
            universalTransition: true,
            label: {
              show: true
            },
            breadcrumb: {
              show: false
            }
          }
        ]
      };

      const sunburstOption: echarts.EChartsOption = {
        series: [
          {
            type: 'sunburst',
            id: 'echarts-package-size',
            radius: ['20%', '90%'],
            animationDurationUpdate: 1000,
            nodeClick: undefined,
            data: data.children,
            universalTransition: true,
            itemStyle: {
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,.5)'
            },
            label: {
              show: false
            }
          }
        ]
      };

      let currentOption = treemapOption;

      myChart.setOption(currentOption);

      setInterval(function () {
        currentOption =
          currentOption === treemapOption ? sunburstOption : treemapOption;
        myChart.setOption(currentOption);
      }, 3000);
    }
  );
}

export function EchartsTreemapSunburstTransition() {
  return <EChart setup={setup} />
}

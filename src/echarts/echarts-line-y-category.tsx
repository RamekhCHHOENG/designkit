import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Line Y Category" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line-y-category
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    legend: {
      data: ['Altitude (km) vs. temperature (°C)']
    },
    tooltip: {
      trigger: 'axis',
      formatter: 'Temperature : <br/>{b}km : {c}°C'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    yAxis: {
      type: 'category',
      axisLine: { onZero: false },
      axisLabel: {
        formatter: '{value} km'
      },
      boundaryGap: false,
      data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
    },
    series: [
      {
        name: 'Altitude (km) vs. temperature (°C)',
        type: 'line',
        symbolSize: 10,
        symbol: 'circle',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 10,
          shadowOffsetY: 8
        },
        data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
      }
    ]
  };
  return option
}

export function EchartsLineYCategory() {
  return <EChart setup={setup} />
}

import { EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

// Adapted from the Apache ECharts example "Line3D - Orthographic Projection" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line3d-orthographic
const setup: EChartSetup = () => {
  let option: any
  var data: any[] = [];
  // Parametric curve
  for (var t = 0; t < 25; t += 0.001) {
    var x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
    var y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
    var z = t + 2.0 * Math.sin(75 * t);
    data.push([x, y, z]);
  }
  console.log(data.length);

  option = {
    tooltip: {},
    backgroundColor: '#fff',
    visualMap: {
      show: false,
      dimension: 2,
      min: 0,
      max: 30,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    xAxis3D: {
      type: 'value'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      viewControl: {
        projection: 'orthographic'
      }
    },
    series: [
      {
        type: 'line3D',
        data: data,
        lineStyle: {
          width: 4
        }
      }
    ]
  };
  return option
}

export function EchartsLine3dOrthographic() {
  return <EChart setup={setup} />
}

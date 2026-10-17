import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Wood City" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=map3d-wood-city
const setup: EChartSetup = ({ myChart }) => {
  $.getJSON(
    ROOT_PATH + '/data-gl/asset/data/buildings.json',
    function (buildingsGeoJSON: any) {
      echarts.registerMap('buildings', buildingsGeoJSON);

      var regions = buildingsGeoJSON.features.map(function (feature: any) {
        return {
          name: feature.properties.name,
          value: Math.max(Math.sqrt(feature.properties.height), 0.1),
          height: Math.max(Math.sqrt(feature.properties.height), 0.1)
        };
      });

      myChart.setOption({
        series: [
          {
            type: 'map3D',
            map: 'buildings',
            shading: 'realistic',
            realisticMaterial: {
              roughness: 0.6,
              textureTiling: 20,
              detailTexture: ROOT_PATH + '/data-gl/asset/woods.jpg'
            },
            postEffect: {
              enable: true,
              bloom: {
                enable: false
              },
              SSAO: {
                enable: true,
                quality: 'medium',
                radius: 10,
                intensity: 1.2
              },
              depthOfField: {
                enable: false,
                focalRange: 5,
                fstop: 1,
                blurRadius: 6
              }
            },
            groundPlane: {
              show: true,
              color: '#333'
            },
            light: {
              main: {
                intensity: 6,
                shadow: true,
                shadowQuality: 'high',
                alpha: 30
              },
              ambient: {
                intensity: 0
              },
              ambientCubemap: {
                texture: ROOT_PATH + '/data-gl/asset/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 1,
                specularIntensity: 1
              }
            },
            viewControl: {
              minBeta: -360,
              maxBeta: 360
            },

            itemStyle: {
              areaColor: '#666'
            },

            label: {
              color: 'white'
            },

            silent: true,

            instancing: true,

            boxWidth: 200,
            boxHeight: 1,

            data: regions
          }
        ]
      });
    }
  );
}

export function EchartsMap3dWoodCity() {
  return <EChart setup={setup} />
}

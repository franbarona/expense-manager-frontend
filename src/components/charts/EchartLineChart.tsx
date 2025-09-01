import { useRef } from 'react';
import ReactECharts from 'echarts-for-react';

const EchartLineChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const option = {
    grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
    xAxis: {
      type: 'category',
      boundaryGap: false,         // evita espacio extra al inicio/final
      data: ['A', 'B', 'C', 'D', 'E'],
      axisLine: { show: false },   // Oculta la línea del eje
      axisTick: { show: false },   // Oculta las marcas
      axisLabel: { show: false },  // Oculta las etiquetas (números/texto)
      splitLine: { show: false }   // Oculta líneas de grid
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        type: 'line',
        data: [10, 22, 28, 43, 49],
        smooth: true,              // opcional: suaviza la curva
        symbol: 'none'             // oculta los puntos
      }
    ]
  };

  return (
    <div className='w-full h-[50px] mx-0 my-auto' ref={containerRef}>
      <ReactECharts option={option} />
    </div>
  );
};

export default EchartLineChart;

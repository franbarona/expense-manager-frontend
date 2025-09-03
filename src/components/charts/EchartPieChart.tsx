import { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartPieChartData } from '../../types/types';
import { formatNumber } from '../../utils/transforms';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: EChartPieChartData[];
}

const EchartPieChart = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const { isDarkMode } = useTheme();
  const [textColor, setTextColor] = useState('#000')


  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setTextColor(isDarkMode ? '#fff' : '#000');
  }, [isDarkMode])

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: width < 420 ? 'scroll' : 'plain',
      orient: 'vertical',
      left: 'right',
      top: 'center',
      itemWidth: 20,
      itemHeight: 20,
      padding: 20,
      width: 200,
      height: 200,
      textStyle: {
        color: textColor
      }
    },
    graphic: [
      {
        type: "text",
        right: 'center',
        bottom: 40,
        style: {
          text: `Total:`,
          textAlign: "center",
          fill: textColor,
          fontSize: 20,
          fontFamily: "Poppins, sans-serif" // 👈 tu tipografía aquí
        }
      },
      {
        type: "text",
        right: 'center',
        bottom: 10,
        style: {
          text: `${formatNumber(total, 2)}$`,
          textAlign: "center",
          fill: textColor, // equivalente a text-gray-800
          fontSize: 32,
          fontFamily: "Poppins, sans-serif" // 👈 tu tipografía aquí
        }
      }
    ],
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 4,
        itemStyle: {
          borderRadius: 5,
          shadowBlur: 5, // Desenfoque de la sombra
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOffsetX: 2, // Desplazamiento de la sombra en el eje X
          shadowOffsetY: 2, // Desplazamiento de la sombra en el eje Y
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        right: '50%',
        data,
        padding: [10, 10, 10, 10]
      }
    ]
  };

  return (
    <div className='w-full h-full mx-0 my-auto' ref={containerRef}>
      <ReactECharts option={option} style={{ width: '100%' }} />
    </div>
  );
};

export default EchartPieChart;

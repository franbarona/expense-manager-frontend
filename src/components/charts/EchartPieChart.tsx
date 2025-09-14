import { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartPieChartData } from '../../types/types';
import { formatNumber, formatNumberParts, transformNumberToPositive } from '../../utils/transforms';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: EChartPieChartData[];
}

const EchartPieChart = ({ data }: Props) => {
  const parsedData = structuredClone(data);
  parsedData.forEach(d => d.value = transformNumberToPositive(d.value));
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const { decimalPart } = formatNumberParts(total);
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
        color: textColor,
        fontSize: 15,
        fontFamily: "Poppins, sans-serif"
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 4,
        itemStyle: {
          borderRadius: 5,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
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
        data: parsedData,
        padding: [10, 10, 10, 10]
      }
    ]
  };

  return (
    <div className='w-full h-full mx-0 my-auto relative' ref={containerRef}>
      <ReactECharts option={option} style={{ width: '100%' }} />
      <div className='absolute bottom-0 flex flex-col justify-center items-center w-full'>
        <span className='text-secondary'>Total:</span>
        <div className='text-primary'>
          <span className="text-2xl font-semibold">{formatNumber(total, 0)}</span>
          <span className="text-lg font-medium">.{decimalPart}$</span>
        </div>
      </div>
    </div>
  );
};

export default EchartPieChart;

import React, { useEffect, useRef, useState } from 'react';
import { createChart, LineStyle } from 'lightweight-charts';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ScrollableContainer = styled.div`
  width: 100%;
  height: 300px; /* Adjust the height as needed */
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  margin: 20px 0;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const ChartContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

const ThemeToggle = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  background-color: ${props => props.theme === 'dark' ? '#ffffff' : '#1e1e1e'};
  color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

const CandlestickChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          backgroundColor: 'transparent',
          textColor: theme === 'dark' ? '#d9d9d9' : '#333',
        },
        grid: {
          vertLines: { color: theme === 'dark' ? '#2c2c2c' : '#e0e0e0' },
          horzLines: { color: theme === 'dark' ? '#2c2c2c' : '#e0e0e0' },
        },
        crosshair: { mode: 1 },
        priceScale: { borderColor: theme === 'dark' ? '#2c2c2c' : '#dfdfdf' },
        timeScale: {
          borderColor: theme === 'dark' ? '#2c2c2c' : '#dfdfdf',
          timeVisible: true,
          secondsVisible: false,
          rightOffset: 12, // Add some right offset to ensure the last candle is fully visible
        },
      });

      const mainSeries = chart.addCandlestickSeries({
        upColor: theme === 'dark' ? '#26a69a' : '#4caf50',
        downColor: theme === 'dark' ? '#ef5350' : '#ef5350',
        borderVisible: false,
        wickUpColor: theme === 'dark' ? '#26a69a' : '#4caf50',
        wickDownColor: theme === 'dark' ? '#ef5350' : '#ef5350',
      });

      mainSeries.setData(data);

      // Adjust the time scale to fit the data
      chart.timeScale().fitContent();

      // Add SMA
      const smaData = calculateSMA(data, 10);
      const smaSeries = chart.addLineSeries({
        color: '#2196F3',
        lineWidth: 2,
        title: 'SMA 10',
      });
      smaSeries.setData(smaData);

      // Add EMA
      const emaData = calculateEMA(data, 20);
      const emaSeries = chart.addLineSeries({
        color: '#FF9800',
        lineWidth: 2,
        title: 'EMA 20',
      });
      emaSeries.setData(emaData);

      // Add RSI
      const rsiData = calculateRSI(data, 14);
      const rsiSeries = chart.addLineSeries({
        color: '#E91E63',
        lineWidth: 2,
        title: 'RSI 14',
      });
      rsiSeries.setData(rsiData);

      // Add MACD
      const macdData = calculateMACD(data, 12, 26, 9);
      const macdSeries = chart.addHistogramSeries({
        color: '#9C27B0',
        title: 'MACD',
      });
      macdSeries.setData(macdData.histogram);

      const macdLineSeries = chart.addLineSeries({
        color: '#2196F3',
        lineWidth: 2,
        title: 'MACD Line',
      });
      macdLineSeries.setData(macdData.macdLine);

      const signalLineSeries = chart.addLineSeries({
        color: '#FF9800',
        lineWidth: 2,
        title: 'Signal Line',
      });
      signalLineSeries.setData(macdData.signalLine);

      // Add markers
      const markers = generateMarkers(data);
      mainSeries.setMarkers(markers);

      chart.timeScale().fitContent();

      chartRef.current = chart;

      const handleResize = () => {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
        chart.timeScale().fitContent(); // Refitting content on resize
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [data, theme]);

  return (
    <ScrollableContainer>
      <ChartContainer
        theme={theme}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
        <ThemeToggle
          theme={theme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </ThemeToggle>
      </ChartContainer>
    </ScrollableContainer>
  );
};


// Calculate Simple Moving Average
function calculateSMA(data, period) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((total, d) => total + d.close, 0);
    sma.push({ time: data[i].time, value: sum / period });
  }
  return sma;
}

// Calculate Exponential Moving Average
function calculateEMA(data, period) {
  const ema = [];
  const multiplier = 2 / (period + 1);
  let prevEMA = data[0].close;

  for (let i = 0; i < data.length; i++) {
    const currentClose = data[i].close;
    const currentEMA = (currentClose - prevEMA) * multiplier + prevEMA;
    ema.push({ time: data[i].time, value: currentEMA });
    prevEMA = currentEMA;
  }
  return ema;
}

function calculateRSI(data, period) {
  const rsi = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < data.length; i++) {
    const difference = data[i].close - data[i - 1].close;
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }

    if (i >= period) {
      if (i > period) {
        gains = (gains * (period - 1) + (difference > 0 ? difference : 0)) / period;
        losses = (losses * (period - 1) + (difference < 0 ? -difference : 0)) / period;
      }

      const rs = gains / losses;
      const rsiValue = 100 - (100 / (1 + rs));
      rsi.push({ time: data[i].time, value: rsiValue });
    }
  }

  return rsi;
}

function calculateMACD(data, fastPeriod, slowPeriod, signalPeriod) {
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  const macdLine = [];
  const signalLine = [];
  const histogram = [];

  for (let i = slowPeriod - 1; i < data.length; i++) {
    const macd = fastEMA[i].value - slowEMA[i].value;
    macdLine.push({ time: data[i].time, value: macd });
  }

  const signalEMA = calculateEMA(macdLine, signalPeriod);

  for (let i = 0; i < signalEMA.length; i++) {
    const signal = signalEMA[i].value;
    const macd = macdLine[i].value;  // Remove the offset here
    const histValue = macd - signal;

    signalLine.push({ time: signalEMA[i].time, value: signal });
    histogram.push({ time: signalEMA[i].time, value: histValue });
  }

  return { macdLine, signalLine, histogram };
}

function generateMarkers(data) {
  const markers = [];
  for (let i = 5; i < data.length; i += 10) {
    if (data[i].close > data[i - 1].close) {
      markers.push({
        time: data[i].time,
        position: 'belowBar',
        color: '#2196F3',
        shape: 'arrowUp',
        text: 'Buy',
      });
    } else {
      markers.push({
        time: data[i].time,
        position: 'aboveBar',
        color: '#e91e63',
        shape: 'arrowDown',
        text: 'Sell',
      });
    }
  }
  return markers;
}

export default CandlestickChart;
// customDatafeed.js
const sampleData = [
    { time: '2024-08-01', open: 100, high: 105, low: 98, close: 103 },
    { time: '2024-08-02', open: 103, high: 107, low: 101, close: 105 },
    { time: '2024-08-03', open: 105, high: 110, low: 102, close: 108 },
    { time: '2024-08-04', open: 108, high: 115, low: 105, close: 112 },
    { time: '2024-08-05', open: 112, high: 120, low: 110, close: 115 },
    { time: '2024-08-06', open: 115, high: 125, low: 112, close: 123 },
    { time: '2024-08-07', open: 123, high: 130, low: 120, close: 127 },
    { time: '2024-08-08', open: 127, high: 135, low: 125, close: 130 },
    { time: '2024-08-09', open: 130, high: 140, low: 128, close: 135 },
    { time: '2024-08-10', open: 135, high: 145, low: 130, close: 140 },
    { time: '2024-08-11', open: 140, high: 150, low: 135, close: 145 },
    { time: '2024-08-12', open: 145, high: 155, low: 140, close: 150 },
    { time: '2024-08-13', open: 150, high: 160, low: 145, close: 155 },
  ];
  
  export const customDatafeed = {
    onReady: (callback) => {
      setTimeout(() => callback({
        supported_resolutions: ["1D", "1W", "1M"]
      }), 0);
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
      console.log('Resolving symbol', symbolName);
      setTimeout(() => onSymbolResolvedCallback({
        name: symbolName,
        description: 'Sample Data',
        type: 'crypto',
        session: '24x7',
        timezone: 'Etc/UTC',
        ticker: symbolName,
        minmov: 1,
        pricescale: 100,
        has_intraday: false,
        supported_resolutions: ['1D', '1W', '1M'],
        volume_precision: 8,
        data_status: 'streaming',
      }), 0);
    },
    getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
      const bars = sampleData.map(bar => ({
        time: new Date(bar.time).getTime() / 1000,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
      }));
      console.log(bars);

      if (bars.length) {
        console.log(bars);
        onHistoryCallback(bars, { noData: false });
    } else {
        onHistoryCallback([], { noData: true });
    }


    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
    },
    unsubscribeBars: (subscriberUID) => {
    },
  };
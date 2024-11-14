// // File: components/CustomDatafeed.js
// class CustomDatafeed {
//     async getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
//       try {
//         const response = await fetch(`/api/chartdata?from=${from}&to=${to}&resolution=${resolution}`);
//         const data = await response.json();
//         if (data.s !== 'ok') {
//           onErrorCallback('No data');
//         } else {
//           const bars = data.t.map((t, i) => ({
//             time: t * 1000,
//             open: data.o[i],
//             high: data.h[i],
//             low: data.l[i],
//             close: data.c[i],
//           }));
//           onHistoryCallback(bars, { noData: false });
//         }
//       } catch (error) {
//         onErrorCallback(error);
//       }
//     }
  
//     subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
//       // Implement if you need real-time updates
//     }
  
//     unsubscribeBars(subscriberUID) {
//       // Implement if you need to handle unsubscription
//     }
//   }
  
//   // Export an instance of CustomDatafeed instead of the class itself
//   export default new CustomDatafeed();




// CustomDatafeed.js
class CustomDatafeed {
    constructor() {
      this.lastBarsCache = new Map();
      this.symbolMapping = new Map();
    }
  
    async loadSymbolMapping() {
      try {
        const response = await fetch('/api/mapping');
        const data = await response.json();
        console.log('[loadSymbolMapping]:', data);
        data.symbols.forEach(symbol => {
          this.symbolMapping.set(symbol.f[0], symbol.s);
        });
      } catch (error) {
        console.error('Error loading symbol mapping:', error);
      }
    }
  
    async onReady(callback) {
      console.log('[onReady]: Method call');
      await this.loadSymbolMapping();
      callback({
        supported_resolutions: ['1D', '1W', '1M'],
        supports_time: true,
        supports_marks: false,
        supports_timescale_marks: false,
      });
    }
  
    async searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
      console.log('[searchSymbols]: Method call');
      const symbols = Array.from(this.symbolMapping.entries())
        .filter(([brokerSymbol, tvSymbol]) => 
          brokerSymbol.toLowerCase().includes(userInput.toLowerCase()) ||
          tvSymbol.toLowerCase().includes(userInput.toLowerCase())
        )
        .map(([brokerSymbol, tvSymbol]) => ({
          symbol: brokerSymbol,
          full_name: tvSymbol,
          description: brokerSymbol,
          exchange: tvSymbol.split(':')[0],
          type: 'crypto', // Adjust this based on your symbol types
        }));
  
      onResultReadyCallback(symbols);
    }
  
    async resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
      console.log('[resolveSymbol]: Method call', symbolName);
      const tvSymbol = this.symbolMapping.get(symbolName) || symbolName;
      const [exchange, symbol] = tvSymbol.split(':');
  
      const symbolInfo = {
        name: symbol,
        full_name: tvSymbol,
        description: symbolName,
        type: 'crypto', // Adjust this based on your symbol types
        session: '24x7',
        timezone: 'UTC',
        exchange: exchange,
        minmov: 1,
        pricescale: 100,
        has_intraday: false,
        supported_resolutions: ['1D', '1W', '1M'],
        volume_precision: 8,
        data_status: 'streaming',
      };
      onSymbolResolvedCallback(symbolInfo);
    }
  
    async getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
      const { from, to, firstDataRequest } = periodParams;
      console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
      
      try {
        const response = await fetch(`/api/chartdata?symbol=${symbolInfo.name}&from=${from}&to=${to}&resolution=${resolution}`);
        const data = await response.json();
        
        if (data.s !== 'ok') {
          onErrorCallback('No data');
          return;
        }
        
        const bars = data.t.map((t, i) => ({
          time: t * 1000,
          open: parseFloat(data.o[i]),
          high: parseFloat(data.h[i]),
          low: parseFloat(data.l[i]),
          close: parseFloat(data.c[i]),
          volume: parseFloat(data.v[i])
        }));
        
        onHistoryCallback(bars, { noData: false });
        
        if (firstDataRequest) {
          this.lastBarsCache.set(symbolInfo.name, {
            ...bars[bars.length - 1]
          });
        }
      } catch (error) {
        console.error('[getBars]: Error', error);
        onErrorCallback(error);
      }
    }
  
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
      // Implement if you need real-time updates
    }
  
    unsubscribeBars(subscriberUID) {
      // Implement if you need to handle unsubscription
    }
  }
  
  // Export an instance of CustomDatafeed instead of the class itself
  export default new CustomDatafeed();
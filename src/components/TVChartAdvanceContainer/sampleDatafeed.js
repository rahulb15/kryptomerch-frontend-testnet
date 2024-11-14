// // sampleDatafeed.js
// const configurationData = {
//     supported_resolutions: ["1", "5", "15", "30", "60", "240", "D"],
//     exchanges: [
//       { value: "", name: "All Marketplaces", desc: "" },
//       { value: "OPENSTORE", name: "OpenStore", desc: "OpenStore NFT Marketplace" }
//     ],
//     symbols_types: [
//       { name: "All types", value: "" },
//       { name: "NFT", value: "nft" }
//     ]
//   };
  
//   const sampleData = {
//     'OPENSTORE:CRYPTOPUNK9998': [
//       { time: '2023-05-01', open: 100, high: 120, low: 95, close: 110, volume: 5 },
//       { time: '2023-05-02', open: 110, high: 130, low: 105, close: 125, volume: 8 },
//     ],
//     'OPENSTORE:BAYC3429': [
//       { time: '2023-05-01', open: 80, high: 90, low: 75, close: 85, volume: 3 },
//       { time: '2023-05-02', open: 85, high: 95, low: 80, close: 90, volume: 4 },
//     ]
//   };
  
//   const sampleDatafeed = {
//     onReady: (callback) => {
//       setTimeout(() => callback(configurationData));
//     },
//     searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
//       const symbols = [
//         { symbol: 'CRYPTOPUNK9998', full_name: 'OPENSTORE:CRYPTOPUNK9998', description: 'CryptoPunk #9998', exchange: 'OPENSTORE', type: 'nft' },
//         { symbol: 'BAYC3429', full_name: 'OPENSTORE:BAYC3429', description: 'Bored Ape Yacht Club #3429', exchange: 'OPENSTORE', type: 'nft' }
//       ];
//       onResultReadyCallback(symbols);
//     },
//     resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
//       const symbolInfo = {
//         name: symbolName,
//         description: symbolName.includes('CRYPTOPUNK') ? 'RahulNft' : 'Kryptomerch',
//         type: 'nft',
//         session: '24x7',
//         timezone: 'Etc/UTC',
//         exchange: 'OPENSTORE',
//         minmov: 1,
//         pricescale: 100,
//         has_intraday: true,
//         supported_resolutions: configurationData.supported_resolutions,
//         volume_precision: 2,
//         data_status: 'streaming',
//       };
//       onSymbolResolvedCallback(symbolInfo);
//     },
//     getBars: (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
//         const { from, to, countBack, firstDataRequest } = periodParams;
//         console.log('getBars called with:', symbolInfo.full_name, 'from:', from, 'to:', to);
    
//         const testBars = [];
//         let currentTime = from;
//         while (currentTime <= to) {
//           testBars.push({
//             time: currentTime * 1000, 
//             open: Math.random() * 100 + 50,
//             high: Math.random() * 100 + 100,
//             low: Math.random() * 50 + 25,
//             close: Math.random() * 100 + 50,
//             volume: Math.floor(Math.random() * 1000)
//           });
//           currentTime += 86400; 
//         }
    
//         console.log('Generated test bars:', testBars);
    
//         onHistoryCallback(testBars, {
//           noData: false,
//         });
//       },
//     subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
//       console.log('Subscribed to', symbolInfo.full_name);
//     },
//     unsubscribeBars: (subscriberUID) => {
//       console.log('Unsubscribed:', subscriberUID);
//     }
//   };
  
//   export default sampleDatafeed;

import axios from 'axios';

const configurationData = {
  supported_resolutions: ["1", "5", "15", "30", "60", "240", "D"],
  exchanges: [
    { value: "", name: "All Marketplaces", desc: "" },
    { value: "OPENSTORE", name: "OpenStore", desc: "OpenStore NFT Marketplace" }
  ],
  symbols_types: [
    { name: "All types", value: "" },
    { name: "NFT", value: "nft" }
  ]
};

const intervalMap = {
  '1': '1m',
  '5': '5m',
  '15': '15m',
  '30': '30m',
  '60': '1h',
  '240': '4h',
  'D': '1d'
};

const sampleDatafeed = {
  onReady: (callback) => {
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    const symbols = [
      { symbol: 'DINO_EGG', full_name: 'OPENSTORE:DINO_EGG', description: 'Dino Egg Collection', exchange: 'OPENSTORE', type: 'nft' }
    ];
    onResultReadyCallback(symbols);
  },
  resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    const symbolInfo = {
      name: symbolName,
      description: 'Dino Egg Collection',
      type: 'nft',
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: 'OPENSTORE',
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: 'streaming',
    };
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log('getBars called with:', symbolInfo.full_name, 'from:', from, 'to:', to);
    try {
      const response = await axios.post('http://localhost:5000/api/v1/activity/candle', {
        collectionId: "66d493c972bd90c63f2e1ca0",
        interval: intervalMap[resolution] || '1d'
      });
      
      const bars = response.data.data.map(item => ({
        time: new Date(item.time).getTime(),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume
      }));

      console.log('Fetched bars:', bars);

      // Filter bars based on the requested time range
      const filteredBars = bars.filter(bar => bar.time >= from * 1000 && bar.time <= to * 1000);

      console.log('Fetched bars:', filteredBars);

      onHistoryCallback(filteredBars, {
        noData: filteredBars.length === 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      onErrorCallback(error);
    }
  },
  subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
    console.log('Subscribed to', symbolInfo.full_name);
  },
  unsubscribeBars: (subscriberUID) => {
    console.log('Unsubscribed:', subscriberUID);
  }
};

export default sampleDatafeed;
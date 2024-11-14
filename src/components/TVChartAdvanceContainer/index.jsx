import { useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import axios from 'axios';

const createDatafeed = (collectionId, collectionName) => {
  const configurationData = {
    supported_resolutions: ["1", "5", "15", "30", "60", "240", "D"],
    exchanges: [
      { value: "", name: "All Marketplaces", desc: "" },
      { value: "KRYPTOMERCH", name: "KRYPTOMERCH", desc: "KRYPTOMERCH NFT Marketplace" }
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

  return {
    onReady: (callback) => {
      setTimeout(() => callback(configurationData));
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      const symbols = [
        { symbol: collectionName, full_name: `KRYPTOMERCH:${collectionName}`, description: `${collectionName} Collection`, exchange: 'KRYPTOMERCH', type: 'nft' }
      ];
      onResultReadyCallback(symbols);
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
      const symbolInfo = {
        name: symbolName,
        description: `${collectionName} Collection`,
        type: 'nft',
        session: '24x7',
        timezone: 'Etc/UTC',
        exchange: 'KRYPTOMERCH',
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
          collectionId: collectionId,
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
};

const TVChartAdvanceContainer = (props) => {
    console.log(props, "props");
    const chartContainerRef = useRef(null);

    useEffect(() => {
        let tvWidget = null;

        const loadTradingViewWidget = async () => {
            const TradingView = await import('../../../public/static/charting_library');
            
            const widgetOptions = {
                symbol: props.symbol || `KRYPTOMERCH:${props.collectionName}`,
                datafeed: createDatafeed(props.collectionId, props.collectionName),
                interval: props.interval || 'D',
                container: chartContainerRef.current,
                library_path: props.library_path || '/static/charting_library/',
                locale: props.locale || 'en',
                disabled_features: ["use_localstorage_for_settings"],
                enabled_features: ["study_templates"],
                charts_storage_url: props.charts_storage_url,
                charts_storage_api_version: props.charts_storage_api_version,
                client_id: props.client_id,
                user_id: props.user_id,
                fullscreen: props.fullscreen,
                autosize: props.autosize,
                theme: 'Dark',
            };

            tvWidget = new TradingView.widget(widgetOptions);

            tvWidget.onChartReady(() => {
                tvWidget.headerReady().then(() => {
                    const button = tvWidget.createButton();
                    button.setAttribute("title", "Click to show NFT info");
                    button.classList.add("apply-common-tooltip");
                    button.addEventListener("click", () =>
                        tvWidget.showNoticeDialog({
                            title: "NFT Information",
                            body: `This chart shows the trading activity of ${props.collectionName}.`,
                            callback: () => {
                                console.log("NFT info shown!");
                            },
                        })
                    );

                    button.innerHTML = "NFT Info";
                });
            });
        };

        if (typeof window !== 'undefined') {
            loadTradingViewWidget();
        }

        return () => {
            if (tvWidget !== null) {
                tvWidget.remove();
            }
        };
    }, [props.symbol, props.interval, props.collectionId, props.collectionName]);

    return (
        <div ref={chartContainerRef} className="TVChartContainer" style={{ height: '600px' }} />
    );
};

export default dynamic(() => Promise.resolve(TVChartAdvanceContainer), { ssr: false });
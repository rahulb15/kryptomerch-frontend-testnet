// pages/api/mapping.js
export default function handler(req, res) {

    console.log('[API Mapping]: Method call');
    // In a real-world scenario, you would fetch this data from your database
    const symbolMapping = {
      symbols: [
        {
          f: ["EURUSD"],
          s: "FX_IDC:EURUSD"
        },
        {
          f: ["AAPL"],
          s: "NASDAQ:AAPL"
        },
        // Add more symbol mappings as needed
      ],
      fields: ["brokerSymbol"]
    };
  
    res.status(200).json(symbolMapping);
  }
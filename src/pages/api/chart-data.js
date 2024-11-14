// // pages/api/chart-data.js
// export default function handler(req, res) {
//     // Simulate a dataset (normally you'd fetch this from your database)
//     const data = [
//         { time: "2024-09-01", open: 150, high: 155, low: 149, close: 153 },
//         { time: "2024-09-02", open: 153, high: 158, low: 152, close: 157 },
//         { time: "2024-09-03", open: 157, high: 160, low: 155, close: 159 },
//         // Add more data points here
//         { time: "2024-09-04", open: 159, high: 162, low: 157, close: 161 },
//         { time: "2024-09-05", open: 161, high: 165, low: 160, close: 163 },
//         { time: "2024-09-06", open: 163, high: 168, low: 162, close: 167 },
//         { time: "2024-09-07", open: 167, high: 170, low: 165, close: 169 },
//         { time: "2024-09-08", open: 169, high: 172, low: 167, close: 171 },
//         { time: "2024-09-09", open: 171, high: 175, low: 170, close: 173 },
//         { time: "2024-09-10", open: 173, high: 178, low: 172, close: 177 },
//         { time: "2024-09-11", open: 177, high: 180, low: 175, close: 179 },
//         { time: "2024-09-12", open: 179, high: 182, low: 177, close: 181 },
//     ];

//     // Return data in TradingView-compatible format
//     res.status(200).json({
//         s: "ok", // Response status (ok or error)
//         t: data.map((d) => new Date(d.time).getTime() / 1000), // Time in UNIX format
//         o: data.map((d) => d.open), // Open prices
//         h: data.map((d) => d.high), // High prices
//         l: data.map((d) => d.low), // Low prices
//         c: data.map((d) => d.close), // Close prices
//     });
// }




// pages/api/chartdata.js
export default function handler(req, res) {
    const { symbol, from, to, resolution } = req.query;
    
    // Convert timestamps to Date objects
    const fromDate = new Date(from * 1000);
    const toDate = new Date(to * 1000);
  
    // Simulate fetching data from a database
    const data = generateData(symbol, fromDate, toDate, resolution);
  
    // Return data in TradingView-compatible format
    res.status(200).json({
      s: "ok",
      t: data.map(d => Math.floor(d.time.getTime() / 1000)),
      o: data.map(d => d.open),
      h: data.map(d => d.high),
      l: data.map(d => d.low),
      c: data.map(d => d.close),
      v: data.map(d => d.volume)
    });
  }
  
  function generateData(symbol, fromDate, toDate, resolution) {
    // In a real-world scenario, you would fetch this data from your database based on the symbol
    const data = [];
    let currentDate = new Date(fromDate);
    
    while (currentDate <= toDate) {
      data.push({
        time: new Date(currentDate),
        open: Math.random() * 100 + 100,
        high: Math.random() * 100 + 150,
        low: Math.random() * 100 + 50,
        close: Math.random() * 100 + 100,
        volume: Math.random() * 1000000
      });
      
      // Increment date based on resolution
      if (resolution === 'D') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (resolution === 'W') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (resolution === 'M') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }
    
    return data;
  }
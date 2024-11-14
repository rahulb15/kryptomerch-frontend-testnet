// Sample data (you would replace this with your actual data source)
const sampleData = [
  { time: '2023-01-01', open: 100, high: 105, low: 98, close: 103 },
  { time: '2023-01-02', open: 103, high: 107, low: 101, close: 105 },
  // Add more data points as needed
];

export default function handler(req, res) {
  const { from, to, countBack, resolution } = req.query;
  
  // Here you would typically query your database or data source
  // For this example, we'll just return the sample data
  res.status(200).json({
    s: "ok",
    t: sampleData.map(d => new Date(d.time).getTime() / 1000),
    o: sampleData.map(d => d.open),
    h: sampleData.map(d => d.high),
    l: sampleData.map(d => d.low),
    c: sampleData.map(d => d.close),
  });
}

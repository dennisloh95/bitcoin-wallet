const chartOptions = [
  {
    id: 1,
    label: "1 hr",
  },
  {
    id: 2,
    label: "3 Days",
  },
  {
    id: 3,
    label: "1 Week",
  },
  {
    id: 4,
    label: "1 Month",
  },
  {
    id: 5,
    label: "3 Months",
  },
];

const api = {
  currentPrice: "https://api.coindesk.com/v1/bpi/currentprice.json",
  closePrice: "https://api.coindesk.com/v1/bpi/historical/close.json",
};

const dummyData = { chartOptions, api };

export default dummyData;

export const calculateTotalProfit = ({ exchangeRate, assets }) => {
  const totalProfitUSD = assets.reduce((total, asset) => {
    const profit =
      asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy;
    return total + profit;
  }, 0);

  return {
    usd: totalProfitUSD,
    rub: exchangeRate ? totalProfitUSD * exchangeRate : null,
  };
};

export const calculatedAmountBuy = (totalBuy, priceBuy) =>
  (totalBuy / priceBuy).toFixed(10);
export const calculatedAmountSell = (totalSell, priceSell) =>
  (totalSell / priceSell).toFixed(10);

export const calculatePurchaseSum = (asset) => asset.priceBuy * asset.amountBuy;

export const calculateSaleSum = (asset) => asset.priceSell * asset.amountSell;

export const calculateProfitLoss = (asset) => {
  const profitLoss = calculateSaleSum(asset) - calculatePurchaseSum(asset);
  return parseFloat(profitLoss.toFixed(2));
};

export const calculatePercentChange = (asset) => {
  const percentChange =
    (calculateProfitLoss(asset) / calculatePurchaseSum(asset)) * 100;
  return parseFloat(percentChange.toFixed(2));
};

export const calculateROI = (asset) => {
  const roi = (calculateProfitLoss(asset) / calculatePurchaseSum(asset)) * 100;
  return parseFloat(roi.toFixed(2));
};

export const calculateHoldingTime = (asset) => {
  return Math.ceil(
    (new Date(asset.saleDate) - new Date(asset.purchaseDate)) /
      (1000 * 60 * 60 * 24)
  );
};

export const calculateMetrics = (assets) => {
  if (!assets || assets.length === 0) return [];

  const groupedAssets = assets.reduce((acc, asset) => {
    const profit =
      asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy;

    if (acc[asset.coin.name]) {
      // Увеличиваем существующие значения
      acc[asset.coin.name].totalProfit += profit;
      acc[asset.coin.name].totalBuySum += asset.priceBuy * asset.amountBuy;
      acc[asset.coin.name].totalSellSum += asset.priceSell * asset.amountSell;
      acc[asset.coin.name].totalBuyAmount += asset.amountBuy;
      acc[asset.coin.name].totalSellAmount += asset.amountSell;
    } else {
      // Создаём новую запись для актива
      acc[asset.coin.name] = {
        coin: asset.coin,
        totalProfit: profit,
        totalBuySum: asset.priceBuy * asset.amountBuy,
        totalSellSum: asset.priceSell * asset.amountSell,
        totalBuyAmount: asset.amountBuy,
        totalSellAmount: asset.amountSell,
        sector: asset.sector,
      };
    }
    return acc;
  }, {});

  // Добавляем расчёты метрик для каждой группы
  return Object.values(groupedAssets).map((asset) => {
    const averageBuyPrice =
      asset.totalBuyAmount > 0 ? asset.totalBuySum / asset.totalBuyAmount : 0;
    const averageSellPrice =
      asset.totalSellAmount > 0
        ? asset.totalSellSum / asset.totalSellAmount
        : 0;
    const roi =
      asset.totalBuySum > 0 ? (asset.totalProfit / asset.totalBuySum) * 100 : 0;

    const totalPnLPercent =
      asset.totalBuySum > 0 ? (asset.totalProfit / asset.totalBuySum) * 100 : 0;

    return {
      ...asset,
      averageBuyPrice,
      averageSellPrice,
      roi,
      totalPnLPercent,
    };
  });
};

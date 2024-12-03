async function fetchData(API_URL) {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP! статус: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при запросе к API:', error);
    throw error;
  }
}

// Функция для получения данных о криптовалютах
export async function fetchCryptoData() {
  const API_URL =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
  return fetchData(API_URL);
}

// Функция для получения данных о рыночной капитализации
export async function fetchMarketCapData() {
  const API_URL = 'https://api.coingecko.com/api/v3/global';
  return fetchData(API_URL);
}

export async function getExchangeRate() {
  try {
    const response = await fetch('https://www.cbr.ru/scripts/XML_daily.asp');
    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const usdRate = xml
      .querySelector('Valute[ID="R01235"] Value')
      .textContent.replace(',', '.');
    return parseFloat(usdRate);
  } catch (error) {
    throw new Error('Ошибка получения курса валют');
  }
}

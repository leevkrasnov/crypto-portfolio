// Универсальная функция для запросов через AllOrigins
async function fetchData(API_URL) {
  const PROXY_URL = 'https://api.allorigins.win/get?url=';
  const ENCODED_URL = encodeURIComponent(API_URL);

  try {
    const response = await fetch(`${PROXY_URL}${ENCODED_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
    }

    const data = await response.json();

    // Проверяем, возвращается ли XML
    if (data.contents.startsWith('<?xml')) {
      return data.contents;
    }

    // Пытаемся обработать как JSON
    return JSON.parse(data.contents);
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

// Функция для получения курса валют
export async function getExchangeRate() {
  const API_URL = 'https://www.cbr.ru/scripts/XML_daily.asp';

  try {
    const data = await fetchData(API_URL); // XML возвращается как строка
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');

    const usdRate = xml
      .querySelector('Valute[ID="R01235"] Value')
      .textContent.replace(',', '.');

    return parseFloat(usdRate);
  } catch (error) {
    console.error('Ошибка при запросе к курсу валют:', error);
    throw error;
  }
}

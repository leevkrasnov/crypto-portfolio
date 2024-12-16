// Универсальная функция для запросов через прокси
async function fetchData(API_URL) {
  const PROXY_URL =
    'https://proxy-crypto-portfolio-production.up.railway.app/api/proxy';

  try {
    const response = await fetch(
      `${PROXY_URL}?url=${encodeURIComponent(API_URL)}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
    }

    // Парсим данные как JSON
    return await response.json();
  } catch (error) {
    console.error('Ошибка при запросе к API через прокси:', error);
    throw error;
  }
}

// Функция для получения данных о криптовалютах
export async function fetchCryptoData() {
  const API_URL =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
  return fetchData(API_URL);
}

// Функция для получения курса валют
export async function getExchangeRate() {
  const API_URL = 'https://open.er-api.com/v6/latest/USD';

  try {
    const data = await fetchData(API_URL);

    // Получаем курс USD к RUB
    const usdToRubRate = data.rates.RUB;

    return parseFloat(usdToRubRate.toFixed(2));
  } catch (error) {
    console.error('Ошибка при запросе к курсу валют:', error);
    throw error;
  }
}

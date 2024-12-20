import { useRef } from 'react';
import InteractiveButton from '../common/InteractiveButton';
import CoinCards from '../cards/CoinCards';
import ROIGraph from '../charts/ROIGraph';
import TableAssets from '../tables/TableAssets';
import { UpOutlined } from '@ant-design/icons';
import CardProfit from '../cards/CardProfit';

export default function AppContent({ headerRef }) {
  const tableSectionRef = useRef(null);

  // Функция для плавного скролла к указанному разделу
  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-col min-h-[800px] md:min-h-[1200px] px-8 lg:px-20 lg:py-10 bg-[#2C372E]">
        {/* Карточки с общей прибылью и информацией о монетах */}
        <section className="flex flex-col gap-20 sm:flex-row sm:justify-between">
          <div>
            <CardProfit />
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
            <CoinCards />
          </div>
        </section>

        {/* Заголовок для графика ROI */}
        <section className="hidden md:text-6xl md:font-bold md:text-gray-50 md:flex justify-end mt-32 mb-16">
          Карта рентабельности
        </section>

        {/* График ROI */}
        <section className="hidden md:flex justify-between items-end mb-20">
          <div className="bg-gray-50">
            <ROIGraph />
          </div>
        </section>
      </div>

      {/* Конец контента: таблица сделок */}
      <div
        className="flex flex-col bg-white px-8 lg:px-20"
        ref={tableSectionRef}
      >
        {/* Заголовок для таблицы */}
        <section className="text-4xl lg:text-6xl font-bold text-gray-900 flex justify-end mt-20 mb-16">
          Хроника сделок
        </section>

        {/* Таблица сделок */}
        <section className="flex flex-col">
          <TableAssets />

          {/* Кнопка для возврата к началу */}
          <div className="mb-40 mt-16 flex justify-end">
            <InteractiveButton
              onClick={() => scrollTo(headerRef)}
              arrowDirection={<UpOutlined />}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

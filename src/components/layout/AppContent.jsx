import { useRef } from 'react';
import InteractiveButton from '../InteractiveButton';
import CoinCards from '../CoinCards';
import Marque from '../Marque';
import ROIGraph from '../ROIGraph';
import TableAssets from '../TableAssets';
import { UpOutlined } from '@ant-design/icons';
import CardProfit from '../CardProfit';

export default function AppContent({ headerRef }) {
  const tableSectionRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <main className="app-content">
      <div className="app-mid-content">
        <section className="flex justify-between">
          <div>
            <CardProfit />
          </div>
          <div className="flex">
            <CoinCards />
          </div>
        </section>
        <section className="text-6xl font-bold text-gray-50 flex justify-end mt-32 mb-16">
          Карта рентабельности
        </section>
        <section className="flex justify-between items-end mb-20">
          <div className="bg-gray-50">
            <ROIGraph />
          </div>
          {/* <InteractiveButton onClick={() => scrollTo(tableSectionRef)} /> */}
        </section>
      </div>
      <div className="app-end-content" ref={tableSectionRef}>
        <section className="text-6xl font-bold text-gray-900 flex justify-end mt-20 mb-16">
          Хроника сделок
        </section>
        <section className="flex flex-col">
          <TableAssets />
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

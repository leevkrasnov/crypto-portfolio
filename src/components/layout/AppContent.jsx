import InteractiveButton from '../InteractiveButton';
import CoinCards from '../CoinCards';
import Marque from '../Marque';
import ROIGraph from '../ROIGraph';

export default function AppContent() {
  return (
    <main className="app-content">
      <div className="app-top-content">
        <Marque />
      </div>

      <div className="app-mid-content">
        <section className="flex justify-end">
          <CoinCards />
        </section>
        <section className="flex justify-between items-end my-20">
          <div className="bg-gray-300">
            <ROIGraph />
          </div>
          <InteractiveButton />
        </section>
      </div>
    </main>
  );
}

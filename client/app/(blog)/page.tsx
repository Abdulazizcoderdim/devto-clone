import FirstPanel from './_components/first-panel';
import SecondPanel from './_components/second-panel';
import ThreePanel from './_components/three-panel';

export default function Home() {
  return (
    <div className="pt-16 min-h-screen container mx-auto px-4">
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 max-lg:grid-cols-[1fr_2fr] max-md:grid-cols-[2fr]">
        <div className="max-md:hidden w-full max-w-[240px] overflow-hidden break-words">
          <FirstPanel />
        </div>

        {/* SecondPanel - har doim ko‘rinadi */}
        <div className="bg-yellow-100">
          <SecondPanel />
        </div>

        {/* ThreePanel - md da yashiriladi */}
        <div className="bg-green-100 max-lg:hidden">
          <ThreePanel />
        </div>
      </div>
    </div>
  );
}

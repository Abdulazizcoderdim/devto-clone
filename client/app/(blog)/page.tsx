import FirstPanel from './_components/first-panel';
import SecondPanel from './_components/blogs';
import ThreePanel from './_components/three-panel';

export default function Home() {
  return (
    <div className="pt-16 min-h-screen container mx-auto px-4">
      <div className="flex gap-4 justify-between">
        <div className="max-md:hidden w-full max-w-[240px] break-words">
          <FirstPanel />
        </div>

        {/* SecondPanel - har doim ko‘rinadi */}
        <div className="bg-yellow-100 w-full">
          <SecondPanel />
        </div>

        {/* ThreePanel - md da yashiriladi */}
        <div className="bg-green-100 max-lg:hidden w-full max-w-[340px] break-words">
          <ThreePanel />
        </div>
      </div>
    </div>
  );
}

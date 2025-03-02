import Link from 'next/link';

const fakeData = [
  'javascript',
  'react',
  'nextjs',
  'nodejs',
  'typescript',
  'python',
  'java',
  'c++',
  'c#',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'go',
  'rust',
];

const PopularTags = () => {
  return (
    <div className="flex flex-col">
      <p className="p-2 text-black font-medium">Popular Tags</p>

      <div className="h-80 overflow-auto">
        {fakeData.map((tag, i) => (
          <Link
            key={i}
            href={`/${tag}`}
            className="flex p-2 hover:underline items-center gap-2 text-gray-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;

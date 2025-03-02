import { Home } from 'lucide-react';
import Link from 'next/link';

const fakeTopics = [
  {
    id: 1,
    name: 'Home',
    link: '/',
    icon: Home,
  },
  {
    id: 2,
    name: 'React',
    link: '#react',
    icon: Home,
  },
  {
    id: 3,
    name: 'Node.js',
    link: '#node',
    icon: Home,
  },
  {
    id: 4,
    name: 'TypeScript',
    link: '#typescript',
    icon: Home,
  },
];

const fakeOthers = [
  {
    id: 1,
    name: 'Code Of Conduct',
    link: '#',
    icon: '🍤',
  },
  {
    id: 2,
    name: 'Help',
    link: '/help',
    icon: '😀',
  },
];

const UserSelectedTopics = () => {
  return (
    <div className="flex flex-col">
      {fakeTopics.map(topic => (
        <Link
          href={topic.link}
          className="flex p-2 items-center gap-2 text-gray-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
          key={topic.id}
        >
          <topic.icon className="w-4 h-4" />
          {topic.name}
        </Link>
      ))}

      <div className="mt-3 flex flex-col">
        <p className="p-2 font-medium text-black">Other</p>
        {fakeOthers.map(topic => (
          <Link
            href={topic.link}
            className="flex p-2 items-center gap-2 text-gray-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
            key={topic.id}
          >
            <span className="">{topic.icon}</span>
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserSelectedTopics;

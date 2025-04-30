import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { Card } from "@/components/ui/card";
import PopularTags from "./popular-tags";
import { useAuthStore } from "@/hooks/auth-store";
import { Link } from "react-router-dom";

const pagesHome = [
//   {
//     title: "Community",
//     path: "/community",
//     icon: (
//       <svg
//         version="1.0"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 166.000000 102.000000"
//         preserveAspectRatio="xMidYMid meet"
//         fill="#3b49df"
//         width="24"
//         height="24"
//       >
//         <g
//           transform="translate(0.000000,102.000000) scale(0.100000,-0.100000)"
//           fill="#3b49df"
//           stroke="none"
//         >
//           <path
//             d="M305 953 c-42 -22 -64 -43 -83 -78 -14 -25 -18 -76 -22 -305 -7 -313
// -12 -336 -96 -450 -24 -33 -44 -62 -44 -65 0 -3 318 -4 708 -3 l707 3 47 27
// c32 20 52 41 67 72 21 43 22 54 19 374 l-3 330 -31 39 c-61 76 -30 73 -669 73
// -500 -1 -574 -3 -600 -17z m405 -278 l0 -84 83 -3 82 -3 0 -75 0 -75 -82 -3
// -83 -3 0 -84 0 -85 -75 0 -75 0 0 85 0 85 -75 0 c-41 0 -75 3 -75 8 0 4 8 39
// 18 77 l18 70 57 3 57 3 0 84 0 85 75 0 75 0 0 -85z m578 -2 l3 -82 82 -3 82
// -3 0 -75 0 -75 -82 -3 -82 -3 -3 -82 -3 -82 -75 0 -75 0 -3 83 -3 82 -79 0
// -80 0 0 80 0 80 80 0 80 0 0 78 c0 43 3 82 7 86 4 4 39 5 78 4 l70 -3 3 -82z"
//           ></path>
//         </g>
//       </svg>
//     ),
//   },
  {
    title: "Contact",
    path: "/contact",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 44 44"
        width="24"
        height="24"
      >
        <g className="nc-icon-wrapper">
          <path
            fill="#FFD983"
            d="M33 15.06c0 6.439-5 7.439-5 13.44 0 3.098-3.123 3.359-5.5 3.359-2.053 0-6.586-.779-6.586-3.361C15.914 22.5 11 21.5 11 15.06c0-6.031 5.285-10.92 11.083-10.92C27.883 4.14 33 9.029 33 15.06z"
          ></path>
          <path
            fill="#CCD6DD"
            d="M26.167 36.5c0 .828-2.234 2.5-4.167 2.5-1.933 0-4.167-1.672-4.167-2.5 0-.828 2.233-.5 4.167-.5 1.933 0 4.167-.328 4.167.5z"
          ></path>
          <path
            fill="#FFCC4D"
            d="M26.707 14.293a.999.999 0 00-1.414 0L22 17.586l-3.293-3.293a1 1 0 10-1.414 1.414L21 19.414V30a1 1 0 102 0V19.414l3.707-3.707a.999.999 0 000-1.414z"
          ></path>
          <path
            fill="#99AAB5"
            d="M28 35a2 2 0 01-2 2h-8a2 2 0 01-2-2v-6h12v6z"
          ></path>
          <path
            fill="#CCD6DD"
            d="M15.999 36a1 1 0 01-.163-1.986l12-2a.994.994 0 011.15.822.999.999 0 01-.822 1.15l-12 2a.927.927 0 01-.165.014zm0-4a1 1 0 01-.163-1.986l12-2a.995.995 0 011.15.822.999.999 0 01-.822 1.15l-12 2a.927.927 0 01-.165.014z"
          ></path>
        </g>
      </svg>
    ),
  },
  {
    title: "Contribute",
    path: "/contribute",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path
          fill="#FFAC33"
          d="M34.347 16.893l-8.899-3.294-3.323-10.891c-.128-.42-.517-.708-.956-.708-.439 0-.828.288-.956.708l-3.322 10.891-8.9 3.294c-.393.146-.653.519-.653.938 0 .418.26.793.653.938l8.895 3.293 3.324 11.223c.126.424.516.715.959.715.442 0 .833-.291.959-.716l3.324-11.223 8.896-3.293c.391-.144.652-.518.652-.937 0-.418-.261-.792-.653-.938z"
        ></path>
        <path
          fill="#FFCC4D"
          d="M14.347 27.894l-2.314-.856-.9-3.3c-.118-.436-.513-.738-.964-.738-.451 0-.846.302-.965.737l-.9 3.3-2.313.856c-.393.145-.653.52-.653.938 0 .418.26.793.653.938l2.301.853.907 3.622c.112.444.511.756.97.756.459 0 .858-.312.97-.757l.907-3.622 2.301-.853c.393-.144.653-.519.653-.937 0-.418-.26-.793-.653-.937zM10.009 6.231l-2.364-.875-.876-2.365c-.145-.393-.519-.653-.938-.653-.418 0-.792.26-.938.653l-.875 2.365-2.365.875c-.393.146-.653.52-.653.938 0 .418.26.793.653.938l2.365.875.875 2.365c.146.393.52.653.938.653.418 0 .792-.26.938-.653l.875-2.365 2.365-.875c.393-.146.653-.52.653-.938 0-.418-.26-.792-.653-.938z"
        ></path>
      </svg>
    ),
  },
];

const FirstPanel = () => {
  const { isAuth } = useAuthStore();

  return (
    <div className="">
      {/* ro'yhatdan o'tmagan bo'lsa ko'rinadi */}
      {!isAuth ? (
        <Card className="border mb-5 space-y-2 border-gray-200 rounded-md bg-white p-2 break-words">
          <h2 className="font-bold text-black text-xl">
            DEV Community is a community of 2,877,223 amazing developers
          </h2>

          <p className="text-gray-600 font-normal text-sm">
            We&apos;re a place where coders share, stay up-to-date and grow
            their careers.
          </p>
        </Card>
      ) : (
        <div className="">
          {pagesHome.map((item, i) => (
            <Link
              key={i}
              to={`${item.path}`}
              className="flex p-2 hover:underline items-center gap-2 text-gray-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <span className="w-5 h-5">{item.icon} </span>
              {item.title}
            </Link>
          ))}
        </div>
      )}

      {/* user selected topics  */}
      {/* <UserSelectedTopics /> */}

      {/* socials */}
      {/* <div className="flex items-center my-4 gap-2">
        <Link
          to={"#"}
          className="p-2 hover:bg-blue-200 hover:text-blue-700 rounded-md"
        >
          <Twitter size={25} />
        </Link>
        <Link
          to={"#"}
          className="p-2 hover:bg-blue-200 hover:text-blue-700 rounded-md"
        >
          <TableCellsMerge size={25} />
        </Link>
        <Link
          to={"#"}
          className="p-2 hover:bg-blue-200 hover:text-blue-700 rounded-md"
        >
          <Instagram size={25} />
        </Link>
        <Link
          to={"#"}
          className="p-2 hover:bg-blue-200 hover:text-blue-700 rounded-md"
        >
          <Facebook size={25} />
        </Link>
      </div> */}

      {/* popular tags */}
      <PopularTags />

      {/* dev comunity */}
      <div className="flex flex-col gap-3 mt-5">
        <div className="border bg-white border-gray-300 rounded-md px-3 py-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">DEV Community</span>
            <Button size={"icon"} variant={"outline"}>
              <Ellipsis />
            </Button>
          </div>

          <img
            width={350} // Rasm o'lchamini belgilash kerak
            height={200} // Mos keluvchi balandlik qo'shing
            alt="image"
            className="w-full h-full mt-3"
            src="/com.png"
          />
        </div>

        <p className="text-sm text-gray-500">
          <span className="font-medium text-blue-500">DEV Community</span> A
          constructive and inclusive social network for software developers.
          With you every step of your journey.
        </p>
        <p className="text-sm text-gray-500">
          Built on <span className="text-blue-500">Forem</span> — the{" "}
          <span className="text-blue-500">open source</span> software that
          powers <span className="text-blue-500">DEV</span> and other inclusive
          communities.
        </p>
        <p className="text-sm text-gray-500">
          Made with love and Ruby on Rails. DEV Community © 2016 -{" "}
          {new Date().toDateString()}.
        </p>
      </div>
    </div>
  );
};

export default FirstPanel;

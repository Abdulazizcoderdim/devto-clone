import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  Facebook,
  Instagram,
  TableCellsMerge,
  Twitter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UserSelectedTopics from "./user-selected-topic";
import PopularTags from "./popular-tags";

const FirstPanel = () => {
  return (
    <div className="">
      {/* ro'yhatdan o'tmagan bo'lsa ko'rinadi */}
      <Card className="border mb-5 space-y-2 border-gray-200 rounded-md bg-white p-2 break-words">
        <h2 className="font-bold text-black text-xl">
          DEV Community is a community of 2,877,223 amazing developers
        </h2>

        <p className="text-gray-600 font-normal text-sm">
          We&apos;re a place where coders share, stay up-to-date and grow their
          careers.
        </p>
      </Card>

      {/* user selected topics  */}
      <UserSelectedTopics />

      {/* socials */}
      <div className="flex items-center my-4 gap-2">
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
      </div>

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

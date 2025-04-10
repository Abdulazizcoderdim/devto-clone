import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThumbsUp, MessageCircleMore, Save, Ellipsis } from "lucide-react";
import { useState } from "react";

// Emojilarni tanlash uchun komponent
const ReactionPopover = ({ onSelect }) => {
  const [selectedReaction, setSelectedReaction] = useState("");

  // Reactionni tanlash
  const handleSelect = (reaction) => {
    setSelectedReaction(reaction);
    onSelect(reaction); // Reactionni parent komponentga jo'natish
  };

  return (
    <PopoverContent className="p-2">
      <div className="grid grid-cols-3 gap-2">
        {["👍", "❤️", "😂", "😢", "😡"].map((emoji) => (
          <div
            key={emoji}
            onClick={() => handleSelect(emoji)}
            className={`p-2 cursor-pointer hover:bg-gray-200 rounded-full text-center ${
              selectedReaction === emoji ? "bg-gray-200" : ""
            }`}
          >
            <span className="text-xl">{emoji}</span>
          </div>
        ))}
      </div>
    </PopoverContent>
  );
};

const LikesPost = () => {
  const [open, setOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  // Reaction tanlanganini ko'rsatish
  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
    setOpen(false); // Popoverni yopish
    // Bu yerda reactionni serverga jo'natish kodini qo'shishingiz mumkin
    console.log("Tanlangan reaction:", reaction);
  };

  return (
    <div className="md:pt-16 max-md:px-8">
      <div className="flex md:flex-col max-md:justify-between items-center gap-5">
        <div className="flex md:flex-col items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <ThumbsUp
                size={24}
                className="hover:text-red-500 cursor-pointer transition-colors duration-200"
              />
            </PopoverTrigger>

            {/* Reaction tanlash popover */}
            {open && <ReactionPopover onSelect={handleReactionSelect} />}
          </Popover>
        </div>

        {/* Commentlar */}
        <div className="flex md:flex-col items-center gap-2">
          <MessageCircleMore
            size={24}
            className="hover:text-yellow-500 cursor-pointer transition-colors duration-200"
          />
          <span className="text-xs text-muted-foreground select-none">2</span>
        </div>

        {/* Save */}
        <div className="flex md:flex-col items-center gap-2">
          <Save
            size={24}
            className="hover:text-blue-500 cursor-pointer transition-colors duration-200"
          />
          <span className="text-xs text-muted-foreground select-none">2</span>
        </div>

        {/* More options */}
        <Button variant="ghost" size={"icon"} className="rounded-full p-0">
          <Ellipsis size={24} />
        </Button>
      </div>

      {/* Tanlangan reactionni ko'rsatish */}
      {selectedReaction && (
        <div className="mt-4 text-center">
          <span className="font-bold">Tanlangan reaction:</span>{" "}
          <span className="text-xl">{selectedReaction}</span>
        </div>
      )}
    </div>
  );
};

export default LikesPost;

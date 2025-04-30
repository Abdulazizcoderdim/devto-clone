import { Loader2, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useAuthStore } from "@/hooks/auth-store";
import { Button } from "../ui/button";
import {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import api from "@/http/axios";
import { Post } from "@/types";
import { Input } from "../ui/input";
import { useOnClickOutside } from "@/hooks/use-onclick-outside";
import { Badge } from "../ui/badge";

const Header = () => {
  const { isAuth, logout, user, loading } = useAuthStore();
  const navigate = useNavigate();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    posts: Post[];
    tags: string[];
  }>({ posts: [], tags: [] });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
    toast.success("Successfully logged out!");
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
  };

  const dropdownRef = useOnClickOutside(closeDropdown);

  const fetchSearchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ posts: [], tags: [] });
      return;
    }

    try {
      setLoadingSearch(true);
      const response = await api.get("/search/suggestions", {
        params: { q: query },
      });
      setSearchResults(response.data || { posts: [], tags: [] });
    } catch (error) {
      console.error("Search suggestion error:", error);
      setSearchResults({ posts: [], tags: [] });
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setIsDropdownOpen(true);
    setSelectedIndex(-1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSearchSuggestions(value);
    }, 300);
  };

  const handleResultClick = (slug: string, author: string) => {
    setIsDropdownOpen(false);
    navigate(`/${author}/${slug}`);
    setSearch("");
  };

  const handleTagClick = (tag: string) => {
    setIsDropdownOpen(false);
    navigate(`/t/${tag}`);
    setSearch("");
  };

  const handleViewAll = () => {
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setIsDropdownOpen(false);
    setSearch("");
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults({ posts: [], tags: [] });
    setIsDropdownOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const totalItems = [...searchResults.posts, ...searchResults.tags].length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0) {
        if (selectedIndex < searchResults.posts.length) {
          // Navigate to post
          const post = searchResults.posts[selectedIndex];
          handleResultClick(post.slug, post.author.name);
        } else {
          // Navigate to tag
          const tagIndex = selectedIndex - searchResults.posts.length;
          const tag = searchResults.tags[tagIndex];
          handleTagClick(tag);
        }
      } else if (search.trim()) {
        // If nothing selected but search term exists, view all results
        handleViewAll();
      }
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      handleViewAll();
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const totalResults = searchResults.posts.length + searchResults.tags.length;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="DEV Community" className="h-8 w-12" />
            </Link>

            <div className="flex-1 max-w-xl">
              <div
                className="relative"
                ref={dropdownRef as RefObject<HTMLDivElement>}
              >
                <form onSubmit={handleFormSubmit}>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      ref={inputRef}
                      type="text"
                      value={search}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                      onFocus={() => search.trim() && setIsDropdownOpen(true)}
                      placeholder="Search posts, tags, authors..."
                      className="pl-8 pr-8 border-0 text-sm focus-visible:ring-1 focus-visible:ring-gray-300"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>
                </form>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-[350px] mt-1 border rounded-md bg-white shadow-lg z-10">
                    <div className="p-2 border-b bg-gray-50 flex justify-between items-center">
                      <h3 className="text-sm font-medium">Search Results</h3>
                      {loadingSearch && (
                        <Loader2 className="h-3 w-3 animate-spin text-gray-500" />
                      )}
                    </div>
                    <div className="max-h-[350px] overflow-y-auto">
                      {!loadingSearch && totalResults === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No results found
                        </div>
                      ) : (
                        <>
                          {/* Posts results section */}
                          {searchResults.posts.length > 0 && (
                            <div className="py-1">
                              <div className="px-3 py-1 text-xs font-semibold text-gray-500">
                                Posts
                              </div>
                              <ul>
                                {searchResults.posts.map((item, i) => (
                                  <li
                                    key={`post-${i}`}
                                    className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                                      i === selectedIndex ? "bg-gray-100" : ""
                                    }`}
                                    onClick={() =>
                                      handleResultClick(
                                        item.slug,
                                        item.author.name
                                      )
                                    }
                                  >
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium line-clamp-1">
                                        {item.title}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        by {item.author.name}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tags results section */}
                          {searchResults.tags.length > 0 && (
                            <div className="py-1">
                              <div className="px-3 py-1 text-xs font-semibold text-gray-500">
                                Tags
                              </div>
                              <ul className="p-2 flex flex-wrap gap-2">
                                {searchResults.tags.map((tag, i) => (
                                  <Badge
                                    key={`tag-${i}`}
                                    className={`cursor-pointer hover:bg-gray-200 ${
                                      i + searchResults.posts.length ===
                                      selectedIndex
                                        ? "bg-gray-200"
                                        : "bg-gray-100"
                                    }`}
                                    variant="secondary"
                                    onClick={() => handleTagClick(tag)}
                                  >
                                    #{tag}
                                  </Badge>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* View all results button */}
                          {/* {search.trim() && (
                            <div className="p-2 border-t text-center">
                              <button
                                onClick={handleViewAll}
                                className="w-full py-1.5 text-sm font-medium text-blue-600 hover:bg-gray-50 rounded"
                              >
                                View all results for "{search}"
                              </button>
                            </div>
                          )} */}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isAuth && !loading ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="default">
                <Link to="/sign-in">Log in</Link>
              </Button>
              <Button asChild variant="default">
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="default">
                <Link to="/new">Create Post</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                      alt={user?.name || ""}
                    />
                    <AvatarFallback className="bg-gray-200 text-black">
                      {user?.name?.charAt(0).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/${user?.name}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <span className="text-red-500">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// "use client";
// import React, {
//   SyntheticEvent,
//   useEffect,
//   useState,
//   useCallback,
//   useRef,
// } from "react";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { Search, ShoppingCart, User, X, LogOut } from "lucide-react";
// import { User as UserType, Category } from "@/types";
// import SearchResults from "../SearchResults";
// import { fetchCategories } from "@/lib/firebase/firebaseQueries";
// import Swal from "sweetalert2";

// interface NavbarProps {
//   cartItemsCount?: number;
//   allCategories?: Category[];
//   user?: UserType | null;
//   onLoginClick?: () => void;
//   onLogout?: () => void;
// }

// // Your logout function
// export function logoutUser(): void {
//   localStorage.removeItem("siyana-user-name");
//   localStorage.removeItem("siyana-user-token");
//   localStorage.removeItem("siyana-cart");
//   localStorage.removeItem("siyana-cart-count");
// }

// const Navbar: React.FC<NavbarProps> = ({
//   user = null,
//   onLoginClick,
//   onLogout,
// }) => {
//   const [cartCount, setCartCount] = useState<number>(0);
//   const [userName, setUserName] = useState<string>("");
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
//   const [allCategories, setAllCategories] = useState<Category[]>([]);
//   const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
//   const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
//   const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
//   const pathname = usePathname();
//   const userButtonRef = useRef<HTMLButtonElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const hideBadge = pathname === "/cart";

//   // Check if user is logged in
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       if (typeof window !== "undefined") {
//         const token = localStorage.getItem("siyana-user-token");
//         const name = localStorage.getItem("siyana-user-name");
//         const storedCount = localStorage.getItem("siyana-cart-count") || 0;

//         setIsLoggedIn(!!token);
//         setUserName(name || "");
//         setCartCount(Number(storedCount));
//       }
//     };

//     checkLoginStatus();
//     window.addEventListener("storage", checkLoginStatus);

//     return () => {
//       window.removeEventListener("storage", checkLoginStatus);
//     };
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         setIsLoadingCategories(true);
//         const categories = await fetchCategories();
//         setAllCategories(categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setAllCategories([]);
//       } finally {
//         setIsLoadingCategories(false);
//       }
//     };

//     loadCategories();
//   }, []);

//   // Live update cart count
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCartCount(Number(localStorage.getItem("siyana-cart-count") || 0));
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const router = useRouter();

//   // Handle user dropdown toggle
//   const toggleUserDropdown = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setShowUserDropdown(!showUserDropdown);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         userButtonRef.current &&
//         !userButtonRef.current.contains(event.target as Node)
//       ) {
//         setShowUserDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Handle logout

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#196b7a",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Logout",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Perform logout
//         logoutUser();
//         setIsLoggedIn(false);
//         setUserName("");
//         setShowUserDropdown(false);
//         onLogout?.();

//         // Navigate and update
//         router.push("/");
//         setTimeout(() => {
//           window.dispatchEvent(new Event("storage"));
//         }, 100);
//       }
//     });
//   };
//   // Search handlers
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.trim().length > 0 && allCategories.length > 0) {
//       const filtered = allCategories.filter((category) =>
//         category.name.toLowerCase().includes(query.toLowerCase()),
//       );
//       setFilteredCategories(filtered);
//       setShowSearchResults(true);
//     } else {
//       setShowSearchResults(false);
//       setFilteredCategories([]);
//     }
//   };

//   const handleSearchSubmit = () => {
//     if (searchQuery.trim().length > 0) {
//       const exactMatch = allCategories.find(
//         (cat) => cat.name.toLowerCase() === searchQuery.toLowerCase().trim(),
//       );

//       if (exactMatch) {
//         router.push(`/category/${exactMatch.name}`);
//         setSearchQuery("");
//         setShowSearchResults(false);
//       } else {
//         router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//         setSearchQuery("");
//         setShowSearchResults(false);
//       }
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearchSubmit();
//     } else if (e.key === "Escape") {
//       setShowSearchResults(false);
//       setSearchQuery("");
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setShowSearchResults(false);
//     setFilteredCategories([]);
//   };

//   const closeSearchResults = useCallback(() => {
//     setShowSearchResults(false);
//   }, []);

//   const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
//     const target = e.target as HTMLImageElement;
//     target.style.display = "none";
//     const fallback = target.nextElementSibling as HTMLElement | null;
//     if (fallback) fallback.style.display = "block";
//   };

//   const handleCartClick = () => {
//     router.push("/cart");
//   };

//   const handleAuthClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isLoggedIn) {
//       toggleUserDropdown(e);
//     } else {
//       onLoginClick?.();
//     }
//   };

//   // Calculate dropdown position
//   const getDropdownPosition = () => {
//     if (typeof window === "undefined") return { top: "100%", right: "0" };

//     const button = userButtonRef.current;
//     if (!button) return { top: "100%", right: "0" };

//     const rect = button.getBoundingClientRect();
//     return {
//       top: `${rect.bottom + window.scrollY}px`,
//       right: `${window.innerWidth - rect.right}px`,
//     };
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-[#278899] shadow-md overflow-visible rounded-3xl m-4">
//         {/* IMPORTANT: Changed overflow-hidden to overflow-visible */}
//         <div className="relative flex items-center justify-between px-4 py-2 h-20">
//           {/* Logo */}
//           <div
//             className="shrink-0 relative h-full flex items-center cursor-pointer"
//             onClick={() => router.push("/")}
//           >
//             <Image
//               src="/images/web logo.png"
//               alt="Siyana Gold & Diamonds"
//               width={200}
//               height={80}
//               className="h-64 w-auto object-contain"
//               onError={handleImageError}
//               priority
//             />
//             <div
//               className="hidden text-2xl font-bold text-gray-800 bg-yellow-100 px-4 py-2 rounded"
//               style={{ display: "none" }}
//             >
//               Siyana Gold & Diamonds
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="search-container hidden lg:flex items-center w-full max-w-lg mx-8 border border-gray-300 rounded-full px-4 py-2 bg-white relative z-40">
//             <Search
//               size={20}
//               className="text-gray-500 mr-2 cursor-pointer"
//               onClick={handleSearchSubmit}
//             />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onKeyDown={handleKeyPress}
//               onFocus={() => {
//                 if (searchQuery.trim().length > 0 && allCategories.length > 0) {
//                   setShowSearchResults(true);
//                 }
//               }}
//               placeholder={
//                 isLoadingCategories
//                   ? "Loading categories..."
//                   : "Search categories..."
//               }
//               className="w-full text-sm outline-none bg-transparent"
//               disabled={isLoadingCategories}
//             />
//             {searchQuery && (
//               <button
//                 onClick={handleClearSearch}
//                 className="ml-2 text-gray-400 hover:text-gray-600"
//               >
//                 <X size={18} />
//               </button>
//             )}

//             {isLoadingCategories && (
//               <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600"></div>
//               </div>
//             )}
//           </div>

//           {/* Icons Section */}
//           <div className="flex items-center space-x-6 text-gray-700 relative">
//             {/* Cart Icon */}
//             <div
//               className="relative cursor-pointer hover:text-teal-700"
//               onClick={handleCartClick}
//             >
//               <ShoppingCart size={24} className="text-white" />
//               {!hideBadge && cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </div>

//             {/* User Icon */}
//             <div className="relative">
//               <button
//                 ref={userButtonRef}
//                 onClick={handleAuthClick}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-teal-800/30 transition-colors duration-200 relative z-50"
//               >
//                 <div className="relative">
//                   <User size={24} className="text-white" />
//                   {isLoggedIn && (
//                     <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
//                   )}
//                 </div>
//                 {isLoggedIn && userName && (
//                   <span className="text-white text-sm font-medium hidden lg:inline">
//                     Hi, {userName.split(" ")[0]}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         <div className="lg:hidden px-4 pb-2 search-container">
//           <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white relative">
//             <Search
//               size={20}
//               className="text-gray-500 mr-2 cursor-pointer"
//               onClick={handleSearchSubmit}
//             />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onKeyDown={handleKeyPress}
//               placeholder={
//                 isLoadingCategories ? "Loading..." : "Search categories..."
//               }
//               className="w-full text-sm outline-none bg-transparent"
//               disabled={isLoadingCategories}
//             />
//             {searchQuery && (
//               <button
//                 onClick={handleClearSearch}
//                 className="ml-2 text-gray-400 hover:text-gray-600"
//               >
//                 <X size={18} />
//               </button>
//             )}

//             {isLoadingCategories && (
//               <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* DROPDOWN AS PORTAL - RENDERED OUTSIDE HEADER */}
//       {isLoggedIn && showUserDropdown && (
//         <>
//           {/* Backdrop overlay */}
//           <div
//             className="fixed inset-0 z-[9998]"
//             onClick={() => setShowUserDropdown(false)}
//           />

//           {/* Dropdown Menu - Positioned absolutely in the document */}
//           <div
//             ref={dropdownRef}
//             className="fixed z-[9999] bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[200px] animate-fade-in"
//             style={{
//               ...getDropdownPosition(),
//               maxWidth: "250px",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* User info */}
//             <div className="px-4 py-3 border-b bg-gradient-to-r from-teal-50 to-blue-50">
//               <p className="font-semibold text-gray-800 truncate">{userName}</p>
//               <p className="text-xs text-gray-500 mt-0.5">Welcome to Siyana!</p>
//             </div>

//             {/* Menu items */}
//             <div className="py-2">
//               {/* Add other menu items here if needed */}

//               <div className="px-4 py-2">
//                 <div className="h-px bg-gray-100"></div>
//               </div>

//               {/* Logout button */}
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-150 font-medium"
//               >
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Search Results Modal */}
//       {showSearchResults &&
//         searchQuery.trim().length > 0 &&
//         !isLoadingCategories && (
//           <SearchResults
//             query={searchQuery}
//             categories={filteredCategories}
//             isVisible={showSearchResults}
//             onClose={closeSearchResults}
//           />
//         )}
//     </>
//   );
// };

// export default Navbar;

"use client";
import React, {
  SyntheticEvent,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, User, X, LogOut, Menu } from "lucide-react";
import { User as UserType, Category } from "@/types";
import SearchResults from "../SearchResults";
import { fetchCategories } from "@/lib/firebase/firebaseQueries";
import Swal from "sweetalert2";

interface NavbarProps {
  cartItemsCount?: number;
  allCategories?: Category[];
  user?: UserType | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

// Your logout function
export function logoutUser(): void {
  localStorage.removeItem("siyana-user-name");
  localStorage.removeItem("siyana-user-token");
  localStorage.removeItem("siyana-cart");
  localStorage.removeItem("siyana-cart-count");
}

const Navbar: React.FC<NavbarProps> = ({
  user = null,
  onLoginClick,
  onLogout,
}) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
  const pathname = usePathname();
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const hideBadge = pathname === "/cart";

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("siyana-user-token");
        const name = localStorage.getItem("siyana-user-name");
        const storedCount = localStorage.getItem("siyana-cart-count") || 0;

        setIsLoggedIn(!!token);
        setUserName(name || "");
        setCartCount(Number(storedCount));
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const categories = await fetchCategories();
        setAllCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAllCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Live update cart count
  useEffect(() => {
    const interval = setInterval(() => {
      setCartCount(Number(localStorage.getItem("siyana-cart-count") || 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Focus search input when mobile search opens
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  const router = useRouter();

  // Handle user dropdown toggle
  const toggleUserDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#196b7a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        setIsLoggedIn(false);
        setUserName("");
        setShowUserDropdown(false);
        onLogout?.();

        router.push("/");
        setTimeout(() => {
          window.dispatchEvent(new Event("storage"));
        }, 100);
      }
    });
  };

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0 && allCategories.length > 0) {
      const filtered = allCategories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredCategories(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      setFilteredCategories([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      const exactMatch = allCategories.find(
        (cat) => cat.name.toLowerCase() === searchQuery.toLowerCase().trim(),
      );

      if (exactMatch) {
        router.push(`/category/${exactMatch.name}`);
        setSearchQuery("");
        setShowSearchResults(false);
        setShowMobileSearch(false);
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setShowSearchResults(false);
        setShowMobileSearch(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    } else if (e.key === "Escape") {
      setShowSearchResults(false);
      setSearchQuery("");
      if (window.innerWidth < 1024) {
        setShowMobileSearch(false);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
    setFilteredCategories([]);
    if (window.innerWidth < 1024) {
      setShowMobileSearch(false);
    }
  };

  const closeSearchResults = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const fallback = target.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = "block";
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleAuthClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoggedIn) {
      toggleUserDropdown(e);
    } else {
      onLoginClick?.();
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  // Calculate dropdown position
  const getDropdownPosition = () => {
    if (typeof window === "undefined") return { top: "100%", right: "0" };

    const button = userButtonRef.current;
    if (!button) return { top: "100%", right: "0" };

    const rect = button.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      right: `${window.innerWidth - rect.right}px`,
    };
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#278899] shadow-md overflow-visible rounded-3xl m-2 sm:m-4">
        <div className="relative flex items-center justify-between px-3 sm:px-4 py-2 h-16 sm:h-20">
          {/* Logo */}
          {/* Logo - Maximum size */}
          <div
            className="shrink-0 relative h-full flex items-center cursor-pointer min-w-[180px] sm:min-w-[220px]"
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/web logo.png"
              alt="Siyana Gold & Diamonds"
              width={320}
              height={128}
              className="h-48 w-auto sm:h-64 md:h-78 object-contain mt-2 md:mt-5"
              onError={handleImageError}
              priority
            />
          </div>

          {/* Desktop Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center w-full max-w-lg mx-8 border border-gray-300 rounded-full px-4 py-2 bg-white relative z-40">
            <Search
              size={20}
              className="text-gray-500 mr-2 cursor-pointer"
              onClick={handleSearchSubmit}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              onFocus={() => {
                if (searchQuery.trim().length > 0 && allCategories.length > 0) {
                  setShowSearchResults(true);
                }
              }}
              placeholder={
                isLoadingCategories
                  ? "Loading categories..."
                  : "Search categories..."
              }
              className="w-full text-sm outline-none bg-transparent"
              disabled={isLoadingCategories}
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}

            {isLoadingCategories && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600"></div>
              </div>
            )}
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700 relative">
            {/* Mobile Search Icon - Visible only on mobile */}
            <button
              onClick={toggleMobileSearch}
              className="lg:hidden relative cursor-pointer hover:text-teal-700 p-2"
            >
              <Search size={22} className="text-white" />
            </button>

            {/* Cart Icon */}
            <div
              className="relative cursor-pointer hover:text-teal-700 p-2"
              onClick={handleCartClick}
            >
              <ShoppingCart size={22} className="text-white" />
              {!hideBadge && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* User Icon */}
            <div className="relative">
              <button
                ref={userButtonRef}
                onClick={handleAuthClick}
                className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-teal-800/30 transition-colors duration-200 relative z-50"
              >
                <div className="relative">
                  <User size={22} className="text-white" />
                  {isLoggedIn && (
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                  )}
                </div>
                {isLoggedIn && userName && (
                  <span className="text-white text-sm font-medium hidden lg:inline">
                    Hi, {userName.split(" ")[0]}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Full width when active */}
        {showMobileSearch && (
          <div className="lg:hidden px-3 py-3 bg-[#278899] border-t border-teal-700">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white relative">
              <Search
                size={20}
                className="text-gray-500 mr-2 cursor-pointer"
                onClick={handleSearchSubmit}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                placeholder={
                  isLoadingCategories ? "Loading..." : "Search categories..."
                }
                className="w-full text-sm outline-none bg-transparent"
                disabled={isLoadingCategories}
              />
              <div className="flex items-center gap-2 ml-2">
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
                <button
                  onClick={() => setShowMobileSearch(false)}
                  className="text-gray-500 hover:text-gray-700 ml-1"
                >
                  <X size={20} />
                </button>
              </div>

              {isLoadingCategories && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* DROPDOWN AS PORTAL - RENDERED OUTSIDE HEADER */}
      {isLoggedIn && showUserDropdown && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowUserDropdown(false)}
          />

          <div
            ref={dropdownRef}
            className="fixed z-[9999] bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[200px] animate-fade-in"
            style={{
              ...getDropdownPosition(),
              maxWidth: "250px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b bg-gradient-to-r from-teal-50 to-blue-50">
              <p className="font-semibold text-gray-800 truncate">{userName}</p>
              <p className="text-xs text-gray-500 mt-0.5">Welcome to Siyana!</p>
            </div>

            <div className="py-2">
              <div className="px-4 py-2">
                <div className="h-px bg-gray-100"></div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-150 font-medium"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Search Results Modal */}
      {showSearchResults &&
        searchQuery.trim().length > 0 &&
        !isLoadingCategories && (
          <SearchResults
            query={searchQuery}
            categories={filteredCategories}
            isVisible={showSearchResults}
            onClose={closeSearchResults}
          />
        )}
    </>
  );
};

export default Navbar;

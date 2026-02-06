// "use client";
// import React, { useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Search, X } from "lucide-react";
// import { Category } from "@/types";

// interface SearchResultsProps {
//   query: string;
//   categories: Category[];
//   isVisible: boolean;
//   onClose: () => void;
// }

// const SearchResults: React.FC<SearchResultsProps> = ({
//   query,
//   categories,
//   isVisible,
//   onClose,
// }) => {
//   const router = useRouter();
//   const modalRef = useRef<HTMLDivElement>(null);

//   // Filter categories based on search query
//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().includes(query.toLowerCase())
//   );

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     if (isVisible) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.body.style.overflow = "unset";
//     };
//   }, [isVisible, onClose]);

//   const handleCategoryClick = (categoryName: string) => {
//     router.push(`/category/${categoryName}`);
//     onClose();
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center pt-32 px-4">
//       <div
//         ref={modalRef}
//         className="bg-black rounded-2xl shadow-2xl w-full max-w-2xl max-h-[60vh] overflow-hidden animate-fade-in"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center gap-2">
//             <Search size={20} className="text-gray-500" />
//             <span className="font-medium">
//               {filteredCategories.length} categories found for "{query}"
//             </span>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-full"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Results */}
//         <div className="overflow-y-auto max-h-[calc(60vh-80px)]">
//           {filteredCategories.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
//               {filteredCategories.map((category) => (
//                 <div
//                   key={category.id}
//                   onClick={() => handleCategoryClick(category.name)}
//                   className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
//                 >
//                   <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform"
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800 group-hover:text-teal-600">
//                       {category.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {category.productCount} products
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="p-8 text-center">
//               <Search size={48} className="mx-auto text-gray-300 mb-4" />
//               <h3 className="text-lg font-medium text-gray-700 mb-2">
//                 No categories found
//               </h3>
//               <p className="text-gray-500">
//                 Try searching for something else like "Earrings", "Rings", or "Bangles"
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t p-3 text-center text-sm text-gray-500 bg-gray-50">
//           Press <kbd className="px-2 py-1 bg-gray-200 rounded mx-1">ESC</kbd> to close
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchResults;









"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { Category } from "@/types";

interface SearchResultsProps {
  query: string;
  categories: Category[];
  isVisible: boolean;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  categories,
  isVisible,
  onClose,
}) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/category/${categoryName}`);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="search-results fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex justify-center items-start pt-32 px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[60vh] overflow-hidden animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-gray-500" />
            <span className="font-medium">
              {filteredCategories.length} categories found for "{query}"
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close search results"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[calc(60vh-80px)]">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group border border-transparent hover:border-gray-200"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={typeof category.image === 'string' ? category.image : (category.image as any)?.src || '/images/placeholder.jpg'}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-800 group-hover:text-teal-600 truncate">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.productCount} products
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No categories found
              </h3>
              <p className="text-gray-500 mb-4">
                No results found for "{query}"
              </p>
              <p className="text-sm text-gray-400">
                Try searching for "Earrings", "Rings", or "Bangles"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 text-center text-sm text-gray-500 bg-gray-50">
          Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono mx-1">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
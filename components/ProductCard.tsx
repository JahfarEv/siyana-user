// // "use client";
// // import React from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Eye } from "lucide-react";
// // import { ProductCardProps } from "@/types";
// // import { ReactElement, useState } from "react";

// // const ProductCard: React.FC<ProductCardProps> = ({
// //   product,
// //   onAddToCart,
// //   onShowLoginModal,
// //   viewMode = "grid",
// // }): ReactElement => {
// //   const [imageError, setImageError] = useState(false);
// //   const [imageLoaded, setImageLoaded] = useState(false);

// //   // Safe image URL handling
// //   const getImageUrl = (): string => {
// //     // Check if images array exists and has at least one image
// //     if (!product.images || product.images.length === 0) {
// //       return "/images/placeholder.jpg";
// //     }

// //     const firstImage = product.images[0];

// //     // Handle string format
// //     if (typeof firstImage === "string") {
// //       return firstImage || "/images/placeholder.jpg";
// //     }

// //     // Handle object format - use type assertion to avoid TypeScript errors
// //     const imageObject = firstImage as any;
// //     if (imageObject && typeof imageObject === "object" && imageObject.url) {
// //       return imageObject.url || "/images/placeholder.jpg";
// //     }

// //     return "/images/placeholder.jpg";
// //   };

// //   const imageUrl = getImageUrl();

// //   const handleImageError = () => {
// //     setImageError(true);
// //     setImageLoaded(true);
// //   };

// //   const handleImageLoad = () => {
// //     setImageLoaded(true);
// //   };

// //   if (viewMode === "list") {
// //     return (
// //       <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
// //         <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
// //           {!imageLoaded && (
// //             <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
// //           )}
// //           <Image
// //             src={imageError ? "/images/placeholder.jpg" : imageUrl}
// //             alt={product.name}
// //             fill
// //             className={`object-cover rounded-lg transition-opacity duration-300 ${
// //               imageLoaded ? "opacity-100" : "opacity-0"
// //             }`}
// //             sizes="96px"
// //             onError={handleImageError}
// //             onLoad={handleImageLoad}
// //           />
// //         </div>

// //         <div className="flex-1 flex flex-col items-center text-center">
// //           <Link href={`/product/${product.id}`} className="group">
// //             <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
// //               {product.name}
// //             </h3>
// //           </Link>
// //           <p className="text-gray-600 text-sm mb-2 line-clamp-1">
// //             {product.shortDescription}
// //           </p>
// //           <div className="flex items-center gap-2 justify-center">
// //             {product.originalPrice && (
// //               <span className="text-gray-500 line-through text-sm">
// //                 ₹{product.originalPrice.toLocaleString()}
// //               </span>
// //             )}
// //             <span className="text-amber-600 font-bold text-lg">
// //               ₹{product.price.toLocaleString()}
// //             </span>
// //           </div>

// //           <Link
// //             href={`/product/${product.id}`}
// //             className="mt-3 p-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors shadow-lg flex items-center justify-center"
// //             title="View Product"
// //           >
// //             <Eye className="w-5 h-5" />
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-[#278899] rounded-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow text-white group">
// //       <Link href={`/product/${product.id}`} className="block">
// //         <div className="relative aspect-4/3 cursor-pointer bg-gray-100">
// //           {/* Loading skeleton */}
// //           {!imageLoaded && (
// //             <div className="absolute inset-0 bg-gray-200 animate-pulse" />
// //           )}

// //           <Image
// //             src={imageError ? "/images/placeholder.jpg" : imageUrl}
// //             alt={product.name}
// //             fill
// //             className={`object-cover group-hover:scale-105 transition-all duration-300 ${
// //               imageLoaded ? "opacity-100" : "opacity-0"
// //             }`}
// //             sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
// //             onError={handleImageError}
// //             onLoad={handleImageLoad}
// //           />

// //           {product.isNew && (
// //             <span className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
// //               New
// //             </span>
// //           )}
// //         </div>
// //       </Link>

// //       <div className="p-4">
// //         <div className="flex flex-col items-center text-center gap-3">
// //           {/* Centered Product Info */}
// //           <div className="w-full">
// //             <Link href={`/product/${product.id}`} className="group">
// //               <h3 className="font-semibold mb-2 line-clamp-1 text-base group-hover:text-amber-300 transition-colors">
// //                 {product.name}
// //               </h3>
// //             </Link>

// //             <div className="flex items-center justify-center gap-2 flex-wrap">
// //               {product.originalPrice && (
// //                 <span className="line-through text-sm opacity-80">
// //                   ₹{product.originalPrice.toLocaleString()}
// //                 </span>
// //               )}
// //               <span className="text-amber-300 font-bold text-lg">
// //                 ₹{product.price.toLocaleString()}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Centered View Button */}
// //           <Link
// //             href={`/product/${product.id}`}
// //             className="w-2/3 flex items-center justify-center gap-2 py-3 text-[#278899] bg-white rounded-2xl hover:bg-gray-100 transition-colors font-semibold"
// //           >
// //             <Eye className="w-5 h-5" />
// //             Quick View
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;


// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Eye, ShoppingBag, Heart } from "lucide-react";
// import { ProductCardProps } from "@/types";
// import { ReactElement, useState } from "react";

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   onAddToCart,
//   onShowLoginModal,
//   viewMode = "grid",
// }): ReactElement => {
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   // Safe image URL handling
//   const getImageUrl = (): string => {
//     if (!product.images || product.images.length === 0) {
//       return "/images/placeholder.jpg";
//     }

//     const firstImage = product.images[0];

//     if (typeof firstImage === "string") {
//       return firstImage || "/images/placeholder.jpg";
//     }

//     const imageObject = firstImage as any;
//     if (imageObject && typeof imageObject === "object" && imageObject.url) {
//       return imageObject.url || "/images/placeholder.jpg";
//     }

//     return "/images/placeholder.jpg";
//   };

//   const imageUrl = getImageUrl();

//   const handleImageError = () => {
//     setImageError(true);
//     setImageLoaded(true);
//   };

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   const toggleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onAddToCart?.(product);
//   };

//   // Calculate discount percentage
//   const discountPercentage = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   if (viewMode === "list") {
//     return (
//       <Link href={`/product/${product.id}`} className="block">
//         <div className="flex gap-3 p-3 sm:p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white active:scale-[0.99] active:shadow-sm">
//           {/* Image - Mobile optimized */}
//           <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
//             {!imageLoaded && (
//               <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
//             )}
//             <Image
//               src={imageError ? "/images/placeholder.jpg" : imageUrl}
//               alt={product.name}
//               fill
//               className={`object-cover rounded-lg ${
//                 imageLoaded ? "opacity-100" : "opacity-0"
//               }`}
//               sizes="(max-width: 640px) 80px, 96px"
//               onError={handleImageError}
//               onLoad={handleImageLoad}
//             />
            
//             {/* Badges - Mobile sized */}
//             <div className="absolute top-1 left-1 flex flex-col gap-1">
//               {product.isNew && (
//                 <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
//                   NEW
//                 </span>
//               )}
//               {discountPercentage > 0 && (
//                 <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
//                   -{discountPercentage}%
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Content - Mobile optimized */}
//           <div className="flex-1 min-w-0">
//             {/* Product Name */}
//             <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2 leading-tight">
//               {product.name}
//             </h3>

//             {/* Description - Show on larger screens only */}
//             <p className="hidden sm:block text-gray-600 text-sm mb-2 line-clamp-1">
//               {product.shortDescription}
//             </p>

//             {/* Price */}
//             <div className="flex items-center gap-2 mb-2 sm:mb-3">
//               <span className="text-[#196b7a] font-bold text-base sm:text-lg">
//                 ₹{product.price.toLocaleString()}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-gray-500 line-through text-sm">
//                   ₹{product.originalPrice.toLocaleString()}
//                 </span>
//               )}
//             </div>

//             {/* Mobile Action Buttons */}
//             <div className="flex items-center gap-2">
//               <Link
//                 href={`/product/${product.id}`}
//                 className="flex-1 sm:flex-none px-3 py-2 bg-[#196b7a] text-white rounded-lg hover:bg-[#196b7a]/90 transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
//               >
//                 <Eye size={14} className="sm:w-4 sm:h-4" />
//                 <span className="hidden sm:inline">View</span>
//               </Link>
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 sm:flex-none px-3 py-2 border border-[#196b7a] text-[#196b7a] rounded-lg hover:bg-[#196b7a] hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
//               >
//                 <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
//                 <span className="hidden sm:inline">Add</span>
//               </button>
//               <button
//                 onClick={toggleWishlist}
//                 className="p-2 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors flex-shrink-0"
//               >
//                 <Heart
//                   size={16}
//                   className={`sm:w-5 sm:h-5 ${
//                     isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   }

//   // Grid View (Default) - Mobile Focused
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 active:scale-[0.98]">
//       <Link href={`/product/${product.id}`} className="block">
//         {/* Image Container */}
//         <div className="relative aspect-square bg-gray-100">
//           {/* Loading skeleton */}
//           {!imageLoaded && (
//             <div className="absolute inset-0 bg-gray-200 animate-pulse" />
//           )}

//           {/* Product Image */}
//           <Image
//             src={imageError ? "/images/placeholder.jpg" : imageUrl}
//             alt={product.name}
//             fill
//             className={`object-cover hover:scale-105 transition-transform duration-300 ${
//               imageLoaded ? "opacity-100" : "opacity-0"
//             }`}
//             sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//             onError={handleImageError}
//             onLoad={handleImageLoad}
//           />

//           {/* Badges - Mobile visible */}
//           <div className="absolute top-2 left-2 flex flex-col gap-1">
//             {product.isNew && (
//               <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
//                 NEW
//               </span>
//             )}
//             {discountPercentage > 0 && (
//               <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
//                 -{discountPercentage}%
//               </span>
//             )}
//           </div>

//           {/* Mobile Quick Actions - Always visible on mobile, hover on desktop */}
//           <div className="absolute bottom-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
//             <button
//               onClick={toggleWishlist}
//               className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
//             >
//               <Heart
//                 size={18}
//                 className={`${
//                   isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Product Info - Mobile optimized */}
//         <div className="p-3 sm:p-4">
//           <div className="space-y-1 sm:space-y-2">
//             {/* Product Name - Truncated for mobile */}
//             <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
//               {product.name}
//             </h3>

//             {/* Price - Mobile sized */}
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="text-[#196b7a] font-bold text-base sm:text-lg">
//                 ₹{product.price.toLocaleString()}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-gray-500 line-through text-xs sm:text-sm">
//                   ₹{product.originalPrice.toLocaleString()}
//                 </span>
//               )}
//             </div>

//             {/* Description - Only show on larger screens */}
//             {product.shortDescription && (
//               <p className="hidden sm:block text-gray-600 text-sm line-clamp-1">
//                 {product.shortDescription}
//               </p>
//             )}

//             {/* Action Buttons - Mobile optimized */}
//             <div className="pt-2 flex gap-2">
//               <Link
//                 href={`/product/${product.id}`}
//                 className="flex-1 py-2 sm:py-2.5 bg-[#196b7a] text-white rounded-lg hover:bg-[#196b7a]/90 transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
//               >
//                 <Eye size={14} className="sm:w-4 sm:h-4" />
//                 <span>View</span>
//               </Link>
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 py-2 sm:py-2.5 border border-[#196b7a] text-[#196b7a] rounded-lg hover:bg-[#196b7a] hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
//               >
//                 <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
//                 <span>Add</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;



"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, Heart, Check } from "lucide-react";
import { ProductCardProps } from "@/types";
import { ReactElement, useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebaseConfig";
import { addToCart, getUserCart } from "@/lib/firebase/firebaseQueries";
import toast from "react-hot-toast";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onShowLoginModal,
  viewMode = "grid",
}): ReactElement => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Check if user is logged in
  const isUserLoggedIn = () => {
    return localStorage.getItem("siyana-user-token") !== null;
  };

  // Safe image URL handling
  const getImageUrl = (): string => {
    if (!product.images || product.images.length === 0) {
      return "/images/placeholder.jpg";
    }

    const firstImage = product.images[0];

    if (typeof firstImage === "string") {
      return firstImage || "/images/placeholder.jpg";
    }

    const imageObject = firstImage as any;
    if (imageObject && typeof imageObject === "object" && imageObject.url) {
      return imageObject.url || "/images/placeholder.jpg";
    }

    return "/images/placeholder.jpg";
  };

  const imageUrl = getImageUrl();

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Add to Cart function - same as product details page
  const handleAddToCart = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    // Check stock availability
    if (Number(product.stock) < 1) {
      toast.error("Product is out of stock");
      return;
    }

    // Check if user is logged in
    if (!isUserLoggedIn()) {
      onShowLoginModal?.();
      return;
    }

    setIsAddingToCart(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Please login to add items to cart");
        return;
      }

      // Add to cart with quantity 1
      await addToCart(user.uid, product, 1);

      // Update local state
      setIsInCart(true);

      // Update cart count in localStorage
      const count = Number(localStorage.getItem("siyana-cart-count") || 0);
      localStorage.setItem("siyana-cart-count", String(count + 1));

      // Show success toast
      toast.success(`${product.name} added to cart!`);

      // Call parent handler if provided
      if (onAddToCart) {
        onAddToCart(product);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Check if product is already in cart
  useEffect(() => {
    const checkCart = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const cartItems = await getUserCart(user.uid);
        const exists = cartItems.some((item: any) => item.id === product.id);
        setIsInCart(exists);
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };

    checkCart();
  }, [product.id]);

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === "list") {
    return (
      <Link href={`/product/${product.id}`} className="block">
        <div className="flex gap-3 p-3 sm:p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white active:scale-[0.99] active:shadow-sm">
          {/* Image - Mobile optimized */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
            <Image
              src={imageError ? "/images/placeholder.jpg" : imageUrl}
              alt={product.name}
              fill
              className={`object-cover rounded-lg ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 80px, 96px"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            
            {/* Badges - Mobile sized */}
            <div className="absolute top-1 left-1 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
                  NEW
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
                  -{discountPercentage}%
                </span>
              )}
            </div>
          </div>

          {/* Content - Mobile optimized */}
          <div className="flex-1 min-w-0">
            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2 leading-tight">
              {product.name}
            </h3>

            {/* Description - Show on larger screens only */}
            <p className="hidden sm:block text-gray-600 text-sm mb-2 line-clamp-1">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[#196b7a] font-bold text-base sm:text-lg">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href={`/product/${product.id}`}
                className="flex-1 sm:flex-none px-3 py-2 bg-[#196b7a] text-white rounded-lg hover:bg-[#196b7a]/90 transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
              >
                <Eye size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View</span>
              </Link>
              
              {/* Add to Cart Button with same functionality as product details page */}
              {isInCart ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = "/cart";
                  }}
                  className="flex-1 sm:flex-none px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
                >
                  <Check size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">In Cart</span>
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || Number(product.stock) < 1}
                  className="flex-1 sm:flex-none px-3 py-2 border border-[#196b7a] text-[#196b7a] rounded-lg hover:bg-[#196b7a] hover:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      <span className="hidden sm:inline">Adding...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              )}
              
              <button
                onClick={toggleWishlist}
                className="p-2 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors flex-shrink-0"
              >
                <Heart
                  size={16}
                  className={`sm:w-5 sm:h-5 ${
                    isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View (Default) - Mobile Focused
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 active:scale-[0.98]">
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* Product Image */}
          <Image
            src={imageError ? "/images/placeholder.jpg" : imageUrl}
            alt={product.name}
            fill
            className={`object-cover hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />

          {/* Badges - Mobile visible */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
                NEW
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Mobile Quick Actions - Always visible on mobile, hover on desktop */}
          <div className="absolute bottom-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={toggleWishlist}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Heart
                size={18}
                className={`${
                  isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Product Info - Mobile optimized */}
        <div className="p-3 sm:p-4">
          <div className="space-y-1 sm:space-y-2">
            {/* Product Name - Truncated for mobile */}
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
              {product.name}
            </h3>

            {/* Price - Mobile sized */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#196b7a] font-bold text-base sm:text-lg">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-xs sm:text-sm">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description - Only show on larger screens */}
            {product.shortDescription && (
              <p className="hidden sm:block text-gray-600 text-sm line-clamp-1">
                {product.shortDescription}
              </p>
            )}

            {/* Action Buttons - Mobile optimized */}
            <div className="pt-2 flex gap-2">
              <Link
                href={`/product/${product.id}`}
                className="flex-1 py-2 sm:py-2.5 bg-[#196b7a] text-white rounded-lg hover:bg-[#196b7a]/90 transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
              >
                <Eye size={14} className="sm:w-4 sm:h-4" />
                <span>View</span>
              </Link>
              
              {/* Add to Cart Button */}
              {isInCart ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = "/cart";
                  }}
                  className="flex-1 py-2 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
                >
                  <Check size={14} className="sm:w-4 sm:h-4" />
                  <span>In Cart</span>
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || Number(product.stock) < 1}
                  className="flex-1 py-2 sm:py-2.5 border border-[#196b7a] text-[#196b7a] rounded-lg hover:bg-[#196b7a] hover:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
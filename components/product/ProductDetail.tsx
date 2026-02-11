// "use client";

// import { useState, useMemo, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   Star,
//   ShoppingBag,
//   Heart,
//   Share2,
//   Truck,
//   Shield,
//   RotateCcw,
//   Check,
//   Sparkles,
//   Gem,
//   Crown,
// } from "lucide-react";
// import { ReactElement } from "react";
// import AuthModal from "../auth/LoginModal";
// import { addToCart, getUserCart } from "@/lib/firebase/firebaseQueries";
// import toast from "react-hot-toast";
// import { auth } from "@/lib/firebase/firebaseConfig";

// import { ProductDetailProps } from "@/types";

// const ProductDetailPage: React.FC<ProductDetailProps> = ({
//   product,
// }): ReactElement => {
//   const [selectedImage, setSelectedImage] = useState<number>(0);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
//   const [imageLoaded, setImageLoaded] = useState<boolean>(false);
//   const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
//   const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
//   const [isInCart, setIsInCart] = useState<boolean>(false);
//   const router = useRouter();

//   // Check if user is logged in (you can replace this with your actual auth check)
//   const isUserLoggedIn = () => {
//     // This is a placeholder - replace with your actual authentication check
//     return localStorage.getItem("siyana-user-token") !== null;
//   };

//   const availabilityStatus = useMemo(() => {
//     if (product.availability) {
//       if (product.availability === "Out of Stock")
//         return {
//           text: "Out of Stock",
//           color: "text-red-600",
//           bg: "bg-red-50",
//           border: "border-red-200",
//         };
//       if (product.availability === "Low Stock")
//         return {
//           text: "Low Stock",
//           color: "text-amber-600",
//           bg: "bg-amber-50",
//           border: "border-amber-200",
//         };
//       return {
//         text: "In Stock",
//         color: "text-[#196b7a]",
//         bg: "bg-[#196b7a]/10",
//         border: "border-[#196b7a]/20",
//       };
//     }
//     if (!product.inStock) {
//       return {
//         text: "Out of Stock",
//         color: "text-red-600",
//         bg: "bg-red-50",
//         border: "border-red-200",
//       };
//     }
//     if (
//       product.stock !== undefined &&
//       product.stock !== null &&
//       product.stock < 10
//     ) {
//       return {
//         text: "Low Stock",
//         color: "text-amber-600",
//         bg: "bg-amber-50",
//         border: "border-amber-200",
//       };
//     }
//     return {
//       text: "In Stock",
//       color: "text-[#196b7a]",
//       bg: "bg-[#196b7a]/10",
//       border: "border-[#196b7a]/20",
//     };
//   }, [product.inStock, product.stock, product.availability]);

//   const renderStars = (rating: number): ReactElement[] => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Star
//           key={i}
//           className={`w-4 h-4 ${
//             i <= rating ? "text-amber-400 fill-current" : "text-gray-300"
//           }`}
//         />
//       );
//     }
//     return stars;
//   };

//   const handleAddToCart = async (): Promise<void> => {
//     if (Number(product.stock) < 1) return;

//     if (!isUserLoggedIn()) {
//       setShowLoginModal(true);
//       return;
//     }

//     setIsAddingToCart(true);

//     try {
//       const user = auth.currentUser;
//       if (!user) return;

//       await addToCart(user.uid, product, quantity);

//       setIsInCart(true); // <-- update instantly

//       const count = Number(localStorage.getItem("siyana-cart-count") || 0);
//       localStorage.setItem("siyana-cart-count", String(count + quantity));

//       toast.success(`${product.name} added to cart!`);
//     } catch (err) {
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleBuyNow = (): void => {
//     if (Number(product.stock) < 1) return;

//     // Check if user is logged in
//     if (!isUserLoggedIn()) {
//       setShowLoginModal(true);
//       return;
//     }

//     // Add to cart first
//     handleAddToCart();

//     // Then navigate to cart page
//     setTimeout(() => {
//       router.push("/cart");
//     }, 500);
//   };

//   const handleWishlist = (): void => {
//     setIsWishlisted(!isWishlisted);
//     console.log("Wishlist:", product, !isWishlisted);
//   };

//   const handleShare = (): void => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: product.description,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert("Product link copied to clipboard!");
//     }
//   };

//   const handleLogin = (user: any) => {
//     // Login is handled by the AuthModal component
//     setShowLoginModal(false);
//   };

//   const handleSignup = (user: any) => {
//     // Signup is handled by the AuthModal component
//     setShowLoginModal(false);
//   };

//   const getImageUrl = (image: any): string => {
//     if (typeof image === "string") return image;
//     if (typeof image === "object" && image.url) return image.url;
//     return "/placeholder-image.jpg";
//   };

//   useEffect(() => {
//     const checkCart = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const cartItems = await getUserCart(user.uid);
//       const exists = cartItems.some((item: any) => item.id === product.id);
//       setIsInCart(exists);
//     };

//     checkCart();
//   }, [product.id]);
//   const currentPrice = `₹${product.price.toLocaleString()}`;
//   const originalPrice = product.originalPrice
//     ? `₹${product.originalPrice.toLocaleString()}`
//     : null;
//   const discountText =
//     product.discount > 0 ? `Save ${product.discount}%` : null;

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       <div className="px-4 py-8">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
//             {/* Product Images Section */}
//             <div className="space-y-8">
//               {/* Main Product Image */}
//               <div className="bg-white rounded-2xl p-6 border border-gray-200">
//                 <div className="relative aspect-square max-w-2xl mx-auto">
//                   <Image
//                     src={getImageUrl(product.images[selectedImage])}
//                     alt={product.name}
//                     fill
//                     className={`rounded-xl object-contain transition-all duration-500 ${
//                       imageLoaded
//                         ? "opacity-100 scale-100"
//                         : "opacity-0 scale-95"
//                     }`}
//                     onLoad={() => setImageLoaded(true)}
//                     priority
//                   />
//                   {!imageLoaded && (
//                     <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl" />
//                   )}

//                   {/* Premium Badges */}
//                   <div className="absolute top-4 left-4 flex flex-col gap-2">
//                     {product.isNew && (
//                       <div className="flex items-center gap-1 bg-[#196b7a] text-white text-xs font-semibold px-3 py-2 rounded-full">
//                         <Sparkles className="w-3 h-3" />
//                         New Arrival
//                       </div>
//                     )}
//                     {product.isOnSale && discountText && (
//                       <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-semibold px-3 py-2 rounded-full">
//                         <Gem className="w-3 h-3" />
//                         {discountText}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Description Section */}

//             </div>

//             {/* Product Details Section */}
//             <div className="space-y-8">
//               {/* Header Section */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center gap-2 bg-[#196b7a]/10 text-[#196b7a] px-3 py-1 rounded-full border border-[#196b7a]/20">
//                     <Crown className="w-4 h-4" />
//                     <span className="text-sm font-semibold">Premium</span>
//                   </div>
//                   <div
//                     className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${availabilityStatus.bg} ${availabilityStatus.color} ${availabilityStatus.border}`}
//                   >
//                     <Check className="w-3 h-3" />
//                     {availabilityStatus.text}
//                   </div>
//                 </div>

//                 <h1 className="text-3xl font-bold text-gray-900 leading-tight">
//                   {product.name}
//                 </h1>

//                 {/* Rating and Reviews */}
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
//                     <div className="flex">{renderStars(product?.rating)}</div>
//                     <span className="text-sm font-semibold text-gray-700">
//                       {product?.rating}
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     ({product?.reviewCount?.toLocaleString()} reviews)
//                   </span>
//                 </div>

//                  <div className="bg-white p-6 rounded-2xl border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4 text-[#196b7a]">
//                   Product Description
//                 </h2>
//                 <p className="text-gray-700 leading-relaxed text-[15px]">
//                   {product.description}
//                 </p>
//               </div>
//               </div>

//               {/* Pricing Section */}
//               <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
//                 <div className="flex items-baseline gap-4">
//                   <span className="text-4xl font-bold text-gray-900">
//                     {currentPrice}
//                   </span>
//                   {originalPrice && (
//                     <span className="text-xl text-gray-500 line-through">
//                       {originalPrice}
//                     </span>
//                   )}
//                 </div>
//                 {discountText && (
//                   <p className="text-[#196b7a] font-semibold mt-2 text-sm">
//                     {discountText} • Inclusive of all taxes
//                   </p>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="space-y-4">
//                 <div className="flex gap-3">
//                   {isInCart ? (
//                     <button
//                       onClick={() => router.push("/cart")}
//                       className="flex-1 flex items-center justify-center gap-3 bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-md"
//                     >
//                       <ShoppingBag className="w-5 h-5" />
//                       Go to Cart
//                     </button>
//                   ) : (
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isAddingToCart}
//                       className="flex-1 flex items-center justify-center gap-3 bg-[#196b7a] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#196b7a]/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
//                     >
//                       {isAddingToCart ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           Adding...
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingBag className="w-5 h-5" />
//                           Add to Cart
//                         </>
//                       )}
//                     </button>
//                   )}

//                   <button
//                     onClick={handleBuyNow}
//                     disabled={!product.inStock || isAddingToCart}
//                     className="flex-1 flex items-center justify-center gap-3 bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
//                   >
//                     {isAddingToCart ? "Processing..." : "Buy Now"}
//                   </button>
//                 </div>
//               </div>

//               {/* Trust Features */}
//               <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
//                 <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                   <Truck className="w-7 h-7 text-[#196b7a] mx-auto mb-2" />
//                   <p className="text-sm font-semibold text-gray-900">
//                     Free Shipping
//                   </p>
//                   <p className="text-xs text-gray-600">All over India</p>
//                 </div>
//                 <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                   <Shield className="w-7 h-7 text-[#196b7a] mx-auto mb-2" />
//                   <p className="text-sm font-semibold text-gray-900">
//                     2-Year Warranty
//                   </p>
//                   <p className="text-xs text-gray-600">Quality Assured</p>
//                 </div>
//                 <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                   <RotateCcw className="w-7 h-7 text-[#196b7a] mx-auto mb-2" />
//                   <p className="text-sm font-semibold text-gray-900">
//                     30-Day Returns
//                   </p>
//                   <p className="text-xs text-gray-600">Easy Returns</p>
//                 </div>
//               </div>

//               {/* Specifications */}
//               {product.specifications &&
//                 Object.keys(product.specifications).length > 0 && (
//                   <div className="pt-6 border-t border-gray-200">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-4 text-[#196b7a]">
//                       Specifications
//                     </h3>
//                     <div className="space-y-3">
//                       {Object.entries(product.specifications).map(
//                         ([key, value]) => (
//                           <div
//                             key={key}
//                             className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl border border-gray-200"
//                           >
//                             <span className="text-sm font-medium text-gray-600 capitalize">
//                               {key.replace(/([A-Z])/g, " $1").trim()}
//                             </span>
//                             <span className="text-sm font-semibold text-gray-900">
//                               {value}
//                             </span>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//               {/* Tags */}
//               {product.tags && product.tags.length > 0 && (
//                 <div className="pt-6 border-t border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 text-[#196b7a]">
//                     Product Tags
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {product.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-2 bg-[#196b7a]/10 text-[#196b7a] rounded-lg text-sm font-medium border border-[#196b7a]/20 hover:bg-[#196b7a]/20 cursor-pointer transition-all duration-300"
//                       >
//                         #{tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Auth Modal */}
//       <AuthModal
//         isOpen={showLoginModal}
//         onClose={() => setShowLoginModal(false)}
//         onLogin={handleLogin}
//         onSignup={handleSignup}
//       />
//     </div>
//   );
// };

// export default ProductDetailPage;





"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Sparkles,
  Gem,
  Crown,
  XCircle,
  AlertCircle,
  Package,
  CheckCircle,
} from "lucide-react";
import { ReactElement } from "react";
import AuthModal from "../auth/LoginModal";
import { addToCart, getUserCart } from "@/lib/firebase/firebaseQueries";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase/firebaseConfig";
import { ProductDetailProps } from "@/types";

const ProductDetailPage: React.FC<ProductDetailProps> = ({
  product,
}): ReactElement => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const router = useRouter();

  // Check if user is logged in
  const isUserLoggedIn = () => {
    return localStorage.getItem("siyana-user-token") !== null;
  };

  // Stock status with icons
  const availabilityStatus = useMemo(() => {
    const isOutOfStock = Number(product.stock) < 1 || !product.inStock;
    const isLowStock = !isOutOfStock && Number(product.stock) < 10;

    if (isOutOfStock) {
      return {
        text: "Out of Stock",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        icon: <XCircle className="w-4 h-4" />,
      };
    }
    if (isLowStock) {
      return {
        text: "Low Stock",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: <AlertCircle className="w-4 h-4" />,
      };
    }
    return {
      text: "In Stock",
      color: "text-[#196b7a]",
      bg: "bg-[#196b7a]/10",
      border: "border-[#196b7a]/20",
      icon: <Check className="w-4 h-4" />,
    };
  }, [product.inStock, product.stock]);

  const handleAddToCart = async (): Promise<void> => {
    if (Number(product.stock) < 1) {
      toast.error("This product is currently out of stock");
      return;
    }

    if (!isUserLoggedIn()) {
      setShowLoginModal(true);
      return;
    }

    setIsAddingToCart(true);

    try {
      const user = auth.currentUser;
      if (!user) return;

      await addToCart(user.uid, product, quantity);

      setIsInCart(true);
      const count = Number(localStorage.getItem("siyana-cart-count") || 0);
      localStorage.setItem("siyana-cart-count", String(count + quantity));

      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = (): void => {
    if (Number(product.stock) < 1) {
      toast.error("This product is currently out of stock");
      return;
    }

    if (!isUserLoggedIn()) {
      setShowLoginModal(true);
      return;
    }

    handleAddToCart();
    setTimeout(() => {
      router.push("/cart");
    }, 500);
  };

  const toggleWishlist = (): void => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      !isWishlisted ? "Added to wishlist" : "Removed from wishlist",
    );
  };

  const getImageUrl = (image: any): string => {
    if (typeof image === "string") return image;
    if (typeof image === "object" && image.url) return image.url;
    return "/images/placeholder.jpg";
  };

  useEffect(() => {
    const checkCart = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const cartItems = await getUserCart(user.uid);
      const exists = cartItems.some((item: any) => item.id === product.id);
      setIsInCart(exists);
    };

    checkCart();
  }, [product.id]);

  const currentPrice = `₹${product.price.toLocaleString()}`;
  const originalPrice = product.originalPrice
    ? `₹${product.originalPrice.toLocaleString()}`
    : null;
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8">
            {/* Product Images Section */}
            <div className="space-y-6">
              {/* Main Product Image */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 ">
                <div className="relative aspect-square max-w-2xl mx-auto">
                  <Image
                    src={getImageUrl(product.images[selectedImage])}
                    alt={product.name}
                    fill
                    className={`rounded-xl object-contain transition-all duration-500 ${
                      imageLoaded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl" />
                  )}

                  {/* Premium Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <div className="flex items-center gap-1 bg-[#196b7a] text-white text-xs font-semibold px-3 py-2 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        New Arrival
                      </div>
                    )}
                    {discountPercentage > 0 && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-semibold px-3 py-2 rounded-full">
                        <Gem className="w-3 h-3" />
                        {discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={toggleWishlist}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <Heart
                      size={20}
                      className={`${
                        isWishlisted
                          ? "text-red-500 fill-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Image Thumbnails - Only show if multiple images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === index
                          ? "border-[#196b7a] scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={getImageUrl(image)}
                        alt={`${product.name} - View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description Section */}
           
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Header Section */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* <div className="flex items-center gap-2 bg-[#196b7a]/10 text-[#196b7a] px-3 py-1.5 rounded-full border border-[#196b7a]/20">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-semibold">Premium</span>
                  </div> */}
                  {/* <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${availabilityStatus.bg} ${availabilityStatus.color} ${availabilityStatus.border}`}
                  >
                    {availabilityStatus.icon}
                    {availabilityStatus.text}
                  </div> */}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Category */}
                {product.category && (
                  <p className="text-gray-600 text-sm sm:text-base">
                    Category:{" "}
                    <span className="font-medium">{product.category.name}</span>
                  </p>
                )}
              </div>
   <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 text-[#196b7a] flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Description
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-[15px]">
                  {product.description}
                </p>
              </div>
              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 rounded-2xl border border-gray-200">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {currentPrice}
                  </span>
                  {originalPrice && (
                    <>
                      <span className="text-lg sm:text-xl text-gray-500 line-through">
                        {originalPrice}
                      </span>
                      {discountPercentage > 0 && (
                        <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                          Save {discountPercentage}%
                        </span>
                      )}
                    </>
                  )}
                </div>
                {/* <p className="text-[#196b7a] font-medium mt-2 text-sm">
                  Inclusive of all taxes • Free Shipping
                </p> */}
              </div>

              {/* Quantity Selector */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-medium min-w-12 text-center bg-white border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {isInCart ? (
                    <button
                      onClick={() => router.push("/cart")}
                      className="flex-1 flex items-center justify-center gap-3 bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-md"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || Number(product.stock) < 1}
                      className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                        Number(product.stock) < 1
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#196b7a] text-white hover:bg-[#196b7a]/90"
                      }`}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Adding...
                        </>
                      ) : Number(product.stock) < 1 ? (
                        <>
                          <XCircle className="w-5 h-5" />
                          Out of Stock
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock || isAddingToCart}
                    className="flex-1 flex items-center justify-center gap-3 bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
                  >
                    {isAddingToCart ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>

              {/* Trust Features */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#196b7a] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">
                    Certified Quality
                  </p>
                  <p className="text-xs text-gray-600">BIS Hallmarked</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <Gem className="w-6 h-6 sm:w-7 sm:h-7 text-[#196b7a] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">
                    Diamond Certificate
                  </p>
                  <p className="text-xs text-gray-600">IGI/GIA Certified</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#196b7a] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">
                    Lifetime Polish
                  </p>
                  <p className="text-xs text-gray-600">Free Maintenance</p>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications &&
                Object.keys(product.specifications).length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-[#196b7a]">
                      Specifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 px-4 bg-gray-50 rounded-xl border border-gray-200"
                          >
                            <span className="text-sm font-medium text-gray-600 capitalize mb-1 sm:mb-0">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              {value}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-[#196b7a]">
                    Product Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-[#196b7a]/10 text-[#196b7a] rounded-lg text-sm font-medium border border-[#196b7a]/20 hover:bg-[#196b7a]/20 cursor-pointer transition-all duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => setShowLoginModal(false)}
        onSignup={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default ProductDetailPage;

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

// "use client";

// import { useState, useMemo, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   ShoppingBag,
//   Heart,
//   Truck,
//   Shield,
//   RotateCcw,
//   Check,
//   Sparkles,
//   Gem,
//   Crown,
//   XCircle,
//   AlertCircle,
//   Package,
//   CheckCircle,
//   Loader2,
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
//   const [imageError, setImageError] = useState<boolean>(false);
//   const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
//   const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
//   const [isInCart, setIsInCart] = useState<boolean>(false);
//   const router = useRouter();

//   // Check if user is logged in
//   const isUserLoggedIn = () => {
//     return localStorage.getItem("siyana-user-token") !== null;
//   };

//   // Stock status with icons
//   const availabilityStatus = useMemo(() => {
//     const isOutOfStock = Number(product.stock) < 1 || !product.inStock;
//     const isLowStock = !isOutOfStock && Number(product.stock) < 10;

//     if (isOutOfStock) {
//       return {
//         text: "Out of Stock",
//         color: "text-red-600",
//         bg: "bg-red-50",
//         border: "border-red-200",
//         icon: <XCircle className="w-4 h-4" />,
//       };
//     }
//     if (isLowStock) {
//       return {
//         text: "Low Stock",
//         color: "text-amber-600",
//         bg: "bg-amber-50",
//         border: "border-amber-200",
//         icon: <AlertCircle className="w-4 h-4" />,
//       };
//     }
//     return {
//       text: "In Stock",
//       color: "text-[#196b7a]",
//       bg: "bg-[#196b7a]/10",
//       border: "border-[#196b7a]/20",
//       icon: <Check className="w-4 h-4" />,
//     };
//   }, [product.inStock, product.stock]);

//   const handleAddToCart = async (): Promise<void> => {
//     if (Number(product.stock) < 1) {
//       toast.error("This product is currently out of stock");
//       return;
//     }

//     if (!isUserLoggedIn()) {
//       setShowLoginModal(true);
//       return;
//     }

//     setIsAddingToCart(true);

//     try {
//      const user = auth.currentUser;

// if (!user) {
//   toast.error("User not authenticated. Please login again.");
//   setIsAddingToCart(false);
//   return;
// }

//       await addToCart(user.uid, product, quantity);

//       setIsInCart(true);
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
//     if (Number(product.stock) < 1) {
//       toast.error("This product is currently out of stock");
//       return;
//     }

//     if (!isUserLoggedIn()) {
//       setShowLoginModal(true);
//       return;
//     }

//     handleAddToCart();
//     setTimeout(() => {
//       router.push("/cart");
//     }, 500);
//   };

//   const toggleWishlist = (): void => {
//     setIsWishlisted(!isWishlisted);
//     toast.success(
//       !isWishlisted ? "Added to wishlist" : "Removed from wishlist",
//     );
//   };

//   const getImageUrl = (image: unknown): string => {
//     if (typeof image === "string") return image;
//     if (
//       image &&
//       typeof image === "object" &&
//       "url" in image &&
//       typeof image.url === "string"
//     ) {
//       return image.url;
//     }
//     return "/images/placeholder.jpg";
//   };

//   useEffect(() => {
//     setImageLoaded(false);
//     setImageError(false);
//   }, [product.id, selectedImage]);

//   useEffect(() => {
//     const checkCart = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const cartItems = await getUserCart(user.uid);
//       const exists = cartItems.some((item) => item.id === product.id);
//       setIsInCart(exists);
//     };

//     checkCart();
//   }, [product.id]);

//   const rawPrice = product.price as unknown;
//   const priceValue = Number(rawPrice);
//   const hasPrice =
//     rawPrice !== null &&
//     rawPrice !== undefined &&
//     rawPrice !== "" &&
//     Number.isFinite(priceValue);
//   const rawOriginalPrice = product.originalPrice as unknown;
//   const originalPriceValue = Number(rawOriginalPrice);
//   const hasOriginalPrice =
//     rawOriginalPrice !== null &&
//     rawOriginalPrice !== undefined &&
//     rawOriginalPrice !== "" &&
//     Number.isFinite(originalPriceValue);
//   const currentPrice = hasPrice
//     ? `₹${priceValue.toLocaleString()}`
//     : null;
//   const productWeight =
//     product.weight ??
//     product.specifications?.Weight ??
//     product.specifications?.weight;
//   const originalPrice = hasOriginalPrice
//     ? `₹${originalPriceValue.toLocaleString()}`
//     : null;
//   const discountPercentage = hasOriginalPrice && hasPrice
//     ? Math.round(
//         ((originalPriceValue - priceValue) / originalPriceValue) * 100,
//       )
//     : 0;

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       <div className="px-0 py-0 sm:px-4 sm:py-8">
//         <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl sm:border sm:border-gray-100">
//           <div className="grid grid-cols-1 gap-8 p-0 lg:grid-cols-2 lg:gap-12 sm:p-6 lg:p-8">
//             {/* Product Images Section */}
//             <div className="space-y-6">
//               {/* Main Product Image */}
//               <div className="bg-white p-0 sm:rounded-2xl sm:p-6">
//                 <div className="relative aspect-square w-full">
//                   <Image
//                     src={
//                       imageError
//                         ? "/images/placeholder.jpg"
//                         : getImageUrl(product.images[selectedImage])
//                     }
//                     alt={product.name}
//                     fill
//                     className={`object-contain transition-all duration-500 sm:rounded-xl ${
//                       imageLoaded
//                         ? "opacity-100 scale-100"
//                         : "opacity-0 scale-95"
//                     }`}
//                     onLoad={() => setImageLoaded(true)}
//                     onError={() => {
//                       setImageError(true);
//                       setImageLoaded(true);
//                     }}
//                     quality={75}
//                     sizes="(max-width: 1024px) 100vw, 50vw"
//                     priority
//                   />
//                   {!imageLoaded && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-gray-100 sm:rounded-xl">
//                       <Loader2
//                         className="w-10 h-10 text-[#196b7a] animate-spin"
//                         aria-label="Loading product image"
//                       />
//                     </div>
//                   )}

//                   {/* Premium Badges */}
//                   <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
//                     {product.isNew && (
//                       <div className="flex items-center gap-1 bg-[#196b7a] text-white text-xs font-semibold px-3 py-2 rounded-full">
//                         <Sparkles className="w-3 h-3" />
//                         New Arrival
//                       </div>
//                     )}
//                     {discountPercentage > 0 && (
//                       <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-semibold px-3 py-2 rounded-full">
//                         <Gem className="w-3 h-3" />
//                         {discountPercentage}% OFF
//                       </div>
//                     )}
//                   </div>

//                   {/* Wishlist Button */}
//                   <button
//                     onClick={toggleWishlist}
//                     className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
//                   >
//                     <Heart
//                       size={20}
//                       className={`${
//                         isWishlisted
//                           ? "text-red-500 fill-red-500"
//                           : "text-gray-600"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               </div>

//               {/* Image Thumbnails - Only show if multiple images */}
//               {product.images && product.images.length > 1 && (
//                 <div className="flex gap-2 overflow-x-auto px-4 py-2 sm:px-0">
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
//                         selectedImage === index
//                           ? "border-[#196b7a] scale-105"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                     >
//                       <Image
//                         src={getImageUrl(image)}
//                         alt={`${product.name} - View ${index + 1}`}
//                         fill
//                         quality={60}
//                         className="object-cover"
//                         sizes="(max-width: 640px) 64px, 80px"
//                         loading="lazy"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Description Section */}

//             </div>

//             {/* Product Details Section */}
//             <div className="space-y-6 p-4 sm:p-0">
//               {/* Header Section */}
//               <div className="space-y-4">
//                 <div className="flex flex-wrap items-center gap-2">

//                 </div>

//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
//                   {product.name}
//                 </h1>

//                 {/* Category */}
//                 {product.category && (
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     Category:{" "}
//                     <span className="font-medium">{product.category.name}</span>
//                   </p>
//                 )}
//                 {productWeight !== undefined &&
//                   productWeight !== null &&
//                   productWeight !== "" && (
//                     <p className="text-gray-600 text-sm sm:text-base">
//                       Weight: <span className="font-medium">{productWeight}</span>
//                     </p>
//                   )}
//               </div>
//    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 text-[#196b7a] flex items-center gap-2">
//                   <Package className="w-5 h-5" />
//                   Product Description
//                 </h2>
//                 <p className="text-gray-700 leading-relaxed text-sm sm:text-[15px]">
//                   {product.description}
//                 </p>
//               </div>
//               {/* Pricing Section */}
//               {hasPrice && (
//               <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 rounded-2xl border border-gray-200">
//                 <div className="flex items-baseline gap-4">
//                   <span className="text-3xl sm:text-4xl font-bold text-gray-900">
//                     {currentPrice}
//                   </span>
//                   {originalPrice && (
//                     <>
//                       <span className="text-lg sm:text-xl text-gray-500 line-through">
//                         {originalPrice}
//                       </span>
//                       {discountPercentage > 0 && (
//                         <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
//                           Save {discountPercentage}%
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </div>
//                 {/* <p className="text-[#196b7a] font-medium mt-2 text-sm">
//                   Inclusive of all taxes • Free Shipping
//                 </p> */}
//               </div>
//               )}

//               {/* Quantity Selector */}
//               <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-700 font-medium">Quantity:</span>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       disabled={quantity <= 1}
//                       className="p-2 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors rounded-l-lg"
//                     >
//                       −
//                     </button>
//                     <span className="px-4 py-2 font-medium min-w-12 text-center bg-white border-x border-gray-300">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="space-y-3">
//                 <div className="flex flex-col sm:flex-row gap-3">
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
//                       disabled={isAddingToCart || Number(product.stock) < 1}
//                       className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md ${
//                         Number(product.stock) < 1
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#196b7a] text-white hover:bg-[#196b7a]/90"
//                       }`}
//                     >
//                       {isAddingToCart ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           Adding...
//                         </>
//                       ) : Number(product.stock) < 1 ? (
//                         <>
//                           <XCircle className="w-5 h-5" />
//                           Out of Stock
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

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-gray-200">
//                 <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                   <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#196b7a] mx-auto mb-2" />
//                   <p className="text-sm font-semibold text-gray-900">
//                     Certified Quality
//                   </p>
//                   <p className="text-xs text-gray-600">BIS Hallmarked</p>
//                 </div>
//                 <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                   <Gem className="w-6 h-6 sm:w-7 sm:h-7 text-[#196b7a] mx-auto mb-2" />
//                   <p className="text-sm font-semibold text-gray-900">
//                     Diamond Certificate
//                   </p>
//                   <p className="text-xs text-gray-600">IGI/GIA Certified</p>
//                 </div>
//                 <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                   <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#196b7a] mx-auto mb-2" />
//                   <p className="text-sm font-semibold text-gray-900">
//                     Lifetime Polish
//                   </p>
//                   <p className="text-xs text-gray-600">Free Maintenance</p>
//                 </div>
//               </div>

//               {/* Specifications */}
//               {product.specifications &&
//                 Object.keys(product.specifications).length > 0 && (
//                   <div className="pt-6 border-t border-gray-200">
//                     <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-[#196b7a]">
//                       Specifications
//                     </h3>
//                     <div className="space-y-3">
//                       {Object.entries(product.specifications).map(
//                         ([key, value]) => (
//                           <div
//                             key={key}
//                             className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 px-4 bg-gray-50 rounded-xl border border-gray-200"
//                           >
//                             <span className="text-sm font-medium text-gray-600 capitalize mb-1 sm:mb-0">
//                               {key.replace(/([A-Z])/g, " $1").trim()}
//                             </span>
//                             <span className="text-sm font-semibold text-gray-900">
//                               {value}
//                             </span>
//                           </div>
//                         ),
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
//                         className="px-3 py-1.5 bg-[#196b7a]/10 text-[#196b7a] rounded-lg text-sm font-medium border border-[#196b7a]/20 hover:bg-[#196b7a]/20 cursor-pointer transition-all duration-300"
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
//         onLogin={() => setShowLoginModal(false)}
//         onSignup={() => setShowLoginModal(false)}
//       />
//     </div>
//   );
// };

// export default ProductDetailPage;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  Gem,
  Crown,
  Package,
  CheckCircle,
  Loader2,
  ChevronRight,
  Home,
  ZoomIn,
  Star,
} from "lucide-react";
import { ReactElement } from "react";
import AuthModal from "../auth/LoginModal";
import { addToCart, getUserCart } from "@/lib/firebase/firebaseQueries";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase/firebaseConfig";
import { ProductDetailProps } from "@/types";
import { useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
const ProductDetailPage: React.FC<ProductDetailProps> = ({
  product,
}): ReactElement => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [showBranchModal, setShowBranchModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "specifications" | "care"
  >("details");
  const router = useRouter();

  type RelatedProduct = {
    id: string;
    name: string;
    images?: unknown[];
    image?: string;
    price?: number | string;
    originalPrice?: number | string;
    category?:
      | {
          id?: string;
          name?: string;
        }
      | string;
    categoryId?: string | number;
    inStock?: boolean;
    stock?: number;
  };

  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchRelatedProducts = async () => {
      setLoadingRelated(true);

      try {
        const snapshot = await getDocs(collection(db, "products"));

        const currentCategory =
          typeof product.category === "object"
            ? product.category?.id || product.category?.name
            : product.category;

        const currentCategoryId = product.categoryId;

        const related = snapshot.docs
          .map(
            (document) =>
              ({
                id: document.id,
                ...document.data(),
              } as RelatedProduct),
          )
          .filter((item) => {
            if (item.id === String(product.id)) return false;

            const itemCategory =
              typeof item.category === "object"
                ? item.category?.id || item.category?.name
                : item.category;

            const matchesCategory =
              (currentCategoryId && item.categoryId === currentCategoryId) ||
              (currentCategory &&
                itemCategory &&
                String(itemCategory).toLowerCase() ===
                  String(currentCategory).toLowerCase());

            return (
              matchesCategory &&
              item.inStock !== false &&
              Number(item.stock ?? 1) > 0
            );
          })
          .slice(0, 4);

        if (!cancelled) {
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to fetch related products:", error);

        if (!cancelled) {
          setRelatedProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingRelated(false);
        }
      }
    };

    fetchRelatedProducts();

    return () => {
      cancelled = true;
    };
  }, [product.id, product.category, product.categoryId]);

  // Check if user is logged in
  const isUserLoggedIn = () => {
    return localStorage.getItem("siyana-user-token") !== null;
  };

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

      if (!user) {
        toast.error("User not authenticated. Please login again.");
        setIsAddingToCart(false);
        return;
      }

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

  const handleBuyNow = async (): Promise<void> => {
    if (!isUserLoggedIn()) {
      setShowLoginModal(true);
      return;
    }

    setIsAddingToCart(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        toast.error("User not authenticated. Please login again.");
        return;
      }

      await addToCart(user.uid, product, quantity);
      setIsInCart(true);
      const count = Number(localStorage.getItem("siyana-cart-count") || 0);
      localStorage.setItem("siyana-cart-count", String(count + quantity));
      toast.success(`${product.name} added to cart!`);
      router.push("/cart");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const BRANCHES = [
  {
    name: "Vengara",
    whatsapp: "918938916916",
    display: "+91 89389 16916",
  },
  {
    name: "Othukkungal",
    whatsapp: "917232916916",
    display: "+91 72329 16916",
  },
  {
    name: "Kizhisseri",
    whatsapp: "917699916916",
    display: "+91 76999 16916",
  },
] as const;

  const getImageUrl = (image: unknown): string => {
    if (typeof image === "string") return image;
    if (
      image &&
      typeof image === "object" &&
      "url" in image &&
      typeof image.url === "string"
    ) {
      return image.url;
    }
    return "/images/placeholder.jpg";
  };

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [product.id, selectedImage]);

  useEffect(() => {
    const checkCart = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const cartItems = await getUserCart(user.uid);
      const exists = cartItems.some((item) => item.id === product.id);
      setIsInCart(exists);
    };

    checkCart();
  }, [product.id]);

  const rawPrice = product.price as unknown;
  const priceValue = Number(rawPrice);
  const hasPrice =
    rawPrice !== null &&
    rawPrice !== undefined &&
    rawPrice !== "" &&
    Number.isFinite(priceValue);
  const rawOriginalPrice = product.originalPrice as unknown;
  const originalPriceValue = Number(rawOriginalPrice);
  const hasOriginalPrice =
    rawOriginalPrice !== null &&
    rawOriginalPrice !== undefined &&
    rawOriginalPrice !== "" &&
    Number.isFinite(originalPriceValue);
  const currentPrice = hasPrice ? `₹${priceValue.toLocaleString()}` : null;
  const productWeight =
    product.weight ??
    product.specifications?.Weight ??
    product.specifications?.weight;
  const originalPrice = hasOriginalPrice
    ? `₹${originalPriceValue.toLocaleString()}`
    : null;
  const discountPercentage =
    hasOriginalPrice && hasPrice
      ? Math.round(
          ((originalPriceValue - priceValue) / originalPriceValue) * 100,
        )
      : 0;

  const safeImages = product.images ?? [];
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-800">
      <div className="mx-auto max-w-[1500px] px-3 py-4 sm:px-5 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm"
        >
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1 transition hover:text-[#176b78]"
          >
            <Home className="h-4 w-4" /> Home
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Jewellery</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{product.category?.name || "Collection"}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="max-w-[180px] truncate font-medium text-slate-700">
            {product.name}
          </span>
        </nav>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-[#e8e2d7] bg-white shadow-sm">
              <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#176b78] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" /> New Arrival
                  </span>
                )}

                {discountPercentage > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#a86b19] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    <Gem className="h-3.5 w-3.5" /> {discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="relative aspect-square w-full bg-white">
                <Image
                  src={
                    imageError
                      ? "/images/placeholder.jpg"
                      : getImageUrl(safeImages[selectedImage])
                  }
                  alt={product.name}
                  fill
                  priority
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(true);
                  }}
                  className={`object-cover transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  quality={85}
                />

                {!imageLoaded && (
                  <div className="absolute inset-0 grid place-items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#176b78]" />
                  </div>
                )}

                <div className="absolute bottom-4 right-4 rounded-full border border-slate-100 bg-white/90 p-2.5 text-slate-700 shadow-sm">
                  <ZoomIn className="h-5 w-5" />
                </div>
              </div>
            </div>
            {safeImages.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                {safeImages.map((image, index) => (
                  <button
                    key={`${product.id}-image-${index}`}
                    onClick={() => {
                      setSelectedImage(index);
                      setImageLoaded(false);
                      setImageError(false);
                    }}
                    aria-label={`View image ${index + 1}`}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition ${
                      selectedImage === index
                        ? "border-[#176b78] ring-2 ring-[#176b78]/10"
                        : "border-[#e8e2d7] hover:border-[#b8cfd0]"
                    }`}
                  >
                    <Image
                      src={getImageUrl(image)}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-contain p-1.5"
                      sizes="(max-width: 640px) 25vw, 150px"
                      quality={70}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product information */}
          <div className="min-w-0">
            <div className="rounded-2xl border border-[#ece7df] bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#f5ead8] px-3 py-1 text-xs font-semibold tracking-wide text-[#98601b]">
                  {product.category?.name || "SIYANA COLLECTION"}
                </span>
              </div>

              <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-[#172b43] sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                <span>
                  Product code:{" "}
                  <span className="font-medium text-slate-700">
                    {product.id}
                  </span>
                </span>
                {productWeight !== undefined &&
                  productWeight !== null &&
                  productWeight !== "" && (
                    <>
                      <span className="hidden text-slate-300 sm:inline">|</span>
                      <span>
                        Weight:{" "}
                        <span className="font-medium text-slate-700">
                          {String(productWeight)}
                        </span>
                      </span>
                    </>
                  )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span
                  className="flex items-center gap-0.5 text-[#d99020]"
                  aria-label="Product rating"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                <span className="font-semibold text-[#172b43]">
                  Premium craftsmanship
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">Made to be treasured</span>
              </div>

              {product.description && (
                <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                  {product.description}
                </p>
              )}

              {/* Quick specifications */}
              <div className="mt-6 grid grid-cols-1 gap-x-6 divide-y divide-[#eee9e1] rounded-xl border border-[#e9e5de] bg-[#fdfcf9] px-4 sm:grid-cols-2 sm:divide-y-0 sm:px-5">
                <div className="flex items-center gap-3 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f1f1] text-[#176b78]">
                    <Gem className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">Purity / Material</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      {product.specifications?.Purity ||
                        product.specifications?.purity ||
                        "See product details"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-[#eee9e1] py-3.5 sm:border-l sm:pl-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f7eddd] text-[#a66a1c]">
                    <Shield className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">Quality assurance</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      Quality checked
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-[#eee9e1] py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f1f1] text-[#176b78]">
                    <Package className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      {product.category?.name || "Jewellery"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-[#eee9e1] py-3.5 sm:border-l sm:pl-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f7eddd] text-[#a66a1c]">
                    <Crown className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">Collection</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      SIYANA Gold & Diamonds
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mt-5 rounded-xl border border-[#eee2ce] bg-gradient-to-r from-[#fbf5e9] to-[#fffdf8] p-4 sm:p-5">
                {hasPrice ? (
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9b671f]">
                        Special price
                      </p>
                      <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                        <span className="text-3xl font-bold tracking-tight text-[#172b43] sm:text-4xl">
                          {currentPrice}
                        </span>
                        {originalPrice && (
                          <span className="text-base text-slate-400 line-through">
                            {originalPrice}
                          </span>
                        )}
                      </div>
                      {discountPercentage > 0 && (
                        <span className="mt-1 inline-block text-xs font-semibold text-emerald-700">
                          You save {discountPercentage}% on this product
                        </span>
                      )}
                    </div>
                    <span className="pb-1 text-xs text-slate-500">
                      Taxes and delivery as applicable
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-[#9b5b0d]">
                        Price on Request
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Contact us for the latest price and availability.
                      </p>
                    </div>
             <button
  onClick={() => setShowBranchModal(true)}
  className="rounded-lg border border-[#b67b2a] px-4 py-2.5 text-sm font-semibold text-[#935a13] transition hover:bg-[#f5ead8]"
>
  Get Latest Price
</button>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e9e5de] px-4 py-3.5">
                <span className="text-sm font-medium text-slate-700">
                  Quantity
                </span>
                <div className="flex h-10 items-center overflow-hidden rounded-lg border border-slate-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="h-full w-10 text-slate-600 transition hover:bg-slate-50 disabled:text-slate-300"
                  >
                    −
                  </button>
                  <span className="grid h-full min-w-12 place-items-center border-x border-slate-200 px-3 text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(Number(product.stock) || 99, quantity + 1),
                      )
                    }
                    disabled={quantity >= Number(product.stock)}
                    aria-label="Increase quantity"
                    className="h-full w-10 text-slate-600 transition hover:bg-slate-50 disabled:text-slate-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {isInCart ? (
                  <button
                    onClick={() => router.push("/cart")}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    <ShoppingBag className="h-5 w-5" /> Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || Number(product.stock) < 1}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#176b78] px-5 py-3 font-semibold text-white shadow-md shadow-[#176b78]/15 transition hover:bg-[#105966] disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {isAddingToCart ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ShoppingBag className="h-5 w-5" />
                    )}
                    {isAddingToCart
                      ? "Adding..."
                      : Number(product.stock) < 1
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                )}
                <button
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e7dccb] bg-[#f8f2e8] px-5 py-3 font-semibold text-[#172b43] shadow-sm transition hover:bg-[#f1e6d5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Sparkles className="h-5 w-5 text-[#a66a1c]" />{" "}
                  {isAddingToCart ? "Processing..." : "Buy Now"}
                </button>
              </div>

              {/* Trust row */}
            </div>
          </div>
        </section>


        {/* You May Also Like */}
        <section className="mt-8 sm:mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#a87936]">
                Curated for you
              </p>

              <h2 className="font-serif text-lg font-semibold text-[#172b43] sm:text-xl">
                You May Also Like
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Discover more beautiful pieces from this collection.
              </p>
            </div>

            {product.category?.name && (
              <button
                onClick={() =>
                  router.push(
                    `/category/${encodeURIComponent(product.category.name)}`,
                  )
                }
                className="hidden items-center gap-1 whitespace-nowrap text-sm font-semibold text-[#176b78] transition hover:text-[#a87936] sm:flex"
              >
                View Collection
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
     

          {loadingRelated ? (
            <div className="flex min-h-48 items-center justify-center rounded-2xl border border-[#eee8df] bg-white">
              <Loader2 className="h-7 w-7 animate-spin text-[#176b78]" />
              <span className="ml-3 text-sm text-slate-500">
                Finding beautiful pieces for you...
              </span>
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-3 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
              {relatedProducts.map((item) => {
                const imageValue = item.images?.[0] ?? item.image;
                const imageUrl = getImageUrl(imageValue);

                const price =
                  item.price !== null &&
                  item.price !== undefined &&
                  item.price !== "" &&
                  Number.isFinite(Number(item.price))
                    ? Number(item.price)
                    : null;

                const originalPrice =
                  item.originalPrice !== null &&
                  item.originalPrice !== undefined &&
                  item.originalPrice !== "" &&
                  Number.isFinite(Number(item.originalPrice))
                    ? Number(item.originalPrice)
                    : null;

                return (
                  <article
                    key={item.id}
                    className="group w-[145px] min-w-[145px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#e9e3d9] bg-white transition hover:border-[#c6a66b] hover:shadow-md sm:w-auto sm:min-w-0"
                  >
                    {/* Product Image */}
                    <button
                      type="button"
                      onClick={() => router.push(`/product/${item.id}`)}
                      aria-label={`View ${item.name}`}
                      className="relative block w-full overflow-hidden bg-white"
                    >
                      <div className="relative aspect-square w-full">
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 155px, 20vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </button>

                    {/* Product Information */}
                    <div className="p-2">
                      <h3 className="line-clamp-1 text-sm font-semibold text-[#172b43]">
                        {item.name}
                      </h3>

                      <div className="mt-1 flex flex-wrap items-baseline gap-1">
                        {price !== null ? (
                          <>
                            <span className="text-sm font-bold text-[#172b43]">
                              ₹{price.toLocaleString("en-IN")}
                            </span>

                            {originalPrice !== null &&
                              originalPrice > price && (
                                <span className="text-[10px] text-slate-400 line-through">
                                  ₹{originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                          </>
                        ) : (
                          <span className="text-[11px] font-semibold text-[#a87936]">
                            Price on Request
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => router.push(`/product/${item.id}`)}
                        className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-[#176b78] px-1 py-1.5 text-sm font-medium text-[#176b78] transition hover:bg-[#176b78] hover:text-white"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        View Product
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#dcd4c7] bg-white px-5 py-10 text-center">
              <p className="font-serif text-lg font-semibold text-[#172b43]">
                More beautiful pieces are coming soon
              </p>

              <p className="mt-2 text-sm text-slate-500">
                We couldn't find other available products in this category.
              </p>
            </div>
          )}

          {product.category?.name && (
            <button
              onClick={() =>
                router.push(
                  `/category/${encodeURIComponent(product.category.name)}`,
                )
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b78] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#125763] sm:hidden"
            >
              Explore More Products
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </section>

        <div className="mt-5 grid grid-cols-3 divide-x divide-[#e7dfd2] rounded-xl border border-[#eee9e1] bg-white py-3">
          <div className="px-2 text-center">
            <Shield className="mx-auto h-5 w-5 text-[#176b78] sm:h-6 sm:w-6" />
            <p className="mt-1.5 text-[11px] font-semibold text-slate-800 sm:text-xs">
              Quality Checked
            </p>
            <p className="mt-0.5 hidden text-[10px] text-slate-500 sm:block">
              Carefully selected
            </p>
          </div>
          <div className="px-2 text-center">
            <Truck className="mx-auto h-5 w-5 text-[#176b78] sm:h-6 sm:w-6" />
            <p className="mt-1.5 text-[11px] font-semibold text-slate-800 sm:text-xs">
              Delivery Support
            </p>
            <p className="mt-0.5 hidden text-[10px] text-slate-500 sm:block">
              Order assistance
            </p>
          </div>
          <div className="px-2 text-center">
            <RotateCcw className="mx-auto h-5 w-5 text-[#176b78] sm:h-6 sm:w-6" />
            <p className="mt-1.5 text-[11px] font-semibold text-slate-800 sm:text-xs">
              Customer Care
            </p>
            <p className="mt-0.5 hidden text-[10px] text-slate-500 sm:block">
              Here to help
            </p>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => setShowLoginModal(false)}
        onSignup={() => setShowLoginModal(false)}
      />


{showBranchModal && (
  <div
    className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
    onClick={() => setShowBranchModal(false)}
  >
    <div
      className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#172b43]">
            Select a Branch
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose your nearest branch to chat on WhatsApp for the latest price.
          </p>
        </div>
        <button
          onClick={() => setShowBranchModal(false)}
          aria-label="Close"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 space-y-2.5">
        {BRANCHES.map((branch) => {
          const message = encodeURIComponent(
            `Hi, I'm interested in "${product.name}" (Product code: ${product.id}). Please share the latest price and availability.`
          );
          const whatsappUrl = `https://wa.me/${branch.whatsapp}?text=${message}`;

          return (
            <a
              key={branch.name}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowBranchModal(false)}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#e9e5de] bg-[#fdfcf9] px-4 py-3.5 transition hover:border-[#176b78] hover:bg-[#f0f7f8]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                  {/* WhatsApp icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#172b43]">
                    {branch.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {branch.display}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
            </a>
          );
        })}
      </div>

      <button
        onClick={() => setShowBranchModal(false)}
        className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </main>
  );
};

export default ProductDetailPage;

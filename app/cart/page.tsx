// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   ShoppingBag,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowRight,
//   CreditCard,
//   Shield,
//   Truck,
//   RotateCcw,
//   Heart,
//   Sparkles,
//   MessageCircle,
// } from "lucide-react";
// import Footer from "@/components/layout/Footer";
// import { CartItem } from "@/types";
// import { ReactElement } from "react";
// import NavbarWrapper from "@/components/layout/NavbarWrapper";
// import Image from "next/image";
// import { auth } from "@/lib/firebase/firebaseConfig";
// import {
//   addToWishlist,
//   clearCart,
//   getUserCart,
//   removeFromCart,
//   updateCartQuantity,
// } from "@/lib/firebase/firebaseQueries";
// import { onAuthStateChanged } from "firebase/auth";

// export default function CartPage(): ReactElement {
//   const [cart, setCart] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<any>(null);
//   const [open, setOpen] = useState<boolean>(false)
//   const [orderId, setOrderId] = useState<string>('')
//   const [removingItem, setRemovingItem] = useState<string | number | null>(
//     null
//   );
//   const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
//   useEffect(() => {
//     setLoading(true)
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setUser(firebaseUser);
//       if (!firebaseUser) {
//         setLoading(false);
//         return;
//       }

//       console.log("User Logged In:", firebaseUser.uid);
//       const data = await getUserCart(firebaseUser.uid);
//       setCart(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const savedCart = localStorage.getItem("siyana-cart");
//     if (savedCart) setCart(JSON.parse(savedCart));
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       localStorage.setItem("siyana-cart", JSON.stringify(cart));
//     }
//   }, [cart, loading]);

//   const changeQuantity = async (productId: string, newQty: number) => {
//     if (!user || newQty < 1) return;

//     await updateCartQuantity(user.uid, productId, newQty);

//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === productId ? { ...item, quantity: newQty } : item
//       )
//     );
//   };

//   const handleRemove = async (productId: string) => {
//     if (!user) return;

//     await removeFromCart(user.uid, productId);
//     setCart((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const handleClearCart = async () => {
//     if (!user) return;

//     await clearCart(user.uid);
//     setCart([]);
//   };

//   const moveToWishlist = async (item: CartItem) => {
//     if (!user) return;
//     const success = await addToWishlist(user.uid, item);
//     if (success) {
//       await removeFromCart(user.uid, item.id);
//       setCart((prev) => prev.filter((p) => p.id !== item.id));
//     }
//   };

//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//   const subtotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const shipping = subtotal > 10000 ? 0 : 200;
//   const tax = subtotal * 0.18;
//   const grandTotal = subtotal + shipping + tax;
//   const savings = cart.reduce((total, item) => {
//     if (item.originalPrice) {
//       return total + (item.originalPrice - item.price) * item.quantity;
//     }
//     return total;
//   }, 0);

//   const generateOrderMessage = (): string => {
//     const itemsText = cart
//       .map(
//         (item) =>
//           `• ${item.name} - ${item.quantity
//           } x ₹${item.price.toLocaleString()} = ₹${(
//             item.price * item.quantity
//           ).toLocaleString()}`
//       )
//       .join("\n");

//     return `Hello! I would like to place an order:\n\n${itemsText}\n\nSubtotal: ₹${subtotal.toLocaleString()}\nShipping: ${shipping === 0 ? "Free" : `₹${shipping}`
//       }\nTax: ₹${Math.round(tax).toLocaleString()}\nTotal: ₹${Math.round(
//         grandTotal
//       ).toLocaleString()}\n\nPlease confirm my order.`;
//   };

//   const handleWhatsAppCheckout = async (): Promise<void> => {
//     if (!user) {
//       alert("Please log in to checkout");
//       return;
//     }

//     setIsCheckingOut(true);

//     try {
//       // Call checkout API
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: user.uid,
//           userEmail: user.email,
//           userName: user.displayName || "Customer",
//         }),
//       });


//       const data = await response.json();
//       console.log(data, 'hello')
//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Checkout failed");
//       }

//       // Clear local cart state
//       setCart([]);

//       // Open WhatsApp with the generated URL
//       window.open(data.whatsappUrl, "_blank");

//       // Show success message
//       setOrderId(data.orderId)
//       setOpen(true)
//       localStorage.removeItem('siyana-cart-count')
//     } catch (error: any) {
//       console.error("Checkout error:", error);
//       alert(error.message || "Failed to process checkout. Please try again.");
//     } finally {
//       setIsCheckingOut(false);
//     }
//   };

//   if (loading) {
//     return <Loading />
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
//       {open && <SuccessModal orderId={orderId} onClose={() => setOpen(false)} />}
//       <NavbarWrapper />

//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-[#196b7a] rounded-lg">
//                 <ShoppingBag className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Shopping Cart
//                 </h1>
//                 <p className="text-gray-600">
//                   {totalItems}{" "}
//                   {totalItems === 1 ? "precious item" : "precious items"} in
//                   your collection
//                 </p>
//               </div>
//             </div>
//             {cart.length > 0 && (
//               <button
//                 onClick={handleClearCart}
//                 className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300"
//               >
//                 Clear All Items
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Cart Items */}
//           <div className="lg:w-2/3">
//             {!loading && cart.length === 0 ? (
//               <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
//                 <div className="max-w-md mx-auto">
//                   <div className="w-32 h-32 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <ShoppingBag className="w-16 h-16 text-amber-600" />
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                     Your Cart Feels Light
//                   </h2>
//                   <p className="text-gray-600 mb-8 text-lg">
//                     Discover our exquisite collection of jewelry and add some
//                     sparkle to your cart
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Link
//                       href="/category/rings"
//                       className="inline-flex items-center px-8 py-4 bg-[#196b7a] text-white font-semibold rounded-xl hover:bg-[#196b7a]/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                     >
//                       <Sparkles className="mr-3 w-5 h-5" />
//                       Explore Collections
//                       <ArrowRight className="ml-2 w-5 h-5" />
//                     </Link>
//                     <Link
//                       href="/category/featured"
//                       className="inline-flex items-center px-8 py-4 border-2 border-[#196b7a] text-[#196b7a] font-semibold rounded-xl hover:bg-[#196b7a] hover:text-white transition-all duration-300"
//                     >
//                       Featured Items
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${removingItem === item.id
//                       ? "opacity-0 scale-95"
//                       : "opacity-100 scale-100"
//                       }`}
//                   >
//                     <div className="p-6">
//                       <div className="flex items-start gap-6">
//                         {/* Product Image */}
//                         <div className="relative">
//                           <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
//                             <Image
//                               src={
//                                 typeof item?.images?.[0] === "string"
//                                   ? item.images[0]
//                                   : item?.images?.[0]?.url || "/images/placeholder.jpg"
//                               }
//                               alt={item.name}
//                               width={96}
//                               height={96}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           {item.isNew && (
//                             <span className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                               New
//                             </span>
//                           )}
//                         </div>

//                         {/* Product Details */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-start justify-between mb-2">
//                             <div>
//                               <h3 className="font-semibold text-gray-900 text-lg mb-1">
//                                 {item.name}
//                               </h3>
//                               <p className="text-gray-600 text-sm mb-2">
//                                 {item?.category?.name ?? ""}
//                               </p>
//                               <div className="flex items-center gap-4">
//                                 <p className="text-amber-600 font-bold text-xl">
//                                   ₹{item.price.toLocaleString()}
//                                 </p>
//                                 {item.originalPrice &&
//                                   item.originalPrice > item.price && (
//                                     <p className="text-gray-500 line-through text-sm">
//                                       ₹{item.originalPrice.toLocaleString()}
//                                     </p>
//                                   )}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Quantity Controls */}
//                           <div className="flex items-center justify-between mt-4">
//                             <div className="flex items-center gap-3">
//                               <span className="text-sm font-medium text-gray-700">
//                                 Quantity:
//                               </span>
//                               <div className="flex items-center border border-gray-300 rounded-lg">
//                                 <button
//                                   onClick={() =>
//                                     changeQuantity(item.id, item.quantity - 1)
//                                   }
//                                   className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-l-lg"
//                                   disabled={item.quantity <= 1}
//                                 >
//                                   <Minus className="w-4 h-4" />
//                                 </button>
//                                 <span className="px-4 py-2 font-medium min-w-12 text-center bg-white border-x border-gray-300">
//                                   {item.quantity}
//                                 </span>
//                                 <button
//                                   onClick={() =>
//                                     changeQuantity(item.id, item.quantity + 1)
//                                   }
//                                   className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
//                                 >
//                                   <Plus className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             </div>

//                             {/* Actions */}
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => moveToWishlist(item)}
//                                 className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
//                                 title="Move to Wishlist"
//                               >
//                                 <Heart className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleRemove(item.id)}
//                                 className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
//                                 title="Remove from Cart"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Item Total */}
//                     <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Item Total:</span>
//                         <span className="font-bold text-lg text-gray-900">
//                           ₹{(item.price * item.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           {cart.length > 0 && (
//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <CreditCard className="w-5 h-5 text-[#196b7a]" />
//                   Order Summary
//                 </h2>

//                 {/* Price Breakdown */}
//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">
//                       Subtotal ({totalItems} items)
//                     </span>
//                     <span className="font-medium">
//                       ₹{subtotal.toLocaleString()}
//                     </span>
//                   </div>

//                   {savings > 0 && (
//                     <div className="flex justify-between text-green-600">
//                       <span>You Save</span>
//                       <span className="font-medium">
//                         ₹{Math.round(savings).toLocaleString()}
//                       </span>
//                     </div>
//                   )}

//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium">
//                       {shipping === 0 ? (
//                         <span className="text-green-600">Free</span>
//                       ) : (
//                         `₹${shipping}`
//                       )}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Tax (GST)</span>
//                     <span className="font-medium">
//                       ₹{Math.round(tax).toLocaleString()}
//                     </span>
//                   </div>

//                   <div className="border-t pt-4">
//                     <div className="flex justify-between text-lg font-bold">
//                       <span>Total Amount</span>
//                       <span className="text-[#196b7a]">
//                         ₹{Math.round(grandTotal).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Trust Badges */}
//                 <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
//                   <div className="text-center">
//                     <Truck className="w-6 h-6 text-[#196b7a] mx-auto mb-1" />
//                     <p className="text-xs font-medium text-gray-900">
//                       Free Shipping
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <Shield className="w-6 h-6 text-[#196b7a] mx-auto mb-1" />
//                     <p className="text-xs font-medium text-gray-900">
//                       Secure Payment
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <RotateCcw className="w-6 h-6 text-[#196b7a] mx-auto mb-1" />
//                     <p className="text-xs font-medium text-gray-900">
//                       Easy Returns
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <button
//                     onClick={handleWhatsAppCheckout}
//                     disabled={isCheckingOut}
//                     className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
//                   >
//                     {isCheckingOut ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         Preparing...
//                       </>
//                     ) : (
//                       <>
//                         <MessageCircle className="w-5 h-5" />
//                         Checkout via WhatsApp
//                       </>
//                     )}
//                   </button>

//                   <Link
//                     href="/"
//                     className="w-full text-center block text-[#196b7a] border-2 border-[#196b7a] py-4 rounded-xl font-semibold hover:bg-[#196b7a] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
//                   >
//                     <Plus className="w-5 h-5" />
//                     Continue Shopping
//                   </Link>
//                 </div>

//                 {/* WhatsApp Checkout Info */}
//                 <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
//                   <div className="flex items-start gap-3">
//                     <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
//                     <div>
//                       <p className="text-sm font-medium text-green-800 mb-1">
//                         WhatsApp Checkout
//                       </p>
//                       <p className="text-xs text-green-700">
//                         Your order details will be automatically sent to our
//                         team via WhatsApp for quick confirmation.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Security Note */}
//                 <p className="text-center text-xs text-gray-500 mt-4">
//                   🔒 Your order information is secure
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }






// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   ShoppingBag,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowRight,
//   CreditCard,
//   Shield,
//   Truck,
//   RotateCcw,
//   Heart,
//   Sparkles,
//   MessageCircle,
//   Store,
//   CheckCircle,
//   Gem,
// } from "lucide-react";
// import Footer from "@/components/layout/Footer";
// import { CartItem } from "@/types";
// import { ReactElement } from "react";
// import NavbarWrapper from "@/components/layout/NavbarWrapper";
// import Image from "next/image";
// import { auth } from "@/lib/firebase/firebaseConfig";
// import {
//   addToWishlist,
//   clearCart,
//   getUserCart,
//   removeFromCart,
//   updateCartQuantity,
// } from "@/lib/firebase/firebaseQueries";
// import { onAuthStateChanged } from "firebase/auth";
// import { motion, AnimatePresence } from "framer-motion";
// import Loading from "@/components/ui/Loading";

// // Define branch type
// type Branch = {
//   id: string;
//   name: string;
//   address: string;
//   phoneNumber: string;
//   whatsappNumber: string;
//   timing: string;
// };

// // Branch data
// const BRANCHES: Branch[] = [
//   {
//     id: "vengara",
//     name: "Siyana Vengara",
//     address: "Main Road, Vengara, Malappuram",
//     phoneNumber: "+919876543210",
//     whatsappNumber: "919539794665",
//     timing: "9:30 AM - 9:30 PM",
//   },
//   {
//     id: "othukkungal",
//     name: "Siyana Othukkungal",
//     address: "Othukkungal, Near Railway Station, Malappuram",
//     phoneNumber: "+919876543211",
//     whatsappNumber: "919876543211",
//     timing: "10:00 AM - 10:00 PM",
//   },
//   {
//     id: "kiyicheri",
//     name: "Siyana Kiyicheri",
//     address: "Kiyicheri Main Road, Malappuram",
//     phoneNumber: "+919876543212",
//     whatsappNumber: "919876543212",
//     timing: "9:00 AM - 9:00 PM",
//   },
// ];

// export default function CartPage(): ReactElement {
//   const [cart, setCart] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<any>(null);
//   const [open, setOpen] = useState<boolean>(false);
//   const [orderId, setOrderId] = useState<string>("");
//   const [removingItem, setRemovingItem] = useState<string | number | null>(
//     null
//   );
//   const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
//   const [showBranchSelection, setShowBranchSelection] = useState<boolean>(false);

//   useEffect(() => {
//     setLoading(true);
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setUser(firebaseUser);
//       if (!firebaseUser) {
//         setLoading(false);
//         return;
//       }

//       console.log("User Logged In:", firebaseUser.uid);
//       const data = await getUserCart(firebaseUser.uid);
//       setCart(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const savedCart = localStorage.getItem("siyana-cart");
//     if (savedCart) setCart(JSON.parse(savedCart));
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       localStorage.setItem("siyana-cart", JSON.stringify(cart));
//     }
//   }, [cart, loading]);

//   const changeQuantity = async (productId: string, newQty: number) => {
//     if (!user || newQty < 1) return;

//     await updateCartQuantity(user.uid, productId, newQty);

//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === productId ? { ...item, quantity: newQty } : item
//       )
//     );
//   };

//   const handleRemove = async (productId: string) => {
//     if (!user) return;

//     await removeFromCart(user.uid, productId);
//     setCart((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const handleClearCart = async () => {
//     if (!user) return;

//     await clearCart(user.uid);
//     setCart([]);
//   };

//   const moveToWishlist = async (item: CartItem) => {
//     if (!user) return;
//     const success = await addToWishlist(user.uid, item);
//     if (success) {
//       await removeFromCart(user.uid, item.id);
//       setCart((prev) => prev.filter((p) => p.id !== item.id));
//     }
//   };

//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//   const subtotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
 
//   const grandTotal = subtotal ;
//   const savings = cart.reduce((total, item) => {
//     if (item.originalPrice) {
//       return total + (item.originalPrice - item.price) * item.quantity;
//     }
//     return total;
//   }, 0);

//   const generateOrderMessage = (branch: Branch): string => {
//     const itemsText = cart
//       .map(
//         (item) =>
//           `• ${item.name} - ${item.quantity}x ₹${item.price.toLocaleString()} = ₹${(
//             item.price * item.quantity
//           ).toLocaleString()}`
//       )
//       .join("\n");

//     return `Hello Siyana ${branch.name.split(" ")[1]}! 👋

// I would like to place an order:

// ${itemsText}

// Order Details:
// Subtotal: ₹${subtotal.toLocaleString()}
// Total: ₹${Math.round(grandTotal).toLocaleString()}

// Customer Details:
// Name: ${user?.displayName || "Customer"}
// Email: ${user?.email || "Not provided"}

// Please confirm my order. Thank you! 😊`;
//   };

//   const handleCheckoutClick = (): void => {
//     if (!user) {
//       alert("Please log in to checkout");
//       return;
//     }
//     setShowBranchSelection(true);
//   };

//   const handleBranchSelect = async (branch: Branch): Promise<void> => {
//     setShowBranchSelection(false);
//     setIsCheckingOut(true);

//     try {
//       // Call checkout API with selected branch
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: user.uid,
//           userEmail: user.email,
//           userName: user.displayName || "Customer",
//           branchId: branch.id,
//           branchName: branch.name,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Checkout failed");
//       }

//       // Generate WhatsApp URL
//       const message = encodeURIComponent(generateOrderMessage(branch));
//       const whatsappUrl = `https://wa.me/${branch.whatsappNumber}?text=${message}`;

//       // Clear cart
//       setCart([]);
//       await clearCart(user.uid);

//       // Open WhatsApp
//       window.open(whatsappUrl, "_blank");

//       // Show success modal
//       setOrderId(data.orderId);
//       setOpen(true);
//       localStorage.removeItem("siyana-cart-count");
//     } catch (error: any) {
//       console.error("Checkout error:", error);
//       alert(error.message || "Failed to process checkout. Please try again.");
//     } finally {
//       setIsCheckingOut(false);
//     }
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
//       {open && <SuccessModal orderId={orderId} onClose={() => setOpen(false)} />}
//       {showBranchSelection && (
//         <BranchSelectionModal
//           branches={BRANCHES}
//           onSelect={handleBranchSelect}
//           onClose={() => setShowBranchSelection(false)}
//         />
//       )}
//       <NavbarWrapper />

//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-[#196b7a] rounded-lg">
//                 <ShoppingBag className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Shopping Cart
//                 </h1>
//                 <p className="text-gray-600">
//                   {totalItems}{" "}
//                   {totalItems === 1 ? "precious item" : "precious items"} in
//                   your collection
//                 </p>
//               </div>
//             </div>
//             {cart.length > 0 && (
//               <button
//                 onClick={handleClearCart}
//                 className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300"
//               >
//                 Clear All Items
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Cart Items */}
//           <div className="lg:w-2/3">
//             {!loading && cart.length === 0 ? (
//               <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
//                 <div className="max-w-md mx-auto">
//                   <div className="w-32 h-32 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <ShoppingBag className="w-16 h-16 text-amber-600" />
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                     Your Cart Feels Light
//                   </h2>
//                   <p className="text-gray-600 mb-8 text-lg">
//                     Discover our exquisite collection of jewelry and add some
//                     sparkle to your cart
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Link
//                       href="/category/rings"
//                       className="inline-flex items-center px-8 py-4 bg-[#196b7a] text-white font-semibold rounded-xl hover:bg-[#196b7a]/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                     >
//                       <Sparkles className="mr-3 w-5 h-5" />
//                       Explore Collections
//                       <ArrowRight className="ml-2 w-5 h-5" />
//                     </Link>
//                     <Link
//                       href="/category/featured"
//                       className="inline-flex items-center px-8 py-4 border-2 border-[#196b7a] text-[#196b7a] font-semibold rounded-xl hover:bg-[#196b7a] hover:text-white transition-all duration-300"
//                     >
//                       Featured Items
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${removingItem === item.id
//                       ? "opacity-0 scale-95"
//                       : "opacity-100 scale-100"
//                       }`}
//                   >
//                     <div className="p-6">
//                       <div className="flex items-start gap-6">
//                         {/* Product Image */}
//                         <div className="relative">
//                           <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
//                             <Image
//                               src={
//                                 typeof item?.images?.[0] === "string"
//                                   ? item.images[0]
//                                   : item?.images?.[0]?.url || "/images/placeholder.jpg"
//                               }
//                               alt={item.name}
//                               width={96}
//                               height={96}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           {item.isNew && (
//                             <span className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                               New
//                             </span>
//                           )}
//                         </div>

//                         {/* Product Details */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-start justify-between mb-2">
//                             <div>
//                               <h3 className="font-semibold text-gray-900 text-lg mb-1">
//                                 {item.name}
//                               </h3>
//                               <p className="text-gray-600 text-sm mb-2">
//                                 {item?.category?.name ?? ""}
//                               </p>
//                               <div className="flex items-center gap-4">
//                                 <p className="text-amber-600 font-bold text-xl">
//                                   ₹{item.price.toLocaleString()}
//                                 </p>
//                                 {item.originalPrice &&
//                                   item.originalPrice > item.price && (
//                                     <p className="text-gray-500 line-through text-sm">
//                                       ₹{item.originalPrice.toLocaleString()}
//                                     </p>
//                                   )}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Quantity Controls */}
//                           <div className="flex items-center justify-between mt-4">
//                             <div className="flex items-center gap-3">
//                               <span className="text-sm font-medium text-gray-700">
//                                 Quantity:
//                               </span>
//                               <div className="flex items-center border border-gray-300 rounded-lg">
//                                 <button
//                                   onClick={() =>
//                                     changeQuantity(item.id, item.quantity - 1)
//                                   }
//                                   className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-l-lg"
//                                   disabled={item.quantity <= 1}
//                                 >
//                                   <Minus className="w-4 h-4" />
//                                 </button>
//                                 <span className="px-4 py-2 font-medium min-w-12 text-center bg-white border-x border-gray-300">
//                                   {item.quantity}
//                                 </span>
//                                 <button
//                                   onClick={() =>
//                                     changeQuantity(item.id, item.quantity + 1)
//                                   }
//                                   className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
//                                 >
//                                   <Plus className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             </div>

//                             {/* Actions */}
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => moveToWishlist(item)}
//                                 className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
//                                 title="Move to Wishlist"
//                               >
//                                 <Heart className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleRemove(item.id)}
//                                 className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
//                                 title="Remove from Cart"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Item Total */}
//                     <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Item Total:</span>
//                         <span className="font-bold text-lg text-gray-900">
//                           ₹{(item.price * item.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           {cart.length > 0 && (
//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <CreditCard className="w-5 h-5 text-[#196b7a]" />
//                   Order Summary
//                 </h2>

//                 {/* Price Breakdown */}
//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">
//                       Subtotal ({totalItems} items)
//                     </span>
//                     <span className="font-medium">
//                       ₹{subtotal.toLocaleString()}
//                     </span>
//                   </div>

//                   {savings > 0 && (
//                     <div className="flex justify-between text-green-600">
//                       <span>You Save</span>
//                       <span className="font-medium">
//                         ₹{Math.round(savings).toLocaleString()}
//                       </span>
//                     </div>
//                   )}

//                   {/* <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium">
//                       {shipping === 0 ? (
//                         <span className="text-green-600">Free</span>
//                       ) : (
//                         `₹${shipping}`
//                       )}
//                     </span>
//                   </div> */}

//                   {/* <div className="flex justify-between">
//                     <span className="text-gray-600">Tax (GST)</span>
//                     <span className="font-medium">
//                       ₹{Math.round(tax).toLocaleString()}
//                     </span>
//                   </div> */}

//                   <div className="border-t pt-4">
//                     <div className="flex justify-between text-lg font-bold">
//                       <span>Total Amount</span>
//                       <span className="text-[#196b7a]">
//                         ₹{Math.round(grandTotal).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Trust Badges */}
//                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-gray-200 mb-5">
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
//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <button
//                     onClick={handleCheckoutClick}
//                     disabled={isCheckingOut}
//                     className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
//                   >
//                     {isCheckingOut ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         Preparing...
//                       </>
//                     ) : (
//                       <>
//                         <MessageCircle className="w-5 h-5" />
//                         Checkout via WhatsApp
//                       </>
//                     )}
//                   </button>

//                   <Link
//                     href="/"
//                     className="w-full text-center block text-[#196b7a] border-2 border-[#196b7a] py-4 rounded-xl font-semibold hover:bg-[#196b7a] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
//                   >
//                     <Plus className="w-5 h-5" />
//                     Continue Shopping
//                   </Link>
//                 </div>

//                 {/* Branch Selection Info */}
//                 <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <div className="flex items-start gap-3">
//                     <Store className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
//                     <div>
//                       <p className="text-sm font-medium text-blue-800 mb-1">
//                         Select Your Nearest Branch
//                       </p>
//                       <p className="text-xs text-blue-700">
//                         Choose from our three locations for faster service and
//                         pickup options.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Security Note */}
//                 <p className="text-center text-xs text-gray-500 mt-4">
//                   🔒 Your order information is secure
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// // SIMPLIFIED Branch Selection Modal Component
// interface BranchSelectionModalProps {
//   branches: Branch[];
//   onSelect: (branch: Branch) => Promise<void>;
//   onClose: () => void;
// }

// function BranchSelectionModal({
//   branches,
//   onSelect,
//   onClose,
// }: BranchSelectionModalProps) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.95, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
//       >
//         {/* Modal Header */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-[#196b7a] rounded-full flex items-center justify-center">
//                 <Store className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Select Branch
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   Choose where to place your order
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               ✕
//             </button>
//           </div>
//         </div>

//         {/* Branch Options */}
//         <div className="p-6">
//           <div className="space-y-3">
//             {branches.map((branch) => (
//               <motion.button
//                 key={branch.id}
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//                 onClick={() => onSelect(branch)}
//                 className="w-full p-4 border border-gray-300 rounded-xl hover:border-[#196b7a] hover:bg-blue-50 transition-all duration-200 text-left"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="font-semibold text-gray-900">
//                       {branch.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {branch.address.split(',')[0]}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <MessageCircle className="w-4 h-4 text-green-600" />
//                     </div>
//                   </div>
//                 </div>
//               </motion.button>
//             ))}
//           </div>

//           {/* Info Message */}
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-600 text-center">
//               Your order will be sent to the selected branch's WhatsApp number
//             </p>
//           </div>
//         </div>

//         {/* Cancel Button */}
//         <div className="p-6 border-t border-gray-200">
//           <button
//             onClick={onClose}
//             className="w-full py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // Success Modal Component (keep as is)
// type SuccessModalProps = {
//   orderId: string;
//   onClose: () => void;
// };

// function SuccessModal({
//   orderId,
//   onClose,
// }: SuccessModalProps) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.95, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
//       >
//         <div className="p-6 text-center">
//           {/* Success Icon */}
//           <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//             <svg
//               className="w-8 h-8 text-green-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={3}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>

//           {/* Message */}
//           <h3 className="text-xl font-bold text-gray-900 mb-2">
//             Order Placed!
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Your order ID: <span className="font-bold text-[#196b7a]">#{orderId}</span>
//           </p>
//           <p className="text-sm text-gray-500 mb-6">
//             Thank you for your order. We'll contact you soon.
//           </p>

//           {/* Button */}
//           <button
//             onClick={onClose}
//             className="w-full py-3 bg-[#196b7a] text-white font-semibold rounded-xl hover:bg-[#196b7a]/90 transition-colors"
//           >
//             OK
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Sparkles,
  MessageCircle,
  Store,
  CheckCircle,
  Gem,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { CartItem } from "@/types";
import { ReactElement } from "react";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Image from "next/image";
import { auth } from "@/lib/firebase/firebaseConfig";
import {
  addToWishlist,
  clearCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
} from "@/lib/firebase/firebaseQueries";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/ui/Loading";

// Define branch type
type Branch = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  whatsappNumber: string;
  timing: string;
};

// Branch data
const BRANCHES: Branch[] = [
  {
    id: "vengara",
    name: "Siyana Vengara",
    address: "Main Road, Vengara, Malappuram",
    phoneNumber: "+919876543210",
    whatsappNumber: "919539794665",
    timing: "9:30 AM - 9:30 PM",
  },
  {
    id: "othukkungal",
    name: "Siyana Othukkungal",
    address: "Othukkungal, Near Railway Station, Malappuram",
    phoneNumber: "+919876543211",
    whatsappNumber: "919876543211",
    timing: "10:00 AM - 10:00 PM",
  },
  {
    id: "kiyicheri",
    name: "Siyana Kiyicheri",
    address: "Kiyicheri Main Road, Malappuram",
    phoneNumber: "+919876543212",
    whatsappNumber: "919876543212",
    timing: "9:00 AM - 9:00 PM",
  },
];

export default function CartPage(): ReactElement {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const [removingItem, setRemovingItem] = useState<string | number | null>(
    null
  );
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [showBranchSelection, setShowBranchSelection] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      console.log("User Logged In:", firebaseUser.uid);
      const data = await getUserCart(firebaseUser.uid);
      setCart(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("siyana-cart", JSON.stringify(cart));
    }
  }, [cart, loading]);

  const changeQuantity = async (productId: string, newQty: number) => {
    if (!user || newQty < 1) return;

    await updateCartQuantity(user.uid, productId, newQty);

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = async (productId: string) => {
    if (!user) return;

    await removeFromCart(user.uid, productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = async () => {
    if (!user) return;

    await clearCart(user.uid);
    setCart([]);
  };

  const moveToWishlist = async (item: CartItem) => {
    if (!user) return;
    const success = await addToWishlist(user.uid, item);
    if (success) {
      await removeFromCart(user.uid, item.id);
      setCart((prev) => prev.filter((p) => p.id !== item.id));
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
 
  const grandTotal = subtotal ;
  const savings = cart.reduce((total, item) => {
    if (item.originalPrice) {
      return total + (item.originalPrice - item.price) * item.quantity;
    }
    return total;
  }, 0);

 const generateOrderMessage = (branch: Branch, orderIdParam: string): string => {
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} - ${item.quantity}x ₹${item.price.toLocaleString()} = ₹${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    return `Hello Siyana ${branch.name.split(" ")[1]}! 👋

I would like to place an order:

${itemsText}

Order Details:
Order ID: #${orderIdParam}
Subtotal: ₹${subtotal.toLocaleString()}
Total: ₹${Math.round(grandTotal).toLocaleString()}

Customer Details:
Name: ${user?.displayName || "Customer"}
Email: ${user?.email || "Not provided"}

Please confirm my order. Thank you! 😊`;
  };

  const handleCheckoutClick = (): void => {
    if (!user) {
      alert("Please log in to checkout");
      return;
    }
    setShowBranchSelection(true);
  };

  const handleBranchSelect = async (branch: Branch): Promise<void> => {
    setShowBranchSelection(false);
    setIsCheckingOut(true);

    try {
      // Call checkout API with selected branch
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          userName: user.displayName || "Customer",
          branchId: branch.id,
          branchName: branch.name,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Checkout failed");
      }
      const generatedOrderId = data.orderId;

      // Generate WhatsApp URL
      const message = encodeURIComponent(generateOrderMessage(branch, generatedOrderId));
      const whatsappUrl = `https://wa.me/${branch.whatsappNumber}?text=${message}`;

      // Clear cart
      setCart([]);
      await clearCart(user.uid);

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      // Show success modal
      setOrderId(data.orderId);
      setOpen(true);
      localStorage.removeItem("siyana-cart-count");
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error.message || "Failed to process checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {open && <SuccessModal orderId={orderId} onClose={() => setOpen(false)} />}
      {showBranchSelection && (
        <BranchSelectionModal
          branches={BRANCHES}
          onSelect={handleBranchSelect}
          onClose={() => setShowBranchSelection(false)}
        />
      )}
      <NavbarWrapper />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#196b7a] rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart
                </h1>
                <p className="text-gray-600">
                  {totalItems}{" "}
                  {totalItems === 1 ? "precious item" : "precious items"} in
                  your collection
                </p>
              </div>
            </div>
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300"
              >
                Clear All Items
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-16 h-16 text-amber-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Your Cart Feels Light
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Discover our exquisite collection of jewelry and add some
                    sparkle to your cart
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/category/rings"
                      className="inline-flex items-center px-8 py-4 bg-[#196b7a] text-white font-semibold rounded-xl hover:bg-[#196b7a]/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Sparkles className="mr-3 w-5 h-5" />
                      Explore Collections
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link
                      href="/category/featured"
                      className="inline-flex items-center px-8 py-4 border-2 border-[#196b7a] text-[#196b7a] font-semibold rounded-xl hover:bg-[#196b7a] hover:text-white transition-all duration-300"
                    >
                      Featured Items
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${removingItem === item.id
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                      }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Product Image */}
                        <div className="relative">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <Image
                              src={
                                typeof item?.images?.[0] === "string"
                                  ? item.images[0]
                                  : item?.images?.[0]?.url || "/images/placeholder.jpg"
                              }
                              alt={item.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {item.isNew && (
                            <span className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {item?.category?.name ?? ""}
                              </p>
                              <div className="flex items-center gap-4">
                                <p className="text-amber-600 font-bold text-xl">
                                  ₹{item.price.toLocaleString()}
                                </p>
                                {item.originalPrice &&
                                  item.originalPrice > item.price && (
                                    <p className="text-gray-500 line-through text-sm">
                                      ₹{item.originalPrice.toLocaleString()}
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-700">
                                Quantity:
                              </span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() =>
                                    changeQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-l-lg"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 font-medium min-w-12 text-center bg-white border-x border-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    changeQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => moveToWishlist(item)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                                title="Move to Wishlist"
                              >
                                <Heart className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                                title="Remove from Cart"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Item Total:</span>
                        <span className="font-bold text-lg text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#196b7a]" />
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span className="font-medium">
                        ₹{Math.round(savings).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-[#196b7a]">
                        ₹{Math.round(grandTotal).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-gray-200 mb-5">
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
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckoutClick}
                    disabled={isCheckingOut}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Preparing...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Checkout via WhatsApp
                      </>
                    )}
                  </button>

                  <Link
                    href="/"
                    className="w-full text-center block text-[#196b7a] border-2 border-[#196b7a] py-4 rounded-xl font-semibold hover:bg-[#196b7a] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Continue Shopping
                  </Link>
                </div>

                {/* Branch Selection Info */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Store className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">
                        Select Your Nearest Branch
                      </p>
                      <p className="text-xs text-blue-700">
                        Choose from our three locations for faster service and
                        pickup options.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  🔒 Your order information is secure
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// SIMPLIFIED Branch Selection Modal Component
interface BranchSelectionModalProps {
  branches: Branch[];
  onSelect: (branch: Branch) => Promise<void>;
  onClose: () => void;
}

function BranchSelectionModal({
  branches,
  onSelect,
  onClose,
}: BranchSelectionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#196b7a] rounded-full flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Select Branch
                </h2>
                <p className="text-sm text-gray-600">
                  Choose where to place your order
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Branch Options */}
        <div className="p-6">
          <div className="space-y-3">
            {branches.map((branch) => (
              <motion.button
                key={branch.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(branch)}
                className="w-full p-4 border border-gray-300 rounded-xl hover:border-[#196b7a] hover:bg-blue-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {branch.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {branch.address.split(',')[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Info Message */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Your order will be sent to the selected branch's WhatsApp number
            </p>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Success Modal Component (keep as is)
type SuccessModalProps = {
  orderId: string;
  onClose: () => void;
};

function SuccessModal({
  orderId,
  onClose,
}: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
      >
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Message */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Order Placed!
          </h3>
          <p className="text-gray-600 mb-4">
            Your order ID: <span className="font-bold text-[#196b7a]">#{orderId}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Thank you for your order. We'll contact you soon.
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#196b7a] text-white font-semibold rounded-xl hover:bg-[#196b7a]/90 transition-colors"
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
}
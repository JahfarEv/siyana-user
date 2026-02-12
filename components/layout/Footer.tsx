// "use client";
// import React from "react";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   TrendingUp,
//   MessageCircle,
//   Instagram,
//   Facebook,
// } from "lucide-react";
// import { useGoldRate } from "@/hooks/useCarousel";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Link from "next/link";

// interface FooterProps {}

// const Footer: React.FC<FooterProps> = () => {
//   const customerService: string[] = ["Contact us", "Help"];
//   const myAccount: string[] = [
//     "My Account",
//     "Wishlist",
//     "Special",
//     "Order History",
//   ];
//   const socialMediaLinks = [
//     {
//       name: "WhatsApp",
//       icon: MessageCircle,
//       url: "https://wa.me/918938916916", // Replace with actual WhatsApp number
//       color: "hover:text-green-400",
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       url: "https://instagram.com/SiyanaGoldandDiamonds", // Replace with actual Instagram handle
//       color: "hover:text-pink-400",
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       url: "https://facebook.com/SiyanaGoldandDiamonds", // Replace with actual Facebook page
//       color: "hover:text-blue-400",
//     },
//   ];
//   const { data: goldRates, isLoading, isError } = useGoldRate();
//   console.log(goldRates, "rate");

//   // Convert Firestore timestamp to Date
//   const createdDate = (goldRates as any)?.createdAt
//     ? new Date((goldRates as any).createdAt.seconds * 1000)
//     : null;
//   const goldTypes = [
//     { key: "Gold_24", label: "1 Gram" },
//     { key: "Gold_22", label: "8 Gram" },
//     { key: "Gold_18", label: "18 CT" },
//   ];
//   return (
//     <footer className="bg-[#278899] text-white p-8 rounded-3xl m-4">
//       {/* Gold Rate Banner */}
//       <div className="bg-gradient-to-r from-amber-600 to-yellow-200 rounded-4xl p-2 mb-8 shadow-xl">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <div className="flex items-center mb-4 md:mb-0">
//             <TrendingUp className="text-white mr-3" size={24} />
//             <h3 className="text-xl font-bold text-white">
//               Today&apos;s Gold Rate
//             </h3>
//           </div>

//           <div className="flex flex-wrap justify-center gap-6 text-center">
//             {isLoading ? (
//               goldTypes.map((item) => (
//                 <div key={item.key} className="text-center">
//                   <Skeleton width={60} height={20} />
//                   <Skeleton width={40} height={16} />
//                 </div>
//               ))
//             ) : goldRates && !isError ? (
//               goldTypes.map((item) => (
//                 <div key={item.key} className="text-center">
//                   <div className="text-lg font-extrabold text-white">
//                     {item.label}
//                   </div>
//                   <div className="text-white font-bold">
//                     ₹{(goldRates as any)[item.key]}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-white">No gold rate available</p>
//             )}
//           </div>

//           <div className="mt-4 md:mt-0 text-sm text-white font-medium bg-[#278899] px-3 py-1 rounded-full">
//             Last Updated:{" "}
//             {createdDate
//               ? createdDate.toLocaleString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "Unknown"}
//           </div>
//         </div>
//       </div>

//       {/* Footer Links */}
//       <div className="px-4 mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
//         {/* Customer Service */}
//         <div>
//           <h4 className="text-lg font-bold mb-4">Customer Service</h4>
//           <ul className="space-y-2 text-sm">
//             {customerService.map((item) => (
//               <li
//                 key={item}
//                 className="hover:text-yellow-300 cursor-pointer transition-colors"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-lg font-bold mb-4">Follow us on</h4>
//           <ul className="space-y-3 text-sm">
//             {socialMediaLinks.map((social) => (
//               <li key={social.name}>
//                 <Link
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`flex items-center ${social.color} cursor-pointer transition-colors`}
//                 >
//                   <social.icon size={16} className="mr-2" />
//                   {social.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* Contact Info */}
//         <div>
//           <h4 className="text-lg font-bold mb-4">Contact us</h4>
//           <ul className="space-y-3 text-sm">
//             <li className="flex items-center">
//               <Phone size={16} className="mr-2" /> +91 8938916916
//             </li>
//             <li className="flex items-center">
//               <Phone size={16} className="mr-2" /> +91 8938916916
//             </li>
//             <li className="flex items-center">
//               <Mail size={16} className="mr-2" />
//               siyanagoldndiamonds@gmail.com
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Copyright */}
//       {/* Copyright & Developer Credit */}
//       <div className="mt-8 pt-6 border-t border-teal-600 text-center text-sm text-teal-200">
//         <p>
//           &copy; {new Date().getFullYear()} Siyana Gold & Diamonds. All rights
//           reserved. | Developed by{" "}
//           <Link
//             href="https://jahfar.online"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-yellow-300 hover:text-yellow-400 font-medium transition-colors underline"
//           >
//             jahfar.online
//           </Link>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { useGoldRate } from "@/hooks/useCarousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const customerService: string[] = ["Contact us", "Help"];
  const myAccount: string[] = [
    "My Account",
    "Wishlist",
    "Special",
    "Order History",
  ];
  const socialMediaLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/918938916916",
      color: "hover:text-green-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/SiyanaGoldandDiamonds",
      color: "hover:text-pink-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/SiyanaGoldandDiamonds",
      color: "hover:text-blue-400",
    },
  ];
  const { data: goldRates, isLoading, isError } = useGoldRate();

  const createdDate = (goldRates as any)?.createdAt
    ? new Date((goldRates as any).createdAt.seconds * 1000)
    : null;
  const goldTypes = [
    { key: "Gold_24", label: "1 Gram" },
    { key: "Gold_22", label: "8 Gram" },
    { key: "Gold_18", label: "18 CT" },
  ];

  return (
    <footer className="bg-[#278899] text-white p-4 md:p-8 rounded-3xl m-2 md:m-4">
      {/* Gold Rate Banner - More compact on mobile */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-2xl md:rounded-xl p-3 md:p-2 mb-6 md:mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center self-start md:self-auto">
            <TrendingUp className="text-white mr-2" size={20} />
            <h3 className="text-lg md:text-xl font-bold text-white">
              Today&apos;s Gold Rate
            </h3>
          </div>

          {/* Horizontal scroll on mobile if needed */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex flex-row md:flex-wrap justify-between md:justify-center gap-4 md:gap-6 min-w-max md:min-w-0">
              {isLoading ? (
                goldTypes.map((item) => (
                  <div key={item.key} className="text-center">
                    <Skeleton width={50} height={18} />
                    <Skeleton width={40} height={14} />
                  </div>
                ))
              ) : goldRates && !isError ? (
                goldTypes.map((item) => (
                  <div
                    key={item.key}
                    className="text-center md:min-w-[150px] px-2 
               bg-white 
               rounded-xl 
               shadow-md 
               border border-yellow-300 
               hover:shadow-lg 
               hover:-translate-y-1 
               transition-all duration-300"
                  >
                    {/* Label */}
                    <div className="text-sm md:text-base font-semibold text-yellow-700 py-2 border-b border-yellow-200">
                      {item.label}
                    </div>

                    {/* Price */}
                    <div className="text-lg md:text-xl font-bold text-gray-900 py-3">
                      ₹{(goldRates as any)[item.key]}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white text-sm">No gold rate available</p>
              )}
            </div>
          </div>

          <div className="self-end md:self-auto text-xs md:text-sm text-white font-medium bg-[#278899] px-2 md:px-3 py-1 rounded-xl whitespace-nowrap">
            Updated:{" "}
            {createdDate
              ? createdDate.toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Unknown"}
          </div>
        </div>
      </div>

      {/* Footer Links - Condensed on mobile */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 ">
        {/* Customer Service */}
        <div>
          <h4 className="text-base md:text-lg font-bold mb-2 md:mb-4">
            Service
          </h4>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
            {customerService.map((item) => (
              <li
                key={item}
                className="hover:text-yellow-300 cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media - Make it horizontal on mobile */}
        <div className="col-span-1">
          <h4 className="text-base md:text-lg font-bold mb-2 md:mb-4">
            Follow us
          </h4>
          <ul className="flex flex-col gap-3 md:gap-2 text-xs md:text-sm">
            {socialMediaLinks.map((social) => (
              <li key={social.name}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center ${social.color} transition-colors`}
                >
                  <social.icon size={16} className="mr-1 md:mr-2" />
                  <span className="hidden md:inline">{social.name}</span>
                  {/* Show only icons on mobile to save space */}
                  <span className="md:hidden">{social.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info - Condensed */}
        <div className="col-span-1">
          <h4 className="text-base md:text-lg font-bold mb-2 md:mb-4">
            Contact
          </h4>
          <ul className="space-y-1 md:space-y-3 text-xs md:text-sm">
            <li className="flex items-center">
              <Phone size={14} className="mr-1 md:mr-2 flex-shrink-0" />
              <span className="truncate">+91 8938916916</span>
            </li>
            <li className="flex items-center">
              <Phone size={14} className="mr-1 md:mr-2 flex-shrink-0" />
              <span className="truncate">+91 8938916916</span>
            </li>
            <li className="flex items-center">
              <Mail size={14} className="mr-1 md:mr-2 flex-shrink-0" />
              <span className="truncate text-xs">
                siyanagoldndiamonds@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright - More compact on mobile */}
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-teal-600 text-center text-xs md:text-sm text-teal-200">
        <p>
          &copy; {new Date().getFullYear()} Siyana Gold And Diamonds
          {/* <Link
            href="https://jahfar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:text-yellow-400 font-medium transition-colors underline ml-1"
          >
            jahfar.online
          </Link> */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

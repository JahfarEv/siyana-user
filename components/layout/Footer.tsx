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




// "use client";
// import React from "react";
// import {
//   Mail,
//   Phone,
//   MessageCircle,
//   Instagram,
//   Facebook,
// } from "lucide-react";
// // import "react-loading-skeleton/dist/skeleton.css";
// import Link from "next/link";

// const Footer: React.FC = () => {
//   const customerService: { name: string; href?: string }[] = [
//     { name: "Contact us", href: "/contact" },
//     { name: "Help" },
//   ];
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
//       url: "https://wa.me/918938916916",
//       color: "hover:text-green-400",
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       url: "https://instagram.com/SiyanaGoldandDiamonds",
//       color: "hover:text-pink-400",
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       url: "https://facebook.com/SiyanaGoldandDiamonds",
//       color: "hover:text-blue-400",
//     },
//   ];
//   return (
//     <footer className="bg-[#278899] text-white p-4 md:p-8 rounded-3xl m-2 md:m-4">
//       {/* Footer Links - Condensed on mobile */}
//       <div className="grid grid-cols-3 gap-4 md:gap-8 ">
//         {/* Customer Service */}
//         <div>
//           <h4 className="text-base md:text-lg font-bold mb-2 md:mb-4">
//             Service
//           </h4>
//           <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
//             {customerService.map((item) => (
//               <li
//                 key={item.name}
//                 className="hover:text-yellow-300 transition-colors"
//               >
//                 {item.href ? (
//                   <Link href={item.href}>{item.name}</Link>
//                 ) : (
//                   <span className="cursor-pointer">{item.name}</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Social Media - Make it horizontal on mobile */}
//         <div className="col-span-1">
//           <h4 className="text-base md:text-lg font-bold mb-2 md:mb-4">
//             Follow us
//           </h4>
//           <ul className="flex flex-col gap-3 md:gap-2 text-xs md:text-sm">
//             {socialMediaLinks.map((social) => (
//               <li key={social.name}>
//                 <Link
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`flex items-center ${social.color} transition-colors`}
//                 >
//                   <social.icon size={16} className="mr-1 md:mr-2" />
//                   <span className="hidden md:inline">{social.name}</span>
//                   {/* Show only icons on mobile to save space */}
//                   <span className="md:hidden">{social.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//    {/* Contact Info - All Branches */}
// <div className="col-span-1">
//   <h4 className="text-base md:text-lg font-bold mb-2 md:mb-4">
//     Contact
//   </h4>
//   <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
//     {/* Vengara */}
//     <li>
//       <p className="text-[10px] uppercase tracking-wider text-teal-200/80 mb-0.5">
//         Vengara
//       </p>
//       <a
//         href="tel:+918938916916"
//         className="flex items-center transition-colors hover:text-yellow-300"
//       >
//         <Phone size={14} className="mr-1 md:mr-2 flex-shrink-0" />
//         <span className="truncate">+91 89389 16916</span>
//       </a>
//     </li>

//     {/* Othukkungal */}
//     <li>
//       <p className="text-[10px] uppercase tracking-wider text-teal-200/80 mb-0.5">
//         Othukkungal
//       </p>
//       <a
//         href="tel:+917232916916"
//         className="flex items-center transition-colors hover:text-yellow-300"
//       >
//         <Phone size={14} className="mr-1 md:mr-2 flex-shrink-0" />
//         <span className="truncate">+91 72329 16916</span>
//       </a>
//     </li>

//     {/* Kizhisseri */}
//     <li>
//       <p className="text-[10px] uppercase tracking-wider text-teal-200/80 mb-0.5">
//         Kizhisseri
//       </p>
//       <a
//         href="tel:+917699916916"
//         className="flex items-center transition-colors hover:text-yellow-300"
//       >
//         <Phone size={14} className="mr-1 md:mr-2 flex-shrink-0" />
//         <span className="truncate">+91 76999 16916</span>
//       </a>
//     </li>

//     {/* Email */}
//     <li className="pt-1">
//       <a
//         href="mailto:siyanagoldndiamonds@gmail.com"
//         className="flex items-center transition-colors hover:text-yellow-300"
//       >
//         <Mail size={14} className="mr-1 md:mr-2 flex-shrink-0" />
//         <span className="truncate text-xs">
//           siyanagoldndiamonds@gmail.com
//         </span>
//       </a>
//     </li>
//   </ul>
// </div>
//       </div>

//       {/* Copyright - More compact on mobile */}
//       <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-teal-600 text-center text-xs md:text-sm text-teal-200">
//         <p>
//           &copy; {new Date().getFullYear()} Siyana Gold And Diamonds
//           {/* <Link
//             href="https://jahfar.online"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-yellow-300 hover:text-yellow-400 font-medium transition-colors underline ml-1"
//           >
//             jahfar.online
//           </Link> */}
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   MessageCircle,
//   Instagram,
//   Facebook,
//   ArrowUpRight,
// } from "lucide-react";

// const Footer: React.FC = () => {
//   const branches = [
//     {
//       name: "Vengara",
//       phone: "918938916916",
//       display: "+91 89389 16916",
//     },
//     {
//       name: "Othukkungal",
//       phone: "917232916916",
//       display: "+91 72329 16916",
//     },
//     {
//       name: "Kizhisseri",
//       phone: "917699916916",
//       display: "+91 76999 16916",
//     },
//   ];

//   const socialLinks = [
//     {
//       name: "WhatsApp",
//       icon: MessageCircle,
//       url: "https://wa.me/918938916916",
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       url: "https://instagram.com/SiyanaGoldandDiamonds",
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       url: "https://facebook.com/SiyanaGoldandDiamonds",
//     },
//   ];

//   const quickLinks = [
//     { name: "Terms & Conditions", href: "/terms" },
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "Offers", href: "/offers" },
//     { name: "Career", href: "/career" },
//   ];

//   return (
//     <footer className="relative m-2 overflow-hidden rounded-3xl bg-[#0a2c35] text-white shadow-lg ring-1 ring-[#e9bf55]/20 md:m-4">
//       {/* Gold top border */}
//       <div className="h-[2px] bg-gradient-to-r from-transparent via-[#e9bf55] to-transparent" />

//       <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
//         {/* Main footer */}
//         <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
//           {/* Brand */}
//           <div className="lg:col-span-4">
//             <Link href="/" className="inline-flex">
//               <div className="relative h-24 w-56 sm:h-48 sm:w-64">
//                 <Image
//                   src="/images/siyanaFooter.png"
//                   alt="Siyana Gold and Diamonds"
//                   fill
//                   priority={false}
//                   sizes="256px"
//                   className="object-contain"
//                 />
//               </div>
//             </Link>

//             <p className="mt-3 max-w-sm text-sm leading-7 text-white/65">
//               Discover timeless elegance and exquisite craftsmanship at Siyana
//               Gold and Diamonds. Explore beautiful collections crafted to make
//               every occasion special.
//             </p>
//           </div>

//           {/* Customer service */}
//           <div className="lg:col-span-3">
//             <h4 className="mb-5 text-base font-semibold text-white">
//               Customer Care
//             </h4>

//             <ul className="space-y-4 text-sm text-white/65">
//               <li>
//                 <Link
//                   href="/contact"
//                   className="transition-colors hover:text-[#f0cf7a]"
//                 >
//                   Contact Us
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/help"
//                   className="transition-colors hover:text-[#f0cf7a]"
//                 >
//                   Help &amp; Support
//                 </Link>
//               </li>
//             </ul>


            
//           </div>

//           {/* Quick links */}
//           <div className="lg:col-span-3">
//             <h4 className="mb-5 text-base font-semibold text-white">
//               Quick Links
//             </h4>

//             <ul className="space-y-4 text-sm text-white/65">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="transition-colors hover:text-[#f0cf7a]"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Branches */}
         

//           {/* Contact + Social */}
//           <div className="lg:col-span-2">
//             <h4 className="mb-5 text-base font-semibold text-white">
//               Get in Touch
//             </h4>

//             <p className="mb-4 text-sm leading-6 text-white/60">
//               Have questions? We are happy to help you.
//             </p>

//             <a
//               href="mailto:siyanagoldndiamonds@gmail.com"
//               className="flex items-start gap-2 break-all text-sm text-white/70 transition-colors hover:text-[#f0cf7a]"
//             >
//               <Mail size={16} className="mt-0.5 shrink-0 text-[#f0cf7a]" />
//               siyanagoldndiamonds@gmail.com
//             </a>

//             <div className="mt-6">
//               <h4 className="mb-3 text-sm font-semibold tracking-wide text-[#f0cf7a]">
//                 FOLLOW US
//               </h4>

//               <div className="flex gap-3">
//                 {socialLinks.map((social) => (
//                   <a
//                     key={social.name}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.name}
//                     className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9bf55]/30 text-[#f0cf7a] transition-all duration-300 hover:border-[#e9bf55] hover:bg-[#e9bf55] hover:text-[#0a2c35]"
//                   >
//                     <social.icon size={18} />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom footer */}
//         <div className="mt-12 border-t border-white/10 pt-6">
//           {/* Policy links (visible on all screens) */}
//           <div className="mb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55 sm:justify-start">
//             {quickLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="transition-colors hover:text-[#f0cf7a]"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-white/50 sm:flex-row sm:text-left">
//             <p>
//               © {new Date().getFullYear()} Siyana Gold and Diamonds. All rights
//               reserved.
//             </p>

//             <p>
//               Developed by{" "}
//               <a
//                 href="https://www.jahfar.online/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="font-semibold text-[#f0cf7a] transition-colors hover:text-white"
//               >
//                 Jahfar Ali
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  ArrowUpRight,
} from "lucide-react";

const Footer: React.FC = () => {
  const branches = [
    {
      name: "Vengara",
      phone: "918938916916",
      display: "+91 89389 16916",
    },
    {
      name: "Othukkungal",
      phone: "917232916916",
      display: "+91 72329 16916",
    },
    {
      name: "Kizhisseri",
      phone: "917699916916",
      display: "+91 76999 16916",
    },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/918938916916",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/SiyanaGoldandDiamonds",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/SiyanaGoldandDiamonds",
    },
  ];

  const quickLinks = [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Offers", href: "/offers" },
    { name: "Career", href: "/career" },
  ];

  return (
    <footer className="relative m-2 overflow-hidden rounded-3xl bg-[#0a2c35] text-white shadow-lg ring-1 ring-[#e9bf55]/20 md:m-4">
      {/* Gold top border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#e9bf55] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10 md:py-14">
        {/* Main footer */}
        <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 lg:mb-6 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex">
              <div className="relative h-20 w-48 sm:h-32 sm:w-56 lg:h-40 lg:w-64">
                <Image
                  src="/images/siyanaFooter.png"
                  alt="Siyana Gold and Diamonds"
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 256px, 224px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/65 sm:mt-3 sm:leading-7">
              Discover timeless elegance and exquisite craftsmanship at Siyana
              Gold and Diamonds. Explore beautiful collections crafted to make
              every occasion special.
            </p>
          </div>

          {/* Customer service */}
          <div className="col-span-1 lg:col-span-3">
            <h4 className="mb-3 text-sm font-semibold text-white sm:mb-5 sm:text-base">
              Customer Care
            </h4>

            <ul className="space-y-3 text-sm text-white/65 sm:space-y-4">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-[#f0cf7a]"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/help"
                  className="transition-colors hover:text-[#f0cf7a]"
                >
                  Help &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="col-span-1 lg:col-span-3">
            <h4 className="mb-3 text-sm font-semibold text-white sm:mb-5 sm:text-base">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm text-white/65 sm:space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#f0cf7a]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="mb-3 text-sm font-semibold text-white sm:mb-5 sm:text-base">
              Get in Touch
            </h4>

            <p className="mb-3 text-sm leading-6 text-white/60 sm:mb-4">
              Have questions? We are happy to help you.
            </p>

            <a
              href="mailto:siyanagoldndiamonds@gmail.com"
              className="flex items-start gap-2 break-all text-sm text-white/70 transition-colors hover:text-[#f0cf7a]"
            >
              <Mail size={16} className="mt-0.5 shrink-0 text-[#f0cf7a]" />
              siyanagoldndiamonds@gmail.com
            </a>

            <div className="mt-5 sm:mt-6">
              <h4 className="mb-3 text-sm font-semibold tracking-wide text-[#f0cf7a]">
                FOLLOW US
              </h4>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9bf55]/30 text-[#f0cf7a] transition-all duration-300 hover:border-[#e9bf55] hover:bg-[#e9bf55] hover:text-[#0a2c35]"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
        </div>
   <div>
            <h4 className="mb-3 text-center text-sm font-semibold tracking-wide text-[#f0cf7a] sm:text-left">
              OUR BRANCHES
            </h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <div
                  key={branch.name}
                  className="flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 transition-colors hover:border-[#e9bf55]/40 sm:justify-between"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="shrink-0 text-[#f0cf7a]" />
                    <span className="text-sm font-semibold text-white">
                      {branch.name}
                    </span>
                  </div>

                  <div className="flex w-full items-center justify-between gap-2 sm:gap-3">
                    <a
                      href={`tel:+${branch.phone}`}
                      className="flex min-w-0 items-center gap-1.5 text-xs text-white/70 transition-colors hover:text-[#f0cf7a]"
                    >
                      <Phone size={13} className="shrink-0" />
                      {branch.display}
                    </a>

                    <a
                      href={`https://wa.me/${branch.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${branch.name}`}
                      className="flex items-center gap-1 text-xs font-medium text-[#f0cf7a] hover:text-white"
                    >
                      WhatsApp
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        {/* Bottom footer */}
        <div className="mt-6 border-t border-white/10 pt-5 sm:pt-6">
          {/* Branches (inline format) */}
       

          {/* Policy links (visible on all screens) */}
          {/* <div className="mb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55 sm:justify-start">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-[#f0cf7a]"
              >
                {link.name}
              </Link>
            ))}
          </div> */}

          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs leading-5 text-white/50 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} Siyana Gold and Diamonds. All rights
              reserved.
            </p>

            <p>
              Developed by{" "}
              <a
                href="http://nexvecore.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f0cf7a] transition-colors hover:text-white"
              >
                Nexve Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
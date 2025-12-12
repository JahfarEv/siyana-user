"use client";
import React from "react";
import { Mail, Phone, MapPin, TrendingUp, MessageCircle, Instagram, Facebook } from "lucide-react";
import { useGoldRate } from "@/hooks/useCarousel";
import Skeleton from "react-loading-skeleton"; // npm install react-loading-skeleton
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
      url: "https://wa.me/918938916916", // Replace with actual WhatsApp number
      color: "hover:text-green-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/SiyanaGoldandDiamonds", // Replace with actual Instagram handle
      color: "hover:text-pink-400"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/SiyanaGoldandDiamonds", // Replace with actual Facebook page
      color: "hover:text-blue-400"
    }
  ];
  const { data: goldRates, isLoading, isError } = useGoldRate();

  // Convert Firestore timestamp to Date
  const createdDate = (goldRates as any)?.createdAt
    ? new Date((goldRates as any).createdAt.seconds * 1000)
    : null;

  return (
    <footer className="bg-[#278899] text-white p-8 rounded-3xl m-4">
      {/* Gold Rate Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-200 rounded-4xl p-2 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <TrendingUp className="text-white mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">
              Today&apos;s Gold Rate
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-center ">
            {isLoading ? (
              // Skeleton loading for gold rates
              ["24K", "22K", "18K"].map((karat) => (
                <div key={karat} className="text-center">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={40} height={16} />
                </div>
              ))
            ) : goldRates && !isError ? (
              ["Gold_24", "Gold_22", "Gold_18"].map((karat) => (
                <div key={karat} className="text-center">
                  <div className="text-lg font-extrabold text-white">
                    {karat.replace("Gold_", "")}K Gold
                  </div>
                  <div className="text-white font-bold">
                    ₹{(goldRates as any)[karat]}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No gold rate available</p>
            )}
          </div>

          <div className="mt-4 md:mt-0 text-sm text-white font-medium bg-[#278899] px-3 py-1 rounded-full">
            Last Updated:{" "}
            {createdDate
              ? createdDate.toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Unknown"}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-4 mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
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

        {/* My Account */}
        {/* <div>
          <h4 className="text-lg font-bold mb-4">My Account</h4>
          <ul className="space-y-2 text-sm">
            {myAccount.map((item) => (
              <li
                key={item}
                className="hover:text-yellow-300 cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div> */}

        <div>
          <h4 className="text-lg font-bold mb-4">Follow us on</h4>
          <ul className="space-y-3 text-sm">
            {socialMediaLinks.map((social) => (
              <li key={social.name}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center ${social.color} cursor-pointer transition-colors`}
                >
                  <social.icon size={16} className="mr-2" />
                  {social.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <Phone size={16} className="mr-2" /> +91 8938916916
            </li>
            <li className="flex items-center">
              <Phone size={16} className="mr-2" /> +91 8938916916
            </li>
            <li className="flex items-center">
              <Mail size={16} className="mr-2" />
              siyanagoldndiamonds@gmail.com
            </li>
            
          </ul>
        </div>
      </div>

      {/* Copyright */}
      {/* Copyright & Developer Credit */}
      <div className="mt-8 pt-6 border-t border-teal-600 text-center text-sm text-teal-200">
        <p>
          &copy; {new Date().getFullYear()} Siyana Gold & Diamonds. All rights
          reserved. | Developed by{" "}
          <Link
            href="https://jahfar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:text-yellow-400 font-medium transition-colors underline"
          >
            jahfar.online
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

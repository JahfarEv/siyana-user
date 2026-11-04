// "use client";

// import { TrendingUp } from "lucide-react";
// import Skeleton from "react-loading-skeleton";
// import { useGoldRate } from "@/hooks/useCarousel";

// const goldTypes = [
//   { key: "Gold_24", karat: "24K", unit: "1g" },
//   { key: "Gold_22", karat: "22K", unit: "8g" },
//   { key: "Gold_18", karat: "18K", unit: "1g" },
// ];

// const TodayGoldRate: React.FC = () => {
//   const { data: goldRates, isLoading, isError } = useGoldRate();
//   const goldRateData = goldRates as Record<string, unknown> | null | undefined;
//   const createdAt = goldRateData?.createdAt;
//   const createdAtSeconds =
//     createdAt &&
//     typeof createdAt === "object" &&
//     "seconds" in createdAt &&
//     typeof createdAt.seconds === "number"
//       ? createdAt.seconds
//       : null;
//   const createdDate =
//     createdAtSeconds === null ? null : new Date(createdAtSeconds * 1000);

//   const getGoldRateValue = (key: string): string | number => {
//     const value = goldRateData?.[key];
//     return typeof value === "string" || typeof value === "number"
//       ? value
//       : "—";
//   };

//   const formatRate = (value: string | number): string => {
//     const numericValue = Number(value);
//     return value !== "—" && !Number.isNaN(numericValue)
//       ? numericValue.toLocaleString("en-IN")
//       : String(value);
//   };

//   return (
//     <section className="px-4 pb-4 sm:px-6 lg:px-8">
//       <div className="relative overflow-hidden rounded-xl bg-[#0a2c35] px-3 py-3 shadow-md ring-1 ring-[#e9bf55]/25 sm:px-4">
//         <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e9bf55] to-transparent" />

//         {/* Header + timestamp in one row */}
//         <div className="flex items-center justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e9bf55]/15 ring-1 ring-[#e9bf55]/30">
//               <TrendingUp size={13} strokeWidth={2.5} className="text-[#f0cf7a]" />
//             </span>
//             <h3 className="text-sm font-semibold leading-none text-white">
//               Today&apos;s gold rate
//             </h3>
//           </div>
//           <div className="flex items-center gap-2">
//             <p className="hidden text-[10px] text-white/45 sm:block">
//               {createdDate
//                 ? createdDate.toLocaleString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })
//                 : "—"}
//             </p>
//             <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-300/20">
//               <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
//               Live
//             </span>
//           </div>
//         </div>

//         {/* Rate cards — compact row */}
//         <div className="mt-3 grid grid-cols-3 gap-2">
//           {isLoading ? (
//             goldTypes.map((item) => (
//               <div
//                 key={item.key}
//                 className="rounded-lg border border-[#e9bf55]/15 bg-white/[0.04] px-2.5 py-2"
//               >
//                 <Skeleton
//                   width={30}
//                   height={12}
//                   baseColor="#14434e"
//                   highlightColor="#1d5866"
//                 />
//                 <Skeleton
//                   width={80}
//                   height={20}
//                   baseColor="#14434e"
//                   highlightColor="#1d5866"
//                   className="mt-2"
//                 />
//                 <Skeleton
//                   width={30}
//                   height={10}
//                   baseColor="#14434e"
//                   highlightColor="#1d5866"
//                   className="mt-1"
//                 />
//               </div>
//             ))
//           ) : goldRates && !isError ? (
//             goldTypes.map((item, index) => (
//               <div
//                 key={item.key}
//                 className={`rounded-lg border px-2.5 py-2 ${
//                   index === 0
//                     ? "border-[#e9bf55]/45 bg-[#e9bf55]/[0.07]"
//                     : "border-[#e9bf55]/15 bg-white/[0.04]"
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="inline-flex h-4 items-center rounded-full bg-[#e9bf55]/15 px-1.5 text-[10px] font-semibold text-[#f0cf7a]">
//                     {item.karat}
//                   </span>
//                   <span className="text-[10px] text-white/50">{item.unit}</span>
//                 </div>
//                 <p
//                   className={`mt-1.5 bg-gradient-to-b from-[#fbeab0] via-[#e9bf55] to-[#b98a2e] bg-clip-text font-serif font-semibold tabular-nums leading-tight text-transparent ${
//                     index === 0 ? "text-xl" : "text-md sm:text-xl"
//                   }`}
//                 >
//                   ₹{formatRate(getGoldRateValue(item.key))}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-3 rounded-lg border border-[#e9bf55]/15 bg-white/[0.04] py-4 text-center">
//               <p className="text-xs text-white/70">
//                 Today&apos;s rate isn&apos;t available right now.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Timestamp visible on mobile only (hidden sm+) */}
//         <p className="mt-2 text-right text-[10px] text-white/45 sm:hidden">
//           Updated{" "}
//           {createdDate
//             ? createdDate.toLocaleString("en-IN", {
//                 day: "2-digit",
//                 month: "short",
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })
//             : "—"}
//         </p>
//       </div>
//     </section>
//   );
// };

// export default TodayGoldRate;


// "use client";

// import { TrendingUp } from "lucide-react";
// import Skeleton from "react-loading-skeleton";
// import { useGoldRate } from "@/hooks/useCarousel";

// const goldTypes = [
//   { key: "Gold_24", karat: "24K", unit: "1g" },
//   { key: "Gold_22", karat: "22K", unit: "8g" },
//   { key: "Gold_18", karat: "18K", unit: "1g" },
// ];

// // Gold border: a steady gold base with a bright sheen that travels around it
// const borderSheen = {
//   background:
//     "conic-gradient(from 0deg, #b98a2e 0%, #d9a93f 20%, #fbeab0 28%, #fff4cc 30%, #fbeab0 32%, #d9a93f 40%, #b98a2e 55%, #d9a93f 75%, #b98a2e 100%)",
// };

// const TodayGoldRate: React.FC = () => {
//   const { data: goldRates, isLoading, isError } = useGoldRate();
//   const goldRateData = goldRates as Record<string, unknown> | null | undefined;
//   const createdAt = goldRateData?.createdAt;
//   const createdAtSeconds =
//     createdAt &&
//     typeof createdAt === "object" &&
//     "seconds" in createdAt &&
//     typeof createdAt.seconds === "number"
//       ? createdAt.seconds
//       : null;
//   const createdDate =
//     createdAtSeconds === null ? null : new Date(createdAtSeconds * 1000);

//   const getGoldRateValue = (key: string): string | number => {
//     const value = goldRateData?.[key];
//     return typeof value === "string" || typeof value === "number"
//       ? value
//       : "—";
//   };

//   const formatRate = (value: string | number): string => {
//     const numericValue = Number(value);
//     return value !== "—" && !Number.isNaN(numericValue)
//       ? numericValue.toLocaleString("en-IN")
//       : String(value);
//   };

//   return (
//     <section className="px-4 pb-4 sm:px-6 lg:px-8">
//       {/* Border wrapper: 1.5px of padding is what shows as the animated border */}
//       <div className="relative overflow-hidden rounded-xl bg-[#b98a2e] p-[1.5px] shadow-md">
//         {/* Rotating gold sheen (square, centred, larger than the card) */}
//         <div
//           aria-hidden="true"
//           style={borderSheen}
//           className="absolute left-1/2 top-1/2 -ml-[100%] -mt-[100%] aspect-square w-[200%] animate-[spin_6s_linear_infinite] motion-reduce:animate-none"
//         />

//         {/* Card content sits on top and hides everything except the 1.5px edge */}
//         <div className="relative rounded-[10px] bg-[#0a2c35] px-3 py-3 sm:px-4">
//           {/* Header + timestamp in one row */}
//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-2">
//               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e9bf55]/15 ring-1 ring-[#e9bf55]/30">
//                 <TrendingUp
//                   size={13}
//                   strokeWidth={2.5}
//                   className="text-[#f0cf7a]"
//                 />
//               </span>
//               <h3 className="text-sm font-semibold leading-none text-white">
//                 Today&apos;s gold rate
//               </h3>
//             </div>
//             <div className="flex items-center gap-2">
//               <p className="hidden text-[10px] text-white/45 sm:block">
//                 {createdDate
//                   ? createdDate.toLocaleString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })
//                   : "—"}
//               </p>
//               <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-300/20">
//                 <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
//                 Live
//               </span>
//             </div>
//           </div>

//           {/* Rate cards — compact row */}
//           <div className="mt-3 grid grid-cols-3 gap-2">
//             {isLoading ? (
//               goldTypes.map((item) => (
//                 <div
//                   key={item.key}
//                   className="rounded-lg border border-[#e9bf55]/15 bg-white/[0.04] px-2.5 py-2"
//                 >
//                   <Skeleton
//                     width={30}
//                     height={12}
//                     baseColor="#14434e"
//                     highlightColor="#1d5866"
//                   />
//                   <Skeleton
//                     width={80}
//                     height={20}
//                     baseColor="#14434e"
//                     highlightColor="#1d5866"
//                     className="mt-2"
//                   />
//                   <Skeleton
//                     width={30}
//                     height={10}
//                     baseColor="#14434e"
//                     highlightColor="#1d5866"
//                     className="mt-1"
//                   />
//                 </div>
//               ))
//             ) : goldRates && !isError ? (
//               goldTypes.map((item, index) => (
//                 <div
//                   key={item.key}
//                   className={`rounded-lg border px-2.5 py-2 ${
//                     index === 0
//                       ? "border-[#e9bf55]/45 bg-[#e9bf55]/[0.07]"
//                       : "border-[#e9bf55]/15 bg-white/[0.04]"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="inline-flex h-4 items-center rounded-full bg-[#e9bf55]/15 px-1.5 text-[10px] font-semibold text-[#f0cf7a]">
//                       {item.karat}
//                     </span>
//                     <span className="text-[10px] text-white/50">
//                       {item.unit}
//                     </span>
//                   </div>
//                   <p
//                     className={`mt-1.5 bg-gradient-to-b from-[#fbeab0] via-[#e9bf55] to-[#b98a2e] bg-clip-text font-serif font-semibold tabular-nums leading-tight text-transparent ${
//                       index === 0 ? "text-xl" : "text-base sm:text-xl"
//                     }`}
//                   >
//                     ₹{formatRate(getGoldRateValue(item.key))}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-3 rounded-lg border border-[#e9bf55]/15 bg-white/[0.04] py-4 text-center">
//                 <p className="text-xs text-white/70">
//                   Today&apos;s rate isn&apos;t available right now.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Timestamp visible on mobile only (hidden sm+) */}
//           <p className="mt-2 text-right text-[10px] text-white/45 sm:hidden">
//             Updated{" "}
//             {createdDate
//               ? createdDate.toLocaleString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "—"}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TodayGoldRate;



"use client";

import { TrendingUp } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // ⬅ required for skeleton styling
import { useGoldRate } from "@/hooks/useCarousel";

const goldTypes = [
  { key: "Gold_24", karat: "24K", unit: "1g" },
  { key: "Gold_22", karat: "22K", unit: "8g" },
  { key: "Gold_18", karat: "18K", unit: "1g" },
];

const borderSheen = {
  background:
    "conic-gradient(from 0deg, #b98a2e 0%, #d9a93f 20%, #fbeab0 28%, #fff4cc 30%, #fbeab0 32%, #d9a93f 40%, #b98a2e 55%, #d9a93f 75%, #b98a2e 100%)",
};

const TodayGoldRate: React.FC = () => {
  const { data: goldRates, isLoading, isError } = useGoldRate();
  const goldRateData = goldRates as Record<string, unknown> | null | undefined;
  const createdAt = goldRateData?.createdAt;
  const createdAtSeconds =
    createdAt &&
    typeof createdAt === "object" &&
    "seconds" in createdAt &&
    typeof createdAt.seconds === "number"
      ? createdAt.seconds
      : null;
  const createdDate =
    createdAtSeconds === null ? null : new Date(createdAtSeconds * 1000);

  const getGoldRateValue = (key: string): string | number => {
    const value = goldRateData?.[key];
    return typeof value === "string" || typeof value === "number"
      ? value
      : "—";
  };

  const formatRate = (value: string | number): string => {
    const numericValue = Number(value);
    return value !== "—" && !Number.isNaN(numericValue)
      ? numericValue.toLocaleString("en-IN")
      : String(value);
  };

  // Shared skeleton colors
  const skeletonProps = {
    baseColor: "#14434e",
    highlightColor: "#1d5866",
  };

  return (
    <section className="px-4 pb-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-xl bg-[#b98a2e] p-[1.5px] shadow-md">
        <div
          aria-hidden="true"
          style={borderSheen}
          className="absolute left-1/2 top-1/2 -ml-[100%] -mt-[100%] aspect-square w-[200%] animate-[spin_6s_linear_infinite] motion-reduce:animate-none"
        />

        <div className="relative rounded-[10px] bg-[#0a2c35] px-3 py-3 sm:px-4">
          {/* Header + timestamp */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e9bf55]/15 ring-1 ring-[#e9bf55]/30">
                <TrendingUp
                  size={13}
                  strokeWidth={2.5}
                  className="text-[#f0cf7a]"
                />
              </span>

              {isLoading ? (
                <Skeleton
                  width={110}
                  height={14}
                  {...skeletonProps}
                  className="leading-none"
                />
              ) : (
                <h3 className="text-sm font-semibold leading-none text-white">
                  Today&apos;s gold rate
                </h3>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Timestamp — skeleton while loading */}
              <div className="hidden sm:block">
                {isLoading ? (
                  <Skeleton width={90} height={10} {...skeletonProps} />
                ) : (
                  <p className="text-[10px] text-white/45">
                    {createdDate
                      ? createdDate.toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </p>
                )}
              </div>

              <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-300/20">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
          </div>

          {/* Rate cards */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {isLoading ? (
              // 🔄 Skeleton — mirrors the real card layout exactly
              goldTypes.map((item, index) => (
                <div
                  key={item.key}
                  className={`rounded-lg border px-2.5 py-2 ${
                    index === 0
                      ? "border-[#e9bf55]/45 bg-[#e9bf55]/[0.07]"
                      : "border-[#e9bf55]/15 bg-white/[0.04]"
                  }`}
                >
                  {/* top row: karat pill + unit */}
                  <div className="flex items-center justify-between">
                    <Skeleton
                      width={26}
                      height={16}
                      borderRadius={999}
                      {...skeletonProps}
                    />
                    <Skeleton width={18} height={10} {...skeletonProps} />
                  </div>

                  {/* price line */}
                  <div className="mt-1.5">
                    <Skeleton
                      width="85%"
                      height={index === 0 ? 22 : 18}
                      {...skeletonProps}
                    />
                  </div>
                </div>
              ))
            ) : goldRates && !isError ? (
              goldTypes.map((item, index) => (
                <div
                  key={item.key}
                  className={`rounded-lg border px-2.5 py-2 ${
                    index === 0
                      ? "border-[#e9bf55]/45 bg-[#e9bf55]/[0.07]"
                      : "border-[#e9bf55]/15 bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-4 items-center rounded-full bg-[#e9bf55]/15 px-1.5 text-[10px] font-semibold text-[#f0cf7a]">
                      {item.karat}
                    </span>
                    <span className="text-[10px] text-white/50">
                      {item.unit}
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 bg-gradient-to-b from-[#fbeab0] via-[#e9bf55] to-[#b98a2e] bg-clip-text font-serif font-semibold tabular-nums leading-tight text-transparent ${
                      index === 0 ? "text-xl" : "text-base sm:text-xl"
                    }`}
                  >
                    ₹{formatRate(getGoldRateValue(item.key))}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-3 rounded-lg border border-[#e9bf55]/15 bg-white/[0.04] py-4 text-center">
                <p className="text-xs text-white/70">
                  Today&apos;s rate isn&apos;t available right now.
                </p>
              </div>
            )}
          </div>

          {/* Timestamp on mobile */}
          <div className="mt-2 text-right sm:hidden">
            {isLoading ? (
              <Skeleton
                width={110}
                height={10}
                {...skeletonProps}
                className="ml-auto"
              />
            ) : (
              <p className="text-[10px] text-white/45">
                Updated{" "}
                {createdDate
                  ? createdDate.toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodayGoldRate;
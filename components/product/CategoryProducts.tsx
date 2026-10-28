// "use client";
// import { useMemo, useState } from "react";
// import { Filter } from "lucide-react";
// import ProductCard from "../ProductCard";
// import { CategoryProductsProps, Product } from "@/types";
// import { ReactElement } from "react";

// const PRODUCTS_PER_PAGE = 8;

// const CategoryProducts: React.FC<CategoryProductsProps> = ({
//   products,
//   sort,
//   currentPage,
// }): ReactElement => {
//   const [visibleCount, setVisibleCount] = useState(
//     Math.max(currentPage, 1) * PRODUCTS_PER_PAGE
//   );

//   const handleAddToCart = (product: Product): void => {
//     console.log("Add to cart:", product);
//     // Implement add to cart functionality
//   };

//   const handleShowLoginModal = (): void => {
//     console.log("Show login modal");
//     // Implement login modal functionality
//   };

//   // Sort products based on selected sort option
//   const sortedProducts = useMemo(
//     () =>
//       [...products].sort((a, b) => {
//         switch (sort) {
//           case "price-low":
//             return a.price - b.price;
//           case "price-high":
//             return b.price - a.price;
//           case "rating":
//             return b.rating - a.rating;
//           case "newest":
//             return (
//               new Date(b.createdAt || "").getTime() -
//               new Date(a.createdAt || "").getTime()
//             );
//           default:
//             return a.name.localeCompare(b.name);
//         }
//       }),
//     [products, sort]
//   );
//   const visibleProducts = sortedProducts.slice(0, visibleCount);

//   return (
//     <div className="flex flex-col lg:flex-row gap-8">
//       <div className="flex-1">
//         {sortedProducts.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-lg">
//             <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No products found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {visibleProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onAddToCart={handleAddToCart}
//                 onShowLoginModal={handleShowLoginModal}
//               />
//             ))}
//           </div>
//         )}

//         {/* Load More (Pagination) */}
//         {visibleCount < sortedProducts.length && (
//           <div className="mt-8 text-center">
//             <button
//               onClick={() =>
//                 setVisibleCount((count) =>
//                   Math.min(count + PRODUCTS_PER_PAGE, sortedProducts.length)
//                 )
//               }
//               className="px-8 py-3 border border-[#196b7a] text-[#196b7a] bg-gray-100 cursor-pointer font-semibold rounded-lg hover:bg-white transition-colors"
//             >
//               Load More Products...
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryProducts;



"use client";

import { useMemo, useState } from "react";
import { Filter, PackageSearch, ArrowDown, Sparkles } from "lucide-react";
import ProductCard from "../ProductCard";
import { CategoryProductsProps, Product } from "@/types";
import { ReactElement } from "react";

const PRODUCTS_PER_PAGE = 8;

const CategoryProducts: React.FC<CategoryProductsProps> = ({
  products,
  sort,
  currentPage,
}): ReactElement => {
  const [visibleCount, setVisibleCount] = useState(
    Math.max(currentPage, 1) * PRODUCTS_PER_PAGE
  );

  const handleAddToCart = (product: Product): void => {
    console.log("Add to cart:", product);
  };

  const handleShowLoginModal = (): void => {
    console.log("Show login modal");
  };

  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        switch (sort) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "newest":
            return (
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime()
            );
          default:
            return a.name.localeCompare(b.name);
        }
      }),
    [products, sort]
  );

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const remainingProducts = sortedProducts.length - visibleProducts.length;

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Explore Products
            </h2>

            <Sparkles
              size={19}
              className="text-[#196b7a]"
              aria-hidden="true"
            />
          </div>

          <p className="text-sm text-gray-500">
            Discover products selected for you.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-[#196b7a]" />

          <span className="font-medium text-gray-700">
            {sortedProducts.length}
          </span>

          <span className="text-gray-500">
            {sortedProducts.length === 1 ? "product" : "products"}
          </span>
        </div>
      </div>

      {/* Product Grid / Empty State */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
            <PackageSearch
              className="h-8 w-8 text-gray-400"
              aria-hidden="true"
            />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No products found
          </h3>

          <p className="mx-auto max-w-sm text-sm leading-6 text-gray-500">
            We couldn't find any products in this category. Please check back
            later for new arrivals.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-7 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-0"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onShowLoginModal={handleShowLoginModal}
                />
              </div>
            ))}
          </div>

          {/* Results Summary */}
          <div className="mt-10 flex flex-col items-center">
            <p className="mb-4 text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {visibleProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {sortedProducts.length}
              </span>{" "}
              products
            </p>

            {remainingProducts > 0 && (
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((count) =>
                    Math.min(
                      count + PRODUCTS_PER_PAGE,
                      sortedProducts.length
                    )
                  )
                }
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#196b7a] bg-white px-7 py-3 text-sm font-semibold text-[#196b7a] shadow-sm transition-all duration-200 hover:bg-[#196b7a] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#196b7a] focus:ring-offset-2 active:scale-[0.98]"
              >
                <span>Load More Products</span>

                <ArrowDown
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            )}

            {remainingProducts > 0 && (
              <p className="mt-3 text-xs text-gray-400">
                {remainingProducts}{" "}
                {remainingProducts === 1 ? "product" : "products"} remaining
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default CategoryProducts;
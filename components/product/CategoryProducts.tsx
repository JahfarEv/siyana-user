"use client";
import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import ProductCard from "../ProductCard";
import { CategoryProductsProps, Product } from "@/types";
import { ReactElement } from "react";

const PRODUCTS_PER_PAGE = 12;

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
    // Implement add to cart functionality
  };

  const handleShowLoginModal = (): void => {
    console.log("Show login modal");
    // Implement login modal functionality
  };

  // Sort products based on selected sort option
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

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onShowLoginModal={handleShowLoginModal}
              />
            ))}
          </div>
        )}

        {/* Load More (Pagination) */}
        {visibleCount < sortedProducts.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + PRODUCTS_PER_PAGE, sortedProducts.length)
                )
              }
              className="px-8 py-3 border border-[#196b7a] text-[#196b7a] bg-gray-100 cursor-pointer font-semibold rounded-lg hover:bg-white transition-colors"
            >
              Load More Products...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

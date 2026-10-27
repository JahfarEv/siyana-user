import { notFound } from "next/navigation";
import CategoryProducts from "@/components/product/CategoryProducts";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import { ReactElement } from "react";
import { fetchCategories, fetchProductsByCategory } from "@/lib/firebase/firebaseQueries";

interface CategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
  searchParams: Promise<{
    sort?: string;
    page?: string;
  }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps): Promise<ReactElement> {
  const [{ categoryName }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const categories = await fetchCategories();
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) notFound();
  const products = await fetchProductsByCategory(category.id);

  const sort = resolvedSearchParams.sort || "name";
  const requestedPage = Number.parseInt(resolvedSearchParams.page || "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;

  return (
    <div className="min-h-screen bg-gray-50 mx-auto">
      <NavbarWrapper />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple & Attractive Header */}
        <div className="mb-12 text-center py-12">
          <div className="max-w-4xl mx-auto">
            {/* Elegant decorative element */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-linear-to-r from-amber-400 to-amber-600 rounded-full"></div>
            </div>

            {/* Category Name */}
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-4 tracking-tight">
              {category.name}
            </h1>

            {/* Subtle product count */}
            <div className="text-lg text-gray-600 font-medium">
              {products.length}{" "}
              {products.length === 1 ? "Exquisite Piece" : "Premium Designs"}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <CategoryProducts
          key={category.id}
          products={products}
          category={category}
          sort={sort}
          currentPage={page}
        />
      </div>
      <Footer />
    </div>
  );
}

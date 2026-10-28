// import { notFound } from "next/navigation";
// import CategoryProducts from "@/components/product/CategoryProducts";
// import NavbarWrapper from "@/components/layout/NavbarWrapper";
// import Footer from "@/components/layout/Footer";
// import { ReactElement } from "react";
// import { fetchCategories, fetchProductsByCategory } from "@/lib/firebase/firebaseQueries";

// interface CategoryPageProps {
//   params: Promise<{
//     categoryName: string;
//   }>;
//   searchParams: Promise<{
//     sort?: string;
//     page?: string;
//   }>;
// }

// const toCategorySlug = (value: string): string =>
//   value
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-|-$/g, "");

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: CategoryPageProps): Promise<ReactElement> {
//   const [{ categoryName }, resolvedSearchParams] = await Promise.all([
//     params,
//     searchParams,
//   ]);
//   const categories = await fetchCategories();
//   const requestedCategory = toCategorySlug(categoryName);
//   const category = categories.find(
//     (cat) =>
//       toCategorySlug(cat.name) === requestedCategory ||
//       toCategorySlug(cat.slug || "") === requestedCategory
//   );

//   if (!category) notFound();
//   const products = await fetchProductsByCategory(category.id);

//   const sort = resolvedSearchParams.sort || "name";
//   const requestedPage = Number.parseInt(resolvedSearchParams.page || "1", 10);
//   const page = Number.isFinite(requestedPage) && requestedPage > 0
//     ? requestedPage
//     : 1;

//   return (
//     <div className="min-h-screen bg-gray-50 mx-auto">
//       <NavbarWrapper />
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Simple & Attractive Header */}
//         <div className="mb-12 text-center py-12">
//           <div className="max-w-4xl mx-auto">
//             {/* Elegant decorative element */}
//             <div className="flex justify-center mb-6">
//               <div className="w-16 h-1 bg-linear-to-r from-amber-400 to-amber-600 rounded-full"></div>
//             </div>

//             {/* Category Name */}
//             <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-4 tracking-tight">
//               {category.name}
//             </h1>

//             {/* Subtle product count */}
//             <div className="text-lg text-gray-600 font-medium">
//               {products.length}{" "}
//               {products.length === 1 ? "Exquisite Piece" : "Premium Designs"}
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <CategoryProducts
//           key={category.id}
//           products={products}
//           category={category}
//           sort={sort}
//           currentPage={page}
//         />
//       </div>
//       <Footer />
//     </div>
//   );
// }




import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CategoryProducts from "@/components/product/CategoryProducts";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import { ReactElement } from "react";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "@/lib/firebase/firebaseQueries";

interface CategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
  searchParams: Promise<{
    sort?: string;
    page?: string;
  }>;
}

const toCategorySlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps): Promise<ReactElement> {
  const [{ categoryName }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const categories = await fetchCategories();
  const requestedCategory = toCategorySlug(categoryName);

  const category = categories.find(
    (cat) =>
      toCategorySlug(cat.name) === requestedCategory ||
      toCategorySlug(cat.slug || "") === requestedCategory
  );

  if (!category) notFound();

  const products = await fetchProductsByCategory(category.id);

  const sort = resolvedSearchParams.sort || "name";

  const requestedPage = Number.parseInt(
    resolvedSearchParams.page || "1",
    10
  );

  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;



  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <NavbarWrapper />

      <main>
        {/* Category Banner */}
        <section className="px-3 pt-4 sm:px-5 lg:px-8 lg:pt-6">
          <div className="relative mx-auto min-h-[190px] max-w-[1600px] overflow-hidden rounded-xl bg-[#eef1f2] sm:min-h-[230px] lg:min-h-[280px]">
            {/* Background Image */}
            <Image
              src={category.image}
              alt={`${category.name} jewelry collection`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/10" />

            {/* Banner Content */}
            <div className="relative z-10 flex min-h-[190px] items-center px-6 py-8 sm:min-h-[230px] sm:px-10 lg:min-h-[280px] lg:px-16">
              <div className="max-w-xl">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#196b7a] sm:text-sm">
                  Discover Our Collection
                </p>

                <h1 className="font-serif text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-6xl">
                  {category.name}
                </h1>

                <div className="my-4 h-px w-16 bg-[#196b7a] sm:my-5" />

                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-2 text-sm text-gray-600"
                >
                  <Link
                    href="/"
                    className="transition-colors hover:text-[#196b7a]"
                  >
                    Home
                  </Link>

                  <span aria-hidden="true">›</span>

                  <span className="font-medium text-gray-900">
                    {category.name}
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="mx-auto max-w-[1600px] px-3 pb-16 pt-8 sm:px-5 sm:pt-10 lg:px-8 lg:pt-12">
          <CategoryProducts
            key={category.id}
            products={products}
            category={category}
            sort={sort}
            currentPage={page}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

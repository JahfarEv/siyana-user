export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ReactElement } from "react";
import HomeClient from "@/components/home/HomeClient";
import { fetchCarouselItems, fetchCategories, fetchOffers } from "@/lib/firebase/firebaseQueries";
import Navbar from "@/components/layout/Navbar"; // Import Navbar

export default async function Home(): Promise<ReactElement> {
  // Fetch all data in parallel on the server
  const [carouselData, categories, offers] = await Promise.all([
    fetchCarouselItems(),
    fetchCategories(),
    fetchOffers(),
  ]);

  return (
    <> 

    <HomeClient
      carouselData={carouselData}
      categories={categories}
      offers={offers}
    />
    </>
  );
}

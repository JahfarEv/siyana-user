// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// import { ReactElement } from "react";
// import HomeClient from "@/components/home/HomeClient";
// import { fetchCarouselItems, fetchCategories, fetchOffers } from "@/lib/firebase/firebaseQueries";
// import Navbar from "@/components/layout/Navbar"; // Import Navbar

// export default async function Home(): Promise<ReactElement> {
//   // Fetch all data in parallel on the server
//   const [carouselData, categories, offers] = await Promise.all([
//     fetchCarouselItems(),
//     fetchCategories(),
//     fetchOffers(),
//   ]);

//   return (
//     <>

//     <HomeClient
//       carouselData={carouselData}
//       categories={categories}
//       offers={offers}
//     />
//     </>
//   );
// }



export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ReactElement } from "react";
import HomeClient from "@/components/home/HomeClient";
import {
  fetchCarouselItems,
  fetchCategories,
  fetchOffers,
} from "@/lib/firebase/firebaseQueries";
import type { OfferCardProps } from "@/types";

type OfferRecord = OfferCardProps & { id: string };

// Convert Firestore data into plain, serializable JavaScript values
function serializeData<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_key, value) => {
      // Convert Firestore Timestamp objects to ISO date strings
      if (
        value &&
        typeof value === "object" &&
        typeof value.seconds === "number" &&
        typeof value.nanoseconds === "number"
      ) {
        return new Date(value.seconds * 1000).toISOString();
      }

      return value;
    })
  ) as T;
}

function isOfferCardProps(value: unknown): value is OfferRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "productName" in value &&
    typeof value.productName === "string" &&
    "discountPercentage" in value &&
    typeof value.discountPercentage === "string" &&
    "image" in value &&
    typeof value.image === "string" &&
    "route" in value &&
    typeof value.route === "string"
  );
}

export default async function Home(): Promise<ReactElement> {
  const [carouselData, categories, offers] = await Promise.all([
    fetchCarouselItems(),
    fetchCategories(),
    fetchOffers(),
  ]);
  const serializedOffers = serializeData(offers);
  const validOffers = serializedOffers.filter(isOfferCardProps);
  if (validOffers.length !== serializedOffers.length) {
    const invalidOfferIds = serializedOffers
      .filter((offer) => !isOfferCardProps(offer))
      .map((offer) =>
        typeof offer === "object" && offer !== null && "id" in offer
          ? offer.id
          : "unknown"
      );
    console.warn("Skipping invalid offer documents:", invalidOfferIds);
  }

  return (
    <HomeClient
      carouselData={serializeData(carouselData)}
      categories={serializeData(categories)}
      offers={validOffers}
    />
  );
}
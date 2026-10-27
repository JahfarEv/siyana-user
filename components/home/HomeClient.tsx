"use client";

import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner, { type CarouselItem } from "@/components/home/HeroBanner";
import OfferCards from "@/components/home/OfferCard";
import CategoryGrid from "@/components/home/CategoryGrid";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { User, CartItem, Product, Category, OfferCardProps } from "@/types";

interface HomeClientProps {
  carouselData: CarouselItem[];
  categories: Category[];
  offers: OfferCardProps[];
}

const LOCAL_STORAGE_CHANGE_EVENT = "siyana:local-storage-change";

const subscribeToLocalStorage = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT, callback);
  };
};

function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const fallbackSnapshot = JSON.stringify(initialValue);
  const getSnapshot = useCallback(
    () => window.localStorage.getItem(key) ?? fallbackSnapshot,
    [fallbackSnapshot, key]
  );
  const getServerSnapshot = useCallback(
    () => fallbackSnapshot,
    [fallbackSnapshot]
  );
  const snapshot = useSyncExternalStore(
    subscribeToLocalStorage,
    getSnapshot,
    getServerSnapshot
  );
  const value = useMemo(() => JSON.parse(snapshot) as T, [snapshot]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (nextValue) => {
      const currentValue = JSON.parse(getSnapshot()) as T;
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (previousValue: T) => T)(currentValue)
          : nextValue;

      if (resolvedValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(resolvedValue));
      }

      window.dispatchEvent(new Event(LOCAL_STORAGE_CHANGE_EVENT));
    },
    [getSnapshot, key]
  );

  return [value, setValue];
}

export default function HomeClient({
  carouselData,
  categories,
  offers,
}: HomeClientProps): ReactElement {
  const [cart, setCart] = useLocalStorageState<CartItem[]>("siyana-cart", []);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [user, setUser] = useLocalStorageState<User | null>("siyana-user", null);

  const addToCart = (product: Product): void => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number): void => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number): void => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const login = (userData: User): void => {
    setUser(userData);
    setShowLoginModal(false);
  };

  const logout = (): void => {
    setUser(null);
    setCart([]);
  };

  const cartItemsCount: number = cart.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar
        cartItemsCount={cartItemsCount}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={logout}
      />
      <div className="overflow-x-hidden">
        <main className="grow">
          <HeroBanner slides={carouselData} />
          <CategoryGrid categories={categories} />
          <OfferCards offers={offers} />
        </main>
        <Footer />
      </div>
      {showLoginModal && (
        <LoginModal
          isOpen={true}
          onClose={() => setShowLoginModal(false)}
          onLogin={login}
        />
      )}
    </>
  );
}

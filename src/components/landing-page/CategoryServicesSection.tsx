"use client";

import React, { useState, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";
import Carousel from "@/components/landing-page/Carousel";
import BookAgainSection from "@/components/landing-page/BookAgainSection";
import CategoryTabs from "@/components/landing-page/CategoryTabs";
import {
  bookAgainServices,
  recommendations,
  servicesNearYou,
  popularBusinesses,
} from "@/components/landing-page/mockLandingData";

export default function CategoryServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isLoggedIn");
      if (saved === "true") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* 5. Category Section */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Book Again Section (Logged In Only) */}
      {isLoggedIn && (
        <BookAgainSection
          services={bookAgainServices}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}

      {/* 6. Recommended Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-16 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">Recommended</h2>
          <a href="/explore" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
            See all
          </a>
        </div>
        {recommendations.length > 5 ? (
          <Carousel>
            {recommendations.map((rec) => (
              <div key={rec.id} className="w-[calc(50%-7.5px)] sm:w-[360px] md:w-[406px] shrink-0 snap-start">
                <ServiceCard
                  rec={rec}
                  isFavorite={favorites.includes(rec.id)}
                  onToggleFavorite={toggleFavorite}
                  onBookNow={(id) => console.log("Booking item", id)}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {recommendations.map((rec) => (
              <ServiceCard
                key={rec.id}
                rec={rec}
                isFavorite={favorites.includes(rec.id)}
                onToggleFavorite={toggleFavorite}
                onBookNow={(id) => console.log("Booking item", id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 7. Services Near You Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-16 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">Services near you</h2>
          <a href="/explore" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
            See all
          </a>
        </div>
        {servicesNearYou.length > 5 ? (
          <Carousel>
            {servicesNearYou.map((rec) => (
              <div key={rec.id} className="w-[calc(50%-7.5px)] sm:w-[360px] md:w-[406px] shrink-0 snap-start">
                <ServiceCard
                  rec={rec}
                  isFavorite={favorites.includes(rec.id)}
                  onToggleFavorite={toggleFavorite}
                  onBookNow={(id) => console.log("Booking item", id)}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {servicesNearYou.map((rec) => (
              <ServiceCard
                key={rec.id}
                rec={rec}
                isFavorite={favorites.includes(rec.id)}
                onToggleFavorite={toggleFavorite}
                onBookNow={(id) => console.log("Booking item", id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 8. Popular Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-16 relative z-10 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">Popular</h2>
          <a href="/explore" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
            See all
          </a>
        </div>
        {popularBusinesses.length > 5 ? (
          <Carousel>
            {popularBusinesses.map((rec) => (
              <div key={rec.id} className="w-[calc(50%-7.5px)] sm:w-[360px] md:w-[406px] shrink-0 snap-start">
                <ServiceCard
                  rec={rec}
                  isFavorite={favorites.includes(rec.id)}
                  onToggleFavorite={toggleFavorite}
                  onBookNow={(id) => console.log("Booking item", id)}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {popularBusinesses.map((rec) => (
              <ServiceCard
                key={rec.id}
                rec={rec}
                isFavorite={favorites.includes(rec.id)}
                onToggleFavorite={toggleFavorite}
                onBookNow={(id) => console.log("Booking item", id)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

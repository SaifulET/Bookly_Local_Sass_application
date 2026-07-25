import React from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, SquareLock01Icon } from "@hugeicons/core-free-icons";
import Carousel from "@/components/landing-page/Carousel";
import TrustedBusinessCard, { TrustedBusiness } from "@/components/TrustedBusinessCard";
import WhyChooseUs from "@/components/landing-page/WhyChooseUs";
import AddToHomeScreenButton from "@/components/landing-page/AddToHomeScreenButton";
import BusinessMockup from "@/components/landing-page/BusinessMockup";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";
import NavbarWrapper from "@/components/landing-page/NavbarWrapper";
import TopBannerWrapper from "@/components/landing-page/TopBannerWrapper";
import SearchBar from "@/components/landing-page/SearchBar";
import CategoryServicesSection from "@/components/landing-page/CategoryServicesSection";
import LandingStepCard from "@/components/landing-page/LandingStepCard";

export default function LandingPage() {
  // Mock trusted businesses data
  const trustedBusinesses: TrustedBusiness[] = [
    { id: 1, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 2, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 3, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 4, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 5, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 6, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 7, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 8, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 9, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 10, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 11, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 12, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
  ];

  return (
    <div className="min-h-screen font-poppins relative overflow-x-hidden text-[#1C1B1C]">
      {/* Root Solid Background Layer */}
      <div className="absolute inset-0 -z-20 bg-[#FDFBF9] pointer-events-none" />

      <EdgeSoftOrbsTop
        size={380}
        duration={56}
        intensity={0.85}
        blend="screen"
        zIndex={-5}
      />

      {/* Design Background Blobs */}
      <div className="absolute top-0 left-0 -z-10 w-full pointer-events-none opacity-40">
        <Image src="/designImg/topEllipes.svg" alt="" className="absolute top-0 left-0 w-[500px] h-[500px]" width={500} height={500} priority />
        <Image src="/designImg/middleEllipes.svg" alt="" className="absolute top-[20%] right-0 w-[600px] h-[600px]" width={600} height={600} />
      </div>

      {/* 1. Top Banner */}
      <TopBannerWrapper />

      {/* 2. Navbar */}
      <NavbarWrapper />

      {/* 3. Hero Section */}
      <section className="w-full px-4 text-center mt-12 md:mt-16 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-[72px] font-medium leading-[1.1] md:leading-[72px] text-[#1C1B1C] tracking-tight mb-4 md:mb-6">
          Discover and book the <span className="text-[#3586B8] font-bold">best</span> <br className="hidden md:inline" /> local services in Cyprus
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-[#45474B] leading-relaxed max-w-[672px] mb-3">
          Find trusted professionals near you and secure your appointment instantly. No calls. No waiting.
        </p>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#666666] font-medium max-w-[587px] mb-6 md:mb-8">
          First booking? Pay a small deposit to secure your slot. The rest you pay at the venue.
        </p>

        {/* 4. Hero Search Bar */}
        <SearchBar />
      </section>

      {/* 5. Interactive Categories and Services Sections */}
      <CategoryServicesSection />

      {/* 9. Trusted Businesses Section */}
      <section className="w-full bg-[#FCFCFD] py-12 md:py-[72px] border-y border-neutral-100 mt-[24px]">
        <div className="w-full px-4 md:px-8 xl:px-[68px] flex flex-col items-center justify-center gap-10 md:gap-[80px]">
          {/* Container */}
          <div className="flex flex-col items-center gap-4 text-center max-w-[1312px] w-full">
            <h2 className="text-3xl md:text-[36px] font-medium leading-[36px] md:leading-[48px] text-[#1F2937] tracking-tight">
              Trusted by local businesses across Cyprus
            </h2>
            <p className="text-lg md:text-[24px] font-normal leading-[24px] text-[#757575]">
              Join the businesses already growing with Bookly.
            </p>
          </div>

          {/* Carousel / Grid Container */}
          <div className="w-full">
            {trustedBusinesses.length > 5 ? (
              <Carousel gapClass="gap-[40px] md:gap-[80px]">
                {trustedBusinesses.map((biz, idx) => (
                  <TrustedBusinessCard key={`${biz.id}-${idx}`} business={biz} />
                ))}
              </Carousel>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                {trustedBusinesses.map((biz, idx) => (
                  <TrustedBusinessCard key={`${biz.id}-${idx}`} business={biz} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. Book in 3 Simple Steps Section */}
      <section id="how-it-works" className="w-full px-4 md:px-8 xl:px-[68px] mt-[72px] scroll-mt-36">
        <div className="w-full flex flex-col items-center gap-10 md:gap-[40px]">
          {/* Header Container */}
          <div className="flex flex-col items-center gap-4 text-center max-w-[730px]">
            <h2 className="text-3xl md:text-[36px] font-semibold leading-tight md:leading-[48px] text-[#111111] tracking-tight font-poppins">
              Book in 3 simple steps
            </h2>
            <p className="text-lg md:text-[20px] font-normal leading-[28px] text-[#757575]">
              Simple, transparent, and built for Cyprus
            </p>
          </div>

          {/* Cards Frame */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
            <LandingStepCard
              index={0}
              icon={<HugeiconsIcon icon={Search01Icon} className="w-9 h-9 text-[#111111]" />}
              title="Discover"
              description="Browse local services and book instantly. Find exactly what you need, when you need it"
            />
            <LandingStepCard
              index={1}
              icon={<HugeiconsIcon icon={SquareLock01Icon} className="w-9 h-9 text-[#111111]" />}
              title="Secure your spot"
              description="Confirm your booking instantly. First visit? A small deposit is required. Returning customer? No deposit — your slot is held automatically"
            />
            <LandingStepCard
              index={2}
              icon={<Image src="/Icons/glasses.svg" alt="Cheers" className="w-9 h-9 object-contain" draggable="false" width={36} height={36} />}
              title="Show up and enjoy"
              description="Pay the remaining balance at the venue by cash or card. That's it!"
            />
          </div>
        </div>
      </section>

      {/* 11. Why Customers Choose Bookly Section */}
      <WhyChooseUs />

      {/* 12. Add Bookly to Your Home Screen Section */}
      <section className="w-full mt-[219px] mb-24 flex justify-center">
        <div className="w-full h-[320px] md:h-[400px] lg:h-[449px] xl:h-[484px] bg-[#2E9DA7] relative overflow-visible z-10">
          {/* Left Side: Content */}
          <div className="absolute left-[37px] top-[38px] xl:left-[141px] text-white z-10 flex flex-col items-start gap-2.5 sm:gap-4 md:gap-5 max-w-[calc(100%-140px)] lg:max-w-[636px] add-home-screen-content-wrapper">
            <h2 className="add-home-screen-title sm:text-[32px] lg:text-[54px] lg:leading-[64px] font-poppins font-medium text-[#FCFAF9] tracking-tight">
              Add Bookly to your <br /> home screen
            </h2>

            {/* Subtitle tick frame */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="add-home-screen-subtitle sm:text-base md:text-[18px] md:leading-[26px] font-poppins font-medium text-[#FCFAF9]">
                Book any local services instantly
              </span>
              <div className="w-6 h-6 border-[1.5px] border-[#FCFAF9] rounded-full flex items-center justify-center shrink-0 add-home-screen-check-icon">
                <svg className="w-3.5 h-3.5 text-[#FCFAF9] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Paragraph Description */}
            <p className="add-home-screen-desc font-manrope font-normal text-xs sm:text-sm lg:text-[15px] lg:leading-[22px] text-[#FCFAF9] opacity-90 max-w-[509px]">
              No app store downloads required. Install Bookly directly from your browser to get instant access, offline bookings, and local updates right on your home screen.
            </p>
          </div>

          {/* Install Button Container */}
          <div className="absolute left-[150px] xl:left-[378px] top-[250px] xl:top-[347px] z-20 add-home-screen-btn-container">
            <AddToHomeScreenButton
              className="z-10 scale-75 xl:scale-100 origin-left add-home-screen-btn"
              showTextOnMobile={true}
              size="large"
            />
          </div>

          {/* Curved Arrow Image */}
          <div className="absolute left-[120px] xl:left-[256px] top-[215px] xl:top-[245px] w-[36px] xl:w-[114px] h-[40px] xl:h-[151px] pointer-events-none opacity-95 z-20 add-home-screen-arrow-icon">
            <Image src="/Icons/direction.png" alt="Direction Arrow" className="w-full h-full object-contain" draggable="false" fill />
          </div>

          {/* Right Side: Phone Image mockup */}
          <div className="absolute right-[16px] md:right-[20px] lg:right-[150px] z-0 sm:z-20 pointer-events-none mockup-container-fixed">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Ellipse 133 Glow Light behind phone */}
              <div
                className="absolute pointer-events-none -z-10 opacity-90"
                style={{
                  width: "244.85px",
                  height: "478.55px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) rotate(6.83deg)",
                  background: "rgba(255, 255, 255, 0.8)",
                  filter: "blur(100px)",
                }}
              />
              <Image
                src="/img/mobile.png"
                alt="Bookly App Mockup"
                style={{
                  transform: "rotate(6.83deg)"
                }}
                className="object-fill z-10 max-w-none mockup-image-fixed"
                draggable="false"
                fill
              />
            </div>
          </div>
        </div>
      </section>

      <BusinessMockup />

      {/* 13. FAQ Section */}
      <FaqSection />

      {/* 14. Footer */}
      <Footer />
    </div>
  );
}

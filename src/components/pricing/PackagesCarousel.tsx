
import React from 'react';
import { RobuxPackage } from "@/data/robuxPackages";
import PackageCard from "./PackageCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface PackagesCarouselProps {
  packages: RobuxPackage[];
}

const PackagesCarousel = ({ packages }: PackagesCarouselProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="max-w-7xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {packages.map((pkg) => (
            <CarouselItem key={pkg.id} className="pl-2 md:pl-4 lg:basis-1/3 md:basis-1/2 basis-full">
              <PackageCard pkg={pkg} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 sm:-left-8 md:-left-10 lg:-left-12 top-1/2" />
        <CarouselNext className="absolute -right-12 sm:-right-8 md:-right-10 lg:-right-12 top-1/2" />
      </Carousel>
    </div>
  );
};

export default PackagesCarousel;

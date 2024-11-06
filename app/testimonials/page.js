"use client";

import { useState } from "react";
import { userReviews } from "../_data/userReviews";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

function Testimonials() {
  const [currentClient, setCurrentClient] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentClient((prevClient) =>
        prevClient >= userReviews.length - 1 ? 0 : prevClient + 1
      );
    } else if (direction === "right") {
      setCurrentClient((prevClient) =>
        prevClient <= 0 ? userReviews.length - 1 : prevClient - 1
      );
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  function handleSliderClick(index) {
    setCurrentClient(index);
  }

  return (
    <div
      className="my-1 bg-stone-300 lg:bg-slate-50 py-8 md:my-32 md:py-16 w-full  lg:flex lg:justify-center"
      {...swipeHandlers}
    >
      <div className="flex flex-col-reverse gap-8 md:flex-row w-full lg:max-w-4xl lg:w-full p-4">
        <div className="flex flex-col justify-center p-8 w-full">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-16 w-16 lg:h-20 lg:w-20">
              <Image
                src={userReviews[currentClient].picture}
                alt="client"
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="text-lg text-black lg:text-2xl">
              <h3 className="mb-2 text-xl lg:text-3xl font-semibold text-black">
                {userReviews[currentClient].name}
              </h3>
              <span className="text-gray-700">Erfahrungsberichte</span>
            </div>
          </div>
          <p className="mb-6 border border-white bg-stone-300 p-4 text-lg lg:text-2xl leading-6 text-black">
            {userReviews[currentClient].description}
          </p>
          <div className="relative flex w-full items-center justify-center gap-1.5">
            {userReviews.map((_, index) => (
              <hr
                key={index}
                className={`relative z-10 mt-2 h-1 w-9 cursor-pointer rounded border-none ${
                  currentClient === index ? "bg-white" : "bg-black"
                }`}
                onClick={() => handleSliderClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;

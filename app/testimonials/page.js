"use client";

import { useState } from "react";
import { userReviews } from "../_data/userReviews";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

function Testimonials() {
  const [currentClient, setCurrentClient] = useState(0);

  // Handler for changing reviews based on swipe direction
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
    trackMouse: true, // Allows swipe functionality on desktop with mouse dragging
  });

  function handleSliderClick(index) {
    setCurrentClient(index);
  }

  return (
    <div
      className="my-1 bg-stone-300 py-8 md:my-32 md:py-16"
      {...swipeHandlers}
    >
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-16 w-16">
              <Image
                src={userReviews[currentClient].picture}
                alt="client"
                width={64}
                height={64}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="text-lg text-black">
              <h3 className="mb-2 text-xl text-black">
                {userReviews[currentClient].name}
              </h3>
              <span>Beruf</span>
            </div>
          </div>
          <p className="mb-6 border border-white bg-stone-300 p-4 text-lg leading-6 text-black max-h-[15rem] overflow-y-auto">
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
        <div className="flex w-full flex-col justify-center bg-gradient-to-r from-stone-100 to-stone-200 p-8 md:h-auto md:w-1/2">
          {/* <div className="w-full md:w-3/4">
            <h3 className="mb-2 text-xl text-black">Zeugnis</h3>
            <span className="mb-3 block text-2xl font-bold text-black md:text-4xl">
              Was unsere Kunden sagen?
            </span>
            <p className="text-lg leading-6 text-black md:text-xl">
              {userReviews[currentClient].description}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;

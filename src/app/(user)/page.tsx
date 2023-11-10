"use client";

import Quiz from "@/components/quiz";

const Home = () => {
  console.log(process.env.PORT);

  return (
    <div className="grid grid-cols-12 gap-5 py-6">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <Quiz key={index} className="col-span-3" />
        ))}
    </div>
  );
};

export default Home;

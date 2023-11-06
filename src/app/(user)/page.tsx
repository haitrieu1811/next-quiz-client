import Quiz from "@/components/quiz";

const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-6 py-6">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <Quiz key={index} className="col-span-3" />
        ))}
    </div>
  );
};

export default Home;

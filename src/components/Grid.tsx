const Grid = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div
        className="absolute inset-0 z-[-10] bg-deep-space-900"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.1), transparent 70%)",
        }}
      ></div>
      <div
        className="absolute inset-0 z-[-9] opacity-50"
        style={{
          backgroundImage: "url(/grid.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "30px 30px",
        }}
      ></div>
    </div>
  );
};

export default Grid;
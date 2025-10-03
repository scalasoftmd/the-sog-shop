const PromoBar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full bg-white text-black text-center text-[10px] md:text-[9px] font-semibold tracking-wide min-h-[10vh] md:h-6 flex flex-col md:flex-row items-center justify-center shadow-md"
    >
      <span className="block md:inline px-2 md:px-0">
        WELCOME TO THE SONS OF GOD
      </span>
      <span className="block md:inline px-2 md:px-0">
        &nbsp; - Get{" "}
        <span className="font-bold" style={{ fontSize: "inherit" }}>
          20% OFF
        </span>{" "}
        with code{" "}
        <span className="font-bold" style={{ fontSize: "inherit" }}>
          RISE20
        </span>{" "}
        -{" "}
        <a href="#" className="underline hover:text-yellow-600">
          Shop Now!
        </a>
      </span>
    </div>
  );
};

export default PromoBar;
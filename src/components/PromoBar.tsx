export default function PromoBar() {
  return (
    <div className="w-[70vw] bg-white text-black text-center text-[10px] md:text-[9px] font-semibold py-1 tracking-wide h-auto md:h-6 flex flex-col md:flex-row items-center justify-center mx-auto">
      <span className="block md:inline px-2 md:px-0">
        WELCOME TO THE SONS OF GOD
      </span>
      <span className="block md:inline px-2 md:px-0">
       &nbsp; - Get <span className="font-bold">20% OFF</span> with code <span className="font-bold">RISE20</span> -{" "}
        <a href="#" className="underline hover:text-yellow-600">
          Shop Now!
        </a>
      </span>
    </div>
  );
}
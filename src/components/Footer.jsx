const Footer = () => {
  return (
    <>
      <footer className="mt-35 flex min-h-25 w-full flex-col bg-white">
        <div className="flex items-center justify-start ">
          <div className="mt-5 ml-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] leading-relaxed tracking-widest text-gray-600 sm:ml-8 sm:text-[12px]">
            <h3 className="hover:underline cursor-pointer">IO [€]</h3>
            <h3 className="hover:underline cursor-pointer">CHANGE</h3>
            <h3 className="hover:underline cursor-pointer">NEWSLETTER</h3>
            <h3 className="hover:underline cursor-pointer">LEGAL AREA</h3>
            <h3 className="hover:underline cursor-pointer">CUSTOMER CARE</h3>
            <h3 className="hover:underline cursor-pointer">SOCIAL</h3>
            <h3 className="hover:underline cursor-pointer">CAREERS</h3>
            <h3 className="hover:underline cursor-pointer">RETURNS</h3>
            <h3 className="hover:underline cursor-pointer">WITHDRAWLS</h3>
            <h3 className="hover:underline cursor-pointer">ACCESSIBLITY</h3>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="ml-0 mt-3 max-w-full px-4 text-[9px] leading-relaxed tracking-widest text-gray-500 sm:px-8 sm:text-[11px]">
            <h4>
              OWENSCORP ITALIA SPA Via M. Ponza n 4, 10121, Torino, Italy, PH +390115618697 | VAT N. IT07725270016 REA-
              TO915864, 1.000.000€ i.v., DIRECT NUMBER +39 3407132057 customercare@rickowens.eu
            </h4>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

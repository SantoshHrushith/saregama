export default function Catalouge() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://eubiq.b-cdn.net/saga/catalogue/SAGA.pdf';
    link.download = 'SAGA_Catalouge.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-10vh py-5 w-full flex items-center justify-center bg-[#1c1c1c]">
      <button
        onClick={handleDownload}
        className="bg-black text-white border border-white font-poppins px-6 py-3 rounded-full 
                   hover:bg-white hover:text-black hover:scale-110 
                   transition duration-300 transform"
      >
        Download Catalouge
      </button>
    </div>
  );
}

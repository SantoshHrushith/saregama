export default function Sticky() {
  const handleClick = () => {
    window.open('https://powertrack.online/search/saga', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="bg-black text-white border border-white font-poppins px-6 py-3 rounded-full 
                   shadow-[0_0_10px_white] hover:bg-white hover:text-black hover:scale-110 
                   transition duration-300 transform"
      >
        BUY NOW
      </button>
    </div>
  );
}
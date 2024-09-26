const CarouselItem = ({ src, alt, isActive }) => {
  return (
    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} data-carousel-item={isActive ? 'active' : ''}>
      <img
        src={src}
        className="block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt={alt}
      />
    </div>
  );
};

export default CarouselItem;

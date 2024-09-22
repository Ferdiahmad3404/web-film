const CarouselItem = ({ src, alt, isActive }) => {
  return (
    <div className={`hidden duration-700 ease-in-out ${isActive ? '' : 'hidden'}`} data-carousel-item={isActive ? 'active' : ''}>
      <img
        src={src}
        className="object-contain block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt={alt}
      />
    </div>
  );
};

export default CarouselItem;
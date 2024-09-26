const DramaList = () => {
  // Data drama yang disimpan dalam variabel lokal
  const dramaData = [
    {
      id: 1,
      title: "Drama Title 1",
      year: "2021",
      imgSrc: "https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360",
    },
    {
      id: 2,
      title: "Drama Title 2",
      year: "2022",
      imgSrc: "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    },
    {
      id: 3,
      title: "Drama Title 3",
      year: "2023",
      imgSrc: "https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg",
    },
    {
      id: 4,
      title: "Drama Title 4",
      year: "2024",
      imgSrc: "https://i.redd.it/pzsqel5wenm81.jpg",
    },
    {
        id: 5,
        title: "Drama Title 4",
        year: "2024",
        imgSrc: "https://i.redd.it/pzsqel5wenm81.jpg",
      },
      {
        id: 6,
        title: "Drama Title 4",
        year: "2024",
        imgSrc: "https://i.redd.it/pzsqel5wenm81.jpg",
      }
  ];

  return (
    <div className="grid grid-cols-5 gap-4 p-4 mb-52">
      {dramaData.map((drama) => (
        <div key={drama.id} className="bg-opacity-0 rounded-lg overflow-hidden">
          <img
            src={drama.imgSrc}
            alt={drama.title}
            className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">{drama.title}</h2>
            <p className="text-gray-600">{drama.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DramaList;
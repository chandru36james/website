import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Gallery = () => {
  const photos = [
    {
      src: "https://media.istockphoto.com/photos/concept-picture-id1154231467",
      caption: "My Photo 1",
    },
    {
      src: "https://images.unsplash.com/photo-1656268164012-119304af0c69?auto=format&fit=crop&w=1112&q=80",
      caption: "My Photo 2",
    },
    {
      src: "https://images.unsplash.com/photo-1655745653127-4d6837baf958?auto=format&fit=crop&w=1170&q=80",
      caption: "My Photo 3",
    },
    {
      src: "https://images.unsplash.com/photo-1516527653392-602455dd9cf7?auto=format&fit=crop&w=1167&q=80",
      caption: "My Photo 4",
    },
    {
      src: "https://images.unsplash.com/photo-1655365225165-8d727fe3a091?auto=format&fit=crop&w=800&q=80",
      caption: "My Photo 5",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "600px",      // limit width
        margin: "0 auto",       // center horizontally
        borderRadius: "10px",   // optional rounded edges
        overflow: "hidden",     // clip overflowing edges
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
        }}
      >
        My Photo Gallery
      </h2>
      <Carousel
        autoPlay
        interval={5000}
        transitionTime={1000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
      >
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={photo.src}
              alt={photo.caption}
              style={{
                maxHeight: "300px",  // reduce height
                objectFit: "cover",  // crop nicely
              }}
            />
            <p
              className="legend"
              style={{
                fontSize: "14px",    // smaller caption text
              }}
            >
              {photo.caption}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;

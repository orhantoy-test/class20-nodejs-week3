const fetchInterval = 1000;

function ImageCarousel() {
  const [images, setImages] = React.useState([]);
  const [imageIndex, setImageIndex] = React.useState(0);

  const fetchImages = () => {
    fetch("/api/images")
      .then((res) => res.json())
      .then(({ data }) => setImages(data));
  };

  React.useEffect(() => {
    fetchImages(); // Run immediately

    const i = setInterval(fetchImages, fetchInterval);

    return () => clearInterval(i);
  }, []);

  const onAddNewImage = () => {
    const imageUrl = prompt("Enter image URL");

    if (!imageUrl) {
      return;
    }

    try {
      new URL(imageUrl);
    } catch (e) {
      return;
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
    };

    fetch("/api/images", fetchOptions)
      .then((res) => res.json())
      .then((data) => console.log("Response data", data));
  };

  const onNextImage = () => {
    setImageIndex((prev) =>
      images.length > 0 ? (prev + 1) % images.length : 0
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "50%", padding: "20px", height: "100vh" }}>
        <ImageCarouselPreview
          images={images}
          imageIndex={imageIndex}
          onNextImage={onNextImage}
        />
      </div>
      <div
        style={{
          width: "50%",
          padding: "20px",
          height: "100vh",
          backgroundColor: "#eee",
        }}
      >
        <ImageCarouselEdit
          images={images}
          imageIndex={imageIndex}
          onAddNewImage={onAddNewImage}
        />
      </div>
    </div>
  );
}

function ImageCarouselPreview({ images, imageIndex, onNextImage }) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        <img
          src={images[imageIndex] && images[imageIndex].url}
          alt=""
          style={{ maxWidth: "500px" }}
        />
      </div>
      <p>
        This is image {imageIndex + 1} out of {images.length}.
      </p>
      <p>
        <button onClick={onNextImage}>Next</button>
      </p>
    </div>
  );
}

function ImageCarouselEdit({ images, imageIndex, onAddNewImage }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {images.map((image, index) => (
        <li
          key={image.id}
          style={imageIndex === index ? { borderLeft: "4px solid #ffb" } : {}}
        >
          <img src={image.url} alt={image.url} style={{ maxWidth: "50px" }} />
        </li>
      ))}
      <li>
        <button onClick={onAddNewImage}>Add new image</button>
      </li>
    </ul>
  );
}

ReactDOM.render(<ImageCarousel />, document.getElementById("root"));

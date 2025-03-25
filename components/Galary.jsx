"use client";
import { useEffect, useState, useRef } from "react";

export default function Galary() {
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("https://mirzohidjon.pythonanywhere.com/blog/gallery/")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = (e) => {
    if (
      e.target.classList.contains("modal-g") ||
      e.target.classList.contains("close-btn-g")
    ) {
      setSelectedImage(null);
    }
  };

  return (
    <div className="container-g">
      <div className="scroll-container-g">
        {items.map((item, index) => (
          <div
            className="item-g"
            key={index}
            onClick={() =>
              handleImageClick(
                `https://mirzohidjon.pythonanywhere.com/${item.image}`
              )
            }
          >
            <img
              src={`https://mirzohidjon.pythonanywhere.com/${item.image}`}
              alt={item.title}
            />
          </div>
        ))}
        <div className="item-g arrow_icon">
          <img src={"/arrowicon.svg"} alt="arrow" />
        </div>
      </div>

      {selectedImage && (
        <div className="modal-g" onClick={closeModal}>
          <div className="modal-content-g">
            <button className="close-btn-g" onClick={closeModal}>
              ×
            </button>
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    </div>
  );
}

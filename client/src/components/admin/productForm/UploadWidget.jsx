import React, { useState } from "react";
import Card from "../../card/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const UploadWidget = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const uploadImages = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    // Preview Images
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((prevImage) => prevImage.concat(selectedFilesArray)); // upload img to cloudinary
    setSelectedImages((prevImage) => prevImage.concat(imagesArray)); // Preview Images

    e.target.value = "";
  };

  // Remove selected image from the browser before uploading
  const removeImage = (image) => {
    const imageIndex = selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img, index) => img !== image));
    setImages(images.filter((img, index) => index !== imageIndex));
    URL.revokeObjectURL(image);
  };

  return (
    <div>
      <Card cardClass={"formcard group"}>
        <label className="uploadWidget">
          <AiOutlineCloudUpload size={34} />
          <br />
          <span>Upload 5 images Max!</span>
          <input
            type="file"
            name="images"
            onChange={uploadImages}
            multiple
            accept="image/png image/jpeg image/jpg image/webp"
          />
        </label>
        <br />
        {selectedImages.length > 0 &&
          (selectedImages.length > 5 ? (
            <p className="error">
              You can`t upload more than 5 images!
              <br />
              <span>
                Kindly remove <b>{selectedImages.length - 5}</b> of them
              </span>
            </p>
          ) : (
            <div className="--center-all">
              <button className="--btn --btn-danger btn-large">
                Upload Image
              </button>
            </div>
          ))}
        {/* Preview Selected Images */}
        <div className={selectedImages.length > 0 ? "images" : ""}>
          {selectedImages !== 0 &&
            selectedImages.map((img, index) => {
              return (
                <div key={index} className="image">
                  <img src={img} alt={"product image"} width={200} />
                  <button className="-btn" onClick={() => removeImage(img)}>
                    <BsTrash size={25} />
                  </button>
                  <p>{index + 1}</p>
                  <br />
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

export default UploadWidget;

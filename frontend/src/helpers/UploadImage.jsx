const cloudinaryName = import.meta.env.VITE_CLOUDNARY_NAME;
const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;

async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ecommerce_product");

  const responseData = fetch(url, {
    method: "post",
    body: formData,
  });

  return (await responseData).json();
}

export default uploadImage;
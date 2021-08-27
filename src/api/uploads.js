import http from "./client";

export const uploadImages = async (images) => {
  const data = new FormData();

  for (let i = 0; i < images.length; i++) {
    data.append("images", images[i]);
  }

  return await http.post("/upload/images", data);
};

function compress(URL, MAX_WIDTH = 600, QUALITY = 90, MIMETYPE = "image/webp") {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = URL;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (typeof img.width === "number" && img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(MIMETYPE, QUALITY / 100);
      resolve(imageData);
      img.src = null;
      img = null;
    };
  });
}

export default compress;

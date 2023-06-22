import Sharp from "sharp";
import Crypto from "node:crypto";
import FileSystem from "node:fs/promises";
import * as Blurhash from "blurhash";

export const saveToUploads = async (req, path) => {
  const images = [];

  for (const file of req.files) {
    const metadata = await Sharp(file.path).metadata();
    const ratio = metadata.width / metadata.height;
    const w = 720;
    const h = Math.round(w / ratio);

    const uniqueString = Crypto.randomBytes(16).toString("hex");
    const filename = uniqueString + ".jpeg";

    const manipulated = await Sharp(file.path)
      .resize(w, h)
      .jpeg({ quality: 70 });

    await manipulated.toFile(`uploads${path}/${filename}`);

    const { data, info } = await manipulated
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const blurhash = await Blurhash.encode(data, info.width, info.height, 4, 4);

    await FileSystem.unlink(file.path);

    images.push({ filename, blurhash });
  }

  return images;
};

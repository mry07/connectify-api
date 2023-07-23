import Sharp from "sharp";
import * as Crypto from "crypto";
import * as Blurhash from "blurhash";
import * as FileSystem from "fs/promises";
import { StoreImage } from "./image.types";

export const storeImage: StoreImage = async (req, path) => {
  const images = [];
  const files = req.files as Express.Multer.File[];

  for (const file of files) {
    const metadata = await Sharp(file.path).metadata();
    const mw = metadata.width ?? 0;
    const mh = metadata.height ?? 0;

    const ratio = mw / mh;
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
    const convertData = new Uint8ClampedArray(data);
    const blurhash = await Blurhash.encode(
      convertData,
      info.width,
      info.height,
      4,
      4
    );

    await FileSystem.unlink(file.path);

    images.push({ filename, blurhash });
  }

  return images;
};

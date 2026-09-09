import NextImage, { ImageProps } from "next/image";

const basePath = process.env.NODE_ENV === "production" ? "/extron-web" : "";

export default function Img({ src, ...props }: ImageProps) {
  const prefixed =
    typeof src === "string" && src.startsWith("/")
      ? `${basePath}${src}`
      : src;
  return <NextImage {...props} src={prefixed} />;
}

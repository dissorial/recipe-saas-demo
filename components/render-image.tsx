import Image from "next/image"

export function RenderImage({ imagePath }: { imagePath: string }) {
  return (
    <Image
      src={imagePath}
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}

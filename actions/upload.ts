"use server"

import fs from "fs"
import path from "path"
import { Readable } from "stream"
import { Blob } from "node-fetch"
import { utapi } from "uploadthing/server"

interface FileEsque extends Blob {
  name: string
}
export async function uploadImage() {
  // Set up the path for your image file
  const imagePath = path.join(process.cwd(), "/public/images/result.png")

  // Read the image data as a stream
  const stream = fs.createReadStream(imagePath)

  // Convert the stream into a buffer
  const imageData = await streamToBuffer(stream)

  // Create a new Blob (this works in Node.js thanks to the node-fetch library)
  const blob = new Blob([imageData], { type: "image/png" })

  // Create a FileEsque object (essentially a Blob with a name property)
  const file: FileEsque = {
    ...blob,
    name: path.basename(imagePath),
  }

  // Upload the file
  const response = await utapi.uploadFiles(file)
  console.log(response)
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = []
    stream.on("data", (chunk) => chunks.push(chunk))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks)))
  })
}

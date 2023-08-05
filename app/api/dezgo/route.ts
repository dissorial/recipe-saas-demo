import { NextRequest, NextResponse } from "next/server"

const RAPID_API_KEY = process.env.RAPID_API_KEY || ""
const base_url = "https://dezgo.p.rapidapi.com/text2image"

export async function POST(request: NextRequest) {
  const { query } = await request.json()

  const body = new URLSearchParams({
    prompt: query,
    guidance: "7",
    steps: "30",
    sampler: "euler_a",
    upscale: "1",
    negative_prompt:
      "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft",
    model: "epic_diffusion_1_1",
  })

  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Host": "dezgo.p.rapidapi.com",
    },
    body: body,
  }

  try {
    const response = await fetch(base_url, options)

    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error("Response body is null")
    }

    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      headers: { "Content-Type": "image/png" },
    })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

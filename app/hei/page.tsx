"use client"
// pages/index.tsx
import { useEffect, useRef } from 'react'
import type { NextPage } from 'next'

const WIDTH = 200
const HEIGHT = 200
const TOTAL = WIDTH * HEIGHT

const hexToUint32 = (hex: string): number => {
  const v = parseInt(hex.slice(1), 16)
  const r = (v >> 16) & 0xff
  const g = (v >> 8) & 0xff
  const b = v & 0xff
  // little‐endian RGBA in a Uint32 buffer
  return (0xff << 24) | (b << 16) | (g << 8) | r
}

const generateColors = (): string[] => {
  const a = new Array<string>(TOTAL)
  for (let i = 0; i < TOTAL; i++) {
    a[i] =
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
  }
  return a
}

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = WIDTH
    canvas.height = HEIGHT

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = ctx.createImageData(WIDTH, HEIGHT)
    const buf = new Uint32Array(img.data.buffer)
    const colors = generateColors()

    for (let i = 0; i < TOTAL; i++) {
      buf[i] = hexToUint32(colors[i])
    }

    ctx.putImageData(img, 0, 0)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 400,
        height: 400,
        imageRendering: 'pixelated',
      }}
    />
  )
}

export default Home
"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";


const hexToUint32 = (hex: string): number => {
  const v = parseInt(hex.slice(1), 16)
  const r = (v >> 16) & 0xff
  const g = (v >> 8) & 0xff
  const b = v & 0xff
  // little‐endian RGBA in a Uint32 buffer
  return (0xff << 24) | (b << 16) | (g << 8) | r
}

const generateColors = (): string[] => {
  const a = new Array<string>(50*50)
  for (let i = 0; i < 50*50; i++) {
    a[i] =
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
  }
  return a
}

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(()=> {
        const canvas = canvasRef.current
        if (!canvas)return
        canvas.width = 50
        canvas.height = 50
        
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = ctx.createImageData(50, 50)
        const buf = new Uint32Array(img.data.buffer)
        const colors = generateColors()
        
        for (let i = 0; i < 50*50; i++) {
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
  );
}

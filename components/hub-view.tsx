"use client"

import { motion } from "framer-motion"
import type React from "react"

import { useEffect, useRef, useState } from "react"

// Update the props interface to include patientId and sampleType
interface HubViewProps {
  viewportRect: { x: number; y: number; width: number; height: number }
  findings: any[]
  selectedFinding: any | null
  onSelectRegion: (x: number, y: number) => void
  patientId: string
  sampleType: string
}

// Add a tooltip component for the hub view
interface TooltipProps {
  x: number
  y: number
  text: string
}

function Tooltip({ x, y, text }: TooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none z-10"
      style={{
        left: `${x}px`,
        top: `${y - 25}px`,
        transform: "translateX(-50%)",
      }}
    >
      {text}
    </motion.div>
  )
}

// Update the function signature to include the new props
export default function HubView({
  viewportRect,
  findings,
  selectedFinding,
  onSelectRegion,
  patientId,
  sampleType,
}: HubViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [tooltip, setTooltip] = useState<TooltipProps | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Create and load the image
    if (!imageRef.current) {
      imageRef.current = new Image()
      imageRef.current.src =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7_20241209_024613-VRGH4Pmar0WL8CnQukfeGg5hPxb1GW.png" // Blood cell microscopy image
      imageRef.current.crossOrigin = "anonymous"

      imageRef.current.onload = () => {
        drawHubView()
      }
    } else {
      drawHubView()
    }
  }, [viewportRect, findings, selectedFinding])

  const drawHubView = () => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the image
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)

    // Draw findings (bounding boxes) - limit to 100 for performance
    const limitedFindings = findings.slice(0, 100)

    limitedFindings.forEach((finding) => {
      const x = finding.x * canvas.width
      const y = finding.y * canvas.height
      const width = finding.width * canvas.width
      const height = finding.height * canvas.height

      ctx.strokeStyle = selectedFinding?.id === finding.id ? "#0ea5e9" : "rgba(234, 179, 8, 0.5)"
      ctx.lineWidth = 1
      ctx.strokeRect(x, y, width, height)

      if (selectedFinding?.id === finding.id) {
        ctx.fillStyle = "rgba(14, 165, 233, 0.2)"
        ctx.fillRect(x, y, width, height)
      }
    })

    // Draw viewport rectangle
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.strokeRect(
      viewportRect.x * canvas.width,
      viewportRect.y * canvas.height,
      viewportRect.width * canvas.width,
      viewportRect.height * canvas.height,
    )
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / canvas.width
    const y = (e.clientY - rect.top) / canvas.height

    onSelectRegion(x, y)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Handle touch events for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const x = (touch.clientX - rect.left) / canvas.width
        const y = (touch.clientY - rect.top) / canvas.height

        onSelectRegion(x, y)
      }
    }

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false })

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart)
    }
  }, [onSelectRegion])

  // Add these new handlers for hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsHovering(true)

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if hovering over a finding
    const normalizedX = x / canvas.width
    const normalizedY = y / canvas.height

    const hoveredFinding = findings.find(
      (finding) =>
        normalizedX >= finding.x &&
        normalizedX <= finding.x + finding.width &&
        normalizedY >= finding.y &&
        normalizedY <= finding.y + finding.height,
    )

    if (hoveredFinding) {
      setTooltip({
        x: x,
        y: y,
        text: `${hoveredFinding.label} #${hoveredFinding.id}`,
      })
    } else {
      setTooltip(null)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTooltip(null)
  }

  // Update the return statement to include the new patient info section
  return (
    <motion.div
      className="relative w-full h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1">
        <canvas
          ref={canvasRef}
          width={256}
          height={192}
          className="w-full h-full cursor-crosshair touch-manipulation rounded-sm rounded-b-none"
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        {tooltip && isHovering && <Tooltip {...tooltip} />}
      </div>

      {/* Patient info section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-muted/30 border-t border-b rounded-b-sm text-xs flex items-center h-7"
      >
        <div className="flex-1 px-2 font-medium flex items-center">
          <span className="text-muted-foreground mr-1">ID:</span>
          <span>{patientId}</span>
        </div>
        <div className="w-px h-4 bg-border"></div>
        <div className="flex-1 px-2 text-right font-medium flex items-center justify-end">
          <span className="text-muted-foreground mr-1">Type:</span>
          <span className="capitalize">{sampleType}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}


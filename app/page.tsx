"use client"

import { useEffect, useRef, useState } from "react"
import OpenSeadragon from "openseadragon"
import { Loader2, ChevronDown, Minus, Plus } from "lucide-react"
import DetailPanel from "@/components/detail-panel"
import HubView from "@/components/hub-view"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useMediaQuery } from "@/hooks/use-media-query"
// Add framer-motion import at the top with other imports
import { motion, AnimatePresence } from "framer-motion"

// Parse the detection results from the JSON file
const parseDetectionResults = () => {
  try {
    // This would normally be fetched from the server
    const jsonData = {
      id: 19,
      patient_id: "7",
      wsi_video_url: "None",
      inference_results:
        "{'delayTime': 950, 'executionTime': 7223, 'id': 'sync-e1323ad4-a299-4159-9342-1fa220a3c2b5-e1', 'output': {'detection_results': [[121, 4, 163, 45, 'Circular_RBC'], [396, 312, 433, 353, 'Circular_RBC'], [388, 90, 428, 130, 'Circular_RBC'], [334, 157, 373, 199, 'Circular_RBC'], [27, 148, 64, 190, 'Circular_RBC'], [89, 339, 131, 380, 'Circular_RBC'], [346, 222, 381, 265, 'Circular_RBC'], [455, 24, 491, 66, 'Circular_RBC'], [250, 374, 287, 412, 'Circular_RBC'], [30, 350, 67, 392, 'Circular_RBC'], [256, 285, 293, 324, 'Circular_RBC'], [118, 316, 158, 354, 'Circular_RBC'], [155, 311, 189, 350, 'Circular_RBC'], [0, 270, 37, 307, 'Circular_RBC'], [248, 409, 285, 448, 'Circular_RBC'], [77, 271, 113, 307, 'Circular_RBC'], [222, 437, 262, 475, 'Circular_RBC'], [126, 41, 163, 79, 'Circular_RBC'], [250, 152, 288, 189, 'Circular_RBC'], [177, 75, 214, 114, 'Circular_RBC'], [157, 446, 196, 484, 'Circular_RBC'], [12, 310, 56, 346, 'Circular_RBC'], [404, 195, 441, 237, 'Circular_RBC'], [464, 135, 499, 171, 'Circular_RBC'], [314, 355, 352, 396, 'Circular_RBC'], [211, 401, 247, 440, 'Circular_RBC'], [55, 190, 94, 229, 'Circular_RBC'], [110, 87, 148, 121, 'Circular_RBC'], [456, 364, 496, 400, 'Circular_RBC'], [466, 296, 505, 342, 'Circular_RBC'], [205, 195, 249, 234, 'Circular_RBC'], [287, 8, 324, 48, 'Circular_RBC'], [315, 128, 344, 170, 'Circular_RBC'], [372, 206, 410, 245, 'Circular_RBC'], [414, 41, 451, 76, 'Circular_RBC'], [103, 118, 142, 156, 'Circular_RBC'], [59, 447, 95, 487, 'Circular_RBC'], [241, 98, 275, 140, 'Circular_RBC'], [419, 256, 455, 296, 'Circular_RBC'], [122, 435, 160, 473, 'Circular_RBC'], [76, 122, 108, 162, 'Circular_RBC'], [155, 130, 193, 166, 'Circular_RBC'], [93, 55, 131, 90, 'Circular_RBC'], [111, 245, 152, 274, 'Circular_RBC'], [291, 433, 326, 473, 'Circular_RBC'], [258, 344, 298, 377, 'Circular_RBC'], [141, 156, 177, 194, 'Circular_RBC'], [210, 341, 244, 382, 'Circular_RBC'], [58, 92, 97, 126, 'Circular_RBC'], [391, 246, 427, 289, 'Circular_RBC'], [418, 126, 454, 164, 'Circular_RBC'], [69, 243, 106, 273, 'Circular_RBC'], [465, 169, 503, 205, 'Circular_RBC'], [193, 290, 232, 323, 'Circular_RBC'], [161, 41, 198, 77, 'Circular_RBC'], [290, 390, 318, 434, 'Circular_RBC'], [382, 359, 419, 394, 'Circular_RBC'], [459, 203, 496, 237, 'Circular_RBC'], [175, 380, 211, 413, 'Circular_RBC'], [289, 284, 329, 318, 'Circular_RBC'], [271, 126, 306, 158, 'Circular_RBC'], [0, 148, 30, 187, 'Circular_RBC'], [174, 0, 209, 37, 'Circular_RBC'], [131, 272, 166, 304, 'Circular_RBC'], [27, 204, 61, 239, 'Circular_RBC'], [251, 249, 288, 283, 'Circular_RBC'], [46, 272, 82, 310, 'Circular_RBC'], [380, 458, 418, 490, 'Circular_RBC'], [402, 10, 440, 43, 'Circular_RBC'], [187, 479, 223, 511, 'Circular_RBC'], [0, 339, 35, 378, 'Circular_RBC'], [354, 432, 393, 465, 'Circular_RBC'], [252, 214, 288, 252, 'Circular_RBC'], [428, 379, 465, 419, 'Circular_RBC'], [142, 407, 176, 442, 'Circular_RBC'], [470, 259, 505, 292, 'Circular_RBC'], [437, 202, 462, 235, 'Circular_RBC'], [39, 62, 93, 93, 'Circular_RBC'], [106, 155, 144, 184, 'Circular_RBC'], [453, 101, 490, 138, 'Circular_RBC'], [354, 87, 389, 125, 'Circular_RBC'], [388, 125, 424, 167, 'Circular_RBC'], [292, 257, 327, 289, 'Circular_RBC'], [317, 221, 350, 260, 'Circular_RBC'], [351, 335, 389, 376, 'Circular_RBC'], [30, 389, 65, 422, 'Circular_RBC'], [166, 200, 202, 234, 'Circular_RBC'], [187, 316, 223, 350, 'Circular_RBC'], [51, 411, 85, 448, 'Circular_RBC'], [349, 268, 384, 300, 'Circular_RBC'], [444, 72, 479, 108, 'Circular_RBC'], [369, 293, 400, 329, 'Circular_RBC'], [501, 175, 512, 223, 'Circular_RBC'], [441, 166, 470, 204, 'Circular_RBC'], [221, 29, 258, 63, 'Circular_RBC'], [309, 306, 343, 340, 'Circular_RBC'], [361, 40, 395, 77, 'Circular_RBC'], [73, 0, 120, 22, 'Circular_RBC'], [10, 94, 49, 134, 'Circular_RBC'], [430, 295, 468, 328, 'Circular_RBC'], [202, 2, 234, 39, 'Circular_RBC'], [327, 32, 365, 64, 'Circular_RBC'], [39, 32, 79, 65, 'Circular_RBC'], [430, 0, 473, 17, 'Circular_RBC'], [59, 485, 94, 512, 'Circular_RBC'], [149, 227, 188, 253, 'Circular_RBC'], [341, 473, 378, 508, 'Circular_RBC'], [487, 38, 512, 75, 'Circular_RBC'], [4, 448, 36, 493, 'Circular_RBC'], [264, 63, 300, 100, 'Circular_RBC'], [191, 141, 220, 176, 'Circular_RBC'], [93, 416, 132, 450, 'Circular_RBC'], [498, 0, 512, 40, 'Circular_RBC'], [305, 193, 338, 230, 'Circular_RBC'], [313, 394, 343, 428, 'Circular_RBC'], [424, 348, 458, 380, 'Circular_RBC'], [488, 227, 512, 263, 'Circular_RBC'], [7, 61, 43, 95, 'Circular_RBC'], [489, 228, 511, 263, 'Circular_RBC'], [305, 496, 345, 512, 'Circular_RBC'], [249, 0, 294, 13, 'Circular_RBC'], [501, 290, 512, 337, 'Circular_RBC'], [421, 420, 455, 457, 'Circular_RBC'], [469, 0, 512, 13, 'Circular_RBC'], [324, 0, 372, 12, 'Circular_RBC'], [373, 0, 407, 25, 'Circular_RBC'], [373, 390, 410, 424, 'Circular_RBC'], [484, 438, 512, 468, 'Circular_RBC'], [70, 369, 106, 419, 'Circular_RBC'], [351, 12, 387, 49, 'Circular_RBC'], [449, 412, 483, 449, 'Circular_RBC'], [378, 487, 418, 511, 'Circular_RBC'], [0, 185, 13, 220, 'Circular_RBC'], [183, 348, 212, 384, 'Circular_RBC'], [266, 475, 297, 511, 'Circular_RBC'], [119, 504, 170, 512, 'Circular_RBC'], [335, 387, 373, 414, 'Circular_RBC'], [363, 41, 394, 77, 'Circular_RBC'], [442, 166, 470, 204, 'Circular_RBC'], [0, 52, 10, 100, 'Circular_RBC']]}, 'status': 'COMPLETED', 'workerId': 'vgfqxs1imv8aym'}",
      celery_status: "completed",
      filename: "7_20241209_024613.png",
      sample_type: "blood",
      date: "2024-12-09",
    }

    // Parse the inference_results string to get the detection_results
    const inferenceResults = JSON.parse(jsonData.inference_results.replace(/'/g, '"'))
    const detectionResults = inferenceResults.output.detection_results

    // Determine the image dimensions from the detection results
    // We'll find the maximum x and y values to estimate the image size
    let maxX = 0
    let maxY = 0

    detectionResults.forEach((result: number[]) => {
      maxX = Math.max(maxX, result[2])
      maxY = Math.max(maxY, result[3])
    })

    // Add a small buffer to ensure we're not cutting off any detections
    maxX = Math.max(maxX, 1024) // Based on the data, image width appears to be 1024
    maxY = Math.max(maxY, 512) // Based on the data, image height appears to be 512

    // Convert the detection results to our format with normalized coordinates
    return detectionResults.map((result: any, index: number) => {
      const [x1, y1, x2, y2, label] = result

      return {
        id: index + 1,
        x: x1 / maxX,
        y: y1 / maxY,
        width: (x2 - x1) / maxX,
        height: (y2 - y1) / maxY,
        label: label,
        confidence: 0.95, // Assuming high confidence for all detections
      }
    })
  } catch (error) {
    console.error("Error parsing detection results:", error)
    return []
  }
}

function useIsMobile() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return isMobile
}

export default function WSIViewer() {
  const viewerRef = useRef<HTMLDivElement>(null)
  const viewerInstance = useRef<OpenSeadragon.Viewer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [detectionResults, setDetectionResults] = useState<any[]>([])
  const [selectedFinding, setSelectedFinding] = useState<any>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [viewportRect, setViewportRect] = useState({ x: 0, y: 0, width: 1, height: 1 })

  // State for responsive layout
  const [showDetails, setShowDetails] = useState(true)
  const [showHubView, setShowHubView] = useState(false)
  const isMobile = useIsMobile()

  // Load detection results
  useEffect(() => {
    const results = parseDetectionResults()
    setDetectionResults(results)
  }, [])

  useEffect(() => {
    if (!viewerRef.current) return

    // Initialize OpenSeadragon viewer
    viewerInstance.current = OpenSeadragon({
      id: viewerRef.current.id,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      tileSources: {
        type: "image",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7_20241209_024613-VRGH4Pmar0WL8CnQukfeGg5hPxb1GW.png", // Blood cell microscopy image
        buildPyramid: false,
      },
      showNavigationControl: false,
      showRotationControl: false,
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: true,
      maxZoomPixelRatio: 2,
      minZoomLevel: 0.5,
      maxZoomLevel: 10,
      zoomPerClick: 1.4,
      visibilityRatio: 1,
      debugMode: false,
    })

    // Add event handlers
    viewerInstance.current.addHandler("open", () => {
      setIsLoading(false)
    })

    viewerInstance.current.addHandler("open-failed", () => {
      console.error("Failed to open the image")
      setIsLoading(false)
    })

    viewerInstance.current.addHandler("animation", () => {
      if (viewerInstance.current && !isLoading) {
        const viewport = viewerInstance.current.viewport
        const bounds = viewport.getBounds()

        // Get the image size safely
        const tiledImage = viewerInstance.current.world.getItemAt(0)
        if (!tiledImage) return

        const imageSize = tiledImage.getContentSize()

        setZoomLevel(viewport.getZoom())
        setViewportRect({
          x: bounds.x / imageSize.x,
          y: bounds.y / imageSize.y,
          width: bounds.width / imageSize.x,
          height: bounds.height / imageSize.y,
        })
      }
    })

    // Draw bounding boxes
    const drawBoundingBoxes = () => {
      if (!viewerInstance.current || isLoading || detectionResults.length === 0) return

      // Check if we have an item in the world
      if (viewerInstance.current.world.getItemCount() === 0) return

      // Remove existing overlays
      viewerInstance.current.clearOverlays()

      // Add bounding boxes as overlays
      detectionResults.forEach((result) => {
        const element = document.createElement("div")
        element.className = `absolute border-2 ${
          selectedFinding?.id === result.id ? "border-primary" : "border-yellow-500"
        } bg-yellow-500/20`

        // Add click handler to select finding
        element.onclick = (e) => {
          e.stopPropagation()
          setSelectedFinding(result)
        }

        viewerInstance.current?.addOverlay({
          element,
          location: new OpenSeadragon.Rect(result.x, result.y, result.width, result.height),
          placement: OpenSeadragon.Placement.CENTER,
        })
      })
    }

    // Draw boxes initially and when selection changes
    const redrawInterval = setInterval(drawBoundingBoxes, 100)

    return () => {
      clearInterval(redrawInterval)
      viewerInstance.current?.destroy()
    }
  }, [selectedFinding, detectionResults, isLoading])

  // Add touch gesture support for the main viewer
  useEffect(() => {
    if (!viewerInstance.current || !viewerRef.current) return

    // Enable gesture support for touch devices
    viewerInstance.current.gestureSettingsMouse.clickToZoom = true
    viewerInstance.current.gestureSettingsMouse.dblClickToZoom = true

    // Configure touch settings
    viewerInstance.current.gestureSettingsTouch.pinchToZoom = true
    viewerInstance.current.gestureSettingsTouch.flickEnabled = true
    viewerInstance.current.gestureSettingsTouch.flickMinSpeed = 20
    viewerInstance.current.gestureSettingsTouch.flickMomentum = 0.4

    // Adjust pan speed for touch
    viewerInstance.current.panHorizontal = true
    viewerInstance.current.panVertical = true
  }, [viewerInstance.current])

  // Function to zoom to a specific finding
  const zoomToFinding = (finding: any) => {
    if (!viewerInstance.current) return

    setSelectedFinding(finding)

    viewerInstance.current.viewport.panTo(
      new OpenSeadragon.Point(finding.x + finding.width / 2, finding.y + finding.height / 2),
    )

    viewerInstance.current.viewport.zoomTo(viewerInstance.current.viewport.getZoom() * 1.5)
  }

  // Handle zoom buttons
  const handleZoomIn = () => {
    viewerInstance.current?.viewport.zoomBy(1.2)
  }

  const handleZoomOut = () => {
    viewerInstance.current?.viewport.zoomBy(0.8)
  }

  const handleZoomSlider = (value: number[]) => {
    if (!viewerInstance.current) return
    viewerInstance.current.viewport.zoomTo(value[0])
  }

  // Replace the entire return statement with this responsive layout
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-background">
      {/* Left Panel - Details (collapsible on mobile) */}
      <motion.div
        className="md:w-80 border-b md:border-b-0 md:border-r overflow-hidden relative"
        initial={{
          width: isMobile ? "100%" : 320,
          x: 0,
        }}
        animate={{
          width: isMobile ? "100%" : showDetails ? 320 : 48,
          height: isMobile ? (showDetails ? "60vh" : "48px") : "auto",
          x: 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center p-3 border-b bg-muted/30">
          <motion.h2
            className="text-lg font-bold"
            animate={{
              opacity: isMobile ? 1 : showDetails ? 1 : 0,
              width: isMobile ? "auto" : showDetails ? "auto" : 0,
            }}
          >
            Slide Details
          </motion.h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="hover:bg-muted transition-colors z-10"
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isMobile ? (showDetails ? 180 : 0) : showDetails ? 0 : 180,
              }}
              transition={{ duration: 0.3 }}
            >
              {isMobile ? <ChevronDown className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 rotate-90" />}
            </motion.div>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: showDetails ? 1 : 0,
            x: isMobile ? 0 : showDetails ? 0 : -320,
          }}
          transition={{ duration: 0.2 }}
          className="p-4 overflow-y-auto absolute inset-0 top-[48px]"
          style={{
            height: isMobile ? "calc(60vh - 48px)" : "calc(100vh - 48px)",
            pointerEvents: showDetails ? "auto" : "none",
          }}
        >
          <DetailPanel
            findings={detectionResults}
            selectedFinding={selectedFinding}
            onSelectFinding={zoomToFinding}
            patientId="7"
            sampleType="blood"
            date="2024-12-09"
            filename="7_20241209_024613.png"
          />
        </motion.div>
      </motion.div>

      {/* Main Content - WSI Viewer */}
      <div className="flex-1 flex flex-col relative">
        {/* Top controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 border-b gap-2 bg-muted/30">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button size="sm" onClick={handleZoomOut} variant="outline" className="hover:bg-muted/80 transition-colors">
              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Zoom Out</span>
            </Button>
            <div className="w-24 sm:w-40">
              <Slider
                value={[zoomLevel]}
                min={0.5}
                max={10}
                step={0.1}
                onValueChange={handleZoomSlider}
                className="cursor-pointer"
              />
            </div>
            <Button size="sm" onClick={handleZoomIn} variant="outline" className="hover:bg-muted/80 transition-colors">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Zoom In</span>
            </Button>
            <motion.span
              className="text-xs sm:text-sm ml-1 sm:ml-2 font-medium"
              key={zoomLevel}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(zoomLevel * 100)}%
            </motion.span>
          </div>

          {/* Hub View (toggleable on mobile) */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHubView(!showHubView)}
              className="sm:hidden hover:bg-muted/80 transition-colors"
            >
              {showHubView ? "Hide Overview" : "Show Overview"}
            </Button>

            <AnimatePresence>
              {(showHubView || !isMobile) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="sm:block w-48 h-36 sm:w-64 sm:h-48 border rounded-md overflow-hidden shadow-md"
                >
                  <HubView
                    viewportRect={viewportRect}
                    findings={detectionResults}
                    selectedFinding={selectedFinding}
                    patientId="7"
                    sampleType="blood"
                    onSelectRegion={(x, y) => {
                      viewerInstance.current?.viewport.panTo(new OpenSeadragon.Point(x, y))
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main WSI Viewer */}
        <div className="flex-1 relative">
          <div id="wsi-viewer" ref={viewerRef} className="w-full h-full" />

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Loader2 className="h-8 w-8 text-primary" />
                </motion.div>
                <span className="ml-2 font-medium">Loading slide...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedFinding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-xs bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {selectedFinding.label} #{selectedFinding.id}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Confidence: {Math.round(selectedFinding.confidence * 100)}%
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedFinding(null)}
                  className="h-7 w-7 rounded-full hover:bg-muted/80 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}


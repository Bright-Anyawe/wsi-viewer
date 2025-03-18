"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crosshair, Filter } from "lucide-react"
import { useState } from "react"
// Add framer-motion import at the top
import { motion, AnimatePresence } from "framer-motion"

interface DetailPanelProps {
  findings: any[]
  selectedFinding: any
  onSelectFinding: (finding: any) => void
  patientId: string
  sampleType: string
  date: string
  filename: string
}

export default function DetailPanel({
  findings,
  selectedFinding,
  onSelectFinding,
  patientId,
  sampleType,
  date,
  filename,
}: DetailPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  // Filter and paginate findings
  const filteredFindings = findings.filter((finding) => finding.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredFindings.length / itemsPerPage)
  const paginatedFindings = filteredFindings.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Findings</h2>

      {findings.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground">
          Loading detection results...
        </motion.p>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Filter className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter findings..."
                className="w-full rounded-md border border-input pl-8 pr-3 py-2 text-sm focus:ring-1 focus:ring-primary transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1) // Reset to first page when filtering
                }}
              />
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mb-2">
            Showing {paginatedFindings.length} of {filteredFindings.length} findings
          </motion.div>

          <div className="space-y-2 sm:space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {paginatedFindings.map((finding) => (
                <motion.div
                  key={finding.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedFinding?.id === finding.id
                        ? "border-primary shadow-md"
                        : "hover:border-muted-foreground hover:shadow-sm"
                    }`}
                    onClick={() => onSelectFinding(finding)}
                  >
                    <CardHeader className="p-2 sm:p-3 pb-0">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm sm:text-base">
                          {finding.label} #{finding.id}
                        </CardTitle>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectFinding(finding)
                          }}
                          className="h-7 w-7 hover:bg-muted/80 transition-colors"
                        >
                          <Crosshair className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="sr-only">Locate</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-3 pt-1 sm:pt-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">Confidence:</span>
                        <Badge variant={finding.confidence > 0.9 ? "default" : "outline"} className="text-xs">
                          {Math.round(finding.confidence * 100)}%
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 sm:mt-2">
                        Position: {Math.round(finding.x * 100)}%, {Math.round(finding.y * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Size: {Math.round(finding.width * 100)}% × {Math.round(finding.height * 100)}%
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center mt-3 sm:mt-4"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8 transition-colors hover:bg-muted/80"
              >
                Previous
              </Button>
              <span className="text-xs sm:text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8 transition-colors hover:bg-muted/80"
              >
                Next
              </Button>
            </motion.div>
          )}
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-4 border-t"
      >
        <h3 className="font-medium mb-2">Slide Information</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Patient ID:</span>
            <span>{patientId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Filename:</span>
            <span className="truncate max-w-[150px]" title={filename}>
              {filename}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sample Type:</span>
            <span className="capitalize">{sampleType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Magnification:</span>
            <span>40x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stain:</span>
            <span>Wright-Giemsa</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


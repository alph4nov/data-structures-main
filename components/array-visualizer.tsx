// components/array-visualizer.tsx
"use client"

import { useState } from "react"

interface ArrayVisualizerProps {
  initialValues: number[]
  showCapacity?: boolean
  capacity?: number
}

export function ArrayVisualizer({ 
  initialValues, 
  showCapacity = false, 
  capacity = 10 
}: ArrayVisualizerProps) {
  const [values, setValues] = useState(initialValues)
  
  return (
    <div className="bg-black/30 p-6 rounded-lg border border-white/10">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <h3 className="font-medium">Array Visualization</h3>
          <p className="text-sm text-white/60">
            Size: {values.length} {showCapacity && `| Capacity: ${capacity}`}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {Array.from({ length: showCapacity ? capacity : values.length }).map((_, index) => {
            const hasValue = index < values.length
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-white/50 font-mono mb-1">[{index}]</div>
                <div
                  className={`
                    w-12 h-12 flex items-center justify-center border-2 rounded-lg font-mono
                    transition-all duration-200
                    ${hasValue 
                      ? 'border-blue-400 bg-blue-500/20 text-white' 
                      : 'border-white/20 border-dashed bg-white/5 text-white/30'
                    }
                    hover:scale-105
                  `}
                >
                  {hasValue ? values[index] : "—"}
                </div>
              </div>
            )
          })}
        </div>
        
        {showCapacity && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500/20 border border-blue-400 rounded"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-white/5 border border-white/20 border-dashed rounded"></div>
                <span>Available Capacity</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
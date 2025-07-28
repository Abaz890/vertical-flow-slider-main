'use client'

import { cn } from '@/lib/utils'
import React, { ReactElement } from 'react'

interface InfiniteSliderProps {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
}

export function InfiniteSlider({
  children,
  direction = 'horizontal',
  speed = 'normal',
  pauseOnHover = false,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [duration, setDuration] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
    }
  }, [])

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'horizontal') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards')
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'none')
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        setDuration(20)
      } else if (speed === 'normal') {
        setDuration(40)
      } else {
        setDuration(80)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 overflow-hidden',
        direction === 'horizontal' ? 'w-full' : 'h-full',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex shrink-0 gap-4 py-4 w-max flex-nowrap',
          direction === 'vertical' && 'flex-col h-max',
          direction === 'horizontal' && 'animate-scroll',
          direction === 'vertical' && (reverse ? 'animate-scroll-vertical-reverse' : 'animate-scroll-vertical'),
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <li key={index} className="relative">
            {child}
          </li>
        ))}
      </ul>
    </div>
  )
}
import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground border-input flex h-9 w-full min-w-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:opacity-50 md:text-sm',
        'font-serif italic',
        'focus-visible:border-foreground',
        'aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Input }

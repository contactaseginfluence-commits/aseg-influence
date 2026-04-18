import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-foreground aria-invalid:border-destructive flex min-h-[110px] w-full resize-none border-b bg-transparent px-0 py-3 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'font-serif italic',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

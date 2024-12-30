import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-base font-semibold flex items-center gap-2", className)}
    {...props}
  >
    {props['data-destructive'] && (
      <AlertCircle className="h-5 w-5 text-red-500" />
    )}
    {props.children}
  </ToastPrimitives.Title>
))
ToastTitle.displayName = ToastPrimitives.Title.displayName
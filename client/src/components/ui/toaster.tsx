import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle2, XCircle, Info } from "lucide-react"
import { motion } from "framer-motion"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: string) => {
    const iconVariants = {
      initial: { scale: 0, rotate: -180 },
      animate: { 
        scale: 1, 
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1
        }
      }
    }

    switch (variant) {
      case "success":
        return (
          <motion.div variants={iconVariants} initial="initial" animate="animate">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          </motion.div>
        )
      case "destructive":
        return (
          <motion.div variants={iconVariants} initial="initial" animate="animate">
            <XCircle className="w-5 h-5 text-red-100 shrink-0" />
          </motion.div>
        )
      default:
        return (
          <motion.div variants={iconVariants} initial="initial" animate="animate">
            <Info className="w-5 h-5 text-primary shrink-0" />
          </motion.div>
        )
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 w-full">
              {getIcon(variant)}
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

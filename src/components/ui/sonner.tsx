import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-left"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "group toast !rounded-none !border !border-ink/15 !bg-paper !text-ink !shadow-none !font-sans",
          title: "!font-medium",
          description: "!font-serif !text-body",
          error: "!border-accent",
          actionButton: "!rounded-none !bg-ink !text-cream",
          cancelButton: "!rounded-none !bg-paper-2 !text-ink",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

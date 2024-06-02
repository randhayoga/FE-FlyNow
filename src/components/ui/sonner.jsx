import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      richColors
      closeButton
      theme={theme}
      {...props} />)
  );
}

export { Toaster }

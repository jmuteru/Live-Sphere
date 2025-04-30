import { ThemeProvider } from "@/components/theme-provider"
import GlobeClient from "./GlobeClient"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="relative h-screen w-full overflow-hidden bg-background">
        <GlobeClient />
      </main>
    </ThemeProvider>
  )
}

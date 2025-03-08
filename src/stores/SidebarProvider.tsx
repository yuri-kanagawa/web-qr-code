import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { useWindowSize } from '@/hooks'

const SidebarContext = createContext<{
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  setIsSidebarOpen: (value: boolean) => void
} | null>(null)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const { isOverLaptop } = useWindowSize()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  useEffect(() => {
    if (isOverLaptop) {
      setIsSidebarOpen(true)
    } else {
      setIsSidebarOpen(false)
    }
  }, [isOverLaptop, setIsSidebarOpen])

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        setIsSidebarOpen
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

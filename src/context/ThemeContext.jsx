import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const THEMES = [
  { id: 'theme-ivory',    label: 'Ivory',    dot: '#f5f2ea', ring: '#c8a96e' },
  { id: 'theme-pearl',    label: 'Pearl',    dot: '#eef0f6', ring: '#7b9cc4' },
  { id: 'theme-blush',    label: 'Blush',    dot: '#f4ede9', ring: '#c0715a' },
  { id: 'theme-midnight', label: 'Dark',     dot: '#16161e', ring: '#c8a96e' },
]

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('theme-ivory')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

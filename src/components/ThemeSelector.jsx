import './ThemeSelector.css'
import { useTheme } from '../hooks/useTheme'
import lightMode from '../assets/lightmode.svg'

const themeColors = ['#58249c', '#249c6b', '#b70233']

const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
          src={lightMode}
          onClick={toggleMode}
          alt='dark/light toggle icon'
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
        />
      </div>
      <div className='theme-buttons'>
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector

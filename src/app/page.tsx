'use client'

import { useState, useEffect, useCallback } from 'react'

// Types
type PerformanceMode = 'saver' | 'balance' | 'performance'
type TabType = 'booster' | 'gfx'

interface GfxSettings {
  res: string
  fps: number
}

// Material Symbol Icon Component
function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-rounded ${className}`}>{name}</span>
  )
}

// Android 16 Style Slider Component
function A16Slider({
  value,
  min,
  max,
  onChange,
  icon,
  label,
  step = 1,
  resIndex,
}: {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  icon: string
  label: string
  step?: number
  resIndex?: number
}) {
  const [trackWidth, setTrackWidth] = useState(0)
  const sliderRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setTrackWidth(node.offsetWidth - 8)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef) {
        const node = document.querySelector('.a16-slider-box')
        if (node) {
          setTrackWidth(node.offsetWidth - 8)
        }
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sliderRef])

  const getPercentage = () => {
    if (resIndex !== undefined) {
      return (resIndex / 3) * 100
    }
    return ((value - min) / (max - min)) * 100
  }

  const fillWidth = `calc(${getPercentage()}% - 4px)`

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-on-surface font-medium text-lg px-2">{label}</h3>
      <div className="flex items-center gap-4">
        <div className="a16-slider-box flex-1" ref={sliderRef}>
          <div className="a16-slider-track"></div>
          <div className="a16-slider-fill" style={{ width: fillWidth }}>
            <div className="a16-slider-bar"></div>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="a16-input"
          />
        </div>
        <Icon name={icon} className="text-on-surface-variant text-3xl" />
      </div>
      <span className="px-2 text-sm font-bold text-yakuza-primary">
        {resIndex !== undefined ? ['720p', '1080p', '1440p', '4K'][resIndex] : `${value} FPS`}
      </span>
    </div>
  )
}

// Mode Item Component
function ModeItem({
  mode,
  icon,
  title,
  isActive,
  onClick,
}: {
  mode: PerformanceMode
  icon: string
  title: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-5 rounded-[28px] cursor-pointer transition-all ${
        isActive
          ? 'bg-primary-container fade-in'
          : ''
      }`}
    >
      <Icon
        name={icon}
        className={isActive ? 'text-on-primary-container' : 'text-on-surface-variant'}
      />
      <h3 className={`flex-1 font-medium ${isActive ? 'text-on-primary-container' : ''}`}>
        {title}
      </h3>
      <Icon
        name="check_circle"
        className={isActive ? 'text-on-primary-container' : 'text-yakuza-primary opacity-0'}
      />
    </div>
  )
}

// Stats Card Component
function StatsCard({
  icon,
  value,
  unit,
  label,
  valueColor = 'text-yakuza-primary',
}: {
  icon: string
  value: string | number
  unit: string
  label: string
  valueColor?: string
}) {
  return (
    <div className="bg-surface-container p-6 rounded-[32px] flex flex-col items-center justify-center text-center">
      <Icon name={icon} className="text-yakuza-primary mb-2 text-2xl" />
      <div className={`flex items-baseline ${valueColor}`}>
        <span className="text-5xl font-light">{value}</span>
        <span className="text-lg ml-1 font-medium">{unit}</span>
      </div>
      <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  )
}

// Developer Modal Component
function DeveloperModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <div
      className={`fixed inset-0 bg-black/80 z-50 flex items-end justify-center backdrop-blur-sm transition-all duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-surface-container-high w-full max-w-md rounded-t-[40px] p-8 shadow-2xl transition-transform duration-500 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-12 h-1.5 bg-on-surface-variant/30 rounded-full mx-auto mb-8"></div>
        <h2 className="text-2xl font-medium text-center mb-8 text-on-surface">Tim Pengembang</h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xl font-bold">
              S
            </div>
            <div>
              <h4 className="text-on-surface font-bold text-lg">SatirrDevv&apos;z</h4>
              <p className="text-yakuza-primary text-sm">Koding Script & Pembuat</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-surface-container text-on-surface flex items-center justify-center text-xl font-bold border border-white/5">
              R
            </div>
            <div>
              <h4 className="text-on-surface font-bold text-lg">riskybukanhama</h4>
              <p className="text-on-surface-variant text-sm">Koding Aplikasi & Desainer</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-surface-container text-on-surface flex items-center justify-center text-xl font-bold border border-white/5">
              F
            </div>
            <div>
              <h4 className="text-on-surface font-bold text-lg">Faksiijo</h4>
              <p className="text-on-surface-variant text-sm flex items-center gap-1">
                Donatur Utama ★
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-10 bg-yakuza-primary text-on-primary rounded-full py-5 font-bold text-lg ripple"
        >
          Selesai
        </button>
      </div>
    </div>
  )
}

// Snackbar Component
function Snackbar({
  message,
  isVisible,
}: {
  message: string
  isVisible: boolean
}) {
  return (
    <div
      className={`absolute bottom-28 left-6 right-6 bg-on-surface text-surface px-6 py-4 rounded-3xl shadow-2xl text-sm font-bold flex items-center gap-3 transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <span>{message}</span>
    </div>
  )
}

// Main Page Component
export default function Home() {
  // State
  const [currentTab, setCurrentTab] = useState<TabType>('booster')
  const [showSettings, setShowSettings] = useState(false)
  const [showDevModal, setShowDevModal] = useState(false)
  const [activeMode, setActiveMode] = useState<PerformanceMode>('balance')
  const [isCleaning, setIsCleaning] = useState(false)
  const [ramValue, setRamValue] = useState('--')
  const [tempValue, setTempValue] = useState('--')
  const [boostText, setBoostText] = useState('Optimalkan')
  const [boostIcon, setBoostIcon] = useState('rocket_launch')
  const [isBoostButtonActive, setIsBoostButtonActive] = useState(true)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)

  // GFX Settings
  const [gfxSettings, setGfxSettings] = useState<GfxSettings>({
    res: '1080p',
    fps: 60,
  })
  const [resIndex, setResIndex] = useState(1)

  // Fake offset for RAM optimization simulation
  const [fakeOffset, setFakeOffset] = useState(0)

  // Toast function
  const showToast = useCallback((message: string) => {
    setSnackbarMessage(message)
    setShowSnackbar(true)
    setTimeout(() => setShowSnackbar(false), 3000)
  }, [])

  // Update stats
  useEffect(() => {
    const updateStats = () => {
      if (isCleaning) return

      // Simulate RAM value
      let realRam = 75 + Math.floor(Math.random() * 5)
      const displayedRam = Math.max(30, Math.min(99, realRam - fakeOffset))
      setRamValue(displayedRam.toString())

      // Simulate temperature
      const temp = 36 + Math.floor(Math.random() * 3)
      setTempValue(temp.toString())

      // Slowly reduce fake offset
      if (fakeOffset > 0 && Math.random() > 0.7) {
        setFakeOffset((prev) => Math.max(0, prev - 1))
      }
    }

    updateStats()
    const interval = setInterval(updateStats, 800)
    return () => clearInterval(interval)
  }, [isCleaning, fakeOffset])

  // Boost function
  const startBoost = useCallback(() => {
    if (isCleaning) return

    setIsCleaning(true)
    setIsBoostButtonActive(false)
    setBoostIcon('sync')
    setBoostText('Proses...')

    const offset = Math.floor(Math.random() * 15) + 10
    let step = 0

    const interval = setInterval(() => {
      if (step < offset) {
        step++
        setRamValue((prev) => Math.max(30, parseInt(prev) - 1).toString())
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setIsCleaning(false)
          setFakeOffset(offset)
          setIsBoostButtonActive(true)
          setBoostIcon('done_all')
          setBoostText('Selesai')
          showToast(`Optimasi Berhasil! RAM berkurang ${offset}%`)

          setTimeout(() => {
            setBoostIcon('rocket_launch')
            setBoostText('Optimalkan')
          }, 3000)
        }, 800)
      }
    }, 50)
  }, [isCleaning, showToast])

  // Apply GFX settings
  const applyGfx = useCallback(() => {
    showToast(`Menerapkan GFX: ${gfxSettings.res} @ ${gfxSettings.fps} FPS`)
  }, [gfxSettings, showToast])

  // Navigation
  const switchTab = useCallback((tab: TabType) => {
    setCurrentTab(tab)
    setShowSettings(false)
  }, [])

  // Settings
  const openSettings = useCallback(() => {
    setShowSettings(true)
  }, [])

  const closeSettings = useCallback(() => {
    setShowSettings(false)
  }, [])

  return (
    <div className="antialiased min-h-screen flex justify-center overflow-hidden bg-surface">
      <div className="w-full max-w-md h-[100dvh] flex flex-col relative bg-surface">
        {/* Header */}
        <header className="pt-10 pb-4 px-6 flex items-center z-10 gap-3">
          <button
            onClick={closeSettings}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-on-surface ripple ${
              showSettings ? '' : 'hidden'
            }`}
          >
            <Icon name="arrow_back" className="text-2xl" />
          </button>
          <h1 className="text-3xl font-medium text-yakuza-primary tracking-tight flex-1">
            {showSettings ? 'Pengaturan' : 'Yakuza'}
          </h1>
          <button
            onClick={openSettings}
            className={`w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface ripple ${
              showSettings ? 'hidden' : ''
            }`}
          >
            <Icon name="settings" />
          </button>
        </header>

        <main className="flex-1 relative px-6 overflow-y-auto pb-32">
          {/* BOOSTER VIEW */}
          <div
            className={`page-transition w-full flex flex-col gap-6 pt-4 ${
              !showSettings && currentTab === 'booster' ? '' : 'hidden-page'
            }`}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatsCard
                icon="memory"
                value={ramValue}
                unit="%"
                label="RAM"
              />
              <StatsCard
                icon="device_thermostat"
                value={tempValue}
                unit="°C"
                label="SUHU"
                valueColor="text-on-surface"
              />
            </div>

            {/* Boost Button */}
            <button
              onClick={startBoost}
              disabled={isCleaning}
              className={`w-full rounded-[32px] py-6 px-6 flex items-center justify-center gap-3 ripple shadow-lg transition-colors ${
                isBoostButtonActive
                  ? 'bg-yakuza-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <Icon
                name={boostIcon}
                className={`text-2xl ${isCleaning ? 'animate-spin-slow' : ''}`}
              />
              <span className="text-xl font-bold">{boostText}</span>
            </button>

            {/* Performance Modes */}
            <div>
              <h2 className="text-xs font-bold text-on-surface-variant mb-4 px-2 uppercase tracking-widest">
                Mode Performa
              </h2>
              <div className="bg-surface-container rounded-[36px] p-2 flex flex-col gap-1">
                <ModeItem
                  mode="saver"
                  icon="battery_saver"
                  title="Hemat Baterai"
                  isActive={activeMode === 'saver'}
                  onClick={() => setActiveMode('saver')}
                />
                <ModeItem
                  mode="balance"
                  icon="tune"
                  title="Seimbang"
                  isActive={activeMode === 'balance'}
                  onClick={() => setActiveMode('balance')}
                />
                <ModeItem
                  mode="performance"
                  icon="speed"
                  title="Maksimal"
                  isActive={activeMode === 'performance'}
                  onClick={() => setActiveMode('performance')}
                />
              </div>
            </div>
          </div>

          {/* GFX TOOL VIEW */}
          <div
            className={`page-transition w-full flex flex-col gap-10 pt-6 ${
              !showSettings && currentTab === 'gfx' ? '' : 'hidden-page'
            }`}
          >
            {/* Resolution Slider */}
            <A16Slider
              value={resIndex}
              min={0}
              max={3}
              step={1}
              onChange={(val) => {
                setResIndex(val)
                setGfxSettings((prev) => ({
                  ...prev,
                  res: ['720p', '1080p', '1440p', '4K'][val],
                }))
              }}
              icon="aspect_ratio"
              label="Resolusi Game"
              resIndex={resIndex}
            />

            {/* FPS Slider */}
            <A16Slider
              value={gfxSettings.fps}
              min={30}
              max={120}
              step={1}
              onChange={(val) =>
                setGfxSettings((prev) => ({ ...prev, fps: val }))
              }
              icon="speed"
              label="Frame Rate"
            />

            {/* Apply Button */}
            <button
              onClick={applyGfx}
              className="w-full bg-primary-container text-on-primary-container rounded-[32px] py-6 px-6 mt-4 flex items-center justify-center gap-3 ripple font-bold text-xl"
            >
              <Icon name="done_all" className="text-2xl" />
              Terapkan Pengaturan
            </button>
          </div>

          {/* SETTINGS VIEW */}
          <div
            className={`page-transition w-full flex flex-col gap-3 pt-4 ${
              showSettings ? '' : 'hidden-page'
            }`}
          >
            {/* Developer Card */}
            <div
              onClick={() => setShowDevModal(true)}
              className="bg-surface-container rounded-[32px] p-6 flex items-center gap-4 cursor-pointer ripple"
            >
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                <Icon name="group" />
              </div>
              <div className="flex-1">
                <h3 className="text-on-surface font-medium text-lg">Pengembang</h3>
                <p className="text-on-surface-variant text-sm">Tim di balik Yakuza</p>
              </div>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>

            {/* Version Card */}
            <div className="bg-surface-container rounded-[32px] p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                <Icon name="info" />
              </div>
              <div className="flex-1">
                <h3 className="text-on-surface font-medium text-lg">Versi Aplikasi</h3>
                <p className="text-on-surface-variant text-sm">1.0.0 (Public Beta)</p>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav
          className={`absolute bottom-0 w-full bg-surface pb-10 pt-2 px-6 z-20 flex justify-around transition-transform duration-400 ${
            showSettings ? 'nav-hidden' : ''
          }`}
        >
          <button
            onClick={() => switchTab('booster')}
            className="flex flex-col items-center gap-1 w-24"
          >
            <div
              className={`px-7 py-2 rounded-full transition-all ${
                currentTab === 'booster'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant'
              }`}
            >
              <Icon name="rocket" />
            </div>
            <span
              className={`text-[10px] font-bold mt-1 uppercase tracking-[0.2em] ${
                currentTab === 'booster' ? 'text-on-surface' : 'text-on-surface-variant'
              }`}
            >
              Booster
            </span>
          </button>
          <button
            onClick={() => switchTab('gfx')}
            className="flex flex-col items-center gap-1 w-24"
          >
            <div
              className={`px-7 py-2 rounded-full transition-all ${
                currentTab === 'gfx'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant'
              }`}
            >
              <Icon name="gamepad" />
            </div>
            <span
              className={`text-[10px] font-bold mt-1 uppercase tracking-[0.2em] ${
                currentTab === 'gfx' ? 'text-on-surface' : 'text-on-surface-variant'
              }`}
            >
              GFX Tool
            </span>
          </button>
        </nav>

        {/* Developer Modal */}
        <DeveloperModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />

        {/* Snackbar */}
        <Snackbar message={snackbarMessage} isVisible={showSnackbar} />
      </div>
    </div>
  )
}

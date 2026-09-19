import { useEffect, useRef, useState } from 'react'
import {
  MARK_PATH,
  MARK_VIEWBOX,
  WORDMARK_PATH,
  WORDMARK_VIEWBOX,
} from './logoPaths'

const SOLUTIONS = [
  {
    label: 'Solo Legal Practice',
    products: 'LEX Reception + Setmore',
    href: 'https://lexreception.com',
  },
  {
    label: 'Medical & Therapy Practice',
    products: 'WellReceived + Setmore',
    href: 'https://wellreceived.com',
  },
  {
    label: 'Field Trade Business',
    products: 'ServiceForge',
    href: 'https://serviceforge.com',
  },
  {
    label: 'Remote Agency',
    products: 'Anywhere App + Teleport + Setmore',
    href: 'https://anywhere.app',
  },
  {
    label: 'Scaling E-Commerce Brand',
    products: 'AnswerConnect + ChatSupport',
    href: 'https://answerconnect.com',
  },
]

function SolutionsMenu() {
  const [open, setOpen] = useState(false)
  const wrapper = useRef(null)
  const closeTimer = useRef(null)
  // Pointer devices open the panel on hover; touch devices have no hover, so
  // the trigger's click toggle is their only path in.
  const hoverCapable = useRef(false)

  useEffect(() => {
    hoverCapable.current = window.matchMedia('(hover: hover)').matches
  }, [])

  // Pointer intent: a short close delay keeps the menu usable while the cursor
  // crosses the gap between the trigger and the panel.
  const cancelClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = null
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!wrapper.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <li
      ref={wrapper}
      className="relative"
      onMouseEnter={() => {
        if (!hoverCapable.current) return
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={() => {
        if (hoverCapable.current) scheduleClose()
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="text-near-black flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-near-black sm:text-lg"
      >
        Solutions
        <svg
          viewBox="0 0 12 8"
          aria-hidden="true"
          className={`h-2 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        // Below 650px the trigger sits mid-bar, so anchoring the panel to it
        // pushes the left edge off-screen. Pin it to the viewport gutters
        // instead, then switch to a trigger-anchored panel on wider screens.
        className={`fixed left-5 right-5 top-nav-mobile z-10 pt-3 transition-all duration-200 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:w-[21rem] sm:pt-6 ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <ul className="rounded-dropdown overflow-hidden bg-white py-2 shadow-[0_12px_32px_-8px_rgba(24,24,24,0.28)]">
          {SOLUTIONS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                className="hover:bg-brand-primary/10 focus-visible:bg-brand-primary/10 block px-4 py-2.5 transition-colors focus-visible:outline-none"
              >
                <span className="text-near-black block text-sm font-semibold">
                  {item.label}
                </span>
                <span className="text-ink mt-0.5 block text-xs">
                  {item.products}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

function NavLink({ children, href, className = '' }) {
  return (
    <li className={className}>
      <a
        href={href}
        className="text-near-black text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-near-black sm:text-lg"
      >
        {children}
      </a>
    </li>
  )
}

export default function Nav() {
  return (
    <header className="bg-brand-primary fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="h-nav-mobile sm:h-nav-aw flex items-center px-5 sm:px-10"
      >
        {/* Two mutually exclusive logo states, mirroring the live site: it
            swaps between the compact mark and the full logotype at 650px and
            never shows both. Widths match its .navbar__logo rules (40px
            below the breakpoint, 224px above). */}
        <a
          href="/"
          aria-label="AnywhereWorks home"
          className="text-near-black mr-auto flex items-center transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-near-black"
        >
          <svg
            viewBox={MARK_VIEWBOX}
            aria-hidden="true"
            className="h-auto w-10 sm:hidden"
          >
            <path d={MARK_PATH} fill="currentColor" fillRule="evenodd" />
          </svg>
          <svg
            viewBox={WORDMARK_VIEWBOX}
            aria-hidden="true"
            className="hidden h-auto w-56 sm:block"
          >
            <path d={WORDMARK_PATH} fill="currentColor" fillRule="evenodd" />
          </svg>
        </a>

        <ul className="flex items-center gap-4 sm:gap-[30px]">
          <NavLink href="#mission">Mission</NavLink>
          <NavLink href="#products">Products</NavLink>
          <SolutionsMenu />
          {/* The live site hides Contact below 650px via .phone-hide. Careers
              follows the same pattern here by choice — the live site keeps it
              on mobile, but the footer already covers it. */}
          <NavLink href="#careers" className="hidden sm:block">
            Careers
          </NavLink>
          <NavLink href="#contact" className="hidden sm:block">
            Contact
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}

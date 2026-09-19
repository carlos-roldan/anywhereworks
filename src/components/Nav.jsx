import { useEffect, useRef, useState } from 'react'

// Traced from the mark on anywhereworks.com (viewBox 0 0 80 44). The live site
// swaps this for a full wordmark path above 650px; here the mark is paired with
// type instead, so the same glyph works at both sizes.
const MARK_PATH =
  'M74.5 0C77.537 0 80 2.462 80 5.5 80 8.538 77.537 11 74.5 11 71.462 11 69 8.538 69 5.5 69 2.462 71.462 0 74.5 0M26.5947 1L36.4617 1C36.7867 1 37.0797 1.197 37.2017 1.499L48.8767 30.198C48.9557 30.392 48.9557 30.608 48.8767 30.802L43.8697 43.09C43.7357 43.422 43.2647 43.422 43.1287 43.09L26.2237 1.551C26.1167 1.288 26.3107 1 26.5947 1M47.5947 1L57.4617 1C57.7867 1 58.0797 1.197 58.2017 1.499L69.8767 30.198C69.9557 30.392 69.9557 30.608 69.8767 30.802L64.8697 43.09C64.7357 43.422 64.2647 43.422 64.1287 43.09L47.2237 1.551C47.1167 1.288 47.3107 1 47.5947 1M32.4053 43L22.5383 43C22.2133 43 21.9203 42.803 21.7973 42.501L10.1223 13.802C10.0443 13.608 10.0443 13.392 10.1233 13.198L15.1293.91C15.2643.578 15.7343.578 15.8703.91L32.7753 42.449C32.8833 42.712 32.6893 43 32.4053 43M5.5 33C8.537 33 11 35.462 11 38.5 11 41.538 8.537 44 5.5 44 2.462 44 0 41.538 0 38.5 0 35.462 2.462 33 5.5 33'

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
        <a
          href="/"
          aria-label="AnywhereWorks home"
          className="text-near-black mr-auto flex items-center gap-2.5 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-near-black"
        >
          <svg viewBox="0 0 80 44" aria-hidden="true" className="h-5 w-9 sm:h-6">
            <path d={MARK_PATH} fill="currentColor" fillRule="evenodd" />
          </svg>
          <span className="font-display hidden text-xl font-bold tracking-tight sm:block">
            AnywhereWorks
          </span>
        </a>

        <ul className="flex items-center gap-4 sm:gap-[30px]">
          <NavLink href="#mission">Mission</NavLink>
          <NavLink href="#products">Products</NavLink>
          <SolutionsMenu />
          <NavLink href="#careers">Careers</NavLink>
          {/* The live site hides Contact below 650px via .phone-hide */}
          <NavLink href="#contact" className="hidden sm:block">
            Contact
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}

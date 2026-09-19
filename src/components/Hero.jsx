import { useEffect, useState } from 'react'

// Background: Brooke Cagle, Unsplash
// https://unsplash.com/photos/g1Kr4Ozfoac

const TERMS = ['Lawyers', 'Clinics', 'Contractors', 'Agencies', 'Retailers']
const INTERVAL_MS = 2500

function RotatingTerm() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % TERMS.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="relative mt-1 block sm:mt-2">
      {/* Longest term holds the line so the headline never jumps. */}
      <span className="text-brand-primary invisible" aria-hidden="true">
        {'{Contractors}'}
      </span>
      {TERMS.map((term, i) => (
        <span
          key={term}
          aria-hidden={i !== index}
          className={`text-brand-primary absolute inset-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
            i === index
              ? 'translate-y-0 opacity-100'
              : 'translate-y-2 opacity-0 motion-reduce:translate-y-0'
          }`}
        >
          {'{'}
          {term}
          {'}'}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-60px)] items-center overflow-hidden sm:min-h-[calc(100svh-80px)]">
      <img
        src="/hero.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover object-[center_30%]"
      />
      {/* Light wash so the photo stays visible; darker only under the copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-near-black/75 via-near-black/35 to-near-black/20"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 text-center sm:px-10 sm:py-24">
        <p className="font-sans text-meta-md font-medium uppercase text-white">
          ALWAYS OPEN. ALWAYS HUMAN.
        </p>

        <h1 className="font-display text-heading-xl mt-5 font-bold tracking-tight text-white sm:mt-6 sm:text-heading-2xl">
          <span className="sr-only">
            AnywhereWorks For: Lawyers, Clinics, Contractors, Agencies, and
            Retailers
          </span>
          <span aria-hidden="true">
            AnywhereWorks For:
            <RotatingTerm />
          </span>
        </h1>

        <p className="font-sans text-body-lg mx-auto mt-6 text-white/90 sm:mt-8 sm:max-w-none sm:text-body-xl">
          Real people answer the phone, book the job, and keep your business
          running.
        </p>

        <a
          href="#solutions"
          className="bg-brand-primary text-near-black rounded-cta font-sans mt-8 inline-flex h-14 items-center px-10 text-lg font-medium transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-10"
        >
          Explore your solution →
        </a>
      </div>
    </section>
  )
}

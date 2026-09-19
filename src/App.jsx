import Hero from './components/Hero'
import Nav from './components/Nav'

function App() {
  return (
    <>
      <Nav />
      <main className="pt-nav-mobile sm:pt-nav-aw">
        <Hero />
        <section
          id="solutions"
          className="flex min-h-[50vh] items-center justify-center px-5"
        >
          <p className="text-ink font-sans text-center text-body-lg">
            Solutions section next.
          </p>
        </section>
      </main>
    </>
  )
}

export default App

import Nav from './components/Nav'

function App() {
  return (
    <>
      <Nav />
      <main className="pt-nav-mobile sm:pt-nav-aw">
        <div className="flex min-h-[60vh] items-center justify-center px-5">
          <p className="text-ink font-sans text-center text-body-lg">
            Hero section next.
          </p>
        </div>
      </main>
    </>
  )
}

export default App

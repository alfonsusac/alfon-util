import { Suspense } from "react"
import { UtilList } from "./components"

export default function Home() {
  return <>
    <header>
      <p className="text-sm">
        alfon.dev
      </p>
      <h1 className="text-4xl font-medium tracking-tight">
        util
      </h1>
      <p className="max-w-60">
        collection of code snippets used in various of my projects.
      </p>
    </header>

    <section className="grow  *:button">
      <Suspense fallback={<i>Loading modules...</i>}>
        <UtilList />
      </Suspense>
    </section>
  </>
}



import { Suspense } from "react"
import { DirList } from "./ui-content-tree"

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

    <section className="grow">
      <Suspense fallback={<i>Loading modules...</i>}>
        <HomeAsync />
      </Suspense>
    </section>
  </>
}

async function HomeAsync() {
  // const e = await get_all_file_contents()
  // console.log(e)
  return <DirList />
}



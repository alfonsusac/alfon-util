export async function post_discord_webhook(
  url: string,
  content: string
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      thread_id: '1552606655085285457'
    })
  })
  const json = await res.json()
  console.log(json)
}

export function timestamp(
  date: Date,
  type: "short-time" | "long-time" | "long-time" | "short-date" | "long-date" | "short-date+time" | "long date+time" | "relative"
) {
  const t = {
    "short-time": "t",
    "long-time": "T",
    "short-date": "d",
    "long-date": "D",
    "short-date+time": "f",
    "long date+time": "F",
    relative: "R"
  } satisfies Record<typeof type, string>
  return `<t:${ Math.floor(date.getTime() / 1000) }:${ t[ type ] }>`
}

export function linkOrPlain(text: string, url?: string) {
  return url ? `[${ text }](${ url })` : text
}
export function link(text: string, url: string) {
  return `[${ text }](${ url })`
}
import type { VERCEL_BUILD_ENV } from "@/content/notes/vercel/env_vars"
import { maskedlink, linkOrPlain, post_discord_webhook, timestamp } from "@/content/utils/util-discord-webhook"
import { expect } from "@/content/utils/util.env"
import type { WriteStream } from "tty"


const build_env = process.env as VERCEL_BUILD_ENV & {
  DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL?: string
}

console.log("Build Env |", build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL)

const v_team = "alfonsusacs-projects"
const deployment_link = `https://vercel.com/${ v_team }/${ build_env.VERCEL_PROJECT_NAME }/${ build_env.VERCEL_DEPLOYMENT_ID.replace('dpl_', '') }`
const log_header =
  '-# ' + maskedlink(build_env.VERCEL_PROJECT_NAME, deployment_link)
  + ' - ' + build_env.VERCEL_ENV
  + ' - ' + maskedlink(`${ build_env.VERCEL_GIT_COMMIT_REF }-${ build_env.VERCEL_GIT_COMMIT_SHA.slice(0, 7) }`, `https://github.com/${ build_env.VERCEL_GIT_REPO_SLUG }/commit/${ build_env.VERCEL_GIT_COMMIT_SHA }`)
  + ' - ' + build_env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN


async function post_log(...message: string[]) {
  await post_discord_webhook(
    build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL!,
    message.join("\n"),
  )
}

try {
  // if (build_env.VERCEL === '1')
  if (!build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL)
    throw new Error("DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL is not set")


  const start = performance.now()
  const proc = Bun.spawn({
    cmd: [ 'next', 'build' ], stdout: 'pipe', stderr: 'pipe',
    env: { ...process.env, FORCE_COLOR: '1' }
  })
  const logs: string[] = []

  async function read(stream: ReadableStream<Uint8Array>, echo: WriteStream) {
    const reader = stream.getReader()
    const decoder = new TextDecoder() // own decoder per stream

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = decoder.decode(value, { stream: true })
      logs.push(text)
      echo.write(text)
    }
    const tail = decoder.decode()
    if (tail) {
      logs.push(tail)
      echo.write(tail)
    }
  }

  await Promise.all([
    read(proc.stdout, process.stdout),
    read(proc.stderr, process.stderr),
  ])

  const exitCode = await proc.exited
  const duration = performance.now() - start


  /// count the lines
  const line_count = logs.reduce((count, log) => count + log.split('\n').length, 0)

  const joined_logs = logs.join('')

  void (async () => {
    await post_log(
      log_header,
      `-# "${ build_env.VERCEL_GIT_COMMIT_MESSAGE }"`,
      `-# ​`,
      'Vercel Build Action Result',
      `-# ${ line_count } lines - ${ (duration / 1000).toFixed(2) }s`,
      '\`\`\`ansi',
      joined_logs.length > 1500 ? `${ joined_logs.slice(0, 1500) + '...' }` : `${ joined_logs }`,
      '\`\`\`',
    )
  })()







} catch (error) {
  const error_message = error instanceof Error ? error.message : String(error)
  const error_stack_section = error instanceof Error
    ? (error.stack && error.stack.length > 1500)
      ? `\`\`\`${ error.stack?.slice(0, 1500) + '...' }\`\`\``
      : `\`\`\`${ error.stack }\`\`\``
    : ''
  await post_log(
    log_header,
    `🔴  Error occurred: \`${ error_message }\``,
    error_stack_section
  )
  throw error
}

import type { VERCEL_BUILD_ENV } from "@/content/notes/vercel/env_vars"
import { link, linkOrPlain, post_discord_webhook, timestamp } from "@/content/utils/util-discord-webhook"
import { expect } from "@/content/utils/util.env"

const build_env = process.env as VERCEL_BUILD_ENV & {
  DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL?: string
}

console.log("Build Env |", build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL)

const v_team = "alfonsusacs-projects"
const project_link = `https://vercel.com/${ v_team }/${ build_env.VERCEL_PROJECT_NAME }`
const deployment_link = `https://vercel.com/${ v_team }/${ build_env.VERCEL_PROJECT_NAME }/${ build_env.VERCEL_DEPLOYMENT_ID.replace('dpl_', '') }`

async function post_log(title: string, message: string) {
  await post_discord_webhook(
    build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL!,
    [
      [
        link(build_env.VERCEL_PROJECT_NAME, project_link),
        build_env.VERCEL_ENV,
        title
      ].join(' - '),
      message
    ].join("\n")
  )
}

await post_log('test message', 'This is a test message for the Discord webhook.')


try {
  if (build_env.VERCEL === '1') {
    if (!build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL)
      throw new Error("DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL is not set")

    throw new Error("Vercel build triggered")



    const git_author = expect(build_env.VERCEL_GIT_COMMIT_AUTHOR_NAME)
    const git_username = expect(build_env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN)
    const author_md = linkOrPlain(git_author, `https://github.com/${ git_username }`)
    const repo = expect(build_env.VERCEL_GIT_REPO_SLUG)
    const commit_sha = expect(build_env.VERCEL_GIT_COMMIT_SHA)
    const commit_url = `https://github.com/${ git_username }/${ repo }/commit/${ build_env.VERCEL_GIT_COMMIT_SHA }`
    const branch = expect(build_env.VERCEL_GIT_COMMIT_REF)
    const branch_url = `https://github.com/${ git_username }/${ repo }/tree/${ branch }`

    post_log(
      'Vercel Build Triggered',
      [
        [
          link(branch, branch_url),
          link(commit_sha.slice(0, 7), commit_url),
          build_env.VERCEL_GIT_COMMIT_MESSAGE,
        ].join(' - '),
        '-# ' + [
          link('deployment', deployment_link),
          author_md,
          timestamp(new Date(), "relative")
        ].join(' - '),
      ].join("\n"))
  }

} catch (error) {
  const error_message = error instanceof Error ? error.message : String(error)
  const error_stack_section = error instanceof Error
    ? (error.stack && error.stack.length > 1500)
      ? `\`\`\`${ error.stack?.slice(0, 1500) + '...' }\`\`\``
      : `\`\`\`${ error.stack }\`\`\``
    : ''
  post_log('Error occurred', `${ error_message }\n${ error_stack_section }`)
  throw error
}

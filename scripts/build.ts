import type { VERCEL_BUILD_ENV } from "@/content/notes/vercel/env_vars"
import { maskedlink, linkOrPlain, post_discord_webhook, timestamp } from "@/content/utils/util-discord-webhook"
import { expect } from "@/content/utils/util.env"

const build_env = process.env as VERCEL_BUILD_ENV & {
  DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL?: string
}

console.log("Build Env |", build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL)

const v_team = "alfonsusacs-projects"
const deployment_link = `https://vercel.com/${ v_team }/${ build_env.VERCEL_PROJECT_NAME }/${ build_env.VERCEL_DEPLOYMENT_ID.replace('dpl_', '') }`

async function post_log(message: string) {
  await post_discord_webhook(
    build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL!,
    [
      // alfon-util - production - main-27776ab - alfonsusac
      '-# ' + maskedlink(build_env.VERCEL_PROJECT_NAME, deployment_link)
      + ' - ' + build_env.VERCEL_ENV
      + ' - ' + maskedlink(`${ build_env.VERCEL_GIT_COMMIT_REF }-${ build_env.VERCEL_GIT_COMMIT_SHA.slice(0, 7) }`, `https://github.com/${ build_env.VERCEL_GIT_REPO_SLUG }/commit/${ build_env.VERCEL_GIT_COMMIT_SHA }`)
      + ' - ' + build_env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
      message,
    ].join("\n")
  )
}

try {
  if (build_env.VERCEL === '1') {
    if (!build_env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL)
      throw new Error("DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL is not set")




    const git_author = expect(build_env.VERCEL_GIT_COMMIT_AUTHOR_NAME)
    const git_username = expect(build_env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN)
    const repo = expect(build_env.VERCEL_GIT_REPO_SLUG)
    const commit_sha = expect(build_env.VERCEL_GIT_COMMIT_SHA)
    const commit_url = `https://github.com/${ git_username }/${ repo }/commit/${ build_env.VERCEL_GIT_COMMIT_SHA }`
    const branch = expect(build_env.VERCEL_GIT_COMMIT_REF)
    const branch_url = `https://github.com/${ git_username }/${ repo }/tree/${ branch }`

    post_log(
      [
        'Vercel Build Triggered',
        '-# ' + [
          maskedlink(branch, branch_url),
          maskedlink(commit_sha.slice(0, 7), commit_url),
          build_env.VERCEL_GIT_COMMIT_MESSAGE,
        ].join(' - '),
        '-# ' + [
          maskedlink(git_username, `https://github.com/${ git_username }`),
        ].join(' - '),
      ].join("\n"))
  }



  throw new Error("Something went wrong!")


} catch (error) {
  const error_message = error instanceof Error ? error.message : String(error)
  const error_stack_section = error instanceof Error
    ? (error.stack && error.stack.length > 1500)
      ? `\`\`\`${ error.stack?.slice(0, 1500) + '...' }\`\`\``
      : `\`\`\`${ error.stack }\`\`\``
    : ''
  await post_log(`🔴  Error occurred: \`${ error_message }\`\n${ error_stack_section }`)
  throw error
}

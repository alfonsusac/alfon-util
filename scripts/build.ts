import type { VERCEL_BUILD_ENV } from "@/content/notes/vercel/env_vars"
import { link, linkOrPlain, post_discord_webhook, timestamp } from "@/content/utils/util-discord-webhook"
import { expect } from "@/content/utils/util.env"

const build_env = process.env as VERCEL_BUILD_ENV & {
  DISCORD_VERCEL_LOG_WEBHOOK_URL?: string
}

function post_log(message: string) {
  if (!build_env.DISCORD_VERCEL_LOG_WEBHOOK_URL)
    throw new Error("DISCORD_VERCEL_LOG_WEBHOOK_URL is not set")
  post_discord_webhook(build_env.DISCORD_VERCEL_LOG_WEBHOOK_URL, message)
}


try {
  if (build_env.VERCEL === '1') {
    if (!build_env.DISCORD_VERCEL_LOG_WEBHOOK_URL)
      throw new Error("DISCORD_VERCEL_LOG_WEBHOOK_URL is not set")

    const v_team = "alfonsusacs-projects"
    const project_link = `https://vercel.com/${ v_team }/${ build_env.VERCEL_PROJECT_NAME }`
    const deployment_link = `https://vercel.com/${ v_team }/${ build_env.VERCEL_PROJECT_NAME }/${ build_env.VERCEL_DEPLOYMENT_ID.replace('dpl_', '') }`

    const git_author = expect(build_env.VERCEL_GIT_COMMIT_AUTHOR_NAME)
    const git_username = expect(build_env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN)
    const author_md = linkOrPlain(git_author, `https://github.com/${ git_username }`)
    const repo = expect(build_env.VERCEL_GIT_REPO_SLUG)
    const commit_sha = expect(build_env.VERCEL_GIT_COMMIT_SHA)
    const commit_url = `https://github.com/${ git_username }/${ repo }/commit/${ build_env.VERCEL_GIT_COMMIT_SHA }`
    const branch = expect(build_env.VERCEL_GIT_COMMIT_REF)
    const branch_url = `https://github.com/${ git_username }/${ repo }/tree/${ branch }`

    post_log(
      [
        [
          link(build_env.VERCEL_PROJECT_NAME, project_link),
          build_env.VERCEL_ENV,
          'Vercel Build Triggered'
        ].join(' - '),
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
  console.error(error)
  post_log(`Error occurred: ${ error }`)
}

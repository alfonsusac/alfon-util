import { build_next_in_vercel_with_discord_log } from "@/content/workflow/discord-logging"



await build_next_in_vercel_with_discord_log({
  webhook_url: process.env.DISCORD_VERCEL_BUILD_LOG_WEBHOOK_URL,
})
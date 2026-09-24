import { formatWithOptions } from "util"

// Build Time Env Vars

export type VERCEL_BUILD_ENV = {
  // From https://vercel.com/docs/environment-variables/system-environment-variables

  /** An indicator to show that system environment variables have been exposed to your project's Deployments. */
  /** VERCEL: '1' */
  VERCEL: '1'

  /** An indicator that the code is running in a Continuous Integration environment. */
  /** CI: '1' */
  CI: '1'

  /** The environment that the app is deployed and running on. The value can be either production, preview, or development. 
   * 
   * Note: 'development' are possible through `vercel dev`: emulating the Vercel runtime locally.
  */
  /** VERCEL_ENV: 'production' */
  VERCEL_ENV: 'production' | 'preview' | 'development'

  /** The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment. 
   * 
   * Note: Applicable for custom env. Non custom environments will have the same value as VERCEL_ENV.
  */
  /** VERCEL_TARGET_ENV: 'production' */
  VERCEL_TARGET_ENV: 'production' | 'preview' | 'development' | (string & {})

  /** The domain name of the generated deployment URL. Example: *.vercel.app. The value does not include the protocol scheme https://. */
  /** VERCEL_URL: 'alfon-util-dghfom6ds-alfonsusacs-projects.vercel.app' */
  VERCEL_URL: `${ string }.vercel.app`

  /** The domain name of the generated Git branch URL. Example: *-git-*.vercel.app. The value does not include the protocol scheme https://. */
  /** VERCEL_BRANCH_URL: 'alfon-util-git-main-alfonsusacs-projects.vercel.app' */
  VERCEL_BRANCH_URL: `${ string }-git-${ string }.vercel.app`

  /** A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://. */
  /** VERCEL_PROJECT_PRODUCTION_URL: 'utils.alfon.dev' */
  VERCEL_PROJECT_PRODUCTION_URL: string

  /** The unique identifier for the deployment, which can be used to implement Skew Protection. */
  /** VERCEL_DEPLOYMENT_ID: 'dpl_SRUfZJXkpdRDaCSRqy8pq9pn1d64' */
  VERCEL_DEPLOYMENT_ID: `dpl_${ string }`

  /** The unique identifier for the project. */
  /** VERCEL_PROJECT_ID: 'prj_apL1yv93kVX3wwPXp4kXNZt3BfbN' */
  VERCEL_PROJECT_ID: `prj_${ string }`

  /** When Skew Protection is enabled in Project Settings, this value is set to 1. */
  VERCEL_SKEW_PROTECTION_ENABLED?: '1'

  /** The Protection Bypass for Automation value, if the secret has been generated in the project's Deployment Protection settings. */
  VERCEL_AUTOMATION_BYPASS_SECRET?: string

  /** When Secure Backend Access with OpenID Connect (OIDC) Federation is enabled in Project Settings, this value is set to a Vercel-issued OIDC token. At runtime, the token is set to thex-vercel-oidc-token header on your functions' Request object. In local development, you can download the token using the CLI commandvercel env pull. */
  /** VERCEL_OIDC_TOKEN: '[REDACTED]' */
  VERCEL_OIDC_TOKEN: string

  /** A salt to rotate the filenames of framework-generated content-addressed output. See also Immutable Static Files. */
  /** VERCEL_HASH_SALT: 'initial' */
  VERCEL_HASH_SALT: 'initial' & (string & {})

  /** The Git Provider the deployment is triggered from. */
  /** VERCEL_GIT_PROVIDER: 'github' */
  VERCEL_GIT_PROVIDER: 'github' & (string & {})

  /** The origin repository the deployment is triggered from. */
  /** VERCEL_GIT_REPO_SLUG: 'alfon-util' */
  VERCEL_GIT_REPO_SLUG: string

  /** The account that owns the repository the deployment is triggered from. */
  /** VERCEL_GIT_REPO_OWNER: 'alfonsusac' */
  VERCEL_GIT_REPO_OWNER: string

  /** The ID of the repository the deployment is triggered from. */
  /** VERCEL_GIT_REPO_ID: '1373497558' */
  VERCEL_GIT_REPO_ID: string

  /** The git branch of the commit the deployment was triggered by. */
  /** VERCEL_GIT_COMMIT_REF: 'main' */
  VERCEL_GIT_COMMIT_REF: string

  /** VERCEL_GIT_COMMIT_SHA: 'c33c4769d4ff02ace276cca3acc6eba8c33ae0b7' */
  VERCEL_GIT_COMMIT_SHA: string

  /** The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes. */
  /** VERCEL_GIT_COMMIT_MESSAGE: 'build test 2' */
  VERCEL_GIT_COMMIT_MESSAGE: string

  /** The username attached to the author of the commit that the project was deployed by. */
  /** VERCEL_GIT_COMMIT_AUTHOR_LOGIN: 'alfonsusac' */
  VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string

  /** The name attached to the author of the commit that the project was deployed by. */
  /** VERCEL_GIT_COMMIT_AUTHOR_NAME: 'Alfonsus Ardani' */
  VERCEL_GIT_COMMIT_AUTHOR_NAME: string

  /** The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.
   *
   * This variable is only exposed when an Ignored Build Step is provided. */
  /** VERCEL_GIT_PREVIOUS_SHA: '' */
  VERCEL_GIT_PREVIOUS_SHA: string

  /** The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string. */
  /** VERCEL_GIT_PULL_REQUEST_ID: '' */
  VERCEL_GIT_PULL_REQUEST_ID: string



  // From https://vercel.com/docs/environment-variables/framework-environment-variables

  /** The environment that the app is deployed and running on. The value can be either production, preview, or development. */
  /** NEXT_PUBLIC_VERCEL_ENV: 'production' */
  NEXT_PUBLIC_VERCEL_ENV: 'production' | 'preview' | 'development'

  /** The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment. */
  /** NEXT_PUBLIC_VERCEL_TARGET_ENV: 'production' */
  NEXT_PUBLIC_VERCEL_TARGET_ENV: 'production' | 'preview' | 'development' | (string & {})

  /** The domain name of the generated deployment URL. Example: *.vercel.app. The value does not include the protocol scheme https://.
   *
   * This variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection. */
  /** NEXT_PUBLIC_VERCEL_URL: 'alfon-util-dghfom6ds-alfonsusacs-projects.vercel.app' */
  NEXT_PUBLIC_VERCEL_URL: `${ string }.vercel.app`

  /** The domain name of the generated Git branch URL. Example: *-git-*.vercel.app. The value does not include the protocol scheme https://. */
  /** NEXT_PUBLIC_VERCEL_BRANCH_URL: 'alfon-util-git-main-alfonsusacs-projects.vercel.app' */
  NEXT_PUBLIC_VERCEL_BRANCH_URL: `${ string }-git-${ string }.vercel.app`

  /** A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://. */
  /** NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: 'utils.alfon.dev' */
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: string

  /** A salt to rotate the filenames of framework-generated content-addressed output. See also Immutable Static Files. */
  // NEXT_PUBLIC_VERCEL_HASH_SALT=1783933175

  /** The Git Provider the deployment is triggered from. */
  /** NEXT_PUBLIC_VERCEL_GIT_PROVIDER: 'github' */
  NEXT_PUBLIC_VERCEL_GIT_PROVIDER: string

  /** The origin repository the deployment is triggered from. */
  /** NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: 'alfon-util' */
  NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: string

  /** The account that owns the repository the deployment is triggered from. */
  /** NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: 'alfonsusac' */
  NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: string

  /** The ID of the repository the deployment is triggered from. */
  /** NEXT_PUBLIC_VERCEL_GIT_REPO_ID: '1373497558' */
  NEXT_PUBLIC_VERCEL_GIT_REPO_ID: string

  /** The git branch of the commit the deployment was triggered by. */
  /** NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: 'main' */
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: string

  /** The git SHA of the commit the deployment was triggered by. */
  /** NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: 'c33c4769d4ff02ace27cca3acc6eba8c33ae0b7' */
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string

  /** The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes. */
  /** NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE: 'build test 2' */
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE: string

  /** The username attached to the author of the commit that the project was deployed by. */
  /** NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: 'alfonsusac' */
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string

  /** The name attached to the author of the commit that the project was deployed by. */
  /** NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME: 'Alfonsus Ardani' */
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME: string

  /** The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string. */
  /** NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID: '' */
  NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID: string



  // Other Relevant Envs, (description by opencode-ai)
  /** Standard Node.js var marking the runtime mode: production, development, or test. Next.js/Vercel sets it to production at build/deploy. It's what apps gate on for debug logs, dev URLs, doc disabling, etc. This is the only one with real recurring app value. */
  /** NODE_ENV: 'production' */
  NODE_ENV: string

  /** Your Vercel team/org ID (team_...). Used in vercel CLI config and some CI tooling to target the right team. Static identifier, rarely needed in code. */
  /** VERCEL_ORG_ID: 'team_kmq4KxAHlcitVVNzJXMIXmqI' */
  VERCEL_ORG_ID: `team_${string}`

  /** Project slug as shown in the dashboard (alfon-util). Equivalent to the name in vercel.json. Informational only. */
  /** VERCEL_PROJECT_NAME: 'alfon-util' */
  VERCEL_PROJECT_NAME: string

  /** The build command Vercel runs. Mirrors what you'd set in the dashboard; not consumed by your code. */
  /** VERCEL_PROJECT_SETTINGS_BUILD_COMMAND: 'bun run build' */
  VERCEL_PROJECT_SETTINGS_BUILD_COMMAND: string

  /** The install command Vercel runs. Reference only. */
  /** VERCEL_PROJECT_SETTINGS_INSTALL_COMMAND: 'bun install' */
  VERCEL_PROJECT_SETTINGS_INSTALL_COMMAND: string

  /** The Node runtime Vercel uses for the build/functions. Reference only. */
  /** VERCEL_PROJECT_SETTINGS_NODE_VERSION: '24.x' */
  VERCEL_PROJECT_SETTINGS_NODE_VERSION: string



  /** AWS_EXECUTION_ENV: 'vercel-hive' */
  AWS_EXECUTION_ENV: string
  /** BUN_INSTALL_GLOBAL_STORE: '0' */
  BUN_INSTALL_GLOBAL_STORE: string
  /** CARGO_HOME: '/rust' */
  CARGO_HOME: string
  /** DD_TAGS: 'ec2_host:i-00d1d70569eec6f4e' */
  DD_TAGS: string
  /** DD_TRACE_STARTUP_LOGS: 'false' */
  DD_TRACE_STARTUP_LOGS: string
  /** FAKEROOTKEY: 'yes' */
  FAKEROOTKEY: string
  /** NEXT_ADAPTER_PATH: '/var/task/node_modules/@vercel/next/dist/adapter/index.js' */
  NEXT_ADAPTER_PATH: string
  /** NEXT_ADAPTER_VERCEL_CONFIG: '{"zeroConfig":true,"framework":"nextjs","installCommand":"bun install","buildCommand":"bun run build","projectSettings":{"createdAt":1789812247340,"installCommand":"bun install","buildCommand":"bun run build","devCommand":null,"outputDirectory":null,"rootDirectory":null,"framework":"nextjs","nodeVersion":"24.x"},"nodeVersion":"24.x"}' */
  NEXT_ADAPTER_VERCEL_CONFIG: string
  /** NEXT_EDGE_RUNTIME_PROVIDER: 'vercel' */
  NEXT_EDGE_RUNTIME_PROVIDER: string
  /** NEXT_ENABLE_ADAPTER: '1' */
  NEXT_ENABLE_ADAPTER: string
  /** NEXT_EXPERIMENTAL_LARGE_FUNCTIONS: '1' */
  NEXT_EXPERIMENTAL_LARGE_FUNCTIONS: string
  /** NEXT_PRIVATE_MULTI_PAYLOAD: '1' */
  NEXT_PRIVATE_MULTI_PAYLOAD: string
  /** NEXT_PRIVATE_OUTPUT_TRACE_ROOT: '/vercel/path0' */
  NEXT_PRIVATE_OUTPUT_TRACE_ROOT: string
  /** NEXT_PRIVATE_TARGET: 'server' */
  NEXT_PRIVATE_TARGET: string
  /** NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID: 'dpl_SRUfZJXkpdRDaCSRqy8pq9pn1d64' */
  NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID: string
  /** NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA: '' */
  NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA: string
  /** NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG: '{"analytics":{"scriptSrc":"8ce69d4253220577/script.js","viewEndpoint":"8ce69d4253220577/view","eventEndpoint":"8ce69d4253220577/event","sessionEndpoint":"8ce69d4253220577/session"},"speedInsights":{"scriptSrc":"0513c9dcda6023ea/script.js","endpoint":"0513c9dcda6023ea/vitals"}}' */
  NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG: string
  /** NEXT_PUBLIC_VERCEL_PROJECT_ID: 'prj_apL1yv93kVX3wwPXp4kXNZt3BfbN' */
  NEXT_PUBLIC_VERCEL_PROJECT_ID: string
  /** NEXT_SHARP_PATH: '/usr/local/share/.config/yarn/global/node_modules/sharp' */
  NEXT_SHARP_PATH: string
  /** NODE_OPTIONS: '--max_old_space_size=8192' */
  NODE_OPTIONS: string
  /** NOW_BUILDER: '1' */
  NOW_BUILDER: string
  /** NX_DAEMON: 'false' */
  NX_DAEMON: string
  /** NX_SKIP_NX_CACHE: 'true' */
  NX_SKIP_NX_CACHE: string
  /** PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG: '{"analytics":{"scriptSrc":"8ce69d4253220577/script.js","viewEndpoint":"8ce69d4253220577/view","eventEndpoint":"8ce69d4253220577/event","sessionEndpoint":"8ce69d4253220577/session"},"speedInsights":{"scriptSrc":"0513c9dcda6023ea/script.js","endpoint":"0513c9dcda6023ea/vitals"}}' */
  PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG: string
  /** REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG: '{"analytics":{"scriptSrc":"8ce69d4253220577/script.js","viewEndpoint":"8ce69d4253220577/view","eventEndpoint":"8ce69d4253220577/event","sessionEndpoint":"8ce69d4253220577/session"},"speedInsights":{"scriptSrc":"0513c9dcda6023ea/script.js","endpoint":"0513c9dcda6023ea/vitals"}}' */
  REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG: string
  /** RUNTIME_CACHE_ENDPOINT: 'https://suspense-cache.vercel.com/v1/suspense-cache/' */
  RUNTIME_CACHE_ENDPOINT: string
  /** RUNTIME_CACHE_HEADERS: '{"Authorization":"Bearer aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccccccccccccccccccccccccccc","x-vercel-internal-sc-client-origin":"RUNTIME_CACHE","x-vercel-internal-sc-client-name":"BUILD"}' */
  RUNTIME_CACHE_HEADERS: string
  /** RUSTUP_HOME: '/rust' */
  RUSTUP_HOME: string
  /** TRACEPARENT: '00-000000000000000053ae72099af201b8-54f82dfc05f24be1-00' */
  TRACEPARENT: string
  /** TRACESTATE: 'dd=s:0' */
  TRACESTATE: string
  /** TURBO_CACHE: 'remote:rw' */
  TURBO_CACHE: string
  /** TURBO_CI_VENDOR_ENV_KEY: 'NEXT_PUBLIC_VERCEL_' */
  TURBO_CI_VENDOR_ENV_KEY: string
  /** TURBO_DOWNLOAD_LOCAL_ENABLED: 'true' */
  TURBO_DOWNLOAD_LOCAL_ENABLED: string
  /** TURBO_FORCE: 'true' */
  TURBO_FORCE: string
  /** TURBO_PLATFORM_ENV: '' */
  TURBO_PLATFORM_ENV: string
  /** TURBO_REMOTE_ONLY: 'true' */
  TURBO_REMOTE_ONLY: string
  /** TURBO_RUN_SUMMARY: 'true' */
  TURBO_RUN_SUMMARY: string
  /** USE_RUST_LAYER_LATEST: '1' */
  USE_RUST_LAYER_LATEST: string
  /** UV_PYTHON_BIN_DIR: '/uv/python/bin' */
  UV_PYTHON_BIN_DIR: string
  /** UV_PYTHON_DOWNLOADS: 'automatic' */
  UV_PYTHON_DOWNLOADS: string
  /** UV_PYTHON_DOWNLOADS_JSON_URL: '/uv/python_metadata.json' */
  UV_PYTHON_DOWNLOADS_JSON_URL: string
  /** UV_PYTHON_INSTALL_DIR: '/uv/python/versions' */
  UV_PYTHON_INSTALL_DIR: string
  /** UV_PYTHON_PREFERENCE: 'managed' */
  UV_PYTHON_PREFERENCE: string
  /** UV_THREADPOOL_SIZE: '4' */
  UV_THREADPOOL_SIZE: string
  /** VERCEL_API_BUILD_CONTAINERS_ENDPOINT: 'https://api-iad1.vercel.com/build-containers' */
  VERCEL_API_BUILD_CONTAINERS_ENDPOINT: string
  /** VERCEL_API_ENDPOINT: 'https://api-sfo1.vercel.com' */
  VERCEL_API_ENDPOINT: string
  /** VERCEL_ARTIFACTS_OWNER: 'team_kmq4KxAHlcitVVNzJXMIXmqI' */
  VERCEL_ARTIFACTS_OWNER: string
  /** VERCEL_ARTIFACTS_TOKEN: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccccccccccccccccccccccccccc' */
  VERCEL_ARTIFACTS_TOKEN: string
  /** VERCEL_BUILDERS_DIR: '/opt/vercel/builders' */
  VERCEL_BUILDERS_DIR: string
  /** VERCEL_BUILD_IMAGE: 'al2023' */
  VERCEL_BUILD_IMAGE: string
  /** VERCEL_BUILD_MONOREPO_SUPPORT: '1' */
  VERCEL_BUILD_MONOREPO_SUPPORT: string
  /** VERCEL_BUILD_ORDER_LISTENER_PORT: '8090' */
  VERCEL_BUILD_ORDER_LISTENER_PORT: string
  /** VERCEL_BUILD_OUTPUTS_GO_MAX_IN_FLIGHT: '256' */
  VERCEL_BUILD_OUTPUTS_GO_MAX_IN_FLIGHT: string
  /** VERCEL_BUILD_OUTPUTS_GO_MAX_SOCKETS: '128' */
  VERCEL_BUILD_OUTPUTS_GO_MAX_SOCKETS: string
  /** VERCEL_BUILD_OUTPUTS_GO_WORKER_PROCESS: '1' */
  VERCEL_BUILD_OUTPUTS_GO_WORKER_PROCESS: string
  /** VERCEL_BUILD_OUTPUTS_PATHS_METADATA_UPLOAD_SEMA: '5' */
  VERCEL_BUILD_OUTPUTS_PATHS_METADATA_UPLOAD_SEMA: string
  /** VERCEL_BUILD_OUTPUTS_POST_LAMBDA_SEMA: '120' */
  VERCEL_BUILD_OUTPUTS_POST_LAMBDA_SEMA: string
  /** VERCEL_BUILD_OUTPUTS_S3_HEAD_SEMA: '50' */
  VERCEL_BUILD_OUTPUTS_S3_HEAD_SEMA: string
  /** VERCEL_BUILD_OUTPUTS_S3_OUTPUT_RECORDS_SEMA: '50' */
  VERCEL_BUILD_OUTPUTS_S3_OUTPUT_RECORDS_SEMA: string
  /** VERCEL_BUILD_OUTPUTS_S3_SEMA: '50' */
  VERCEL_BUILD_OUTPUTS_S3_SEMA: string
  /** VERCEL_BUILD_PROVIDER: 'hive-env' */
  VERCEL_BUILD_PROVIDER: string
  /** VERCEL_CLI_ROLLOUT_VERSION: 'stable' */
  VERCEL_CLI_ROLLOUT_VERSION: string
  /** VERCEL_CLUSTER: 'hvi_iad1_pip' */
  VERCEL_CLUSTER: string
  /** VERCEL_COMPACT_POST_LAMBDA: '1' */
  VERCEL_COMPACT_POST_LAMBDA: string
  /** VERCEL_COMPRESSED_ISR_BILLING: '1' */
  VERCEL_COMPRESSED_ISR_BILLING: string
  /** VERCEL_COMPRESS_SERVERLESS_RESPONSE: '1' */
  VERCEL_COMPRESS_SERVERLESS_RESPONSE: string
  /** VERCEL_CONSOLIDATE_CREATE_METADATA: '1' */
  VERCEL_CONSOLIDATE_CREATE_METADATA: string
  /** VERCEL_CONTAINER_START_TIME: '1790241089469' */
  VERCEL_CONTAINER_START_TIME: string
  /** VERCEL_DEPLOYMENT_KEY: '[REDACTED]' */
  VERCEL_DEPLOYMENT_KEY: string
  /** VERCEL_DEPLOYMENT_USE_REDIS_PUB_SUB_FOR_ALIAS_EVENT: '1' */
  VERCEL_DEPLOYMENT_USE_REDIS_PUB_SUB_FOR_ALIAS_EVENT: string
  /** VERCEL_DETECT_CRYPTO_MINER_IN_BUILD_LOG: '1' */
  VERCEL_DETECT_CRYPTO_MINER_IN_BUILD_LOG: string
  /** VERCEL_DISCOVER_FOLDER_SIZES: '1' */
  VERCEL_DISCOVER_FOLDER_SIZES: string
  /** VERCEL_EDGE_FNS_ON_SERVERLESS: '1' */
  VERCEL_EDGE_FNS_ON_SERVERLESS: string
  /** VERCEL_EDGE_FNS_ON_SERVERLESS_USE_FILESYSTEM_CONTENT: '1' */
  VERCEL_EDGE_FNS_ON_SERVERLESS_USE_FILESYSTEM_CONTENT: string
  /** VERCEL_EDGE_FNS_ON_WORKERD: '1' */
  VERCEL_EDGE_FNS_ON_WORKERD: string
  /** VERCEL_EDGE_FNS_ON_WORKERD_UNBUNDLED_FORMAT: '1' */
  VERCEL_EDGE_FNS_ON_WORKERD_UNBUNDLED_FORMAT: string
  /** VERCEL_EDGE_FUNCTIONS_BATCH_SIZE: '15' */
  VERCEL_EDGE_FUNCTIONS_BATCH_SIZE: string
  /** VERCEL_EDGE_FUNCTIONS_ENABLE_CREATE_FUNC_DEDUPE: '1' */
  VERCEL_EDGE_FUNCTIONS_ENABLE_CREATE_FUNC_DEDUPE: string
  /** VERCEL_EDGE_FUNCTIONS_MEMORY_SIZE: '1024' */
  VERCEL_EDGE_FUNCTIONS_MEMORY_SIZE: string
  /** VERCEL_EDGE_FUNCTIONS_USE_FILESYSTEM_CONTENT: '1' */
  VERCEL_EDGE_FUNCTIONS_USE_FILESYSTEM_CONTENT: string
  /** VERCEL_EDGE_FUNCTIONS_WITH_NODEJS_24: '1' */
  VERCEL_EDGE_FUNCTIONS_WITH_NODEJS_24: string
  /** VERCEL_EDGE_MIDDLEWARE_MEMORY_SIZE: '1024' */
  VERCEL_EDGE_MIDDLEWARE_MEMORY_SIZE: string
  /** VERCEL_EDGE_MIDDLEWARE_WITH_NODEJS_24: '1' */
  VERCEL_EDGE_MIDDLEWARE_WITH_NODEJS_24: string
  /** VERCEL_EDGE_ON_SERVERLESS_NODE: '1' */
  VERCEL_EDGE_ON_SERVERLESS_NODE: string
  /** VERCEL_ENABLE_BASIC_BUILD_MACHINES_ROUTING: '1' */
  VERCEL_ENABLE_BASIC_BUILD_MACHINES_ROUTING: string
  /** VERCEL_ENABLE_BLOCKED_PACKAGE_ENFORCEMENT: '1' */
  VERCEL_ENABLE_BLOCKED_PACKAGE_ENFORCEMENT: string
  /** VERCEL_ENABLE_BUILD_CONTAINER_SOURCE_PREFETCH: '1' */
  VERCEL_ENABLE_BUILD_CONTAINER_SOURCE_PREFETCH: string
  /** VERCEL_ENABLE_BUN_1_4_LAYER_INJECTION: '1' */
  VERCEL_ENABLE_BUN_1_4_LAYER_INJECTION: string
  /** VERCEL_ENABLE_DIRECT_BUILD_EXECUTION: '1' */
  VERCEL_ENABLE_DIRECT_BUILD_EXECUTION: string
  /** VERCEL_ENABLE_EXTENDED_FALLBACK_PAYLOAD: '1' */
  VERCEL_ENABLE_EXTENDED_FALLBACK_PAYLOAD: string
  /** VERCEL_ENABLE_FUNCTION_ENV_DOCUMENT_WRITE: '1' */
  VERCEL_ENABLE_FUNCTION_ENV_DOCUMENT_WRITE: string
  /** VERCEL_ENABLE_INTERNAL_MIDDLEWARE_CACHE: '1' */
  VERCEL_ENABLE_INTERNAL_MIDDLEWARE_CACHE: string
  /** VERCEL_ENABLE_INTERNAL_MIDDLEWARE_PREFETCH: '1' */
  VERCEL_ENABLE_INTERNAL_MIDDLEWARE_PREFETCH: string
  /** VERCEL_ENABLE_MALWARE_MANIFEST: '1' */
  VERCEL_ENABLE_MALWARE_MANIFEST: string
  /** VERCEL_ENABLE_PARALLEL_CACHE_DOWNLOAD: '1' */
  VERCEL_ENABLE_PARALLEL_CACHE_DOWNLOAD: string
  /** VERCEL_ENABLE_PATH_LOOKUP_BLOOM_FILTER: '1' */
  VERCEL_ENABLE_PATH_LOOKUP_BLOOM_FILTER: string
  /** VERCEL_ENABLE_REGIONALIZED_ISR: '1' */
  VERCEL_ENABLE_REGIONALIZED_ISR: string
  /** VERCEL_ENABLE_STAGED_BUILD_CONTAINER_ROLLOUT: '1' */
  VERCEL_ENABLE_STAGED_BUILD_CONTAINER_ROLLOUT: string
  /** VERCEL_ENABLE_UNCOMPRESSED_LAMBDA_SIZE_CHECK: '1' */
  VERCEL_ENABLE_UNCOMPRESSED_LAMBDA_SIZE_CHECK: string
  /** VERCEL_ENABLE_VERCEL_TOML: '1' */
  VERCEL_ENABLE_VERCEL_TOML: string
  /** VERCEL_ENABLE_VHS_FUNCTION_IMAGES: '1' */
  VERCEL_ENABLE_VHS_FUNCTION_IMAGES: string
  /** VERCEL_ENABLE_WORKFLOW_CONSUMER_CHECK: '1' */
  VERCEL_ENABLE_WORKFLOW_CONSUMER_CHECK: string
  /** VERCEL_ENCRYPTED_ENV_CONTENT: 'pqlapqlapqpapqlapqplpqlapqlaplqpalqplapqlplqpalplapqlapqpalqplapqlalqpalplaplqplqmaplmzaqlmzqmzpaqmpqpplzlmzplqmazpqmapmqplmzamzpmzplmzplqmzplqmazplqzplmpqpmapmzpmzlmplmzmqlzmqlazlpqmpmnxownoxwnwoxjsnojnxokxowjsnxowsniwjnxiwjnxiwnxiwjnxijwnxijwnxijwnsinswijxniwjsnxiwnxijsxnwnjswnjnjxjwxjwsixnwisxnswijxnosxnisjxnwjxnwjnjnxjsnjnxswjssijnxiwjsxwijxnisxijsniwjsniwjnxwijxijxwijswxijnsxijwnsxijwnxsijwnxiwjnxiwjxiwxiwjnsiwjsxiwjnxiwjsiwjsnxwjnijwnxiwsxjwnxjiwnxijwsinjsxnijsnwjxnwjsniwjxniwjsxiwnxiwjsxijwnxiwsnxjwnsxijwnxiwjnxsiwjxiwsxijwnsxijnsxijnwsxijnwsxijnwsxjnwsxjnwsijnwijnwjnwsxijnwsxijnwxijnwsxjnwsxijnwsxijnwsxijnwxijwnsxijwxijwsxjnsxijwsxijnwsxijnwsxijnwsxijnwsxijnwsxijnwsxijnwsxinwsxijnwsxinwsxijnwsxijnwxijwsxijnwsxijnwsxijsxinjwsxijwsxijnxwijsxijnsxijnnnx' */
  VERCEL_ENCRYPTED_ENV_CONTENT: string
  /** VERCEL_ENCRYPTED_ENV_FILENAME: '___vc/__env.encrypted' */
  VERCEL_ENCRYPTED_ENV_FILENAME: string
  /** VERCEL_ENV_ENC_KEY: '[REDACTED]' */
  VERCEL_ENV_ENC_KEY: string
  /** VERCEL_EVAL_LAMBDA_GROUPING_RATIO: '0' */
  VERCEL_EVAL_LAMBDA_GROUPING_RATIO: string
  /** VERCEL_EXPERIMENTAL_BUILD_CONCURRENCY: '1' */
  VERCEL_EXPERIMENTAL_BUILD_CONCURRENCY: string
  /** VERCEL_FASTAPI_STATIC_CDN: '1' */
  VERCEL_FASTAPI_STATIC_CDN: string
  /** VERCEL_FORCE_FUNCTION_VHS_BUILDS: '1' */
  VERCEL_FORCE_FUNCTION_VHS_BUILDS: string
  /** VERCEL_FUNCTION_REGIONS: 'iad1' */
  VERCEL_FUNCTION_REGIONS: string
  /** VERCEL_FUNCTION_VSM_ENV_S3_ONLY: '1' */
  VERCEL_FUNCTION_VSM_ENV_S3_ONLY: string
  /** VERCEL_FUNCTION_VSM_S3_WRITE: '1' */
  VERCEL_FUNCTION_VSM_S3_WRITE: string
  /** VERCEL_HIVE_BANDWIDTH: '150000000' */
  VERCEL_HIVE_BANDWIDTH: string
  /** VERCEL_HIVE_CELL_ID: 'hvc_iad1_89a2a2b0_67e72ffeaded4b57afcf25c808f19e76' */
  VERCEL_HIVE_CELL_ID: string
  /** VERCEL_HIVE_ID: 'hvi_iad1_pip' */
  VERCEL_HIVE_ID: string
  /** VERCEL_HIVE_INSTANCE_TYPE: 'm5d.metal' */
  VERCEL_HIVE_INSTANCE_TYPE: string
  /** VERCEL_HIVE_IOPS: '10000' */
  VERCEL_HIVE_IOPS: string
  /** VERCEL_HIVE_REALM: 'prod' */
  VERCEL_HIVE_REALM: string
  /** VERCEL_HIVE_VERSION: '2026.09.23-652624403a0592e40a272bb7b75de157f3626c20' */
  VERCEL_HIVE_VERSION: string
  /** VERCEL_IMAGE_ID: 'sha256:f97816fef4e10ce515934f894e106754987972cdcd0e43004b23df70ea85b821' */
  VERCEL_IMAGE_ID: string
  /** VERCEL_IMMUTABLE_STATIC_FILES_ENABLED: '1' */
  VERCEL_IMMUTABLE_STATIC_FILES_ENABLED: string
  /** VERCEL_INCLUDE_GROUP_IN_MANIFEST: '1' */
  VERCEL_INCLUDE_GROUP_IN_MANIFEST: string
  /** VERCEL_INVALIDATE_BUILD_CACHE_ON_SIZE_EXCEEDED: '1' */
  VERCEL_INVALIDATE_BUILD_CACHE_ON_SIZE_EXCEEDED: string
  /** VERCEL_LAMBDA_OUTPUTS_AS_MIDDLEWARE: '1' */
  VERCEL_LAMBDA_OUTPUTS_AS_MIDDLEWARE: string
  /** VERCEL_LOCAL_NPM_PROXY: '1' */
  VERCEL_LOCAL_NPM_PROXY: string
  /** VERCEL_LOCKFILE_SCANNER: '1' */
  VERCEL_LOCKFILE_SCANNER: string
  /** VERCEL_MIDDLEWARE_DEFAULT_RUNTIME_NODEJS: '1' */
  VERCEL_MIDDLEWARE_DEFAULT_RUNTIME_NODEJS: string
  /** VERCEL_NEXT_BUNDLED_SERVER: '1' */
  VERCEL_NEXT_BUNDLED_SERVER: string
  /** VERCEL_NODE_BRIDGE_COMPRESS_MULTI_PAYLOADS: '1' */
  VERCEL_NODE_BRIDGE_COMPRESS_MULTI_PAYLOADS: string
  /** VERCEL_NODE_MODULES_SCANNER: '1' */
  VERCEL_NODE_MODULES_SCANNER: string
  /** VERCEL_OBSERVABILITY_CLIENT_CONFIG: '{"analytics":{"scriptSrc":"8ce69d4253220577/script.js","viewEndpoint":"8ce69d4253220577/view","eventEndpoint":"8ce69d4253220577/event","sessionEndpoint":"8ce69d4253220577/session"},"speedInsights":{"scriptSrc":"0513c9dcda6023ea/script.js","endpoint":"0513c9dcda6023ea/vitals"}}' */
  VERCEL_OBSERVABILITY_CLIENT_CONFIG: string
  /** VERCEL_PREFER_NEXTJS_PREVIEW_COMMENTS_INJECTION: '1' */
  VERCEL_PREFER_NEXTJS_PREVIEW_COMMENTS_INJECTION: string
  /** VERCEL_PREVIEW_COMMENTS_ENABLED: '1' */
  VERCEL_PREVIEW_COMMENTS_ENABLED: string
  /** VERCEL_PREWARM_CLI: '1' */
  VERCEL_PREWARM_CLI: string
  /** VERCEL_PYTHON_COMPILEALL: '1' */
  VERCEL_PYTHON_COMPILEALL: string
  /** VERCEL_RESOLVE_ROOT_DIRECTORY: '1' */
  VERCEL_RESOLVE_ROOT_DIRECTORY: string
  /** VERCEL_RICHER_DEPLOYMENT_OUTPUTS: '1' */
  VERCEL_RICHER_DEPLOYMENT_OUTPUTS: string
  /** VERCEL_SERVERLESS_FUNCTION_FAILOVER: '1' */
  VERCEL_SERVERLESS_FUNCTION_FAILOVER: string
  /** VERCEL_SERVERLESS_SUSPENSE_CACHE: '1' */
  VERCEL_SERVERLESS_SUSPENSE_CACHE: string
  /** VERCEL_SET_REQUESTED_AT_PRODUCTION_ON_DEPLOYMENT: '1' */
  VERCEL_SET_REQUESTED_AT_PRODUCTION_ON_DEPLOYMENT: string
  /** VERCEL_SKIP_DEPLOYMENT_BUILDS_READ_FOR_CLI_BUILDS: '1' */
  VERCEL_SKIP_DEPLOYMENT_BUILDS_READ_FOR_CLI_BUILDS: string
  /** VERCEL_SKIP_EDGE_FUNCTION_ENDPOINT: '1' */
  VERCEL_SKIP_EDGE_FUNCTION_ENDPOINT: string
  /** VERCEL_SKIP_EMPTY_FUNCTION_PATH_UPLOADS: '1' */
  VERCEL_SKIP_EMPTY_FUNCTION_PATH_UPLOADS: string
  /** VERCEL_SKIP_METADATA_PATH: '1' */
  VERCEL_SKIP_METADATA_PATH: string
  /** VERCEL_SKIP_PER_PATH_METADATA: '1' */
  VERCEL_SKIP_PER_PATH_METADATA: string
  /** VERCEL_TELEMETRY_DISABLED: '1' */
  VERCEL_TELEMETRY_DISABLED: string
  /** VERCEL_TOML_CONFIG_ENABLED: '1' */
  VERCEL_TOML_CONFIG_ENABLED: string
  /** VERCEL_UNIVERSAL_ENCRYPTED_ENV_FILE_SUPPORT: '1' */
  VERCEL_UNIVERSAL_ENCRYPTED_ENV_FILE_SUPPORT: string
  /** VERCEL_USE_API_CONNECTORS: '1' */
  VERCEL_USE_API_CONNECTORS: string
  /** VERCEL_USE_BYTECODE_CACHING: '1' */
  VERCEL_USE_BYTECODE_CACHING: string
  /** VERCEL_USE_DEFAULT_PNPM_10: '1' */
  VERCEL_USE_DEFAULT_PNPM_10: string
  /** VERCEL_USE_NEW_LAMBDA_OUTPUT_HANDLER: '1' */
  VERCEL_USE_NEW_LAMBDA_OUTPUT_HANDLER: string
  /** VERCEL_USE_ONLY_STREAMING_LAMBDA: '1' */
  VERCEL_USE_ONLY_STREAMING_LAMBDA: string
  /** VERCEL_USE_START_CELL: '1' */
  VERCEL_USE_START_CELL: string
  /** VERCEL_USE_STREAMING_PRERENDER: '1' */
  VERCEL_USE_STREAMING_PRERENDER: string
  /** VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG: '{"analytics":{"scriptSrc":"8ce69d4253220577/script.js","viewEndpoint":"8ce69d4253220577/view","eventEndpoint":"8ce69d4253220577/event","sessionEndpoint":"8ce69d4253220577/session"},"speedInsights":{"scriptSrc":"0513c9dcda6023ea/script.js","endpoint":"0513c9dcda6023ea/vitals"}}' */
  VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG: string
  /** YARN_NODE_LINKER: 'node-modules' */
  YARN_NODE_LINKER: string
  /** __VERCEL_BUILD_RUNNING: '1' */
  __VERCEL_BUILD_RUNNING: string



  // Common in both vercel and local-run. (previously its just vercel-only)

  /** Absolute path to the Node.js executable that ran the build. Tells you exactly which runtime version/path Vercel used (/node24/bin/node) vs your local nvm copy — useful when runtime behavior differs between environments. */
  /** NODE: '/node24/bin/node' */
  NODE: string

  /** Same as above; the runner's path to node. Redundant with NODE for logging; pick one. */
  /** npm_execpath: '/bun1/bun' */
  npm_execpath: string

  /** Package manager + runtime + OS string, e.g. bun/1.3.14 npm/? node/v24.3.0 linux x64. One line that captures toolchain versions and platform — the quickest signal for environment/version drift. */
  /** npm_config_user_agent: 'bun/1.3.14 npm/? node/v24.3.0 linux x64' */
  npm_config_user_agent: string

  /** The name field from package.json (alfon-util). Identifies which app/project produced the log, useful if you aggregate logs across repos. */
  /** npm_package_name: 'alfon-util' */
  npm_package_name: string

  /** The version field from package.json (0.1.0). Lets you correlate log entries to a specific app release. */
  /** npm_package_version: '0.1.0' */
  npm_package_version: string

  /** The npm/pnpm/bun script name being run (build). Tells you what stage the process was in when the log was emitted. */
  /** npm_lifecycle_event: 'build' */
  npm_lifecycle_event: string

  /** The full command of that script (bun scripts/build.ts). More detail than the event name — shows exactly how the script was invoked. */
  /** npm_lifecycle_script: 'bun scripts/build.ts' */
  npm_lifecycle_script: string

  /** What the package manager was told to do (run-script). Basically noise on its own; skip unless you want completeness. */
  /** npm_command: 'run-script' */
  npm_command: string

  /** Working directory / project root at build time. Differs per env (/vercel/path0 vs your local path) — useful for path-dependent bugs and confirming which checkout Vercel used. */
  /** npm_config_local_prefix: '/vercel/path0' */
  npm_config_local_prefix: string
  /** PWD: '/vercel/path0' */
  PWD: string

  /** The user home directory. Differs (Vercel /vercel vs your Mac home); occasionally relevant for config/cache path resolution issues. */
  /** HOME: '/vercel' */
  HOME: string

  /** Time zone. Vercel sets :UTC; your local has none (uses system tz). If you log timestamps, this explains any time/offset mismatch between prod and local logs. */
  /** TZ: ':UTC' */
  TZ: string

  /** Locale (en_US.UTF-8). Only matters if your tooling formats output/locale-sensitively; mostly informational. */
  /** LANG: 'en_US.UTF-8' */
  LANG: string


  /** _: '/bun1/bun' */
  _: string
  /** SHLVL: '0' */
  SHLVL: string
  /** npm_package_json: '/vercel/path0/package.json' */
  npm_package_json: string
  /** PATH: '/vercel/path0/node_modules/.bin:/vercel/path0/node_modules/.bin:/vercel/node_modules/.bin:/node_modules/.bin:/vercel/path0/node_modules/.bin:/pnpm12/node_modules/.bin:/vlt/node_modules/.bin:/pnpm6/node_modules/.bin:/yarn1/node_modules/yarn/bin:/vercel/.config/yarn/global/node_modules/.bin:/ruby33/bin:/uv/python/bin:/rust/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bun1:/node24/bin' */
  PATH: string
  /** npm_node_execpath: '/node24/bin/node' */
  npm_node_execpath: string
  /** NODE_TLS_REJECT_UNAUTHORIZED: undefined */
  NODE_TLS_REJECT_UNAUTHORIZED: string | undefined
  /** BUN_CONFIG_VERBOSE_FETCH: undefined */
  BUN_CONFIG_VERBOSE_FETCH: string | undefined
  /** HTTP_PROXY: undefined */
  HTTP_PROXY: string | undefined
  /** http_proxy: undefined */
  http_proxy: string | undefined
  /** HTTPS_PROXY: undefined */
  HTTPS_PROXY: string | undefined
  /** https_proxy: undefined */
  https_proxy: string | undefined
  /** NO_PROXY: undefined */
  NO_PROXY: string | undefined
  /** no_proxy: undefined */
  no_proxy: string | undefined
}

const vercel_env = {
  npm_command: "run-script",
  VERCEL_RESOLVE_ROOT_DIRECTORY: "1",
  VERCEL_HIVE_VERSION: "2026.09.23-652624403a0592e40a272bb7b75de157f3626c20",
  VERCEL_GIT_PULL_REQUEST_ID: "",
  VERCEL_RICHER_DEPLOYMENT_OUTPUTS: "1",
  VERCEL_UNIVERSAL_ENCRYPTED_ENV_FILE_SUPPORT: "1",
  VERCEL_BUILD_IMAGE: "al2023",
  VERCEL_BUILD_OUTPUTS_S3_OUTPUT_RECORDS_SEMA: "50",
  AWS_EXECUTION_ENV: "vercel-hive",
  VERCEL_BUILD_OUTPUTS_GO_MAX_IN_FLIGHT: "256",
  VERCEL_ENABLE_WORKFLOW_CONSUMER_CHECK: "1",
  VERCEL_GIT_COMMIT_REF: "main",
  VERCEL_CLI_ROLLOUT_VERSION: "stable",
  VERCEL_ENABLE_BLOCKED_PACKAGE_ENFORCEMENT: "1",
  VERCEL_API_BUILD_CONTAINERS_ENDPOINT: "https://api-iad1.vercel.com/build-containers",
  VERCEL_EDGE_FNS_ON_SERVERLESS_USE_FILESYSTEM_CONTENT: "1",
  TURBO_FORCE: "true",
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: "main",
  VERCEL_HIVE_INSTANCE_TYPE: "m5d.metal",
  VERCEL_EDGE_FUNCTIONS_USE_FILESYSTEM_CONTENT: "1",
  NODE: "/node24/bin/node",
  VERCEL_EDGE_FNS_ON_WORKERD: "1",
  NODE_OPTIONS: "--max_old_space_size=8192",
  UV_PYTHON_BIN_DIR: "/uv/python/bin",
  VERCEL_OBSERVABILITY_CLIENT_CONFIG: "{\"analytics\":{\"scriptSrc\":\"8ce69d4253220577/script.js\",\"viewEndpoint\":\"8ce69d4253220577/view\",\"eventEndpoint\":\"8ce69d4253220577/event\",\"sessionEndpoint\":\"8ce69d4253220577/session\"},\"speedInsights\":{\"scriptSrc\":\"0513c9dcda6023ea/script.js\",\"endpoint\":\"0513c9dcda6023ea/vitals\"}}",
  REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG: "{\"analytics\":{\"scriptSrc\":\"8ce69d4253220577/script.js\",\"viewEndpoint\":\"8ce69d4253220577/view\",\"eventEndpoint\":\"8ce69d4253220577/event\",\"sessionEndpoint\":\"8ce69d4253220577/session\"},\"speedInsights\":{\"scriptSrc\":\"0513c9dcda6023ea/script.js\",\"endpoint\":\"0513c9dcda6023ea/vitals\"}}",
  NEXT_EDGE_RUNTIME_PROVIDER: "vercel",
  NEXT_EXPERIMENTAL_LARGE_FUNCTIONS: "1",
  VERCEL_EDGE_MIDDLEWARE_MEMORY_SIZE: "1024",
  VERCEL_SKIP_DEPLOYMENT_BUILDS_READ_FOR_CLI_BUILDS: "1",
  VERCEL_PREWARM_CLI: "1",
  VERCEL_ENABLE_FUNCTION_ENV_DOCUMENT_WRITE: "1",
  USE_RUST_LAYER_LATEST: "1",
  NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID: "",
  VERCEL_BUILD_OUTPUTS_PATHS_METADATA_UPLOAD_SEMA: "5",
  VERCEL_SKIP_EMPTY_FUNCTION_PATH_UPLOADS: "1",
  VERCEL_ENABLE_DIRECT_BUILD_EXECUTION: "1",
  NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA: "",
  VERCEL_ENABLE_PARALLEL_CACHE_DOWNLOAD: "1",
  VERCEL_EDGE_FUNCTIONS_BATCH_SIZE: "15",
  VERCEL_ARTIFACTS_OWNER: "team_kmq4KxAHlcitVVNzJXMIXmqI",
  VERCEL_USE_NEW_LAMBDA_OUTPUT_HANDLER: "1",
  VERCEL_PREFER_NEXTJS_PREVIEW_COMMENTS_INJECTION: "1",
  TRACESTATE: "dd=s:0",
  npm_config_local_prefix: "/vercel/path0",
  NX_SKIP_NX_CACHE: "true",
  VERCEL_ENABLE_INTERNAL_MIDDLEWARE_PREFETCH: "1",
  UV_PYTHON_INSTALL_DIR: "/uv/python/versions",
  VERCEL_HIVE_IOPS: "10000",
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE: "build test 2",
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME: "Alfonsus Ardani",
  VERCEL_EDGE_MIDDLEWARE_WITH_NODEJS_24: "1",
  NEXT_PRIVATE_TARGET: "server",
  NEXT_PUBLIC_VERCEL_GIT_REPO_ID: "1373497558",
  PWD: "/vercel/path0",
  VERCEL_BRANCH_URL: "alfon-util-git-main-alfonsusacs-projects.vercel.app",
  VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG: "{\"analytics\":{\"scriptSrc\":\"8ce69d4253220577/script.js\",\"viewEndpoint\":\"8ce69d4253220577/view\",\"eventEndpoint\":\"8ce69d4253220577/event\",\"sessionEndpoint\":\"8ce69d4253220577/session\"},\"speedInsights\":{\"scriptSrc\":\"0513c9dcda6023ea/script.js\",\"endpoint\":\"0513c9dcda6023ea/vitals\"}}",
  NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: "alfonsusac",
  VERCEL_TARGET_ENV: "production",
  NEXT_PUBLIC_VERCEL_PROJECT_ID: "prj_apL1yv93kVX3wwPXp4kXNZt3BfbN",
  VERCEL_HASH_SALT: "initial",
  NODE_ENV: "production",
  _: "/bun1/bun",
  VERCEL_USE_DEFAULT_PNPM_10: "1",
  VERCEL_TELEMETRY_DISABLED: "1",
  FAKEROOTKEY: "yes",
  PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG: "{\"analytics\":{\"scriptSrc\":\"8ce69d4253220577/script.js\",\"viewEndpoint\":\"8ce69d4253220577/view\",\"eventEndpoint\":\"8ce69d4253220577/event\",\"sessionEndpoint\":\"8ce69d4253220577/session\"},\"speedInsights\":{\"scriptSrc\":\"0513c9dcda6023ea/script.js\",\"endpoint\":\"0513c9dcda6023ea/vitals\"}}",
  VERCEL_USE_STREAMING_PRERENDER: "1",
  VERCEL_ORG_ID: "team_kmq4KxAHlcitVVNzJXMIXmqI",
  VERCEL_BUILD_OUTPUTS_POST_LAMBDA_SEMA: "120",
  NEXT_ADAPTER_VERCEL_CONFIG: "{\"zeroConfig\":true,\"framework\":\"nextjs\",\"installCommand\":\"bun install\",\"buildCommand\":\"bun run build\",\"projectSettings\":{\"createdAt\":1789812247340,\"installCommand\":\"bun install\",\"buildCommand\":\"bun run build\",\"devCommand\":null,\"outputDirectory\":null,\"rootDirectory\":null,\"framework\":\"nextjs\",\"nodeVersion\":\"24.x\"},\"nodeVersion\":\"24.x\"}",
  VERCEL_BUILD_ORDER_LISTENER_PORT: "8090",
  VERCEL_USE_API_CONNECTORS: "1",
  VERCEL_LOCAL_NPM_PROXY: "1",
  HOME: "/vercel",
  VERCEL_GIT_REPO_SLUG: "alfon-util",
  VERCEL_ENV: "production",
  LANG: "en_US.UTF-8",
  VERCEL_GIT_PREVIOUS_SHA: "",
  VERCEL_URL: "alfon-util-dghfom6ds-alfonsusacs-projects.vercel.app",
  CARGO_HOME: "/rust",
  VERCEL_LOCKFILE_SCANNER: "1",
  NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID: "dpl_SRUfZJXkpdRDaCSRqy8pq9pn1d64",
  YARN_NODE_LINKER: "node-modules",
  npm_package_version: "0.1.0",
  VERCEL_SKIP_PER_PATH_METADATA: "1",
  NEXT_PUBLIC_VERCEL_ENV: "production",
  VERCEL_GIT_COMMIT_AUTHOR_LOGIN: "alfonsusac",
  RUNTIME_CACHE_ENDPOINT: "https://suspense-cache.vercel.com/v1/suspense-cache/",
  VERCEL_CONTAINER_START_TIME: "1790241089469",
  VERCEL_USE_BYTECODE_CACHING: "1",
  VERCEL_SERVERLESS_FUNCTION_FAILOVER: "1",
  VERCEL_FUNCTION_VSM_ENV_S3_ONLY: "1",
  VERCEL_BUILD_MONOREPO_SUPPORT: "1",
  VERCEL_USE_START_CELL: "1",
  VERCEL_DISCOVER_FOLDER_SIZES: "1",
  RUNTIME_CACHE_HEADERS: "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3OTAyNDExMDcsImV4cCI6MTc5MDI0NDcwNywiaXNzIjoiYnVpbGQiLCJvd25lcklkIjoidGVhbV9rbXE0S3hBSGxjaXRWVk56SlhNSVhtcUkiLCJwcm9qZWN0SWQiOiJwcmpfYXBMMXl2OTNrVlgzd3dQWHA0a1hOWnQzQmZiTiIsImRlcGxveW1lbnRJZCI6ImRwbF9TUlVmWkpYa3BkUkRhQ1NScXk4cHE5cG4xZDY0IiwiZW52IjoicHJvZHVjdGlvbiIsImRvbWFpbiI6ImFsZm9uLXV0aWwtZGdoZm9tNmRzLWFsZm9uc3VzYWNzLXByb2plY3RzIiwicGxhbiI6ImhvYmJ5IiwibmFtZXNwYWNlU2l6ZSI6MCwidW5saW1pdGVkIjpmYWxzZSwiYmxvY2siOmZhbHNlfQ.8bzJIp8rpn9Yr5pgYTaK0QKM896hJbDJgHP1zS78uYs\",\"x-vercel-internal-sc-client-origin\":\"RUNTIME_CACHE\",\"x-vercel-internal-sc-client-name\":\"BUILD\"}",
  VERCEL_ENABLE_INTERNAL_MIDDLEWARE_CACHE: "1",
  VERCEL_CLUSTER: "hvi_iad1_pip",
  VERCEL_BUILD_OUTPUTS_S3_HEAD_SEMA: "50",
  VERCEL_ENABLE_VHS_FUNCTION_IMAGES: "1",
  VERCEL_PROJECT_ID: "prj_apL1yv93kVX3wwPXp4kXNZt3BfbN",
  VERCEL_ENABLE_PATH_LOOKUP_BLOOM_FILTER: "1",
  VERCEL_EDGE_ON_SERVERLESS_NODE: "1",
  VERCEL_COMPACT_POST_LAMBDA: "1",
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: "alfonsusac",
  VERCEL_NODE_MODULES_SCANNER: "1",
  VERCEL_FASTAPI_STATIC_CDN: "1",
  VERCEL_DEPLOYMENT_USE_REDIS_PUB_SUB_FOR_ALIAS_EVENT: "1",
  VERCEL_ENABLE_EXTENDED_FALLBACK_PAYLOAD: "1",
  NEXT_SHARP_PATH: "/usr/local/share/.config/yarn/global/node_modules/sharp",
  VERCEL_ENCRYPTED_ENV_CONTENT: "6f3KKm/Vh9vcJWBihfKJtvS4ua8ut1asBOwuBMgbf+tPyCP3xxxpQYjFWQfTTC3+COR79U1IM/JvI/fN55J4u1wvqdxJOAnt92v63By2PQWFZidlAiNYAtwZnHHdhCXWVoT8YKx68S4Ss95I7ExsbuIuQj5OPQs8YJvt8axwiqxqP/StrrIF3esfxRBub8jpf5XDVuqDQyyeapfsXQG3edV42+TfEfxuKqLAsX0YPIChp4ndpRBMkenPHiYwqjGndHvGkNUon3j3YLD0kbWM8W/Q6+Jmm6K2C0+IVeGdEQxKiQThiaZR6HgzNPVnNEesHpF7VLIA/YicKR08V5sxIT2LACQc08Q9kpHoNlovoEE+qyiLcSJaOJZigsH+XgD8kkqzNIkwcyygM2DI1ryIqkPoQEGfU2xFhynGzsou3qYUmU8QQnZ8juyLkMpoDeTMdmimZAxD1+KYoSWc8qOjgit/L33LMJrBjBPYbVUgbxIvyodbIMMEmExJXMX2LiRjUjC5gUespXPWIRLml2In1zI7DqNihOhgwPKOPCo6eXL9MrneUiFbQuas0tiUfbY2ga9MMcwjCJQCgl746qykOQjox29Zj31RjTT1fYMYmBCvNtOprx2ei8fYixDs0dnxEvub3Ax2tEA3Lqn6ghatkqSZvDVqlO06d06apNwjVZCMHCwlM3mtHWe5PlTKxqcLEVmrzKJZ1X5bbNh76tJzu9BpjlrqUnziwpl9MMRm9kESKWLoen0lMGNs1L1aid6a",
  VERCEL_GIT_COMMIT_MESSAGE: "build test 2",
  VERCEL_PROJECT_PRODUCTION_URL: "utils.alfon.dev",
  NOW_BUILDER: "1",
  VERCEL_BUILD_OUTPUTS_GO_WORKER_PROCESS: "1",
  TURBO_DOWNLOAD_LOCAL_ENABLED: "true",
  VERCEL_SKIP_METADATA_PATH: "1",
  npm_lifecycle_script: "bun scripts/build.ts",
  VERCEL_SERVERLESS_SUSPENSE_CACHE: "1",
  DD_TRACE_STARTUP_LOGS: "false",
  VERCEL_HIVE_ID: "hvi_iad1_pip",
  VERCEL_DETECT_CRYPTO_MINER_IN_BUILD_LOG: "1",
  VERCEL_BUILD_PROVIDER: "hive-env",
  VERCEL_INCLUDE_GROUP_IN_MANIFEST: "1",
  VERCEL_COMPRESS_SERVERLESS_RESPONSE: "1",
  VERCEL_GIT_REPO_ID: "1373497558",
  NX_DAEMON: "false",
  TRACEPARENT: "00-000000000000000053ae72099af201b8-54f82dfc05f24be1-00",
  VERCEL_EDGE_FUNCTIONS_MEMORY_SIZE: "1024",
  VERCEL_OIDC_TOKEN: "[REDACTED]",
  npm_package_name: "alfon-util",
  VERCEL_ENABLE_STAGED_BUILD_CONTAINER_ROLLOUT: "1",
  RUSTUP_HOME: "/rust",
  NEXT_PUBLIC_VERCEL_BRANCH_URL: "alfon-util-git-main-alfonsusacs-projects.vercel.app",
  VERCEL_ENABLE_VERCEL_TOML: "1",
  TURBO_CACHE: "remote:rw",
  VERCEL_ENABLE_BUN_1_4_LAYER_INJECTION: "1",
  VERCEL_MIDDLEWARE_DEFAULT_RUNTIME_NODEJS: "1",
  VERCEL_ENABLE_REGIONALIZED_ISR: "1",
  VERCEL_GIT_REPO_OWNER: "alfonsusac",
  VERCEL_PROJECT_SETTINGS_INSTALL_COMMAND: "bun install",
  VERCEL_FUNCTION_REGIONS: "iad1",
  VERCEL_FUNCTION_VSM_S3_WRITE: "1",
  npm_lifecycle_event: "build",
  SHLVL: "0",
  UV_PYTHON_PREFERENCE: "managed",
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: "c33c4769d4ff02ace276cca3acc6eba8c33ae0b7",
  VERCEL_EDGE_FNS_ON_SERVERLESS: "1",
  TURBO_CI_VENDOR_ENV_KEY: "NEXT_PUBLIC_VERCEL_",
  VERCEL_PROJECT_SETTINGS_NODE_VERSION: "24.x",
  VERCEL_ARTIFACTS_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidGFzay1ydW5uZXIiLCJ1c2VySWQiOiJVRVBESkV6dmRPUkVkVHR5M2c5OHNrb2EiLCJjYXBhYmlsaXRpZXMiOlsiQVBJX0FSVElGQUNUU19VUExPQUQiLCJBUElfQVJUSUZBQ1RTX0RPV05MT0FEIiwiQVBJX0FSVElGQUNUU19FWElTVFMiLCJBUElfQVJUSUZBQ1RTX1FVRVJZIiwiQVBJX0FSVElGQUNUU19FVkVOVCIsIkFQSV9TUEFDRVNfUlVOX1VQTE9BRCJdLCJkYXRhIjp7InByb2plY3RJZCI6InByal9hcEwxeXY5M2tWWDN3d1BYcDRrWE5adDNCZmJOIiwib3duZXJJZCI6InRlYW1fa21xNEt4QUhsY2l0VlZOekpYTUlYbXFJIn0sImlhdCI6MTc5MDI0MTEwNywiZXhwIjoxNzkwMjUxOTA3fQ.doSks4exR5lYLaMLGeM8nqfuHRekfdzV6mvzalmBSzE",
  VERCEL_EDGE_FUNCTIONS_WITH_NODEJS_24: "1",
  VERCEL_GIT_COMMIT_AUTHOR_NAME: "Alfonsus Ardani",
  VERCEL_CONSOLIDATE_CREATE_METADATA: "1",
  TURBO_REMOTE_ONLY: "true",
  VERCEL_EXPERIMENTAL_BUILD_CONCURRENCY: "1",
  npm_config_user_agent: "bun/1.3.14 npm/? node/v24.3.0 linux x64",
  VERCEL_SET_REQUESTED_AT_PRODUCTION_ON_DEPLOYMENT: "1",
  NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG: "{\"analytics\":{\"scriptSrc\":\"8ce69d4253220577/script.js\",\"viewEndpoint\":\"8ce69d4253220577/view\",\"eventEndpoint\":\"8ce69d4253220577/event\",\"sessionEndpoint\":\"8ce69d4253220577/session\"},\"speedInsights\":{\"scriptSrc\":\"0513c9dcda6023ea/script.js\",\"endpoint\":\"0513c9dcda6023ea/vitals\"}}",
  VERCEL: "1",
  VERCEL_PROJECT_SETTINGS_BUILD_COMMAND: "bun run build",
  VERCEL_BUILD_OUTPUTS_GO_MAX_SOCKETS: "128",
  npm_execpath: "/bun1/bun",
  VERCEL_PROJECT_NAME: "alfon-util",
  VERCEL_DEPLOYMENT_KEY: "[REDACTED]",
  NEXT_PUBLIC_VERCEL_URL: "alfon-util-dghfom6ds-alfonsusacs-projects.vercel.app",
  NEXT_PRIVATE_OUTPUT_TRACE_ROOT: "/vercel/path0",
  VERCEL_GIT_COMMIT_SHA: "c33c4769d4ff02ace276cca3acc6eba8c33ae0b7",
  VERCEL_NEXT_BUNDLED_SERVER: "1",
  VERCEL_IMMUTABLE_STATIC_FILES_ENABLED: "1",
  npm_package_json: "/vercel/path0/package.json",
  DD_TAGS: "ec2_host:i-00d1d70569eec6f4e",
  VERCEL_EDGE_FUNCTIONS_ENABLE_CREATE_FUNC_DEDUPE: "1",
  VERCEL_GIT_PROVIDER: "github",
  VERCEL_LAMBDA_OUTPUTS_AS_MIDDLEWARE: "1",
  VERCEL_ENABLE_BASIC_BUILD_MACHINES_ROUTING: "1",
  NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: "alfon-util",
  VERCEL_EDGE_FNS_ON_WORKERD_UNBUNDLED_FORMAT: "1",
  TURBO_RUN_SUMMARY: "true",
  TURBO_PLATFORM_ENV: "",
  VERCEL_COMPRESSED_ISR_BILLING: "1",
  VERCEL_ENCRYPTED_ENV_FILENAME: "___vc/__env.encrypted",
  VERCEL_ENV_ENC_KEY: "[REDACTED]",
  VERCEL_FORCE_FUNCTION_VHS_BUILDS: "1",
  UV_THREADPOOL_SIZE: "4",
  VERCEL_EVAL_LAMBDA_GROUPING_RATIO: "0",
  PATH: "/vercel/path0/node_modules/.bin:/vercel/path0/node_modules/.bin:/vercel/node_modules/.bin:/node_modules/.bin:/vercel/path0/node_modules/.bin:/pnpm12/node_modules/.bin:/vlt/node_modules/.bin:/pnpm6/node_modules/.bin:/yarn1/node_modules/yarn/bin:/vercel/.config/yarn/global/node_modules/.bin:/ruby33/bin:/uv/python/bin:/rust/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bun1:/node24/bin",
  VERCEL_API_ENDPOINT: "https://api-sfo1.vercel.com",
  BUN_INSTALL_GLOBAL_STORE: "0",
  VERCEL_ENABLE_UNCOMPRESSED_LAMBDA_SIZE_CHECK: "1",
  NEXT_ENABLE_ADAPTER: "1",
  CI: "1",
  VERCEL_ENABLE_BUILD_CONTAINER_SOURCE_PREFETCH: "1",
  __VERCEL_BUILD_RUNNING: "1",
  VERCEL_IMAGE_ID: "sha256:f97816fef4e10ce515934f894e106754987972cdcd0e43004b23df70ea85b821",
  VERCEL_INVALIDATE_BUILD_CACHE_ON_SIZE_EXCEEDED: "1",
  NEXT_PUBLIC_VERCEL_GIT_PROVIDER: "github",
  VERCEL_NODE_BRIDGE_COMPRESS_MULTI_PAYLOADS: "1",
  NEXT_ADAPTER_PATH: "/var/task/node_modules/@vercel/next/dist/adapter/index.js",
  UV_PYTHON_DOWNLOADS: "automatic",
  NEXT_PRIVATE_MULTI_PAYLOAD: "1",
  VERCEL_PREVIEW_COMMENTS_ENABLED: "1",
  VERCEL_HIVE_REALM: "prod",
  VERCEL_SKIP_EDGE_FUNCTION_ENDPOINT: "1",
  VERCEL_ENABLE_MALWARE_MANIFEST: "1",
  VERCEL_DEPLOYMENT_ID: "dpl_SRUfZJXkpdRDaCSRqy8pq9pn1d64",
  VERCEL_USE_ONLY_STREAMING_LAMBDA: "1",
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: "utils.alfon.dev",
  npm_node_execpath: "/node24/bin/node",
  VERCEL_TOML_CONFIG_ENABLED: "1",
  UV_PYTHON_DOWNLOADS_JSON_URL: "/uv/python_metadata.json",
  VERCEL_HIVE_BANDWIDTH: "150000000",
  NEXT_PUBLIC_VERCEL_TARGET_ENV: "production",
  VERCEL_BUILD_OUTPUTS_S3_SEMA: "50",
  VERCEL_HIVE_CELL_ID: "hvc_iad1_89a2a2b0_67e72ffeaded4b57afcf25c808f19e76",
  VERCEL_BUILDERS_DIR: "/opt/vercel/builders",
  VERCEL_PYTHON_COMPILEALL: "1",
  TZ: ":UTC",
  NODE_TLS_REJECT_UNAUTHORIZED: undefined,
  BUN_CONFIG_VERBOSE_FETCH: undefined,
  HTTP_PROXY: undefined,
  http_proxy: undefined,
  HTTPS_PROXY: undefined,
  https_proxy: undefined,
  NO_PROXY: undefined,
  no_proxy: undefined,
}

const my_env = {
  NVM_INC: "/Users/alfonsusac/.nvm/versions/node/v24.21.0/include/node",
  TERM_PROGRAM: "vscode",
  NODE: "/Users/alfonsusac/.nvm/versions/node/v24.21.0/bin/node",
  NVM_CD_FLAGS: "-q",
  TERM: "xterm-256color",
  SHELL: "/bin/zsh",
  HOMEBREW_REPOSITORY: "/opt/homebrew",
  TMPDIR: "/var/folders/6c/5b_h0rs54_x2h54jjqbmgldw0000gn/T/",
  VSCODE_PYTHON_AUTOACTIVATE_GUARD: "1",
  TERM_PROGRAM_VERSION: "1.133.0",
  FPATH: "/opt/homebrew/share/zsh/site-functions:/opt/homebrew/share/zsh/site-functions:/usr/local/share/zsh/site-functions:/usr/share/zsh/site-functions:/usr/share/zsh/5.9/functions",
  ZDOTDIR: "/Users/alfonsusac",
  MallocNanoZone: "0",
  npm_config_local_prefix: "/Users/alfonsusac/Documents/2026/workspace/alfon-util",
  PNPM_HOME: "/Users/alfonsusac/Library/pnpm",
  COPILOT_DEBUG_NONCE: "a60d27c794d6e78b9fcd78232ded75fc",
  NVM_DIR: "/Users/alfonsusac/.nvm",
  USER: "alfonsusac",
  COMMAND_MODE: "unix2003",
  SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.3ydAotSV4M/Listeners",
  VSCODE_PROFILE_INITIALIZED: "1",
  __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x0",
  npm_execpath: "/Users/alfonsusac/.bun/bin/bun",
  PATH: "/Users/alfonsusac/Documents/2026/workspace/alfon-util/node_modules/.bin:/Users/alfonsusac/Documents/2026/workspace/alfon-util/node_modules/.bin:/Users/alfonsusac/Documents/2026/workspace/node_modules/.bin:/Users/alfonsusac/Documents/2026/node_modules/.bin:/Users/alfonsusac/Documents/node_modules/.bin:/Users/alfonsusac/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/alfonsusac/.nvm/versions/node/v24.21.0/bin:/Users/alfonsusac/.nvm/versions/node/v23.11.1/bin:/Users/alfonsusac/.nvm/versions/node/v24.21.0/bin:/Users/alfonsusac/.nvm/versions/node/v23.11.1/bin:/Users/alfonsusac/.bun/bin:/Users/alfonsusac/.nvm/versions/node/v20.19.5/bin:/Users/alfonsusac/Library/pnpm/bin:/Users/alfonsusac/Library/Application Support/Code/User/globalStorage/github.copilot-chat/debugCommand:/Users/alfonsusac/Library/Application Support/Code/User/globalStorage/github.copilot-chat/copilotCli:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/alfonsusac/Documents/programs/flutter-sdk/flutter/bin:/Users/alfonsusac/Library/Application Support/Code/User/globalStorage/github.copilot-chat/debugCommand:/Users/alfonsusac/Library/Application Support/Code/User/globalStorage/github.copilot-chat/copilotCli:/Users/alfonsusac/.bun/bin:/Users/alfonsusac/.nvm/versions/node/v20.19.5/bin:/Users/alfonsusac/Library/pnpm",
  npm_package_json: "/Users/alfonsusac/Documents/2026/workspace/alfon-util/package.json",
  _: "/Users/alfonsusac/.bun/bin/bun",
  USER_ZDOTDIR: "/Users/alfonsusac",
  __CFBundleIdentifier: "com.microsoft.VSCode",
  npm_command: "run-script",
  PWD: "/Users/alfonsusac/Documents/2026/workspace/alfon-util",
  npm_lifecycle_event: "build",
  npm_package_name: "alfon-util",
  LANG: "en_US.UTF-8",
  VSCODE_GIT_ASKPASS_EXTRA_ARGS: "",
  XPC_FLAGS: "0x0",
  npm_package_version: "0.1.0",
  XPC_SERVICE_NAME: "0",
  VSCODE_INJECTION: "1",
  SHLVL: "2",
  HOME: "/Users/alfonsusac",
  VSCODE_GIT_ASKPASS_MAIN: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js",
  HOMEBREW_PREFIX: "/opt/homebrew",
  LOGNAME: "alfonsusac",
  npm_lifecycle_script: "bun scripts/build.ts",
  VSCODE_GIT_IPC_HANDLE: "/var/folders/6c/5b_h0rs54_x2h54jjqbmgldw0000gn/T/vscode-git-ba9191ecfc.sock",
  BUN_INSTALL: "/Users/alfonsusac/.bun",
  NVM_BIN: "/Users/alfonsusac/.nvm/versions/node/v24.21.0/bin",
  npm_config_user_agent: "bun/1.4.2 npm/? node/v26.3.0 darwin arm64",
  VSCODE_GIT_ASKPASS_NODE: "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)",
  GIT_ASKPASS: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh",
  INFOPATH: "/opt/homebrew/share/info:/opt/homebrew/share/info:",
  HOMEBREW_CELLAR: "/opt/homebrew/Cellar",
  npm_node_execpath: "/Users/alfonsusac/.nvm/versions/node/v24.21.0/bin/node",
  COLORTERM: "truecolor",
  DISCORD_VERCEL_LOG_WEBHOOK_URL: "https://discord.com/api/webhooks/1538230701604741141/t-SfTJ_VgoNp31QDNzVfEkjzWj5I7P-0bwurnQP8CdHYWFwkt9oAlXEoIjmOG3wJomNr",
  TZ: undefined,
  NODE_TLS_REJECT_UNAUTHORIZED: undefined,
  BUN_CONFIG_VERBOSE_FETCH: undefined,
  HTTP_PROXY: undefined,
  http_proxy: undefined,
  HTTPS_PROXY: undefined,
  https_proxy: undefined,
  NO_PROXY: undefined,
  no_proxy: undefined,
}

function diffObjects<A extends object, B extends object>(a: A, b: B) {
  const onlyA: Record<string, unknown> = {}
  const onlyB: Record<string, unknown> = {}
  const both: Record<string, { A: unknown; B: unknown }> = {}

  const keys = new Set([ ...Object.keys(a), ...Object.keys(b) ])

  for (const key of keys) {
    const inA = key in a
    const inB = key in b

    if (inA && inB) {
      both[ key ] = {
        A: a[ key as keyof A ],
        B: b[ key as keyof B ],
      }
    } else if (inA) {
      onlyA[ key ] = a[ key as keyof A ]
    } else {
      onlyB[ key ] = b[ key as keyof B ]
    }
  }

  return { onlyA, onlyB, both }
}

console.log(
  formatWithOptions(
    {
      // compact: true,
      colors: true,
      // sorted: true,
    },
    diffObjects(vercel_env, my_env)
  )
)
export function getBuildCommitSha(): string | null {
  return (
    process.env.GIT_COMMIT_SHA ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.RAILWAY_GIT_COMMIT_SHA ??
    process.env.DOKPLOY_GIT_COMMIT_SHA ??
    null
  );
}

export function shortSha(sha: string | null): string {
  if (!sha) return 'unknown';
  return sha.slice(0, 7);
}

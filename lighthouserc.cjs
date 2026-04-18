module.exports = {
  ci: {
    collect: {
      url: [
        'https://intelligentsingularityinc.com/en',
        'https://intelligentsingularityinc.com/en/changelog',
        'https://intelligentsingularityinc.com/en/status',
        'https://intelligentsingularityinc.com/en/roadmap',
        'https://intelligentsingularityinc.com/en/insights',
        'https://intelligentsingularityinc.com/en/insights/the-2-2-billion-gap',
        'https://intelligentsingularityinc.com/en/trust',
        'https://intelligentsingularityinc.com/en/help',
      ],
      numberOfRuns: 1,
      settings: { preset: 'desktop' },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouse-results' },
  },
};

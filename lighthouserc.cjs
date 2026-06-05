module.exports = {
  ci: {
    collect: {
      url: [
        'https://intelligentsingularityai.com/en',
        'https://intelligentsingularityai.com/en/changelog',
        'https://intelligentsingularityai.com/en/status',
        'https://intelligentsingularityai.com/en/roadmap',
        'https://intelligentsingularityai.com/en/insights',
        'https://intelligentsingularityai.com/en/trust',
        'https://intelligentsingularityai.com/en/help',
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

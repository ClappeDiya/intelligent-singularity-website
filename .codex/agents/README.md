# Codex agents (IS website)

One agent per `.toml` file in this directory. Format:

```toml
[agent]
name = "example"
description = "One-line summary of when to use this agent."
model = "gpt-5-codex"
developer_instructions = """
System prompt for the agent.
"""
```

There are currently **no agents to convert** — this project has no `.claude/agents/` directory.

When converting a future Claude agent (Markdown file with YAML frontmatter), copy the `description` field straight across, and paste the Markdown body into `developer_instructions` between triple-quoted strings.

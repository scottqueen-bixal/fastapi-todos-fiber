# Copilot Instructions for Dopestack Project

## Project Overview
This project is a premium end-to-end example demonstrating incredibly fast application development using the latest tools, frameworks, and AI agentic code support. It serves as a reference for future projects.

## Frameworks and Tools
Copilot should focus on the frameworks listed in `docs/origin-docs.txt`. If new frameworks are introduced, Copilot should:
1. Prompt the user to add the documentation link to `origin-docs.txt`.
2. Suggest indexing the docs in the `mcp-crawl4ai-rag` system.

## Coding Conventions
- **JavaScript**: Follow Prettier, ESLint, and JS Standard formatting.
- **Python**: Use Black formatting.
- **CSS**: Use Stylelint.
- Respect existing configuration files for formatting and linting.

## Comments
- Generate detailed comments using Python's standard comment style.
- Use JSDoc for JavaScript.

## Documentation Updates
- Proactively suggest updates to documentation files.
- Provide code examples for new features to improve understanding of the codebase.

## Testing
- Incorporate unit tests and functional tests.

## Debugging and Error Handling
- Suggest debugging strategies and error handling patterns, focusing on:
  - Database interactions
  - API endpoints
  - Frontend components

## Git Workflows and CI/CD
- Suggest Git workflows, CI/CD configurations, Docker optimizations, deployment scripts, and Kubernetes configurations.

## Task Automation
- Assist with task automation, but prioritize relying on the tools already configured in the application rather than automating tasks frequently.

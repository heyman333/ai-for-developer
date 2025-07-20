# Smart Commit

Automatically analyze file changes and create an appropriate commit with a meaningful message.

Process:
1. Check git status to see all changed files
2. Review git diff to understand what was modified
3. Analyze the nature of changes (new feature, bug fix, refactor, etc.)
4. Check recent commit history to understand commit message style
5. Generate appropriate commit message following conventional commits format
6. Stage all relevant changes
7. Create commit with generated message

Commit message format:
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code refactoring
- `style:` for formatting/styling changes
- `docs:` for documentation changes
- `chore:` for maintenance tasks
- `test:` for adding/updating tests

Example commit messages:
- `feat: add user authentication component`
- `fix: resolve navigation menu overflow issue`
- `refactor: extract common utility functions`
- `style: update button hover states with Tailwind`

The commit will automatically include the Claude Code attribution as specified in the project guidelines.
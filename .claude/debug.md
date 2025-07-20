# Debug Issues

Systematic approach to debugging common issues in this React + TypeScript + Vite project.

Debugging checklist:
1. Check browser console for JavaScript errors
2. Check terminal for TypeScript compilation errors
3. Verify all imports are correct and files exist
4. Check if dependencies are installed (`node_modules` exists)
5. Verify Vite dev server is running on correct port
6. Check for ESLint warnings that might indicate issues
7. Review recent changes that might have introduced the bug

Common fixes:
- Restart dev server: `pnpm dev`
- Clear cache: `rm -rf node_modules/.vite`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check TypeScript errors: `npx tsc --noEmit`
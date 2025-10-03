# Contributing Guidelines

Thank you for considering contributing to this project!

## Code of Conduct

Be respectful, professional, and inclusive.

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Platform (iOS/Android/Web)
   - Screenshots if applicable

### Suggesting Features

1. Check if the feature has been requested
2. Create a new issue describing:
   - Use case
   - Expected behavior
   - Why it's valuable

### Pull Requests

#### Before You Start

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Follow the existing code style

#### Development Workflow

```bash
# Install dependencies
npm install

# Run on web for quick iteration
npm run dev:web

# Test native platforms
npm run ios
npm run android

# Run tests
npm test

# Lint and type check
npm run lint
npm run typecheck
```

#### Commit Messages

Use conventional commits:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update tooling
```

Examples:
```
feat: Add user profile screen
fix: Resolve theme toggle persistence issue
docs: Update README setup instructions
```

#### Pull Request Checklist

Before submitting, ensure:

- [ ] Code follows project style (ESLint/Prettier)
- [ ] TypeScript types are correct (`npm run typecheck`)
- [ ] All tests pass (`npm test`)
- [ ] New features have tests
- [ ] Documentation updated if needed
- [ ] Tested on multiple platforms:
  - [ ] Web
  - [ ] iOS (if possible)
  - [ ] Android (if possible)
- [ ] Screenshots added for UI changes
- [ ] No console warnings or errors

#### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Web
- [ ] Tested on iOS
- [ ] Tested on Android

## Screenshots
(if applicable)

## Notes
Any additional context
```

### Code Style

#### TypeScript

- Use strict mode
- Avoid `any` type
- Export types from component files
- Use interfaces for props

```typescript
interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({title, onPress}) => {
  // ...
};
```

#### React Native

- Use functional components
- Use hooks (not class components)
- Prefer `StyleSheet.create()` over inline styles
- Use theme from context

```typescript
import {useApp} from '@/app/state/AppContext';

const MyComponent = () => {
  const {theme} = useApp();
  
  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={{color: theme.colors.text}}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

#### File Organization

- One component per file
- Co-locate tests with components (or in `tests/` directory)
- Group related files in directories
- Use index files for cleaner imports

```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx
      index.ts  # exports Button
```

### Testing

#### Unit Tests

```typescript
import {render, screen} from '@testing-library/react-native';
import {AppProvider} from '@/app/state/AppContext';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(
      <AppProvider>
        <MyComponent />
      </AppProvider>
    );
    
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
```

#### Integration Tests

Test user flows across multiple screens.

#### Platform-Specific Tests

Use separate test files for platform-specific code:
- `tests/native/` for native tests
- `tests/web/` for web tests

### Documentation

- Update README for new features
- Add JSDoc comments for complex functions
- Keep SETUP_GUIDE.md current
- Update CONTRIBUTING.md for process changes

### Review Process

1. Submit PR
2. Automated CI runs (lint, type-check, tests)
3. Code review by maintainer
4. Address feedback
5. Merge when approved

### Getting Help

- Ask questions in issues
- Reference existing code for examples
- Check documentation in README

## Thank You!

Your contributions make this project better for everyone. 🎉

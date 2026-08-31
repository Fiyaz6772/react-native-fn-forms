# Contributing to React Native FN Forms

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Local Testing

To test changes in a real React Native app instead of publishing to npm each time:

1. `npm run dev-app:create` — one-time scaffold of a local Expo app in `dev-app/` (gitignored, not part of the repo), linked to this library via a `file:` dependency.
2. In one terminal: `npm run build:watch` (rebuilds `lib/` on every change to `src/`).
3. In another terminal: `npm run dev-app` (starts the Expo dev server; edits hot-reload).

If you delete `dev-app/`, just re-run `npm run dev-app:create` to get it back.

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Run the test suite (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer
2. Update the README.md with details of changes to the interface
3. Increase the version numbers in any examples files and the README.md to the new version
4. The PR will be merged once you have the sign-off of two other developers

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Issues

We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

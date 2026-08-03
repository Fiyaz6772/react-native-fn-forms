# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-08-03

### Fixed

- **`isValid` was incorrect** - previously became `true` as soon as any single
  field was touched with no error, even if required fields were still empty
  and untouched. Now requires all required fields to be filled with no
  active errors.
- **Validator exceptions could crash the app** - a throwing `customValidation`
  (or an unexpected value type reaching a built-in validator) is now caught
  and surfaced as a field error instead of becoming an unhandled promise
  rejection.
- **`npm run lint` was completely broken** - `.eslintrc.js` referenced a
  missing `@react-native-community/eslint-config` dependency and an invalid
  `'@typescript-eslint/recommended'` extends string. Lint now runs and
  passes in CI.
- **`inputStyle` prop was dead** - documented on `SmartFormFieldProps` but
  never applied to the underlying `TextInput`. Now wired through.

### Added

- `FieldConfig.accessibility` (`label`/`hint`/`role`) now flows through to
  real `accessibilityLabel`/`accessibilityHint`/`accessibilityRole` props on
  the rendered input.
- `FormConfig.accessibility.announceErrors` now calls
  `AccessibilityInfo.announceForAccessibility` when a visible field error
  appears.
- `SmartOTPField` digit inputs now have per-digit `accessibilityLabel`
  ("Digit 1 of 6", etc.), and error text in both field components uses
  `accessibilityLiveRegion="polite"`.
- Exported `CountryCode`, `StorageAdapter`, `DraftData`, `FormState`, and
  `FormTouched` types, plus the real (previously unreachable)
  `SmartFormFieldProps`, from the package root.
- GitHub Actions CI (lint, type check, test, build) on push/PR.
- CI and bundle-size badges in the README.

### Changed

- `useSmartForm`'s returned object is now memoized, and `SmartFormField` /
  `SmartOTPField` are wrapped in `React.memo`, so re-renders unrelated to
  the form's own state (e.g. a sibling or parent re-rendering) no longer
  cascade into every field. Per-keystroke full-form re-rendering is a
  deeper architectural issue still open, tracked for a future release.
- `SmartFormField` no longer declares its own local, drifted copy of
  `SmartFormFieldProps` - it now imports the shared type from `types.ts`.

## [1.2.4] - 2025-11-20

### Fixed

- **OTP Auto-Navigation** - Fixed SmartOTPField auto-focus behavior
  - Now automatically moves to next input when entering a digit
  - Automatically moves to previous input when deleting (backspace on empty field)
  - Improved backspace handling: clears current cell first, then moves back
  - Reduced setTimeout delays from 50ms to 10ms for smoother transitions
  - Removed unnecessary text selection logic that caused focus issues
  - Users no longer need to manually click each OTP cell

## [1.2.3] - 2025-11-19

### Added

- **Multi-Country Phone Number Formatting** - Automatic phone number formatting for 14+ countries
  - Support for North America: US, CA (United States, Canada)
  - Support for Europe: GB, DE, FR, ES, IT (UK, Germany, France, Spain, Italy)
  - Support for Asia: IN, CN, JP, PK, AE (India, China, Japan, Pakistan, UAE)
  - Support for Other Regions: AU, BR, MX, ZA (Australia, Brazil, Mexico, South Africa)
  - New `countryCode` prop on `SmartFormField` component
  - New `countryCode` option in `FieldConfig` type
  - New `CountryCode` type export for TypeScript users
  - **Opt-in behavior**: Formatting only applies when `countryCode` is explicitly provided
  - **Preserves user input**: Without country code, input remains unchanged (backward compatible)
  - Auto-formats as user types with country-specific patterns
  - Handles partial input gracefully
  - Works seamlessly with existing phone validation

### Enhanced

- **Phone Formatter** - Completely rewritten phone formatter with multi-country support
  - Country-specific formatting patterns for 14+ countries
  - Smart digit extraction and formatting
  - Handles both national and international number formats
  - Preserves incomplete numbers during typing
  - No formatting applied when country code is omitted (backward compatible)

- **TypeScript Types** - Enhanced type definitions for international phone support
  - New `CountryCode` type with 14+ country codes
  - Updated `FieldConfig` interface with optional `countryCode` property
  - Updated `SmartFormFieldProps` interface with optional `countryCode` property
  - Updated `getFieldProps` method signature to accept optional country code override

### Documentation

- **Multi-Country Phone Guide** - Comprehensive documentation for international phone formatting
  - Complete list of supported countries with format examples
  - Usage examples for static and dynamic country selection
  - API reference for new props and types
  - Best practices for international forms
  - Behavior documentation (with/without country code)

### Testing

- **Comprehensive Phone Format Tests** - Added 25 new tests for multi-country phone formatting
  - Tests for all 14 supported countries
  - Tests for preserving user input without country code
  - Edge case handling (incomplete numbers, existing formatting, empty strings)
  - All tests passing (69 total tests across 5 test suites)

## [1.2.2] - 2025-11-17

### Fixed

- **Text Input Bug** - Fixed formatter removing trailing spaces during typing
  - `personName` formatter no longer removes trailing spaces while user is typing
  - `businessName` formatter no longer removes trailing spaces while user is typing
  - `streetAddress` formatter no longer removes trailing spaces while user is typing
  - Users can now type spaces naturally (e.g., "Fiyaz Hussain" works correctly)
  - Only leading spaces and multiple consecutive spaces are cleaned up

## [1.2.1] - 2025-11-17

### Added

- **Icon Support for SmartFormField** - Enhanced input fields with left and right icon capabilities
  - `leftIcon` prop - accepts ReactElement or function returning ReactElement
  - `rightIcon` prop - accepts ReactElement or function returning ReactElement
  - `onLeftIconPress` callback for interactive left icons
  - `onRightIconPress` callback for interactive right icons (password toggle, clear button, etc.)
  - `leftIconStyle` prop for custom left icon container styling
  - `rightIconStyle` prop for custom right icon container styling
  - `inputContainerStyle` prop for wrapper container customization
  - Smart wrapper logic: TouchableOpacity for interactive icons, View for static icons
  - Support for Vector Icons, SVG, Images, Text, and Emoji icons
  - Function-based dynamic icons that respond to form state

### Enhanced

- **TypeScript Types** - Added comprehensive `SmartFormFieldProps` interface with detailed JSDoc comments
  - Full type definitions for all icon-related props
  - Improved IntelliSense support for icon usage patterns
  - Extended type exports for better developer experience

### Documentation

- **Comprehensive Icon Examples** - Added extensive icon usage documentation
  - Updated SmartFormField API documentation with icon props and 7+ usage examples
  - Added "Enhanced Version with Icons" sections to login, signup, and payment form examples
  - Updated main README with icon feature highlights and quick start example
  - Documented common patterns: password toggle, clear button, validation indicators, search icons
  - Added icon styling customization examples
- **Test Coverage** - Added comprehensive test suite for icon functionality
  - Icon rendering tests (ReactElement and function-based)
  - Interactive icon press handler tests
  - Password visibility toggle test
  - Clear button functionality test
  - Icon styling tests
  - Dynamic icon state change tests

### Use Cases Demonstrated

- Password visibility toggle with eye icon
- Clear button with conditional rendering
- Email validation checkmark indicator
- Search field with magnifying glass icon
- Phone field with country code picker
- Credit card type badge display
- Lock icons for secure fields
- Calendar icon for date inputs

## [1.2.0] - 2025-11-14

### Added

- **Field Matching / Confirmation Fields** - Built-in support for email and password confirmation
  - `matchField` property to validate against another field
  - `matchErrorMessage` for custom error messages
  - Automatic revalidation when matched field changes
  - Support for multiple confirmation fields in a single form
- **Auto-save & Draft Recovery** - Automatic form draft saving and recovery
  - Flexible storage adapter interface (AsyncStorage, MMKV, SecureStore, etc.)
  - Configurable auto-save debouncing
  - Draft expiration support
  - Manual draft management methods (`saveDraft`, `loadDraft`, `clearDraft`, `hasDraft`)
  - `onDraftFound` callback for user prompts
  - `onAutoSave` callback for save notifications
- **SmartFormField Enhancement** - Now accepts all React Native TextInput props
  - Pass any standard TextInput prop (secureTextEntry, keyboardType, etc.)
  - Improved flexibility and customization

### Documentation

- Added comprehensive Confirmation Fields example guide
- Added complete Auto-save & Draft Recovery guide with multiple storage adapters
- Updated API documentation with new field matching and auto-save options
- Enhanced README with new feature examples
- Added test coverage for field matching and auto-save functionality

## [1.1.1] - 2025-11-07

### Documentation

- **Enhanced npm Documentation** - Updated README.md with comprehensive OTP examples and API documentation
- **Improved Package Discoverability** - Added detailed SmartOTPField component documentation
- **Complete OTP Integration Guide** - Added step-by-step OTP verification examples
- **Enhanced API Reference** - Added SmartOTPField props and usage documentation

## [1.1.0] - 2025-11-01

### Added

- **SmartOTPField Component** - Complete OTP verification component
- OTP field type support with 4/6/8 digit configurations
- SMS Auto-fill support for iOS and Android
- Auto-advance functionality between OTP input cells
- Intelligent backspace handling for OTP fields
- Paste support for OTP codes from clipboard
- Auto-submit option when OTP is complete
- Mobile-optimized keyboard types for OTP entry
- Focus management for seamless OTP user experience
- Comprehensive OTP validation and formatting

### Enhanced

- Updated field types table to include 'otp' validation
- Improved documentation with OTP examples
- Enhanced TypeScript definitions for OTP functionality
- Updated package keywords for better npm discoverability

## [1.0.0] - 2025-11-01

### Added

- Initial release of React Native FN Forms
- Smart form validation with built-in field validators
- Support for common field types: email, phone, names, credit cards, etc.
- Real-time validation with debouncing
- TypeScript definitions
- Cross-platform support (iOS/Android)
- Accessibility features
- Pure JavaScript implementation
- Comprehensive test suite
- Complete documentation and examples

### Features

- `useSmartForm` hook for form management
- Built-in validators for 10+ field types
- Auto-formatting for phone numbers, credit cards, etc.
- Platform-specific input optimizations
- Error suggestions and smart messages
- React Context for form state management
- Custom validation support
- MIT License for open source use

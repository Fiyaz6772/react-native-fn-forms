# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

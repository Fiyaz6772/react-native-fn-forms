# React Native FN Forms Documentation

Welcome to the complete documentation for React Native FN Forms!

---

## 📖 Getting Started

New to React Native FN Forms? Start here:

1. **[Installation & Quick Start](../README.md#-installation)** - Get up and running in minutes
2. **[useSmartForm Hook](api/useSmartForm.md)** - Learn the core hook
3. **[Field Types Guide](guides/field-types.md)** - Explore all 14 field types
4. **[Login Form Example](examples/login-form.md)** - Build your first form

---

## 🎯 API Documentation

Complete reference for all components and hooks:

- **[useSmartForm Hook](api/useSmartForm.md)** - Main form management hook with all configuration options
- **[SmartFormField Component](api/SmartFormField.md)** - Pre-built form field component with validation display
- **[SmartOTPField Component](api/SmartOTPField.md)** - OTP verification component with SMS auto-fill

---

## 📚 Guides

In-depth guides covering all aspects of the library:

- **[Field Types Guide](guides/field-types.md)** - Detailed documentation for all 14 field types
- **[Validation Guide](guides/validation.md)** - Advanced validation patterns, custom validators, and async validation
- **[Styling Guide](guides/styling.md)** - Customization, theming, and styling patterns
- **[OTP Guide](guides/otp.md)** - Complete OTP verification implementation guide

---

## 💡 Examples

Complete, production-ready examples:

- **[Login Form](examples/login-form.md)** - Email and password login with validation
- **[Signup Form](examples/signup-form.md)** - Registration form with password confirmation
- **[Payment Form](examples/payment-form.md)** - Credit card payment form with security
- **[Confirmation Fields](examples/confirmation-fields.md)** - Email and password confirmation with field matching
- **[Auto-save & Draft Recovery](examples/auto-save-draft.md)** - Automatic draft saving with multiple storage adapters

---

## 🔍 Quick Links

### By Use Case

**Building a login form?**
→ [Login Form Example](examples/login-form.md)

**Need OTP verification?**
→ [SmartOTPField API](api/SmartOTPField.md) | [OTP Guide](guides/otp.md)

**Collecting payment information?**
→ [Payment Form Example](examples/payment-form.md) | [Credit Card Type](guides/field-types.md#creditcard)

**Custom validation logic?**
→ [Validation Guide](guides/validation.md)

**Styling and theming?**
→ [Styling Guide](guides/styling.md)

**Need confirmation fields?**
→ [Confirmation Fields Example](examples/confirmation-fields.md)

**Want auto-save functionality?**
→ [Auto-save & Draft Recovery Example](examples/auto-save-draft.md)

### By Field Type

Looking for a specific field type?

- [Email](guides/field-types.md#email) - Email address validation
- [Phone](guides/field-types.md#phone) - Phone number with formatting
- [Credit Card](guides/field-types.md#creditcard) - Credit card with Luhn validation
- [Password](guides/field-types.md#password) - Password with strength requirements
- [OTP](guides/field-types.md#otp) - One-time password codes
- [View all 14 types →](guides/field-types.md)

---

## 📦 Features Overview

### Built-in Field Types

14 intelligent field types with auto-validation and formatting:

- **Identity**: personName, businessName, username
- **Contact**: email, phone, streetAddress
- **Financial**: creditCard, currency
- **Security**: password, otp
- **Web**: url
- **General**: text, number, date

[Explore Field Types →](guides/field-types.md)

### Validation Modes

Three validation strategies to match your UX:

- **onChange** - Real-time validation as user types
- **onBlur** - Validate when field loses focus
- **onSubmit** - Validate only on form submission

[Learn about validation →](guides/validation.md)

### Key Features

✅ Built-in validators for common field types  
✅ OTP verification with SMS auto-fill  
✅ Smart auto-formatting (phone, credit card, etc.)  
✅ Real-time validation with debouncing  
✅ TypeScript support with full type safety  
✅ Accessibility ready with screen reader support  
✅ Cross-platform (iOS, Android, Web)  
✅ Pure JavaScript (no native dependencies)  
✅ Performance optimized

---

## 🎓 Learning Path

### Beginner

1. [Quick Start](../README.md#-quick-start)
2. [useSmartForm Basics](api/useSmartForm.md)
3. [SmartFormField Component](api/SmartFormField.md)
4. [Login Form Example](examples/login-form.md)

### Intermediate

1. [All Field Types](guides/field-types.md)
2. [Basic Validation](guides/validation.md)
3. [Signup Form Example](examples/signup-form.md)
4. [Custom Styling](guides/styling.md)

### Advanced

1. [Custom Validation](guides/validation.md#custom-validation)
2. [Async Validation](guides/validation.md#async-validation)
3. [Field Dependencies](guides/validation.md#field-dependencies)
4. [Payment Form Example](examples/payment-form.md)

---

## 🔗 Additional Resources

- **[Main README](../README.md)** - Project overview and installation
- **[Roadmap](ROADMAP.md)** - Upcoming features and improvements
- **[Changelog](../CHANGELOG.md)** - Version history
- **[Contributing](../CONTRIBUTING.md)** - How to contribute

---

## 🆘 Need Help?

- 💬 [GitHub Discussions](https://github.com/Fiyaz6772/react-native-smart-forms/discussions)
- 🐛 [Report a Bug](https://github.com/Fiyaz6772/react-native-smart-forms/issues)
- 💡 [Request a Feature](https://github.com/Fiyaz6772/react-native-smart-forms/issues)
- ⭐ [Star on GitHub](https://github.com/Fiyaz6772/react-native-smart-forms)

---

**Version:** 1.1.1  
**Last Updated:** November 14, 2025

Made with ❤️ for the React Native community

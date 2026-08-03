# Expo Snack Examples

This folder contains ready-to-use Expo Snack examples for react-native-fn-forms.

## Available Examples

### 1. LoginFormExample.js

**Features:**

- Email and password validation
- Icon support (left email icon, right clear button)
- Password visibility toggle
- Real-time validation feedback

**Snack URL:** _(Create on snack.expo.dev)_

---

### 2. SignupFormExample.js

**Features:**

- Multi-field validation (name, email, phone, password)
- Field matching (password confirmation)
- Icon support with validation checkmarks
- Password visibility toggles
- ScrollView for longer forms

**Snack URL:** _(Create on snack.expo.dev)_

---

### 3. OTPVerificationExample.js

**Features:**

- 6-digit OTP input
- Auto-advance between cells
- Paste support
- Backspace handling
- Complete callback

**Snack URL:** _(Create on snack.expo.dev)_

---

### 4. PaymentFormExample.js

**Features:**

- Credit card validation (Luhn algorithm)
- Multiple field types (name, card, expiry, CVV, ZIP)
- Icon support for all fields
- Secure input for CVV
- Split layout for expiry/CVV

**Snack URL:** _(Create on snack.expo.dev)_

---

## How to Create Snacks

1. Go to https://snack.expo.dev
2. Create a new Snack
3. Copy the code from one of the example files
4. Add dependency: `react-native-fn-forms` (latest version)
5. Save and publish the Snack
6. Copy the Snack URL
7. Update this README with the URL

## Dependencies Required

All examples require:

- `react-native-fn-forms` (your library)
- `@expo/vector-icons` (included in Expo by default)

## Notes

- All examples are self-contained and ready to run in Expo Snack
- No additional native dependencies required
- Works in Expo Go app
- Compatible with web, iOS, and Android

## Usage in React Native Directory

Add these Snack URLs to your library entry in `react-native-libraries.json`:

```json
{
  "githubUrl": "https://github.com/Fiyaz6772/react-native-fn-forms",
  "npmPkg": "react-native-fn-forms",
  "examples": [
    "https://snack.expo.dev/@youruser/login-form-example",
    "https://snack.expo.dev/@youruser/signup-form-example",
    "https://snack.expo.dev/@youruser/otp-verification-example",
    "https://snack.expo.dev/@youruser/payment-form-example"
  ]
}
```

import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import { supabase } from '../lib/supabase';
import { colors, spacing } from '../theme/colors';

function validate({ fullName, email, password }) {
  const errors = {};
  if (!fullName.trim()) errors.fullName = 'Please enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email.';
  }
  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  return errors;
}

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount() {
    if (loading) return;
    const nextErrors = validate({ fullName, email, password });
    setErrors(nextErrors);
    setFormError('');
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: fullName.trim() } },
      });

      if (error) {
        setFormError(error.message);
        return;
      }

      // With email confirmation on (Supabase's default), no session is
      // returned until the user clicks the link in their inbox.
      if (data.session) {
        Alert.alert('Welcome to the tribe!', `Thanks for joining, ${fullName.trim()}.`);
      } else {
        Alert.alert(
          'Check your email',
          `We sent a confirmation link to ${email.trim()}. Tap it to finish signing up.`
        );
      }
    } catch {
      setFormError('Could not reach the server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Join a village of moms who get it.
          </Text>

          <TextField
            label="Full Name"
            placeholder="Jane Doe"
            value={fullName}
            onChangeText={setFullName}
            autoComplete="name"
            textContentType="name"
            returnKeyType="next"
            error={errors.fullName}
          />
          <TextField
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            error={errors.email}
          />
          <TextField
            label="Password"
            placeholder="At least 8 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="done"
            onSubmitEditing={handleCreateAccount}
            error={errors.password}
          />

          {formError ? <Text style={styles.formError}>{formError}</Text> : null}

          <PrimaryButton
            title="Create Account"
            onPress={handleCreateAccount}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.text,
    fontSize: 16,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  formError: {
    color: colors.error,
    fontSize: 14,
    marginBottom: spacing.md,
  },
});

import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing } from '../theme/colors';

const HIGHLIGHTS = [
  'Community boards for every stage of motherhood',
  'Trusted, verified help: nannies, doulas, meal prep and more',
  'Coaches and therapists who get this season of life',
];

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>TribeMama</Text>

        <View style={styles.hero}>
          <Text style={styles.headline}>
            Motherhood takes a <Text style={styles.highlight}>village.</Text>
            {'\n'}Here's yours.
          </Text>
          <Text style={styles.intro}>
            One app to find your people, book trusted help at home, and get
            support for your mind and body.
          </Text>
        </View>

        <View style={styles.highlights}>
          {HIGHLIGHTS.map((item) => (
            <View key={item} style={styles.highlightRow}>
              <View style={styles.dot} />
              <Text style={styles.highlightText}>{item}</Text>
            </View>
          ))}
        </View>

        <PrimaryButton
          title="Get Started"
          onPress={() => router.push('/sign-up')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  brand: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  hero: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  headline: {
    color: colors.text,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
  },
  highlight: {
    color: colors.accent,
  },
  intro: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 25,
    marginTop: spacing.md,
  },
  highlights: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accentSoft,
    marginRight: spacing.md,
  },
  highlightText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
  },
});

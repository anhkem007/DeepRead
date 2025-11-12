import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <View style={styles.container}> 
      <View style={styles.logoBox}><Text style={styles.logoText}>📘</Text></View>
      <Text style={styles.title}>DeepRead</Text>
      <Text style={styles.slogan}>Read Deeply – Understand Clearly</Text>
      <TouchableOpacity onPress={onGetStarted} style={styles.button}> 
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', padding: 24 },
  logoBox: { marginBottom: 24, backgroundColor: 'rgba(255,255,255,0.2)', padding: 24, borderRadius: 24 },
  logoText: { fontSize: 48, color: '#FFFFFF' },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  slogan: { color: 'rgba(255,255,255,0.9)', fontSize: 18, textAlign: 'center', marginBottom: 32 },
  button: { backgroundColor: '#FFFFFF', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 999 },
  buttonText: { color: '#2563EB', fontWeight: '700' },
});

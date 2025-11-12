import { useState } from 'react'
import { Image, View, Text, StyleSheet, ImageProps } from 'react-native'

interface Props extends Omit<ImageProps, 'source'> {
  src?: string
  alt?: string
}

export function ImageWithFallback(props: Props) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, ...rest } = props

  if (!src || didError) {
    return (
      <View style={[styles.fallback, style as any]}> 
        <Text style={styles.fallbackText}>{alt || 'Image'}</Text>
      </View>
    )
  }

  return (
    <Image
      source={{ uri: src }}
      accessibilityLabel={alt}
      style={style as any}
      onError={() => setDidError(true)}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#6B7280',
    fontSize: 12,
  },
})

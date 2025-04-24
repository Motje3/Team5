// login/_layout.tsx
import React from 'react'
import { Stack } from 'expo-router'

export default function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#3E1F92' },
        
        // Animation settings for both forward and backward navigation
        animation: 'slide_from_right',
        animationDuration: 150,
        
        // Enable gesture for back navigation
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        
        // Change from transparentModal to card for consistent animations
        presentation: 'card',
        
        // Ensure consistent animations
        animationTypeForReplace: 'push',
        
        // Prevent background flash
        freezeOnBlur: true,
      }}
    />
  )
}
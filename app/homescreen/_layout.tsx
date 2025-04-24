// homescreen/_layout.tsx
import React from 'react'
import { Stack } from 'expo-router'
import { useApp } from '../context/AppContext'

export default function HomescreenLayout() {
  const { darkMode } = useApp()
  const bg = darkMode ? '#030014' : '#ffffff'

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: bg },
        
        // Keep slide animation for forward navigation
        animation: 'slide_from_right',
        
        // Animation duration
        animationDuration: 100,
        
        // Enable gesture for back navigation
        gestureEnabled: true,
        
        // Keep transparentModal to prevent white flash
        presentation: 'transparentModal',
        
        // Add these settings for back navigation
        gestureDirection: 'horizontal',
        animationTypeForReplace: 'push',
      }}
    />
  )
}
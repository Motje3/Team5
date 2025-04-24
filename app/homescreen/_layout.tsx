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
        
        // Change from 'fade' to 'default' or try 'slide_from_right'
        animation: 'slide_from_right',
        
        // Reduce animation duration
        animationDuration: 100,
        
        // Keep this if you want swipe back
        gestureEnabled: true,
        
        // Add this to prevent white flash
        presentation: 'transparentModal',
      }}
    />
  )
}
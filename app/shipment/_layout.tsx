// shipment/_layout.tsx
import React from 'react'
import { Stack } from 'expo-router'
import { useApp } from '../context/AppContext'

export default function ShipmentLayout() {
  const { darkMode } = useApp()
  const bg = darkMode ? '#090723' : '#ffffff'

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: bg },
        
        // Animation settings for both forward and backward navigation
        animation: 'slide_from_right',
        animationDuration: 150,
        
        // Enable gesture for back navigation
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        
        // Use card presentation for consistent background handling
        presentation: 'card', 
        
        // Ensure consistent animations for forward and backward navigation
        animationTypeForReplace: 'push',
        
        // Prevent background flash
        freezeOnBlur: true,
      }}
    />
  )
}
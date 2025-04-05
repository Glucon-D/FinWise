import { createContext, useContext, useState } from 'react'
import { calculateRiskProfile } from '../data/dummyProfile'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile')
    return saved ? JSON.parse(saved) : null
  })

  const updateProfile = (formData) => {
    const riskType = calculateRiskProfile(formData)
    const newProfile = { ...formData, riskType }
    setProfile(newProfile)
    localStorage.setItem('userProfile', JSON.stringify(newProfile))
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
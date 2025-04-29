"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (token) {
      // For demo purposes, we'll just set a mock user
      // In a real app, you would validate the token with your backend
      setUser({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would make an API call to your backend
      // const response = await authApi.login(email, password)
      // localStorage.setItem("token", response.token)

      // For demo purposes, we'll just set a mock token and user
      localStorage.setItem("token", "mock-jwt-token")
      setUser({
        id: "1",
        name: "John Doe",
        email: email,
        role: "Admin",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authApi.logout()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      // In a real app, this would make an API call to your backend
      // const response = await authApi.register(userData)
      // localStorage.setItem("token", response.token)

      // For demo purposes, we'll just set a mock token and user
      localStorage.setItem("token", "mock-jwt-token")
      setUser({
        id: "1",
        name: userData.name,
        email: userData.email,
        role: "User",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

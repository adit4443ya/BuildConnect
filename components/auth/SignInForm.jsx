'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log('✅ Login successful:', data.user)
      console.log('📋 User metadata:', data.user.user_metadata)

      // First try to get user type from metadata
      let userType = data.user.user_metadata?.user_type

      // If metadata doesn't have user_type, fetch from profiles table with timeout
      if (!userType) {
        console.log('🔍 User type not in metadata, fetching from profile...')

        // Add timeout to profile fetch (5 seconds max)
        const fetchWithTimeout = Promise.race([
          supabase
            .from('profiles')
            .select('user_type')
            .eq('id', data.user.id)
            .single(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
          )
        ])

        try {
          const { data: profileData, error: profileError } = await fetchWithTimeout

          if (profileError) {
            console.error('❌ Error fetching profile:', profileError)
            // Don't throw, try to continue with fallback
          } else {
            userType = profileData?.user_type
            console.log('✅ User type from profile:', userType)
          }
        } catch (timeoutError) {
          console.error('⏱️ Profile fetch timed out:', timeoutError)
          // Continue without user type, will redirect to home
        }
      }

      // Refresh router to update session
      router.refresh()

      // Small delay to ensure session is set
      await new Promise(resolve => setTimeout(resolve, 500))

      // Redirect based on role
      const redirectPath = userType === 'builder'
        ? '/builder/dashboard'
        : userType === 'contractor'
        ? '/contractor/dashboard'
        : '/'

      console.log('🚀 Redirecting to:', redirectPath)

      // Use router.push for better Next.js integration
      router.push(redirectPath)

      // Fallback to window.location after 2 seconds if router.push doesn't work
      setTimeout(() => {
        window.location.href = redirectPath
      }, 2000)

    } catch (error) {
      console.error('❌ Login error:', error)
      setError(error.message || 'An error occurred during sign in')
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in to your BuildConnect account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">{error}</div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

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

      console.log('Login successful:', data.user)
      console.log('User metadata:', data.user.user_metadata)

      // Get user type from metadata
      const userType = data.user.user_metadata?.user_type

      if (!userType) {
        // If no user type in metadata, try to fetch from profiles with timeout
        console.log('User type not in metadata, fetching from profile...')

        // Create a promise that times out after 5 seconds
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
        )

        const profilePromise = supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.user.id)
          .single()

        try {
          const { data: profileData, error: profileError } = await Promise.race([
            profilePromise,
            timeoutPromise
          ])

          if (profileError) {
            console.error('Error fetching profile:', profileError)
            // Default to builder if profile fetch fails
            console.log('Defaulting to builder dashboard')
            router.push('/builder/dashboard')
            return
          }

          const profileUserType = profileData?.user_type
          console.log('User type from profile:', profileUserType)

          // Redirect based on profile user type
          if (profileUserType === 'contractor') {
            router.push('/contractor/dashboard')
          } else {
            router.push('/builder/dashboard')
          }
          return
        } catch (fetchError) {
          console.error('Profile fetch failed:', fetchError)
          // Default to builder dashboard if fetch fails
          router.push('/builder/dashboard')
          return
        }
      }

      // Redirect based on metadata user type
      console.log('Redirecting to:', userType === 'builder' ? '/builder/dashboard' : '/contractor/dashboard')

      if (userType === 'builder') {
        router.push('/builder/dashboard')
      } else if (userType === 'contractor') {
        router.push('/contractor/dashboard')
      } else {
        router.push('/builder/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
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

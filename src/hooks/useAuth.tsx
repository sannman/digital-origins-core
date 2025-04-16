
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { toast } from '@/components/ui/sonner'

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!, 
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    checkUser()

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email, 
      password
    })

    if (error) {
      toast.error('Sign up failed', { description: error.message })
      setLoading(false)
      return null
    }

    toast.success('Sign up successful')
    setLoading(false)
    return data.user
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email, 
      password
    })

    if (error) {
      toast.error('Sign in failed', { description: error.message })
      setLoading(false)
      return null
    }

    toast.success('Sign in successful')
    setLoading(false)
    return data.user
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Sign out failed', { description: error.message })
    } else {
      toast.success('Signed out successfully')
    }
  }

  return { 
    user, 
    loading, 
    signUp, 
    signIn, 
    signOut,
    supabase 
  }
}

# 🔧 Deployment Troubleshooting - Sign In Issues

## Issue: Sign-in stuck/loading on Vercel (works locally)

This is typically caused by Supabase redirect URL configuration.

---

## Quick Fix (Most Common Solution)

### Step 1: Add Vercel URL to Supabase

**THIS IS THE MOST COMMON FIX!**

1. Go to https://supabase.com/dashboard
2. Select your project: `oeccxntwqrlgwvretorl`
3. Click **Authentication** in left sidebar
4. Click **URL Configuration**
5. Add these URLs:

**Site URL:**
```
https://your-project-name.vercel.app
```

**Redirect URLs** (add all of these):
```
https://your-project-name.vercel.app/**
https://your-project-name.vercel.app/auth/callback
https://your-project-name.vercel.app/builder/dashboard
https://your-project-name.vercel.app/contractor/dashboard
http://localhost:3000/**
```

6. **Click "Save"**
7. Go back to your app and try signing in again

**Replace `your-project-name` with your actual Vercel domain!**

---

## Step 2: Check Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

**Verify these 5 variables exist:**

| Variable | Value Should Start With | Present? |
|----------|------------------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://oeccxntwqrlgwvretorl.supabase.co` | [ ] |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | [ ] |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | [ ] |
| `RESEND_API_KEY` | `re_hGfrnERR...` | [ ] |
| `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` | [ ] |

**⚠️ Important:**
- All 5 should be set for **Production** environment
- No spaces before/after the values
- No quotes around the values
- Exact copy from your `.env` file

**If any are missing or wrong:**
1. Add/fix them in Vercel settings
2. Go to **Deployments** tab
3. Click ⋯ on latest deployment
4. Click **Redeploy**

---

## Step 3: Check Browser Console for Errors

1. While stuck on sign-in, press **F12** (open DevTools)
2. Go to **Console** tab
3. Look for errors (red text)

**Common errors and fixes:**

### Error: "Failed to fetch" or CORS error
**Fix:** Check Supabase URL configuration (Step 1)

### Error: "Invalid redirect URL"
**Fix:** Add your Vercel URL to Supabase allowed redirects (Step 1)

### Error: "Network request failed"
**Fix:** Check environment variables (Step 2)

### Error: "Cookie not set" or "Session error"
**Fix:** Check middleware configuration (Step 4 below)

---

## Step 4: Check Network Tab

1. Press **F12** → **Network** tab
2. Try signing in again
3. Look for requests to Supabase

**What to check:**

### Request to: `https://oeccxntwqrlgwvretorl.supabase.co/auth/v1/token`
- **Status should be:** 200 OK
- **If 400/401:** Wrong credentials
- **If 500:** Server error (check Supabase dashboard)
- **If pending forever:** Redirect URL issue (go to Step 1)

### Request stuck on: `https://your-app.vercel.app/auth/callback`
- **Fix:** Middleware issue, see Step 5 below

---

## Step 5: Verify Middleware Configuration

The middleware might be blocking auth callbacks.

**Check your Vercel deployment logs:**
1. Vercel Dashboard → **Deployments**
2. Click on latest deployment
3. Click **View Function Logs**
4. Look for middleware errors

**If you see middleware errors, the matcher might be wrong.**

---

## Step 6: Check Supabase Logs

1. Go to Supabase Dashboard
2. Click **Logs** in left sidebar
3. Look for auth errors

**Common issues:**
- "User not found" → User doesn't exist
- "Invalid credentials" → Wrong password
- "Too many requests" → Rate limited (wait 1 minute)

---

## Step 7: Try Incognito/Private Window

Sometimes cached cookies cause issues:

1. Open **Incognito/Private window**
2. Go to your Vercel URL
3. Try signing in

**If it works in incognito:**
- Clear cookies in regular browser
- Or continue using incognito for testing

---

## Step 8: Test with New Account

Instead of signing in, try **signing up** a new account:

1. Go to `/signup`
2. Create a brand new account with a different email
3. See if signup works

**If signup works but login doesn't:**
- Your existing user might have issues
- Check Supabase → Authentication → Users

---

## Quick Diagnosis Checklist

Check these in order:

- [ ] Vercel URL added to Supabase redirect URLs? (MOST COMMON FIX)
- [ ] All 5 environment variables set in Vercel?
- [ ] Environment variables match `.env` exactly?
- [ ] Redeployed after adding env vars?
- [ ] Browser console shows any errors?
- [ ] Network tab shows request stuck?
- [ ] Tried in incognito window?
- [ ] Tried creating new account instead of login?

---

## Nuclear Option: Fresh Redeploy

If nothing else works:

```bash
# Locally, make a tiny change
echo "# Redeploy" >> README.md

# Commit and push
git add .
git commit -m "fix: Force redeploy for auth issue"
git push

# Vercel will auto-redeploy
```

---

## Still Stuck? Gather This Info:

1. **Your Vercel URL:** `https://_____.vercel.app`
2. **Browser console errors:** (copy/paste any red errors)
3. **Network tab:** Which request is stuck? (URL and status)
4. **Supabase dashboard logs:** Any auth errors?
5. **Tried incognito?** Yes/No
6. **Tried signup vs login?** Which one stuck?

---

## Expected Behavior (When Working)

**Sign-in flow:**
1. Enter email/password
2. Click "Sign In"
3. Request to Supabase (< 1 second)
4. Redirect to dashboard (< 1 second)
5. Total time: **1-3 seconds**

**If taking longer than 5 seconds → something is wrong**

---

## Most Likely Culprit

**90% of stuck auth issues are:**

1. **Supabase redirect URLs not configured** (Step 1)
2. **Missing NEXT_PUBLIC_SUPABASE_URL** (Step 2)
3. **Cached cookies** (Step 7)

**Start with Step 1 - it fixes most issues!**

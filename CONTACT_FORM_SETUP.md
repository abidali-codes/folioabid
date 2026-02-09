# Contact Form Email Setup (2 Minutes)

Your contact form is now ready to send emails! Just follow these 3 simple steps:

## Step 1: Get Your Free API Key
1. Go to https://web3forms.com
2. Enter your email address (where you want to receive messages)
3. Click "Get Access Key"
4. Copy the access key they send to your email

## Step 2: Add the Key to Your Code
1. Open `client/src/pages/Contact.tsx`
2. Find line with `access_key: "YOUR_WEB3FORMS_ACCESS_KEY"`
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key

Example:
```typescript
access_key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

## Step 3: Test It!
1. Fill out your contact form
2. Submit it
3. Check your email inbox - you should receive the message!

## That's It! 🎉

No backend setup, no email server configuration, no SMTP settings needed. Web3Forms handles everything for you.

### Features:
- ✅ Free forever (up to 250 submissions/month)
- ✅ No backend code needed
- ✅ Spam protection included
- ✅ Email notifications
- ✅ Works immediately

### Need More Submissions?
If you need more than 250/month, Web3Forms has affordable paid plans starting at $5/month.

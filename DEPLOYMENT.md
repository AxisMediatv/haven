# Haven Deployment Guide

## Deploying to Vercel

### Prerequisites
- Vercel account
- OpenAI API key
- Google Sheets API key (already configured)

### Environment Variables

Set these environment variables in your Vercel project settings:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Or deploy via GitHub**:
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy

### Environment Variables Setup

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Production, Preview, Development

### Google Sheets Integration

The Google Sheets integration is already configured with:
- **API Key**: `AIzaSyDcrlt_20kQugjaQ67myqz9aw_hZtvJivY`
- **Sheet ID**: `1zw3n2BUdnNM0pAcxPq7A39HqE0BC8_g2jtjYyV2GD6U`

### Production Features

✅ **Server-side API calls** - OpenAI API key is secure on the server
✅ **No client-side setup** - Users can chat immediately
✅ **Google Sheets integration** - Personalized knowledge base
✅ **Crisis detection** - Automatic crisis response
✅ **Mobile responsive** - Works on all devices

### Cost Management

- OpenAI API costs are billed to your account
- Vercel hosting is free for hobby projects
- Monitor usage in OpenAI dashboard
- Set up billing alerts if needed

### Security

- API keys are stored securely in Vercel environment variables
- No sensitive data is exposed to the client
- CORS is properly configured for API endpoints
- Crisis detection runs server-side

### Monitoring

- Check Vercel function logs for API errors
- Monitor OpenAI API usage and costs
- Set up alerts for high usage
- Test crisis detection regularly 
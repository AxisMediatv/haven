# Haven - Mental Health Chat Support

A production-ready React-based mental health chat application with OpenAI integration and Google Sheets knowledge base support.

## Features

- **AI-Powered Mental Health Support**: Compassionate responses using OpenAI's GPT-3.5-turbo
- **Crisis Detection**: Automatic detection of crisis keywords with immediate resource provision
- **Google Sheets Integration**: Personalized knowledge base from Google Sheets for enhanced support
- **Production Ready**: No setup required - users can chat immediately
- **Server-side Security**: API keys stored securely on the server
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Google Sheets Integration

Haven includes Google Sheets API integration to provide personalized mental health support:

- **Knowledge Base**: Fetches data from your Google Sheet to provide context-aware responses
- **Smart Search**: Searches through your knowledge base to find relevant information
- **Personalized Support**: Combines your knowledge base with AI responses for more relevant help

### Setup

The app is pre-configured with:
- **Sheet ID**: `1zw3n2BUdnNM0pAcxPq7A39HqE0BC8_g2jtjYyV2GD6U`
- **API Key**: `AIzaSyDcrlt_20kQugjaQ67myqz9aw_hZtvJivY`

### Knowledge Base Format

Your Google Sheet should have:
- **Headers**: First row contains column headers (e.g., "Topic", "Advice", "Resources")
- **Data**: Subsequent rows contain your knowledge base entries
- **Flexible Structure**: The system adapts to your sheet structure

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- OpenAI API key (for deployment)

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd haven
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Vercel.

## Usage

1. **Start Chatting**: Users can begin chatting immediately - no setup required
2. **Personalized Support**: The app automatically uses your Google Sheets knowledge base
3. **Crisis Support**: If crisis keywords are detected, immediate resources are provided
4. **Secure**: All API calls are made server-side with secure environment variables

## Crisis Resources

If you're experiencing a mental health crisis:
- **Emergency**: Call 911 (US/Canada)
- **Suicide Prevention**: Call 988 (US)
- **Crisis Text Line**: Text HOME to 741741 (US)

## Technology Stack

- **Frontend**: React 18
- **Backend**: Vercel Serverless Functions
- **Styling**: CSS3 with modern gradients and animations
- **AI**: OpenAI GPT-3.5-turbo
- **Data**: Google Sheets API
- **Icons**: Lucide React
- **Deployment**: Vercel

## Production Features

✅ **Zero Setup**: Users can chat immediately without any configuration
✅ **Secure API Keys**: All sensitive data stored server-side
✅ **Google Sheets Integration**: Personalized knowledge base
✅ **Crisis Detection**: Automatic crisis response
✅ **Mobile Responsive**: Works on all devices
✅ **Cost Management**: You control OpenAI usage and costs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions about the mental health features, please reach out through the appropriate channels. Remember, this is not a replacement for professional mental health care.
Commit changes

# CompareGenie - Insurance Policy Comparison Tool

CompareGenie is a web-based application that uses AI to compare insurance policy documents and provide detailed analysis of differences, coverage changes, and recommendations.

## Features

- **File Upload**: Upload two PDF policy documents (up to 50MB each)
- **Automatic Compression**: Compress PDFs for faster processing
- **Policy Type Detection**: Automatically detect policy subtypes using AI
- **AI-Powered Comparison**: Detailed side-by-side policy analysis
- **Professional Reports**: Generate customer and agent summaries
- **Export Options**: Download PDF reports or send via email
- **Unified Settings**: Configure LLM providers and comparison parameters

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-4 (with Gemini and Azure OpenAI placeholders)
- **File Processing**: PDF compression and text extraction

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (required for AI analysis)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd compare-genie
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
# Add other API keys as needed
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:8000](http://localhost:8000) in your browser.

## Usage

### 1. Upload Documents
- Navigate to the "Compare Documents" page
- Upload two PDF policy documents
- Select policy type (Personal or Commercial)

### 2. Configure Settings
- Go to Settings to configure:
  - AI provider (OpenAI, Gemini, Azure OpenAI)
  - Comparison parameters for different policy types
  - Custom analysis prompts

### 3. Run Comparison
- Click "Compare Documents" to start analysis
- Watch the progress animation as the AI processes your documents
- Review detailed results with multiple views

### 4. Export Results
- Download PDF reports
- Send reports via email
- Share insights with clients or colleagues

## API Endpoints

### File Management
- `POST /api/upload` - Upload PDF documents
- `POST /api/compress` - Compress uploaded PDFs

### AI Analysis
- `POST /api/detect` - Detect policy subtypes
- `POST /api/compare` - Compare policy documents

### Export
- `POST /api/export` - Generate PDF or send email reports

## Configuration

### LLM Providers

**OpenAI (Active)**
- Requires `OPENAI_API_KEY`
- Supports GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- Used for policy analysis and comparison

**Google Gemini (Placeholder)**
- Requires `GEMINI_API_KEY`
- Ready for integration when API access is available

**Azure OpenAI (Placeholder)**
- Requires `AZURE_OPENAI_API_KEY` and `AZURE_OPENAI_ENDPOINT`
- Enterprise-ready integration placeholder

### Comparison Parameters

**Personal Insurance**
- Deductibles, Coverage Limits, Endorsements
- Exclusions, Premiums

**Commercial Insurance**
- Liability Limits, Property Coverage
- Business Interruption, Endorsements, Deductibles

## Development

### Project Structure
```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── upload/         # File upload page
│   ├── settings/       # Configuration page
│   └── results/        # Results display page
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── ...            # Custom components
└── lib/               # Utility functions
```

### Key Components
- `FileUpload`: Handles PDF file uploads with validation
- `ComparisonAnimation`: Shows progress during AI analysis
- `SettingsForm`: Unified configuration interface
- `ResultsDisplay`: Multi-tab results presentation

### API Integration
- All AI calls use OpenAI's chat completions API
- Fallback responses ensure functionality without API access
- Error handling and user feedback throughout

## Deployment

### Environment Variables
Ensure all required environment variables are set:
- `OPENAI_API_KEY` - Required for AI functionality
- `SMTP_*` variables - Required for email exports
- Other API keys as needed

### Build and Deploy
```bash
npm run build
npm start
```

## Security Considerations

- API keys are stored securely in environment variables
- File uploads are validated for type and size
- User inputs are sanitized before AI processing
- No sensitive data is logged or stored permanently

## Troubleshooting

### Common Issues

**API Key Errors**
- Verify OpenAI API key is correctly set in `.env.local`
- Check API key permissions and billing status

**File Upload Issues**
- Ensure files are PDF format and under 50MB
- Check browser console for detailed error messages

**AI Analysis Failures**
- App includes fallback responses for demonstration
- Check network connectivity and API status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the troubleshooting section
- Review API documentation
- Contact your development team

---

**Note**: This application is designed for insurance professionals and requires appropriate API access for full functionality. Demo data is provided for testing purposes.

# Smartcore API Client

A TypeScript-based API client for interacting with the Smartcore API, featuring automatic token refresh and comprehensive error handling.

## Features

- 🔐 Automatic token management and refresh
- 📝 Comprehensive logging
- ⚡ Type-safe API calls
- 🔄 Request interceptors for authentication
- 🛡️ Error handling with detailed logging

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/smartcore-api-client.git

# Install dependencies
pnpm install

# Copy environment file and modify with your credentials
cp .env.example .env
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
SMARTCORE_BASE_URL=https://smartcore.prod.finamaze.com
SMARTCORE_EMAIL=your-email
SMARTCORE_PASSWORD=your-password
```

## Usage

```typescript
import { login } from './services/smartcore.service';
import { smartcoreApi } from './services/smartcore.api';

// Login to get access token
await login();

// Make API calls
const holdings = await smartcoreApi.getReconciliationHoldings('123');
```

## Development

```bash
# Start in development mode
pnpm start

# Build for production
pnpm build

# Clean build files
pnpm clean
```

## Project Structure

```
src/
├── config/
│   └── index.ts         # Configuration management
├── services/
│   ├── smartcore.api.ts    # API endpoint implementations
│   └── smartcore.service.ts # Core service with auth handling
└── utils/
    └── logger.ts        # Logging utility
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
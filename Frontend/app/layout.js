// app/layout.js
import './globals.css'; // Global CSS
import Header from '../components/Header'; // Import Header
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { ThemeProvider } from './context/ThemeContext'; // Import Theme Provider

export const metadata = {
    title: 'Artiura',
    description: 'Personalized content aggregation platform',
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider
            afterSignInUrl="/dashboard" // Redirect to dashboard after signing in
            afterSignUpUrl="/dashboard" // Redirect to dashboard after signing up
            afterSignOutUrl="/" // Redirect to the home page after signing out
        >
            <ThemeProvider>
                <html lang="en">
                    <body>
                        <Header />
                        <SignedIn>{children}</SignedIn>
                        <SignedOut>
                            {/* Render the homepage when signed out */}
                            {children}
                        </SignedOut>
                    </body>
                </html>
            </ThemeProvider>
        </ClerkProvider>
    );
}
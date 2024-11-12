// app/login/page.js
import React from 'react';
import { SignIn } from '@clerk/nextjs';

export default function Login() {
    return (
        <div className="login-page-container">
            <h2>Login to Artiura</h2>
            {/* Clerk's SignIn component handles the authentication */}
            <SignIn
                path="/login"
                routing="path"
                signUpUrl="/signup" // Redirect to signup if the user needs an account
                afterSignInUrl="/dashboard" // Redirect to the dashboard after login
            />
        </div>
    );
}
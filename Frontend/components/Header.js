'use client'; // Ensure client-side rendering

import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1 className="logo">
                <Link href="/">Artiura</Link>
            </h1>
            <nav>
                <ul className="nav-links">
                    {/* Adjust Home link based on sign-in state */}
                    <SignedIn>
                        <li>
                            <Link href="/dashboard">Home</Link>
                        </li>
                    </SignedIn>

                    <SignedOut>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                    </SignedOut>

                    {/* About link */}
                    <li><Link href="/about">About</Link></li>

                    {/* Settings link visible when signed in */}
                    <SignedIn>
                        <li>
                            <Link href="/settings">Settings</Link>
                        </li>
                    </SignedIn>

                    {/* Show SignInButton when signed out */}
                    <SignedOut>
                        <li>
                            <SignInButton mode="modal">
                                <button className="sign-in-btn">Login</button>
                            </SignInButton>
                        </li>
                    </SignedOut>

                    {/* Show UserButton when signed in */}
                    <SignedIn>
                        <li>
                            <UserButton afterSignOutUrl="/" />
                        </li>
                    </SignedIn>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
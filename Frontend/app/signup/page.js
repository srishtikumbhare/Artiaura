// app/signup/page.js
import { SignUp } from '@clerk/nextjs';

const SignupPage = () => {
    return (
        <div>
            <SignUp path="/signup" routing="path" signInUrl="/login" />
        </div>
    );
};

export default SignupPage;
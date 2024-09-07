import React from 'react';
import Head from 'next/head';

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy | InterviewGenie</title>
                <meta name="description" content="Privacy Policy for InterviewGenie - AI-Powered Interview Question Generator" />
            </Head>
            <div className='w-screen dark:bg-neutral-900'>
            <div className="mx-auto px-4 py-8 max-w-4xl dark:bg-neutral-900 dark:text-neutral-100">
                    <h1 className="text-3xl font-bold mb-6 dark:text-gray-300">Privacy Policy for InterviewGenie</h1>
                    <p className="mb-4 dark:text-gray-300">Last updated: 9/8/2024</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">1. Introduction</h2>
                        <p className="dark:text-gray-300">Welcome to InterviewGenie. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">2. The data we collect about you</h2>
                        <p className="dark:text-gray-300">We collect and store the following information:</p>
                        <ul className="list-disc pl-8 mt-2 dark:text-gray-300">
                            <li>User name</li>
                            <li>Email address</li>
                            <li>Profile photo</li>
                            <li>Session data</li>
                            <li>Query and chat data</li>
                            <li>Saved content</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">3. How we use your personal data</h2>
                        <p className="dark:text-gray-300">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-8 mt-2 dark:text-gray-300">
                            <li>To provide and improve our services to you.</li>
                            <li>To personalize your experience on our platform.</li>
                            <li>To manage your account and maintain our relationship with you.</li>
                            <li>To analyze usage patterns and improve our website functionality.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">4. Data storage and security</h2>
                        <p className="dark:text-gray-300">We store your data in Supabase PostgreSQL databases with Row Level Security (RLS) enabled. This ensures that your data is protected and can only be accessed by authorized processes and individuals. We have implemented appropriate technical and organizational measures to secure your personal data.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">5. Use of AI services</h2>
                        <p className="dark:text-gray-300">When you use our service to generate interview questions or other content, your queries may be sent to external AI services, including:</p>
                        <ul className="list-disc pl-8 mt-2 dark:text-gray-300">
                            <li>OpenAI's GPT-4 API</li>
                            <li>Google's Gemini API</li>
                        </ul>
                        <p className="mt-2 dark:text-gray-300">These services process your queries to generate responses. We do not share your personal information with these services beyond what is necessary to process your specific requests.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">6. Data retention</h2>
                        <p className="dark:text-gray-300">We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">7. Your legal rights</h2>
                        <p className="dark:text-gray-300">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">8. Third-party links</h2>
                        <p className="dark:text-gray-300">This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">9. Changes to the privacy policy</h2>
                        <p className="dark:text-gray-300">We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">10. Contact us</h2>
                        <p className="dark:text-gray-300">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                        <p className="mt-2 dark:text-gray-300">
                            Email: abhinavay2003@gmail.com<br />
                            InterviewGenie<br />
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
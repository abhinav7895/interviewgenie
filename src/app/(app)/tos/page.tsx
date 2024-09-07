import React from 'react';
import Head from 'next/head';

const TermsOfService: React.FC = () => {
    return (
        <>
            <Head>
                <title>Terms of Service | InterviewGenie</title>
                <meta name="description" content="Terms of Service for InterviewGenie - AI-Powered Interview Question Generator" />
            </Head>
            <div className='w-screen dark:bg-neutral-900'>
                <div className="mx-auto px-4 py-8 max-w-4xl dark:bg-neutral-900 dark:text-neutral-100">
                    <h1 className="text-3xl font-bold mb-6 dark:text-gray-300">Terms of Service for InterviewGenie</h1>
                    <p className="mb-4 dark:text-gray-300">Last updated: 9/8/2024</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">1. Introduction</h2>
                        <p className="dark:text-gray-300">Welcome to InterviewGenie. These Terms of Service govern your use of our website and services. By accessing or using InterviewGenie, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">2. Use of Service</h2>
                        <p className="dark:text-gray-300">Our service allows you to generate interview questions and related content using AI technology. You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account and password.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">3. User Content</h2>
                        <p className="dark:text-gray-300">You retain all rights to any content you submit, post or display on or through the service. By submitting, posting or displaying content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your content in any existing or future media.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">4. Intellectual Property</h2>
                        <p className="dark:text-gray-300">The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of InterviewGenie and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of InterviewGenie.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">5. Termination</h2>
                        <p className="dark:text-gray-300">We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. Upon termination, your right to use the service will immediately cease.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">6. Limitation of Liability</h2>
                        <p className="dark:text-gray-300">In no event shall InterviewGenie, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">7. Disclaimer</h2>
                        <p className="dark:text-gray-300">Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
                    </section>

                  
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">8. Changes to Terms</h2>
                        <p className="dark:text-gray-300">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">9. Contact Us</h2>
                        <p className="dark:text-gray-300">If you have any questions about these Terms, please contact us at:</p>
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

export default TermsOfService;
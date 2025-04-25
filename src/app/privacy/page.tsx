import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Privacy() {
    return (
        <div className="min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto p-24 text-gray-800">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">
                Effective Date: 4/25/25 <br />
                Last Updated: 4/25/25
            </p>
            <p className="mb-6">
                Negotiation.AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values your privacy. This Privacy
                Policy explains how we collect, use, and protect your information. By
                using our services, you agree to this policy.
            </p>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                <p className="mb-2">We may collect the following types of information:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Personal information you provide (e.g., name, email)</li>
                    <li>Device and usage information (e.g., IP address, browser type)</li>
                    <li>Any information voluntarily submitted through forms or interactions</li>
                </ul>
                <p className="mt-2">
                    We do not knowingly collect data from children under 13.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
                <p className="mb-2">We use your information only for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Providing and improving our services</li>
                    <li>Responding to inquiries</li>
                    <li>Ensuring security and compliance</li>
                </ul>
                <p className="mt-2">
                    We <strong>do not sell</strong> your personal information. <br />
                    We may share information with trusted service providers only as needed
                    to operate our platform.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">3. Your Choices and Rights</h2>
                <p className="mb-2">
                    Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Access or correct your information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of communications</li>
                </ul>
                <p className="mt-2">
                    To make a request, email:{" "}
                    <a href="mailto:tlboyer3s@gmail.com" className="text-blue-600 underline">
                    tlboyer3s@gmail.com
                    </a>
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
                <p>
                    We take reasonable measures to protect your information. However, no
                    method of transmission or storage is 100% secure, and we cannot
                    guarantee absolute security.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    5. Disclaimer &amp; Limitation of Liability
                </h2>
                <ul className="list-disc list-inside ml-4 space-y-1 mb-2">
                    <li>
                        Any damages (direct, indirect, incidental) resulting from your use of
                        our services or any data breaches
                    </li>
                    <li>
                        Any third-party links or services you choose to interact with
                    </li>
                    <li>
                        Changes you do not notice due to not revisiting this policy
                    </li>
                </ul>
                <p>Use our service at your own risk.</p>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">6. Policy Updates</h2>
                <p>
                    We reserve the right to update or change this policy at any time.
                    Updates will be posted here. Continued use of our services after changes
                    means you accept the updated policy.
                </p>
            </section>
        
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
                <p>
                    If you have questions or concerns, contact us at{" "}
                    <a href="mailto:tlboyer3s@gmail.com" className="text-blue-600 underline">
                    tlboyer3s@gmail.com
                    </a>
                </p>
            </section>
        </div>
        <Footer />
        </div>
    );
}

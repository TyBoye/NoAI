import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";



export default function Terms() {

    
    return (
        <div className="min-h-screen">
        <Navbar/>
        <main className="max-w-3xl mx-auto p-24 text-gray-800">
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: 4/25/25</p>
  
        <p className="mb-6">
          Please read these Terms of Service carefully before using the Negotiation.AI service operated by Bit by Bit.
        </p>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Conditions of Use</h2>
            <p>
            By accessing or using this website, you certify that you have read, understood, and agree to be bound by these terms.
            If you do not agree to these terms, you should immediately cease use of the site and services. Bit by Bit only grants
            use and access to its website, products, and services to those who accept and comply with these terms.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">2. Privacy Policy</h2>
            <p>
            Before continuing to use our site, please review our{" "}
                <Link href="/privacy" className="text-blue-600 underline">
                Privacy Policy
                </Link>{" "}
                to understand how we collect, use, and protect your personal data.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Age Restriction</h2>
            <p>
                You must be at least 13 years of age to use this website. By using this site, you confirm that you meet this
                requirement and are legally able to enter into this agreement. Negotiation.AI is not responsible for any
                misrepresentation of age.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
            <p>
                All materials, content, and services on this site, including but not limited to trademarks, logos, text,
                graphics, software, and design, are the property of Negotiation.AI or its licensors. You agree not to reproduce,
                distribute, or create derivative works from any content found on this site without express written permission.
            </p>
            <p className="mt-2">
                For any intellectual property claims or concerns, please contact us directly to resolve the issue.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. User Accounts</h2>
            <p>
                When registering an account with Negotiation.AI, you agree to provide accurate and complete information. You are
                solely responsible for maintaining the confidentiality of your account credentials and for all activities under
                your account.
            </p>
            <p className="mt-2">
                Notify us immediately if you suspect any unauthorized use of your account. We reserve the right to terminate accounts,
                remove content, or cancel services at our sole discretion.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">6. Applicable Law</h2>
            <p>
                By using this site, you agree that the laws of the State of Missouri, without regard to conflict of laws principles,
                will govern these Terms and any dispute that may arise between you and Negotiation.AI or its affiliates.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">7. Dispute Resolution</h2>
            <p>
                Any disputes related to your use of this website shall be resolved in the state or federal courts located in Missouri.
                You consent to the exclusive jurisdiction and venue of such courts.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">8. Indemnification</h2>
            <p>
                You agree to indemnify and hold harmless Negotiation.AI, its affiliates, officers, employees, and agents from any
                claims, damages, or expenses arising from your use or misuse of the website or services. We reserve the right to
                choose our legal counsel.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">9. Limitation of Liability</h2>
            <p>
                Negotiation.AI will not be held liable for any direct, indirect, incidental, consequential, or punitive damages
                resulting from your use of the site or services, including but not limited to data loss or system failure.
            </p>
        </section>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">10. Modifications</h2>
            <p>
                We reserve the right to change, update, or revise these Terms of Service at any time. Users will be notified of
                significant changes via email or site notification. Continued use of the site after changes indicates acceptance
                of the new terms.
            </p>
        </section>
      </main>
      <Footer />
      </div>
    );
}
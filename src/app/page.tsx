import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BrainCog, Zap, Building2 } from 'lucide-react'
import Chat from '@/app/assets/test3.svg'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <section className="pt-24 md:pt-36 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Master The Art Of
            <span className="text-[#ff914d]"> Negotiation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice your negotiation skills with our AI-powered chatbot. Get real-time feedback and improve with every conversation.  
          </p>
          <div className="flex justify-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="bg-[#ff914d] text-white" 
                variant='outline' 
                size='lg'>
                  Start Practicing Today
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-[#ff914d] text-white" 
                variant='outline' 
                size='lg'>
                  Start Practicing Today
                </Button>
              </Link>
            </SignedIn>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-md">
                <Image
                  src={Chat}
                  width={600}
                  height={700}
                  alt="Negotiation Chat Sample Data"
                />
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Practice with NegotiationAI?
          </h2>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="flex flex-col shadow-2xl px-8 py-12 transition-all duration-300 hover:shadow-orange-200 hover:scale-105">
                <CardTitle className=" text-4xl text-[#ff914d] flex justify-center">
                  <span className="bg-[#ff914d] rounded-full p-4 transition-all duration-300 hover:bg-orange-400">
                  <Building2 className="text-white"/>
                  </span>
                </CardTitle>
                <CardHeader className="text-[#ff914d] flex justify-center font-bold text-lg">Realistic Scenarios</CardHeader>
                <CardDescription className="flex justify-center text-md">Practice in a variety of real-world situations. Weather its a business deal or salary negotiation</CardDescription>
              </Card>
              <Card className="flex flex-col shadow-2xl px-8 py-12 transition-all duration-300 hover:shadow-orange-200 hover:scale-105">
                <CardTitle className=" text-4xl text-[#ff914d] flex justify-center">
                  <span className="bg-[#ff914d] rounded-full p-4 transition-all duration-300 hover:bg-orange-400">
                  <Zap className="text-white"/>
                  </span>
                </CardTitle>
                <CardHeader className="text-[#ff914d] flex justify-center font-bold text-lg">Instant Feedback</CardHeader>
                <CardDescription className="flex justify-center text-md">Get real-time analysis of your negotiation tactics and suggestions for improvement.</CardDescription>
              </Card>
              <Card className="flex flex-col shadow-2xl px-8 py-12 transition-all duration-300 hover:shadow-orange-200 hover:scale-105">
                <CardTitle className=" text-4xl text-[#ff914d] flex justify-center">
                  <span className="bg-[#ff914d] rounded-full p-4 transition-all duration-300 hover:bg-orange-400">
                  <BrainCog className="text-white"/>
                  </span>
                </CardTitle>
                <CardHeader className="text-[#ff914d] flex justify-center font-bold text-lg">Learn Techniques</CardHeader>
                <CardDescription className="flex justify-center text-md">Master proven negotiation strategies and apply them in your practice lessons.</CardDescription>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-[#d8b48b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">Ready to Improve Your Negotiation Skills?</h2>
          <p className="text-md md:text-lg text-white mb-8">Be among the few who take the first step and turn every negotiation into a win.</p>
          <div className="flex justify-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                className="bg-[#ff914d] text-white hover:bg-orange-400" 
                variant='default' 
                size='default'>
                  Sign Up Today
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button 
                className="bg-[#ff914d] text-white opacity-80 hover:bg-orange-400"
                variant='default' 
                size='default'>
                  Start Practicing Today
                </Button>
              </Link>
            </SignedIn>
          </div>
          <Button
            className="mt-4 opacity-80"
            variant="default"
            size="lg">
              Learn More
            </Button>
        </div>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

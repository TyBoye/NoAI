import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BrainCog, Zap, Building2 } from 'lucide-react'
import Chat from '@/app/assets/chatlog.svg'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <section className="pt-42 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Master The Art Of
            <span className="text-orange-600"> Negotiation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice your negotiation skills with our AI-powered chatbot. Get real-time feedback and improve with every conversation.  
          </p>
          <div className="flex justify-center gap-4">
            
            <Button
            className="bg-orange-500 text-white"
            variant='outline'
            size='lg'>
            <Link 
              href="#learn-more" 
              className="font-semibold "
            >
              Start Practicing Today
            </Link>
            </Button>
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
              <Card className="flex flex-col shadow-2xl px-8 py-12">
                <CardTitle className=" text-4xl text-orange-600 flex justify-center">
                  <span className="bg-amber-500 rounded-full p-4">
                  <Building2 className="text-white"/>
                  </span>
                </CardTitle>
                <CardHeader className="text-orange-600 flex justify-center font-bold text-lg">Realistic Scenarios</CardHeader>
                <CardDescription className="flex justify-center text-md">Practice in a variety of real-world situations. Weathers its a business deal or salary negotiation</CardDescription>
              </Card>
              <Card className="flex flex-col shadow-2xl px-8 py-12">
                <CardTitle className=" text-4xl text-orange-600 flex justify-center">
                  <span className="bg-amber-500 rounded-full p-4">
                  <Zap className="text-white"/>
                  </span>
                </CardTitle>
                <CardHeader className="text-orange-600 flex justify-center font-bold text-lg">Instant Feedback</CardHeader>
                <CardDescription className="flex justify-center text-md">Get real-time analysis of your negotiation tactics and suggestions for improvement.</CardDescription>
              </Card>
              <Card className="flex flex-col shadow-2xl px-8 py-12">
                <CardTitle className=" text-4xl text-orange-600 flex justify-center">
                  <span className="bg-amber-500 rounded-full p-4">
                  <BrainCog className="text-white"/>
                  </span>
                </CardTitle>
                <CardHeader className="text-orange-600 flex justify-center font-bold text-lg">Learn Techniques</CardHeader>
                <CardDescription className="flex justify-center text-md">Master proven negotition strategies and apply them in your practice lessions.</CardDescription>
               
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

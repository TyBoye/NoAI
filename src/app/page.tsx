import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
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
              Start a Chat Now
            </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Practice with NegotiationAI?
          </h2>
          <div className="">

            <div className="flex columns-3 items-center justify-between">
              <Card className="flex justify-center">
                <CardHeader className="font-extralight">
                  Realistic Scenarios
                </CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>Embrace The World of Negotiation using our AI.</CardDescription>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
              </Card>
              <Card className="flex justify-center">
                <CardHeader className="font-extralight">
                  Realistic Scenarios
                </CardHeader>
                <CardDescription>Embrace The World of Negotiation using our AI.</CardDescription>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
              </Card>
              <Card className="flex justify-center">
                <CardHeader className="font-extralight">
                  Realistic Scenarios
                </CardHeader>
                <CardDescription>Embrace The World of Negotiation using our AI.</CardDescription>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
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

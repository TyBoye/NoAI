import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
        <footer className="w-full sticky bg-orange-100 border-t">
            <div className="max-w-8xl mx-auto px-4">
                <div className="flex items-center justify-center h-16">
                    <div className="flex-shrink-0">

                        <Link href='#' className="font-bold">Negotiation AI</Link>
                    </div> 
                </div>       
                <p className="opacity-70 text-md flex justify-center">NegotiationAI. &copy; {currentYear} All Rights Reserved.</p>
                <span className="font-sm flex justify-center gap-2 ">
                <Link href="#">Privacy Policy</Link>
                   |  
                <Link href='#'> Terms</Link>
            </span>
            </div>
           

        
        </footer>
        </>
    )
}
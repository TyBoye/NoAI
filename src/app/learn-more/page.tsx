// 'use client';

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutUs() {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center gap-8 p-6 pt-16">
        <section className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-orange-500 mb-6">What is Negotiation AI</h1>
          <p className="max-w-xl text-gray-700">
            Welcome to <span className="text-orange-500">Negotiation.AI</span>! We built <span className="text-orange-500">Negotiation.AI</span> with one goal in mind: to make practicing
            negotiation skills easy, effective, and accessible to everyone.
            <br /><br />
            Negotiation is a skill that takes practice, and that&apos;s where we come in. <span className="text-orange-500">Negotiation.AI</span> offers an
            interactive chatbot, named <span className="text-orange-500">Neon</span>, designed to simulate real-life negotiation scenarios. Whether
            you&apos;re a student preparing for business school, a professional refining your persuasion tactics,
            or just someone who wants to boost their confidence, <span className="text-orange-500">Negotiation.AI</span> helps you build the skills to
            succeed.
            <br /><br />
            With user sign-in and account tracking, you can save progress, track performance, and get
            better over time with personalized feedback. Each session is designed to challenge you, adapt
            to your style, and help you improve where it counts.
          </p>
        </section>

        <section className="flex flex-col items-center text-center w-full max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-orange-500 mb-6">Who&apos;s Neon</h1>
          <p className="max-w-xl text-gray-700">
            Now time to meet the star of the show, <span className="text-orange-500">Neon</span>! <span className="text-orange-500">Neon</span> will be your interactive AI chatbot and coach
            in your negotiation journey. <span className="text-orange-500">Neon</span> will begin by giving you a small introduction to the practice and
            then will ask what you want to negotiate about. From there, <span className="text-orange-500">Neon</span> will make sure to practice with
            you however you prefer, allowing you the best practice experience you could ever have!
            <br /><br />
            As much as <span className="text-orange-500">Neon</span> likes to chat with people, it is very focused on helping you improve, and even
            enjoys it! It will make sure that all chats are about negotiation practice, and will make sure you
            stay on topic and not get sidetracked. Isn’t it awesome!?
          </p>
        </section>

        <section className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-orange-500 mb-6">About The Team</h1>
          <p className="max-w-xl text-gray-700">
            We are <span className="text-orange-500">Negotiation AI</span>! We are a group of Undergraduate students who all
            feel that negotiation is a skill that many people must gain. Every one of us have gone through
            situations where our negotiation tactics have failed, causing us to miss out on so many
            opportunities. After that, we all noticed that there isn’t really much one-on-one support when it
            comes to practicing negotiation skills (other than online tutorials), so we decided to change that
            by making something that could allow 24/7 support, and will be there to help you with all your
            negotiation needs; A CHATBOT! Through this idea, we decided to create <span className="text-orange-500">Neon</span> with the vision of
            allowing anyone the ability to practice at any time with no restrictions.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}


// type DropdownProps = {
//   title: string;
//   children?: React.ReactNode;
// };

// function Dropdown({ title, children }: DropdownProps) {
//   const [open, setOpen] = React.useState(false);
//   return (
//     <div className="bg-gray-200 rounded-md p-3 mb-2 shadow">
//       <button
//         className="w-full flex justify-between items-center text-left font-medium text-gray-800"
//         onClick={() => setOpen(!open)}
//       >
//         <span className="font-bold">{title}</span>
//         <span className="text-orange-500">{open ? "▲" : "▼"}</span>
//       </button>
//       {open && <div className="mt-2 text-gray-700">{children}</div>}
//     </div>
//   );
// }
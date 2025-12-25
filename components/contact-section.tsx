"use client";
import ContactCard from "@/components/ui/contact-card";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-20">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Contact Card */}
        <div className="flex justify-center items-center md:justify-center">
          <ContactCard />
        </div>

        {/* Right Column - Text Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-lg  mb-8 leading-relaxed">
            I'm always excited to collaborate on innovative projects or discuss
            new opportunities. Reach out through any of my social channels!
          </p>
          <p className="text-sm mb-4">
            Connect with me on social media or explore more of my work above
          </p>
          <div className="flex items-center gap-2 text-sm">
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m22 6-10 7L2 6"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
           
              arganzapatrick@gmail.com
          
          </div>
        </div>
      </div>
    </section>
  );
}

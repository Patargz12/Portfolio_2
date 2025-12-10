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
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            I'm always excited to collaborate on innovative projects or discuss
            new opportunities. Reach out through any of my social channels!
          </p>
          <p className="text-sm text-muted-foreground">
            Connect with me on social media or explore more of my work above
          </p>
        </div>
      </div>
    </section>
  );
}

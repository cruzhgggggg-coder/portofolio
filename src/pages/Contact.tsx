import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, MapPin, Phone, Hexagon } from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-brand-primary font-mono text-xs uppercase tracking-widest mb-4 block">Connection</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-8">Initiate <br /><span className="text-gradient">Contact</span></h1>
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              Have a vision that needs a digital structure? Let's discuss how we can build something extraordinary together.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-brand-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Direct Email</h4>
                  <p className="text-lg font-display font-medium">hello@luminescent.arch</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-brand-secondary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Base of Operations</h4>
                  <p className="text-lg font-display font-medium">Neo-Tokyo, Sector 7</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-brand-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Encrypted Line</h4>
                  <p className="text-lg font-display font-medium">+81 (0) 90-ARCH-ITECT</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Hexagon className="w-32 h-32 text-brand-primary animate-spin-slow" />
            </div>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-brand-primary/20 flex items-center justify-center rounded-full mb-8">
                  <Send className="w-10 h-10 text-brand-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-4">Transmission Received</h3>
                <p className="text-white/50">Your message has been successfully encrypted and sent. I will respond shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-brand-primary font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Identity</label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Frequency</label>
                    <input
                      required
                      type="email"
                      placeholder="Your Email"
                      className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="Project Inquiry"
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Transmission</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your vision..."
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="mt-4 w-full py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? "Encrypting..." : "Send Transmission"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

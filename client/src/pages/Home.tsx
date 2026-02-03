import { motion } from "framer-motion";
import { ArrowRight, Code, Layers, Palette } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Building robust, scalable web applications with modern technologies like React, Node.js, and TypeScript."
    },
    {
      icon: Layers,
      title: "UI/UX Design",
      description: "Crafting intuitive and user-centered interfaces that delight users and solve complex problems."
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Creating stunning visual identities and brand assets that communicate your message effectively."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,102,204,0.05),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              Hi, I'm Adil Ali.<br />
              <span className="text-muted-foreground">I build & design</span> <br />
              <span className="hero-text-gradient">digital products.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              A multidisciplinary creative combining technical expertise with design sensibility. 
              Specializing in full-stack development, UI/UX, and visual design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio">
                <Button size="lg" className="rounded-full text-base px-8 h-12 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  View My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full text-base px-8 h-12 border-2 hover:bg-secondary/50">
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-foreground text-background rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary blur-[100px]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-400 blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Let's work together
              </h2>
              <p className="text-lg md:text-xl text-background/70 mb-10">
                Have a project in mind? Let's turn your vision into reality with code and design.
              </p>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="rounded-full h-14 px-10 text-lg font-semibold bg-white text-foreground hover:bg-white/90 shadow-xl"
                >
                  Start a Project <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

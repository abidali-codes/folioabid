import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Code, Layers, Palette } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [textRevealed, setTextRevealed] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Trigger text reveal after blueprint phase
    const timer = setTimeout(() => setTextRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const gradientX = useTransform(mouseX, [0, 800], [0, 30]);
  const gradientY = useTransform(mouseY, [0, 400], [0, 30]);

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
      <section className="relative pt-20 pb-16 md:pt-24 lg:pt-32 md:pb-20 lg:pb-32 px-4 md:px-6 overflow-hidden">
        {/* Animated ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,102,204,0.05),transparent_40%)] pointer-events-none animate-ambient-pulse" />
        <div className="absolute inset-0 opacity-[0.015] bg-noise pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
            onMouseMove={handleMouseMove}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 md:mb-8 overflow-visible">
              {/* Blueprint to final reveal */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block relative"
              >
                <motion.span
                  className="blueprint-text"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: textRevealed ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Hi, I'm Nadeem Saeed.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: textRevealed ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0"
                >
                  Hi, I'm Nadeem Saeed.
                </motion.span>
              </motion.span>
              <br />
              <motion.span
                className="text-muted-foreground inline-block relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.span
                  className="blueprint-text"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: textRevealed ? 0 : 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  I build & design
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: textRevealed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-0 left-0"
                >
                  I build & design
                </motion.span>
              </motion.span>
              <br />
              {/* Digital products with gradient and effects */}
              <span className="inline-block relative" style={{ paddingBottom: '0.1em' }}>
                <motion.span
                  className="blueprint-text"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: textRevealed ? 0 : 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  digital products.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: textRevealed ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="absolute top-0 left-0 hero-text-gradient-dynamic whitespace-nowrap"
                  style={{
                    backgroundImage: useTransform(
                      [gradientX, gradientY],
                      ([x, y]) => 
                        `linear-gradient(${135 + (x as number) / 20}deg, #3366CC ${20 + (y as number) / 10}%, #5B8FE5 ${50 + (x as number) / 15}%, #7BA8F0 ${80 - (y as number) / 10}%)`
                    ),
                  }}
                >
                  digital products.
                </motion.span>
                {/* Light sweep effect */}
                {textRevealed && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none light-sweep"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 1.2,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mb-8 md:mb-10 leading-relaxed">
              A multidisciplinary creative combining technical expertise with design sensibility. 
              Specializing in full-stack development, UI/UX, and visual design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio">
                <Button size="lg" className="magnetic-button w-full sm:w-auto rounded-full text-base px-8 h-12 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  View My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="magnetic-button w-full sm:w-auto rounded-full text-base px-8 h-12 border-2 hover:bg-secondary/50">
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card p-6 md:p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-foreground text-background rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 lg:p-20 relative overflow-hidden text-center">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary blur-[60px] md:blur-[100px]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-indigo-400 blur-[50px] md:blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                Let's work together
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-background/70 mb-8 md:mb-10">
                Have a project in mind? Let's turn your vision into reality with code and design.
              </p>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="w-full sm:w-auto rounded-full h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-semibold bg-white text-foreground hover:bg-white/90 shadow-xl"
                >
                  Start a Project <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

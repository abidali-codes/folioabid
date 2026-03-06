import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-lg">Nadeem Saeed.</p>
          <p className="text-sm text-muted-foreground mt-1">Creating digital experiences that matter.</p>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <a href="https://github.com/abidali-codes" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary rounded-full">
            <Github className="w-5 h-5" />
          </a>
          
          <a href="mailto:codenergy26@gmail.com" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary rounded-full">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}

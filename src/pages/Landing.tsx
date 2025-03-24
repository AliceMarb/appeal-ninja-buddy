import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, MessageSquare, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white py-4 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              Claim<span className="text-foreground">Buddy</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
          </nav>
          <Link to="/form">
            <Button size="sm">
              Start Your Appeal
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 pt-16 pb-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in animation-delay-100">
                Your ally against <span className="text-primary">unjust claim</span> denials
              </h1>
                <p className="text-lg text-muted-foreground">
                Empowering patients against unfair health insurance claim denials.
                </p>
                <div className="pt-4">
                  <Link to="/form">
                    <Button size="lg" className="rounded-full px-8 gap-2">
                      Start Your Appeal <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/appeal_buddy.png" 
                  alt="Person working on insurance appeal" 
                  className="rounded-lg shadow-lg w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Appeal Solutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer multiple ways to fight your insurance claim denial, tailored to your specific situation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Appeal Letters</CardTitle>
                  <CardDescription>
                    Professionally crafted appeal letters that challenge claim denials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI-powered system helps you draft compelling appeal letters that cite relevant policy provisions and medical necessities.
                  </p>
                  <Link to="/form" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                    Get started <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Clinician Outreach</CardTitle>
                  <CardDescription>
                    Get your clinicians on your side
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    We help you coordinate with your healthcare providers to update or correct medical codes that may be causing claim rejections.
                  </p>
                  <Link to="/form" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                    Get started <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Settlement Negotiation</CardTitle>
                  <CardDescription>
                    Negotiate with insurance companies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    When appeals fail, we provide expert guidance on how to negotiate a settlement with your insurance company to reduce your financial burden.
                  </p>
                  <Link to="/form" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                    Get started <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process makes appealing your denied claim simple and effective.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  1
                </div>
                <h3 className="font-medium mb-2">Share Your Information</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your denial and upload relevant documents.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  2
                </div>
                <h3 className="font-medium mb-2">Get Your Appeal Plan</h3>
                <p className="text-sm text-muted-foreground">
                  We'll generate a customized appeal strategy and letter.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  3
                </div>
                <h3 className="font-medium mb-2">Submit Your Appeal</h3>
                <p className="text-sm text-muted-foreground">
                  Send the appeal to your insurance company following our instructions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  4
                </div>
                <h3 className="font-medium mb-2">Track & Follow Up</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your appeal status with our guidance every step of the way.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/form">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  Start Your Appeal Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Fight Your Insurance Denial?</h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              Don't let insurance companies deny you the coverage you deserve. Start your appeal process today.
            </p>
            <Link to="/form">
              <Button variant="secondary" size="lg" className="rounded-full px-8 gap-2">
                Start Your Appeal <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">ClaimBuddy</h3>
              <p className="text-sm">
                Your advocate in the fight against unfair insurance claim denials.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/form" className="hover:text-white transition-colors">Appeal Letters</Link></li>
                <li><Link to="/form" className="hover:text-white transition-colors">Clinician Outreach</Link></li>
                <li><Link to="/form" className="hover:text-white transition-colors">Settlement Negotiation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>support@claimbuddy.com</li>
                <li>(800) 123-4567</li>
                <li>Mon-Fri: 9am - 6pm EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} ClaimBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Notebook, Layers, CalendarCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/logo';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  const features = [
    {
      icon: <Notebook className="w-8 h-8 text-primary" />,
      title: 'Notes Management',
      description: 'Easily create, organize, and access your study notes from anywhere.',
    },
    {
      icon: <Layers className="w-8 h-8 text-primary" />,
      title: 'AI Flashcard Generation',
      description: 'Automatically generate flashcards from your notes to supercharge your learning.',
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-primary" />,
      title: 'Study Planner',
      description: 'Set study goals, track your progress, and build a consistent study habit.',
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: 'AI Study Assistant',
      description: 'Chat with your AI assistant for help, explanations, and study support.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Unlock Your Potential with <span className="text-primary">StudyAI</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              The all-in-one platform to organize your studies, create smart learning tools, and get instant AI-powered help. Study smarter, not harder.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started For Free <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Succeed</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                StudyAI integrates powerful tools into one seamless experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Image Section */}
        {heroImage && (
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="aspect-[3/2] w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        width={1200}
                        height={800}
                        className="w-full h-full object-cover"
                        data-ai-hint={heroImage.imageHint}
                        priority
                    />
                </div>
            </section>
        )}
      </main>

      <footer className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center text-muted-foreground">
          <p className="text-sm">&copy; {new Date().getFullYear()} StudyAI. All rights reserved.</p>
          <div className="flex gap-4">
             <Logo />
          </div>
        </div>
      </footer>
    </div>
  );
}

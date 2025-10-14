import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cinematic-nature-scene-with-person-in-meditation-o.jpg"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance">
            Everything you want physically, you must first have mentally.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We help you realign your mind for peak performance and personal evolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/about">
                Explore Amor Fati
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Work With Us</Link>
            </Button>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/journal">Join the Newsletter</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-foreground/30 rounded-full" />
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-balance">
            Realign. Rebuild. Rise.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Where mindset meets manifestation.
          </p>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-balance">
            "We don't fix people. We realign them."
          </blockquote>
          <p className="text-muted-foreground">— Amor Fati</p>
        </div>
      </section>

      {/* Core Message */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">Your next chapter starts here</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">Shift your frequency. Shape your future.</p>
          <div className="pt-6">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/offerings">
                Explore Our Offerings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

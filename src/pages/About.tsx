import { Card } from "@/components/ui/card";
import { Heart, Target, Eye, Users, TrendingUp, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Dignity & Respect",
      description: "Every worker deserves respect, fair wages, and professional treatment."
    },
    {
      icon: Users,
      title: "Empowerment",
      description: "We empower workers with training, certification, and career opportunities."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in verification, training, and service quality."
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "We support continuous learning and career advancement for all workers."
    }
  ];

  const impact = [
    { number: "2,000+", label: "Workers Trained" },
    { number: "500+", label: "Families Served" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "50%", label: "Average Income Increase" }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero */}
      <section className="pt-24 pb-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">About HouseAid</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Transforming domestic work in Kenya through technology, training, and respect
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To professionalize domestic work in Kenya by connecting verified workers with families 
                through technology, while ensuring fair wages, legal contracts, and career development 
                opportunities for workers.
              </p>
            </Card>
            <Card className="p-8">
              <div className="w-16 h-16 gradient-secondary rounded-xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                A Kenya where domestic work is recognized as a professional career with dignity, 
                respect, and fair compensation. We envision a future where every domestic worker 
                has access to training, career growth, and social protection.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Founder's Story</h2>
            </div>
            <Card className="p-8 lg:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 gradient-primary rounded-full flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground mb-4">
                    Growing up in Nairobi, we witnessed the struggles of domestic workers firsthand. 
                    Many skilled, hardworking individuals were trapped in informal arrangements with 
                    no contracts, unfair wages, and limited opportunities for growth.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    At the same time, families struggled to find trustworthy, verified workers. 
                    The lack of a formal system created anxiety for employers and exploitation for workers.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    HouseAid was born from a simple belief: technology can bridge this gap. 
                    By creating a platform that verifies workers, provides training, ensures fair wages, 
                    and gives both parties the security they need, we can transform an entire industry 
                    and improve thousands of lives.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at HouseAid
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-medium transition-shadow">
                  <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Making a real difference in the lives of workers and families
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-lg text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Social Impact Statement</h2>
            </div>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground mb-4">
                HouseAid is more than a platform – it's a movement to transform domestic work in Kenya. 
                We believe that domestic workers deserve the same professional opportunities, respect, 
                and social protections as workers in any other industry.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Through our platform, we've helped thousands of workers:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Increase their income by an average of 50% through fair wage guidelines</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Gain formal contracts and legal protections</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Access free training and professional certifications</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Build professional careers with dignity and respect</span>
                </li>
              </ul>
              <p className="text-lg text-muted-foreground">
                We're committed to continuous improvement and expansion, with a goal to impact 
                100,000 workers and families across Kenya by 2026.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact/Partnership CTA */}
      <section className="py-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a potential partner, investor, or supporter, we'd love to hear from you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                Contact Us
              </button>
            </a>
            <a href="/join">
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
                Partnership Opportunities
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
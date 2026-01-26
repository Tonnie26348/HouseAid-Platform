import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "5 Essential Skills Every Professional Domestic Worker Should Have",
      excerpt: "Discover the key skills that make domestic workers stand out and how HouseAid's training programs help develop them.",
      category: "Training",
      author: "Mercy Wambui",
      date: "March 15, 2024",
      image: "gradient-primary"
    },
    {
      id: 2,
      title: "Understanding Your Rights: A Guide for Domestic Workers in Kenya",
      excerpt: "Learn about your legal rights, fair wages, and how formal contracts protect you as a domestic worker.",
      category: "Worker Rights",
      author: "Tonny Kakumu",
      date: "March 12, 2024",
      image: "gradient-secondary"
    },
    {
      id: 3,
      title: "How to Create the Perfect Job Description for Domestic Workers",
      excerpt: "Tips for employers on writing clear, fair job descriptions that attract the right candidates.",
      category: "For Employers",
      author: "Sarah Mwangi",
      date: "March 10, 2024",
      image: "bg-success"
    },
    {
      id: 4,
      title: "The Importance of Background Checks in Domestic Work",
      excerpt: "Why verification matters and how HouseAid's thorough screening process protects families.",
      category: "Safety",
      author: "David Omondi",
      date: "March 8, 2024",
      image: "gradient-primary"
    },
    {
      id: 5,
      title: "Success Story: From Informal Work to Professional Career",
      excerpt: "How Jane Wanjiku transformed her career through HouseAid's training and certification programs.",
      category: "Success Stories",
      author: "Jane Wanjiku",
      date: "March 5, 2024",
      image: "gradient-secondary"
    },
    {
      id: 6,
      title: "Home Management Tips: Creating a Positive Work Environment",
      excerpt: "Advice for families on building respectful, professional relationships with domestic workers.",
      category: "Home Management",
      author: "Grace Akinyi",
      date: "March 1, 2024",
      image: "bg-success"
    }
  ];

  const categories = ["All", "Training", "Worker Rights", "For Employers", "Safety", "Success Stories", "Home Management"];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">HouseAid Blog & Insights</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Tips, stories, and updates about domestic work, training, and building better relationships
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-square gradient-primary" />
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                    Featured
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    March 15, 2024
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  The Future of Domestic Work in Kenya: Technology and Dignity
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Exploring how technology platforms like HouseAid are transforming the domestic work industry, 
                  ensuring fair wages, legal protections, and career development for workers across Kenya.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 gradient-primary rounded-full" />
                  <div>
                    <p className="font-semibold">Tonny Kakumu Mutea</p>
                    <p className="text-sm text-muted-foreground">Founder, HouseAid</p>
                  </div>
                </div>
                <Button className="w-fit">
                  Read Full Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Recent Articles</h2>
            <p className="text-lg text-muted-foreground">
              Insights and stories from the HouseAid community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-medium transition-shadow">
                <div className={`aspect-video ${post.image}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 lg:p-12 text-center max-w-3xl mx-auto gradient-hero text-primary-foreground">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to our newsletter for the latest tips, stories, and updates from HouseAid
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button size="lg" variant="secondary">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

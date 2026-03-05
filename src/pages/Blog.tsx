import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Bookmark, Share2, Search, Zap, Clock } from "lucide-react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "5 Essential Skills for Modern Domestic Professionals",
      excerpt: "The industry is changing. Here's how to stay competitive in Kenya's growing premium domestic market.",
      category: "Professionalism",
      author: "Mercy Wambui",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Legal Guide: Your Rights as a Worker in Kenya",
      excerpt: "Everything you need to know about the latest labor laws, minimum wage, and contract protection.",
      category: "Worker Rights",
      author: "Tonny Kakumu",
      date: "Mar 12, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Hiring Right: The Household Manager's Playbook",
      excerpt: "A comprehensive guide for employers looking to build a long-term, professional relationship with staff.",
      category: "For Employers",
      author: "Sarah Mwangi",
      date: "Mar 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "The Importance of Vetting in Domestic Safety",
      excerpt: "Why background checks aren't just a formality, but a necessity for modern home security.",
      category: "Safety",
      author: "David Omondi",
      date: "Mar 08, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1557060169-dfc0f157bb99?auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      title: "Success Story: Building a Career with HouseAid",
      excerpt: "How professional certification helped Jane double her income and find a stable future.",
      category: "Success Stories",
      author: "Jane Wanjiku",
      date: "Mar 05, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
    },
    {
      id: 6,
      title: "Culinary Excellence: The Future of Home Dining",
      excerpt: " मास्टर basic nutrition and gourmet techniques to stand out as a premier home chef.",
      category: "Training",
      author: "Grace Akinyi",
      date: "Mar 01, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80"
    }
  ];

  const categories = ["All Insights", "Training", "Safety", "Success Stories", "Worker Rights", "Employer Tips"];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Premium Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-gray-900 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80')] bg-cover bg-fixed" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-primary/20 text-primary border-none mb-6 px-4 py-1.5 text-sm font-bold">HouseAid Journal</Badge>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight">Stories, Guides <br /> & <span className="text-primary">Inspiration.</span></h1>
            
            <div className="max-w-2xl mx-auto relative mt-12">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
               <Input 
                 placeholder="Search for articles, guides, and news..." 
                 className="h-16 pl-12 rounded-2xl bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:ring-primary backdrop-blur-md"
               />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Bar */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((cat, i) => (
              <Button 
                key={i} 
                variant={i === 0 ? "default" : "ghost"}
                className={cn("rounded-full font-bold px-6", i === 0 ? "" : "text-gray-500")}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden group">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-[400px] lg:h-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt="Featured Article"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-primary text-white border-none px-4 py-1.5 font-bold shadow-lg shadow-primary/20">Featured Story</Badge>
                  </div>
                </div>
                <div className="p-10 lg:p-20 flex flex-col justify-center bg-gray-50">
                  <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 12 min read</span>
                    <span>•</span>
                    <span>March 15, 2024</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
                    The Evolution of Domestic <br /> Excellence in East Africa.
                  </h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
                    How HouseAid is redefining the standards of professionalism and dignity 
                    in the modern household management industry.
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">TK</div>
                      <div>
                        <p className="font-bold text-gray-900">Tonny Kakumu</p>
                        <p className="text-xs font-bold text-gray-400 uppercase">CEO, HouseAid</p>
                      </div>
                    </div>
                    <Button size="lg" className="rounded-xl h-14 px-8 font-bold shadow-lg shadow-primary/20">
                      Read More <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Grid Posts */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
             <h3 className="text-3xl font-black text-gray-900 tracking-tight">Recent Insights</h3>
             <Button variant="ghost" className="font-bold text-primary">View All Articles</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={post.image} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={post.title} 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-gray-900 border-none font-bold px-3 py-1">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                      <span>•</span>
                      {post.readTime}
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-500">
                           {post.author.charAt(0)}
                         </div>
                         <span className="text-sm font-bold text-gray-700">{post.author}</span>
                       </div>
                       <div className="flex gap-2">
                         <Button variant="ghost" size="icon" className="rounded-full"><Bookmark className="w-4 h-4" /></Button>
                         <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Premium Design */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20 text-white">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
             <div className="relative z-10 max-w-3xl mx-auto">
               <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Stay Ahead of the Curve.</h2>
               <p className="text-xl text-primary-foreground/80 mb-12 font-medium">
                 Get the latest guides on home management, professional skills, and 
                 industry updates delivered directly to your inbox.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                 <Input 
                   placeholder="Your email address" 
                   className="h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-primary-foreground/50 focus:ring-white" 
                 />
                 <Button size="lg" variant="secondary" className="h-14 px-10 rounded-2xl font-black shadow-xl">
                   Subscribe
                 </Button>
               </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Blog;


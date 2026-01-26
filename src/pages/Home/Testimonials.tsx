import React from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import testimonialSarah from "@/assets/testimonial-sarah.jpg";
import testimonialJane from "@/assets/testimonial-jane.jpg";
import testimonialDavid from "@/assets/testimonial-david.jpg";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = [
    {
      name: "Sarah Mwangi",
      location: "Employer, Nairobi",
      image: testimonialSarah,
      text: "HouseAid helped me find a verified, professional nanny for my kids. The GPS tracking and digital payments make everything so much easier!",
    },
    {
      name: "Jane Wanjiku",
      location: "Domestic Worker",
      image: testimonialJane,
      text: "The training I received through HouseAid changed my life. I now have a formal contract and earn fair wages with benefits!",
    },
    {
      name: "David Omondi",
      location: "Family, Mombasa",
      image: testimonialDavid,
      text: "Finding reliable house help was always stressful. HouseAid's verification process gives us complete peace of mind.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">What People Say</h2>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-grow-0 flex-shrink-0 w-full md:w-1/3 px-4">
                <Card className="p-8 h-full bg-white shadow-lg rounded-xl">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 text-lg">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="icon" onClick={scrollPrev}>&larr;</Button>
          <Button variant="outline" size="icon" onClick={scrollNext}>&rarr;</Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;


import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { fadeInVariants, slideUpVariants } from "@/lib/animations";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const socialLinks = [
  {
    icon: "fas fa-envelope",
    color: "bg-primary/20 text-primary",
    title: "Email",
    value: "hansgunawan775@gmail.com",
    href: "mailto:hansgunawan775@gmail.com"
  },
  {
    icon: "fas fa-phone",
    color: "bg-accent/20 text-accent",
    title: "Phone",
    value: "+6289-673-280-495",
    href: "tel:+6289673280495"
  },
  {
    icon: "fab fa-github",
    color: "bg-primary/20 text-primary",
    title: "GitHub",
    value: "github.com/Shenhan01-sys",
    href: "https://github.com/Shenhan01-sys"
  },
];

const socialMediaLinks = [
  { icon: "fab fa-twitter", href: "#" },
  { icon: "fab fa-instagram", href: "#" },
  { icon: "fab fa-youtube", href: "#" },
];

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: data.message,
      });
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="heading-font text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="contact-title"
          >
            Mari Berkolaborasi
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={fadeInVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="heading-font text-2xl font-semibold mb-6" data-testid="contact-info-title">
                Hubungi Saya
              </h3>
              <p className="text-lg text-muted-foreground mb-8" data-testid="contact-info-description">
                Saya selalu terbuka untuk membahas peluang kolaborasi, proyek menarik, atau sekadar berbincang tentang teknologi dan data.
              </p>

              <div className="space-y-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.title}
                    href={link.href}
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity duration-300"
                    whileHover={{ x: 10 }}
                    data-testid={`contact-link-${index}`}
                  >
                    <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center`}>
                      <i className={link.icon}></i>
                    </div>
                    <div>
                      <div className="font-semibold">{link.title}</div>
                      <div className="text-muted-foreground">{link.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4" data-testid="social-media-title">Follow Me</h4>
                <div className="flex gap-4">
                  {socialMediaLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="social-icon w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      whileHover={{ 
                        scale: 1.2,
                        y: -5,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      data-testid={`social-link-${index}`}
                    >
                      <i className={social.icon}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={slideUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Masukkan nama lengkap Anda"
                    className="contact-input mt-2"
                    data-testid="input-name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1" data-testid="error-name">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="nama@example.com"
                    className="contact-input mt-2"
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1" data-testid="error-email">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    rows={5}
                    placeholder="Ceritakan tentang proyek atau kolaborasi yang Anda inginkan..."
                    className="contact-input mt-2 resize-none"
                    data-testid="input-message"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1" data-testid="error-message">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending || isSubmitted}
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-4 rounded-lg font-semibold hover:from-primary/90 hover:to-accent/90 transition-all duration-300 glow-effect"
                  data-testid="button-submit-form"
                >
                  {contactMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Mengirim...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <i className="fas fa-check mr-2"></i>
                      Terkirim!
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

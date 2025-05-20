
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CauseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  
  // Mock cause data (would be fetched from API using the id)
  const cause = {
    id: id,
    title: 'Clean Water Initiative',
    tagline: 'Providing clean drinking water to communities in need.',
    description: 'Providing clean drinking water to communities in need.',
    story: `<p class="mb-4">Access to clean water is a fundamental human right, yet millions around the world lack access to this basic necessity. The Clean Water Initiative focuses on bringing sustainable clean water solutions to communities facing water scarcity and contamination issues.</p>
            <p class="mb-4">Our approach combines innovative water purification technology with community engagement and education programs. This ensures not only immediate access to clean water but also long-term sustainability of the projects.</p>
            <p class="mb-4">By sponsoring this cause, you'll be directly contributing to:</p>
            <ul class="list-disc pl-5 mb-4">
              <li>Installation of water filtration systems in 5 communities</li>
              <li>Well construction in areas with limited groundwater access</li>
              <li>Training of local technicians for system maintenance</li>
              <li>Education programs on water conservation and hygiene</li>
            </ul>
            <p>Your support will help us reach our goal of providing clean water to over 10,000 people this year.</p>`,
    heroImageUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2d5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    microStoryText: "In rural Ethiopia, Ayana used to walk 3 hours each way to collect water for her family. The water was often contaminated, causing frequent illness. Today, thanks to our Clean Water Initiative, she has access to clean water just 5 minutes from home, allowing her to attend school regularly.",
    microStoryImageUrl: "https://images.unsplash.com/photo-1532139677590-0b493aa3a323?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    raised: 12500,
    goal: 25000,
    impactIcons: [
      { icon: "Water", caption: "Clean Water Access" },
      { icon: "HeartPulse", caption: "Improved Health" },
      { icon: "GraduationCap", caption: "Education Opportunity" },
      { icon: "Clock", caption: "Time Saved" }
    ],
    keyStat: {
      number: 10000,
      unit: "people",
      description: "will gain access to clean water through this initiative"
    },
    monthlySupport: [
      { amount: 50, helps: "provide clean water to 5 people for a month", progress: 70 },
      { amount: 100, helps: "install and maintain a water filter for a family", progress: 60 },
      { amount: 250, helps: "train a local technician for system maintenance", progress: 40 },
      { amount: 500, helps: "contribute to well construction in a village", progress: 20 }
    ],
    monthlyBenefits: [
      "Consistent support for long-term planning",
      "Regular impact updates and stories",
      "Lower transaction costs, more money to the cause"
    ],
    partnerLogos: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    ],
    faqList: [
      {
        question: "How is my donation used?",
        answer: "100% of your donation goes directly to water projects. Our operational costs are covered by dedicated grants and corporate partnerships."
      },
      {
        question: "Can I specify where my donation goes?",
        answer: "Yes, you can choose to support specific regions or project types. Contact us for more details."
      },
      {
        question: "Are donations tax-deductible?",
        answer: "Yes, all donations are tax-deductible to the extent allowed by law."
      },
      {
        question: "How do you ensure the sustainability of projects?",
        answer: "We work with local communities to train technicians and establish maintenance protocols that ensure long-term success."
      },
      {
        question: "Can I visit the projects I support?",
        answer: "Yes, we organize donor trips annually. Contact us for upcoming opportunities."
      }
    ],
    category: 'Environment',
    status: 'open',
    location: 'Multiple Regions, East Africa',
    organizer: {
      name: 'Water For All Foundation',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    sponsors: [
      { 
        id: '1', 
        name: 'EcoSolutions Inc.', 
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        amount: 5000
      },
      { 
        id: '2', 
        name: 'Green Future Fund', 
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        amount: 3500
      }
    ],
    stories: [
      {
        name: "Ayana Desta",
        role: "beneficiary",
        quote: "Clean water has changed my life. I can go to school now instead of walking hours to collect water.",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Daniel Gebre",
        role: "beneficiary",
        quote: "Our community is healthier now. Children don't get sick as often.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Sarah Johnson",
        role: "supporter",
        quote: "I've seen firsthand how these water projects transform communities.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      }
    ],
    timeline: [
      {
        date: 'January 2025',
        milestone: 'Project Kickoff',
        description: 'Initial assessment and community engagement'
      },
      {
        date: 'March 2025',
        milestone: 'Phase 1 Implementation',
        description: 'First two water systems installed'
      },
      {
        date: 'June 2025',
        milestone: 'Education Program Launch',
        description: 'Community training on maintenance and hygiene'
      },
      {
        date: 'September 2025',
        milestone: 'Phase 2 Implementation',
        description: 'Remaining systems installed'
      },
      {
        date: 'December 2025',
        milestone: 'Project Completion',
        description: 'Final assessment and handover to community'
      }
    ],
    impact: {
      people: 10000,
      communities: 5,
      description: 'This project will provide clean water to 10,000 people across 5 communities, reducing waterborne diseases by an estimated 80% and saving an average of 3 hours daily spent collecting water.'
    }
  };

  // Mock imported icons from lucide-react
  const Icons = {
    Water: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    HeartPulse: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    GraduationCap: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  };

  const handleAction = () => {
    if (cause.status === 'open') {
      navigate(`/sponsor/new?causeId=${id}`);
    } else if (cause.status === 'sponsored') {
      navigate(`/claim/${id}`);
    } else {
      navigate(`/waitlist/${id}`);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: cause.title,
        text: cause.tagline,
        url: url,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 3000);
      navigator.clipboard.writeText(url);
    }
  };

  const CountUp = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    React.useEffect(() => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      const animationId = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(animationId);
    }, [target, duration]);
    
    return count;
  };

  return (
    <Layout>
      {/* 1. Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url(${cause.heroImageUrl})`,
            filter: 'brightness(0.4)'
          }}
        />
        <div className="container mx-auto px-4 py-16 relative z-10 text-center text-white">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {cause.title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {cause.tagline}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              onClick={handleAction}
              className="px-8 py-6 text-lg"
            >
              Support {cause.title}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-black"
              onClick={handleShare}
            >
              {isSharing ? "Link Copied!" : "Share Mission"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Key Statistic Banner */}
      <section className="bg-primary-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              <CountUp target={cause.keyStat.number} /> {cause.keyStat.unit}
            </p>
            <p className="text-xl max-w-2xl mx-auto">
              {cause.keyStat.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Impact Icons Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Our Impact Areas
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cause.impactIcons.map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      delay: index * 0.2,
                      duration: 0.5
                    } 
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                  {Icons[item.icon] ? <Icons[item.icon] /> : 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                </div>
                <p className="text-center font-medium">{item.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why It Matters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Why It Matters
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <blockquote className="text-xl italic border-l-4 border-primary-600 pl-4">
                {cause.microStoryText}
              </blockquote>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <img 
                src={cause.microStoryImageUrl} 
                alt="Impact story" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Stories Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Stories of Impact
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } }
            }}
          >
            Meet the people whose lives have been changed by this initiative
          </motion.p>
          
          <Carousel 
            opts={{ loop: true, align: 'start' }}
            className="w-full max-w-4xl mx-auto"
            setApi={(api) => {
              // Auto-advance every 5 seconds
              let interval;
              if (api) {
                interval = setInterval(() => {
                  api.scrollNext();
                }, 5000);
              }
              return () => clearInterval(interval);
            }}
          >
            <CarouselContent>
              {cause.stories.map((story, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={story.image} alt={story.name} />
                        <AvatarFallback>{story.name[0]}</AvatarFallback>
                      </Avatar>
                      <blockquote className="italic mb-4">"{story.quote}"</blockquote>
                      <div>
                        <p className="font-semibold">{story.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{story.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* 6. Impact Breakdown */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            How Your Monthly Support Helps
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } }
            }}
          >
            See the tangible difference your contributions make
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cause.monthlySupport.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      delay: index * 0.15,
                      duration: 0.5
                    } 
                  }
                }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-primary-600">${item.amount}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{item.helps}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-right">{item.progress}% funded</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Recurring Support Callout */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Benefits of Monthly Giving
            </motion.h2>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              {cause.monthlyBenefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-3">
                    {index === 0 ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : index === 1 ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-center">{benefit}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: 0.3, duration: 0.5 } 
                }
              }}
            >
              <Button 
                size="lg" 
                onClick={handleAction}
                className="px-10 py-6 text-lg"
              >
                Donate Monthly
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Transparency & Trust */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Transparency & Trust
          </motion.h2>
          
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {cause.partnerLogos.map((logo, index) => (
              <img 
                key={index}
                src={logo} 
                alt="Partner logo" 
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </motion.div>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 } 
              }
            }}
          >
            <div className="flex items-center border rounded-full px-4 py-2 bg-green-50 text-green-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">100% Utilization</span>
            </div>
            <div className="flex items-center border rounded-full px-4 py-2 bg-blue-50 text-blue-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">Tax Exempt</span>
            </div>
            <div className="flex items-center border rounded-full px-4 py-2 bg-yellow-50 text-yellow-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
          </motion.div>
          
          <div className="text-center">
            <Button variant="link" asChild>
              <a href="#">View Financial Reports</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. FAQ Accordion */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {cause.faqList.map((faq, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.5
                      } 
                    }
                  }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 10. Final CTAs */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 } 
              }
            }}
          >
            Your support can transform lives and communities through the {cause.title}.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.4, duration: 0.6 } 
              }
            }}
          >
            <Button 
              size="lg" 
              onClick={handleAction}
              className="px-10 py-6 text-lg bg-white text-primary-600 hover:bg-gray-100"
            >
              Support {cause.title}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary-600"
              onClick={() => navigate('/causes')}
            >
              Explore Other Causes
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CauseDetailsPage;

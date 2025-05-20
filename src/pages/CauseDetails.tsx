
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroSection from '@/components/cause-details/HeroSection';
import StatBanner from '@/components/cause-details/StatBanner';
import ImpactGrid from '@/components/cause-details/ImpactGrid';
import WhyItMatters from '@/components/cause-details/WhyItMatters';
import StoriesCarousel from '@/components/cause-details/StoriesCarousel';
import ImpactBreakdown from '@/components/cause-details/ImpactBreakdown';
import RecurringSupport from '@/components/cause-details/RecurringSupport';
import TransparencyTrust from '@/components/cause-details/TransparencyTrust';
import FaqAccordion from '@/components/cause-details/FaqAccordion';
import FinalCta from '@/components/cause-details/FinalCta';
import CauseIcons from '@/components/cause-details/CauseIcons';

const CauseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  
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

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection 
        title={cause.title}
        tagline={cause.tagline}
        heroImageUrl={cause.heroImageUrl}
        handleAction={handleAction}
        handleShare={handleShare}
        isSharing={isSharing}
      />

      {/* Key Statistic Banner */}
      <StatBanner 
        number={cause.keyStat.number}
        unit={cause.keyStat.unit}
        description={cause.keyStat.description}
      />

      {/* Impact Icons Grid */}
      <ImpactGrid 
        items={cause.impactIcons}
        Icons={CauseIcons}
      />

      {/* Why It Matters */}
      <WhyItMatters 
        microStoryText={cause.microStoryText}
        microStoryImageUrl={cause.microStoryImageUrl}
      />

      {/* Stories Carousel */}
      <StoriesCarousel 
        stories={cause.stories}
      />

      {/* Impact Breakdown */}
      <ImpactBreakdown 
        items={cause.monthlySupport}
      />

      {/* Recurring Support Callout */}
      <RecurringSupport 
        benefits={cause.monthlyBenefits}
        handleAction={handleAction}
      />

      {/* Transparency & Trust */}
      <TransparencyTrust 
        partnerLogos={cause.partnerLogos}
      />

      {/* FAQ Accordion */}
      <FaqAccordion 
        faqs={cause.faqList}
      />

      {/* Final CTAs */}
      <FinalCta 
        title={cause.title}
        handleAction={handleAction}
      />
    </Layout>
  );
};

export default CauseDetailsPage;


import { Story } from '@/models/Story';

// Mock data for development - would be replaced with real API calls
const mockStats = {
  totalSponsors: 37,
  totalClaimers: 142,
  totalBagsSponsored: 1250, 
  totalBagsClaimed: 873,
  activeCampaigns: 12
};

const mockStories: Story[] = [
  {
    id: '1',
    title: 'How my sponsored bags helped a local shelter',
    authorName: 'Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    content: 'When I decided to sponsor 100 tote bags for the homeless shelter in my community, I had no idea what impact it would make. The shelter director told me that having quality, durable bags allowed many of their clients to carry their belongings with dignity. One woman even used her bag for job interviews, carrying her resume and a change of clothes. Three months later, she secured stable employment.',
    excerpt: 'When I decided to sponsor 100 tote bags for the homeless shelter in my community, I had no idea what impact it would make...',
    createdAt: new Date('2025-04-15'),
  },
  {
    id: '2',
    title: 'My eco-friendly journey with CauseConnect',
    authorName: 'Miguel Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    content: 'I claimed my first CauseConnect tote bag six months ago, and it changed how I shop. No more plastic bags at the grocery store! I carry my tote everywhere, and so many people have asked about it. I love explaining how it supports the ocean cleanup initiative. The QR code on the bag has even led three of my friends to claim their own bags.',
    excerpt: 'I claimed my first CauseConnect tote bag six months ago, and it changed how I shop. No more plastic bags at the grocery store!...',
    createdAt: new Date('2025-05-02'),
  },
  {
    id: '3',
    title: 'Small business, big impact',
    authorName: 'Taylor Williams',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    content: 'As a small coffee shop owner, I wasn\'t sure if sponsoring tote bags would be worth the investment. But seeing our brand carried around town by people who care about the same causes we do has been incredible marketing. We\'ve had new customers come in specifically because they saw our logo on a bag and looked us up. The ROI has exceeded our expectations!',
    excerpt: 'As a small coffee shop owner, I wasn\'t sure if sponsoring tote bags would be worth the investment. But seeing our brand carried around town...',
    createdAt: new Date('2025-04-22'),
  }
];

// In a real app, these would make actual API calls
export const fetchStats = async () => {
  // In a real app: const response = await fetch('/api/stats');
  // return response.json();
  return mockStats;
};

export const fetchStories = async (): Promise<Story[]> => {
  // In a real app: const response = await fetch('/api/stories');
  // return response.json();
  return mockStories;
};

export const submitStory = async (storyData: Omit<Story, 'id' | 'excerpt' | 'createdAt'>): Promise<Story> => {
  // In a real app, this would post to an API
  // const response = await fetch('/api/stories', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(storyData)
  // });
  // return response.json();
  
  // For now, we'll create a mock response
  const newStory: Story = {
    id: (mockStories.length + 1).toString(),
    ...storyData,
    excerpt: storyData.content.slice(0, 150) + '…',
    createdAt: new Date()
  };
  
  mockStories.push(newStory);
  return newStory;
};

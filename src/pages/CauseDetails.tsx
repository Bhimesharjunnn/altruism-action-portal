import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { fetchCause } from '@/services/apiServices';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from "@/components/ui/separator"
import {
  Droplet,
  Users,
  Heart,
  Leaf,
  Link2,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface CauseDetailsParams {
  id: string;
}

const Icons: Record<string, () => JSX.Element> = {
  droplet: () => <Droplet className="w-6 h-6" />,
  users: () => <Users className="w-6 h-6" />,
  heart: () => <Heart className="w-6 h-6" />,
  leaf: () => <Leaf className="w-6 h-6" />
};

const CauseDetails = () => {
  const { id } = useParams<CauseDetailsParams>();

  const { data: cause, isLoading, isError } = useQuery({
    queryKey: ['cause', id],
    queryFn: () => fetchCause(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <main className="container mx-auto py-16 px-4">
          <section className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </section>
          <Separator className="my-6" />
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="h-64 w-full" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardContent className="space-y-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  if (isError || !cause) {
    return (
      <Layout>
        <main className="container mx-auto py-16 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>Failed to load cause details.</p>
            <Link to="/causes" className="text-blue-500">Go back to causes</Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="container mx-auto py-16 px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:underline">Home</Link> &gt;
          <Link to="/causes" className="hover:underline"> Causes</Link> &gt;
          <span> {cause.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{cause.title}</h1>
          <p className="text-gray-600">
            {cause.description}
          </p>
        </section>

        <Separator className="my-6" />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image and Story */}
          <div className="md:col-span-1">
            <img
              src={cause.imageUrl}
              alt={cause.title}
              className="w-full h-64 object-cover rounded-md shadow-md"
            />
            <div className="mt-4 space-y-4">
              <h2 className="text-xl font-semibold">Story</h2>
              <p className="text-gray-700">{cause.story}</p>
            </div>
          </div>

          {/* Details and Sponsors */}
          <div className="md:col-span-1 space-y-4">
            {/* Cause Details Card */}
            <Card>
              <CardContent className="space-y-3">
                <h2 className="text-lg font-semibold">Cause Details</h2>
                <div className="flex items-center gap-2">
                  {Icons[cause.category] ? Icons[cause.category]() : <Heart className="w-6 h-6" />}
                  <span>{cause.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Global</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Published {format(new Date(cause.createdAt), 'PPP', { locale: enUS })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Updated {formatDistanceToNow(new Date(cause.updatedAt), { addSuffix: true, locale: enUS })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-gray-500" />
                  <a href="#" className="text-blue-500 hover:underline">
                    Visit Website <ExternalLink className="w-3 h-3 inline-block ml-1" />
                  </a>
                </div>
                <div>
                  <Badge variant="secondary">
                    {cause.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Sponsors Card */}
            <Card>
              <CardContent className="space-y-3">
                <h2 className="text-lg font-semibold">Sponsors</h2>
                {cause.sponsors.length > 0 ? (
                  <ul className="space-y-2">
                    {cause.sponsors.map((sponsor) => (
                      <li key={sponsor._id} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{sponsor.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No sponsors yet. Be the first!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CauseDetails;

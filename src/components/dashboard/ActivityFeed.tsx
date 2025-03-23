
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Calendar, Gift, Package, Award } from 'lucide-react';

interface Activity {
  id: string;
  activity_type: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
}

const ActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (error: any) {
      console.error("Error fetching activities:", error);
      toast({
        title: "Error fetching activities",
        description: error.message || "An error occurred while loading your activity feed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (activity: Activity) => {
    switch (activity.activity_type) {
      case 'pickup_scheduled':
        return <Calendar className="h-5 w-5 text-primary" />;
      case 'device_recycled':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'device_donated':
        return <Gift className="h-5 w-5 text-purple-500" />;
      case 'device_added':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'certification_earned':
        return <Award className="h-5 w-5 text-amber-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-600">Pending</span>;
      case 'completed':
        return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">Completed</span>;
      case 'achieved':
        return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">Achieved</span>;
      default:
        return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-display">Recent Activity</CardTitle>
          <CardDescription>
            Track your recent e-waste activities
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => fetchActivities()}>
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-6">
            <Clock className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">Loading your activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No activities yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your e-waste recycling and donation activities will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(activity)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{activity.title}</h3>
                    {getStatusBadge(activity.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(activity.created_at)}</p>
                </div>
              </div>
            ))}
            
            <div className="pt-2 flex justify-center">
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;

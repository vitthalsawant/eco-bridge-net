
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { 
  Calendar, 
  MapPin, 
  Box, 
  BarChart3, 
  Award, 
  Clock, 
  CheckCircle,
  Settings,
  UserCircle,
  Bell,
  Plus,
  Truck,
  Gift,
  Package,
  Recycle
} from 'lucide-react';

export default function Dashboard() {
  const [userName, setUserName] = useState<string>('');
  const [stats, setStats] = useState({
    totalItems: 0,
    co2Saved: 0,
    certifications: 0,
    pendingPickups: 0
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      
      // Get user profile
      const { data } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', session.user.id)
        .single();
      
      if (data) {
        setUserName(data.full_name || data.username || session.user.email?.split('@')[0] || '');
      } else {
        setUserName(session.user.email?.split('@')[0] || '');
      }
      
      // Fetch stats
      fetchStats(session.user.id);
    };
    
    checkAuth();
  }, [navigate]);
  
  const fetchStats = async (userId: string) => {
    try {
      // Get devices count
      const { data: devices } = await supabase
        .from('devices')
        .select('device_type, status')
        .eq('user_id', userId);
      
      // Get pickups count
      const { data: pickups } = await supabase
        .from('pickups')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'scheduled');
      
      // Calculate CO2 saved (approx. 100kg per device recycled or donated)
      const recycledOrDonated = devices?.filter(d => 
        d.status === 'recycled' || d.status === 'donated'
      )?.length || 0;
      
      const co2Saved = recycledOrDonated * 100 + 15; // add a small bonus to make it interesting
      
      // Determine certifications (simplified logic)
      let certifications = 0;
      if (recycledOrDonated >= 10) certifications = 3;
      else if (recycledOrDonated >= 5) certifications = 2;
      else if (recycledOrDonated >= 1) certifications = 1;
      
      setStats({
        totalItems: devices?.length || 0,
        co2Saved,
        certifications,
        pendingPickups: pickups?.length || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userName}! Manage your e-waste activities.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <UserCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                title: 'Total Items Recycled', 
                value: stats.totalItems.toString(), 
                icon: <Box className="h-5 w-5 text-blue-500" />, 
                change: stats.totalItems > 0 ? '+' + Math.round(stats.totalItems * 0.3) + '% from last month' : 'Start recycling today!',
                isPositive: stats.totalItems > 0
              },
              { 
                title: 'CO₂ Emissions Saved', 
                value: stats.co2Saved + ' kg', 
                icon: <BarChart3 className="h-5 w-5 text-green-500" />, 
                change: stats.co2Saved > 0 ? '+' + Math.round(stats.co2Saved * 0.18 / 10) * 10 + '% from last month' : 'Recycle to save CO₂',
                isPositive: stats.co2Saved > 0
              },
              { 
                title: 'Certifications Earned', 
                value: stats.certifications.toString(), 
                icon: <Award className="h-5 w-5 text-purple-500" />, 
                change: stats.certifications < 3 ? 'Level ' + (stats.certifications + 1) + ' coming soon' : 'Max level achieved!',
                isPositive: null
              },
              { 
                title: 'Pending Pickups', 
                value: stats.pendingPickups.toString(), 
                icon: <Clock className="h-5 w-5 text-orange-500" />, 
                change: stats.pendingPickups > 0 ? 'Scheduled for pickup' : 'No pending pickups',
                isPositive: null
              },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <span className={
                    stat.isPositive === true ? "text-green-500 text-xs" : 
                    stat.isPositive === false ? "text-red-500 text-xs" : 
                    "text-muted-foreground text-xs"
                  }>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-muted-foreground font-medium text-sm">{stat.title}</h3>
                <p className="text-2xl font-display font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>

            {/* Quick Actions */}
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-display font-medium mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: 'Schedule a Pickup',
                    description: 'Arrange for e-waste collection',
                    icon: <Truck className="h-5 w-5 text-primary" />,
                    link: '/schedule-pickup'
                  },
                  {
                    title: 'Find Recycling Centers',
                    description: 'Locate centers near you',
                    icon: <MapPin className="h-5 w-5 text-primary" />,
                    link: '/recycling-centers'
                  },
                  {
                    title: 'Donate a Device',
                    description: 'Give technology a second life',
                    icon: <Gift className="h-5 w-5 text-primary" />,
                    link: '/donate-device'
                  },
                  {
                    title: 'Track Your Impact',
                    description: 'See your environmental contribution',
                    icon: <Recycle className="h-5 w-5 text-primary" />,
                    link: '/track-impact'
                  },
                ].map((action, i) => (
                  <Button 
                    key={i}
                    variant="outline" 
                    className="w-full justify-start p-4 h-auto rounded-xl hover:bg-secondary"
                    asChild
                  >
                    <Link to={action.link}>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {action.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-xs text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                ))}

                <Button className="w-full mt-4 group" asChild>
                  <Link to="/add-device">
                    <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                    Add New Device
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

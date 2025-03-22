
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
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
  Plus
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Alex! Manage your e-waste activities.</p>
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
                value: '42', 
                icon: <Box className="h-5 w-5 text-blue-500" />, 
                change: '+12% from last month',
                isPositive: true
              },
              { 
                title: 'CO₂ Emissions Saved', 
                value: '215 kg', 
                icon: <BarChart3 className="h-5 w-5 text-green-500" />, 
                change: '+18% from last month',
                isPositive: true
              },
              { 
                title: 'Certifications Earned', 
                value: '3', 
                icon: <Award className="h-5 w-5 text-purple-500" />, 
                change: 'Level 2 coming soon',
                isPositive: null
              },
              { 
                title: 'Pending Pickups', 
                value: '1', 
                icon: <Clock className="h-5 w-5 text-orange-500" />, 
                change: 'Scheduled for tomorrow',
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
            <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-display font-medium">Recent Activity</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    title: 'Scheduled Pickup',
                    description: 'Laptop, smartphone, and old cables',
                    date: 'Tomorrow, 2:00 PM',
                    icon: <Calendar className="h-5 w-5 text-primary" />,
                    status: 'Pending',
                    statusColor: 'bg-amber-100 text-amber-600'
                  },
                  {
                    title: 'Item Recycled',
                    description: 'Old desktop computer',
                    date: '2 days ago',
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    status: 'Completed',
                    statusColor: 'bg-green-100 text-green-600'
                  },
                  {
                    title: 'Device Donated',
                    description: 'Tablet to Franklin Elementary School',
                    date: '1 week ago',
                    icon: <Award className="h-5 w-5 text-purple-500" />,
                    status: 'Completed',
                    statusColor: 'bg-green-100 text-green-600'
                  },
                  {
                    title: 'Certification Earned',
                    description: 'Level 1 E-Waste Recycler',
                    date: '2 weeks ago',
                    icon: <Award className="h-5 w-5 text-blue-500" />,
                    status: 'Achieved',
                    statusColor: 'bg-blue-100 text-blue-600'
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{activity.title}</h3>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-display font-medium mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: 'Schedule a Pickup',
                    description: 'Arrange for e-waste collection',
                    icon: <Calendar className="h-5 w-5 text-primary" />,
                  },
                  {
                    title: 'Find Recycling Centers',
                    description: 'Locate centers near you',
                    icon: <MapPin className="h-5 w-5 text-primary" />,
                  },
                  {
                    title: 'Donate a Device',
                    description: 'Give technology a second life',
                    icon: <Box className="h-5 w-5 text-primary" />,
                  },
                  {
                    title: 'Track Your Impact',
                    description: 'See your environmental contribution',
                    icon: <BarChart3 className="h-5 w-5 text-primary" />,
                  },
                ].map((action, i) => (
                  <Button 
                    key={i}
                    variant="outline" 
                    className="w-full justify-start p-4 h-auto rounded-xl hover:bg-secondary"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {action.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}

                <Button className="w-full mt-4 group">
                  <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Add New Device
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

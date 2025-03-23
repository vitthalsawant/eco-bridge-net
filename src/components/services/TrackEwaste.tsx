
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { BarChart3, PackageCheck, Recycle, Award, Package } from 'lucide-react';

interface TrackingStats {
  totalDevices: number;
  recycledDevices: number;
  donatedDevices: number;
  scheduledPickups: number;
  co2Saved: number; // kg
  materialsSaved: number; // kg
}

// These are approximate values for CO2 and materials saved per device
const IMPACT_FACTORS = {
  'Smartphone': { co2: 80, materials: 0.1 },
  'Laptop': { co2: 300, materials: 2.5 },
  'Desktop Computer': { co2: 600, materials: 20 },
  'Tablet': { co2: 100, materials: 0.5 },
  'Monitor': { co2: 250, materials: 6 },
  'Printer': { co2: 150, materials: 8 },
  'Keyboard': { co2: 30, materials: 0.8 },
  'Mouse': { co2: 10, materials: 0.1 },
  'Speaker': { co2: 50, materials: 1 },
  'Headphone': { co2: 20, materials: 0.2 },
  'Camera': { co2: 70, materials: 0.4 },
  'Game Console': { co2: 150, materials: 2 },
  'TV': { co2: 400, materials: 15 },
  'Other': { co2: 100, materials: 2 }
};

const TrackEwaste = () => {
  const [stats, setStats] = useState<TrackingStats>({
    totalDevices: 0,
    recycledDevices: 0,
    donatedDevices: 0,
    scheduledPickups: 0,
    co2Saved: 0,
    materialsSaved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      // Get all user devices
      const { data: deviceData, error: deviceError } = await supabase
        .from('devices')
        .select('*');
      
      if (deviceError) throw deviceError;

      // Get pickups
      const { data: pickupData, error: pickupError } = await supabase
        .from('pickups')
        .select('*');
      
      if (pickupError) throw pickupError;

      // Calculate stats
      const devices = deviceData || [];
      const recycledDevices = devices.filter(d => d.status === 'recycled');
      const donatedDevices = devices.filter(d => d.status === 'donated');
      
      // Calculate environmental impact
      let totalCO2Saved = 0;
      let totalMaterialsSaved = 0;
      
      for (const device of [...recycledDevices, ...donatedDevices]) {
        const type = device.device_type as keyof typeof IMPACT_FACTORS;
        const factor = IMPACT_FACTORS[type] || IMPACT_FACTORS.Other;
        
        totalCO2Saved += factor.co2;
        totalMaterialsSaved += factor.materials;
      }

      setStats({
        totalDevices: devices.length,
        recycledDevices: recycledDevices.length,
        donatedDevices: donatedDevices.length,
        scheduledPickups: pickupData?.length || 0,
        co2Saved: totalCO2Saved,
        materialsSaved: totalMaterialsSaved
      });
    } catch (error: any) {
      console.error("Error fetching stats:", error);
      toast({
        title: "Error loading impact data",
        description: error.message || "An error occurred while loading your environmental impact data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Recycle className="h-5 w-5" />
          Your E-Waste Impact
        </CardTitle>
        <CardDescription>
          Track the environmental impact of your recycling efforts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-6">
            <BarChart3 className="h-10 w-10 animate-pulse mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Loading your impact data...</p>
          </div>
        ) : stats.totalDevices === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <Package className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No impact data yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Start recycling or donating devices to track your environmental impact
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Recycle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mt-4 text-green-700">{stats.co2Saved.toFixed(0)} kg</h3>
              <p className="text-sm text-green-600 mt-1">CO₂ Emissions Saved</p>
              <p className="text-xs text-green-500 mt-2">Equivalent to planting {Math.round(stats.co2Saved / 20)} trees</p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <PackageCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mt-4 text-blue-700">{stats.materialsSaved.toFixed(1)} kg</h3>
              <p className="text-sm text-blue-600 mt-1">Raw Materials Recovered</p>
              <p className="text-xs text-blue-500 mt-2">Including precious metals and rare earth elements</p>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <h3 className="text-xl font-bold text-purple-700">{stats.totalDevices}</h3>
                <p className="text-xs text-purple-600 mt-1">Total Devices</p>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <h3 className="text-xl font-bold text-amber-700">{stats.scheduledPickups}</h3>
                <p className="text-xs text-amber-600 mt-1">Scheduled Pickups</p>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <h3 className="text-xl font-bold text-emerald-700">{stats.recycledDevices}</h3>
                <p className="text-xs text-emerald-600 mt-1">Recycled Devices</p>
              </div>
              
              <div className="bg-pink-50 rounded-xl p-4 text-center">
                <h3 className="text-xl font-bold text-pink-700">{stats.donatedDevices}</h3>
                <p className="text-xs text-pink-600 mt-1">Donated Devices</p>
              </div>
            </div>
            
            {(stats.recycledDevices > 0 || stats.donatedDevices > 3) && (
              <div className="md:col-span-2 bg-indigo-50 rounded-xl p-6 flex items-center justify-center gap-4">
                <Award className="h-10 w-10 text-indigo-600" />
                <div className="text-left">
                  <h3 className="text-lg font-medium text-indigo-700">
                    {stats.recycledDevices + stats.donatedDevices >= 10 ? "Gold Level Recycler" :
                     stats.recycledDevices + stats.donatedDevices >= 5 ? "Silver Level Recycler" :
                     "Bronze Level Recycler"}
                  </h3>
                  <p className="text-sm text-indigo-600">
                    You're making a real difference! Keep up the great work.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackEwaste;

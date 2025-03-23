
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Package, Plus, Trash, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  description: string | null;
  status: string;
  created_at: string;
}

const DevicesList = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDevices(data || []);
    } catch (error: any) {
      console.error("Error fetching devices:", error);
      toast({
        title: "Error fetching devices",
        description: error.message || "An error occurred while loading your devices",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteDevice = async (id: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Add activity for deleting device
      await supabase.from('activities').insert({
        user_id: session.user.id,
        activity_type: 'device_removed',
        title: 'Device Removed',
        description: 'Device has been removed from your inventory',
        status: 'completed'
      });

      // Update local state
      setDevices(devices.filter(device => device.id !== id));
      
      toast({
        title: "Device removed",
        description: "Device has been successfully removed",
      });
    } catch (error: any) {
      console.error("Error deleting device:", error);
      toast({
        title: "Error deleting device",
        description: error.message || "An error occurred while deleting the device",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Pending</span>;
      case 'recycled':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Recycled</span>;
      case 'donated':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Donated</span>;
      case 'scheduled':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Scheduled</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-display flex items-center gap-2">
            <Package className="h-5 w-5" /> 
            My Devices
          </CardTitle>
          <CardDescription>
            Manage your registered devices for recycling or donation
          </CardDescription>
        </div>
        <Button asChild>
          <Link to="/add-device">
            <Plus className="h-4 w-4 mr-2" /> Add Device
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">
            <Clock className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Loading your devices...</p>
          </div>
        ) : devices.length === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <Package className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No devices yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You haven't added any devices for recycling or donation
            </p>
            <Button asChild className="mt-4">
              <Link to="/add-device">
                <Plus className="h-4 w-4 mr-2" /> Add Your First Device
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">{device.device_name}</TableCell>
                  <TableCell>{device.device_type}</TableCell>
                  <TableCell>{getStatusBadge(device.status)}</TableCell>
                  <TableCell>{new Date(device.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteDevice(device.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DevicesList;

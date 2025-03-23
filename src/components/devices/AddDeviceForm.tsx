
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, Package } from 'lucide-react';

const deviceTypes = [
  'Smartphone',
  'Laptop',
  'Desktop Computer',
  'Tablet',
  'Monitor',
  'Printer',
  'Keyboard',
  'Mouse',
  'Speaker',
  'Headphone',
  'Camera',
  'Game Console',
  'TV',
  'Other'
];

const AddDeviceForm = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState(deviceTypes[0]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add a device",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Add device to database
      const { data, error } = await supabase.from('devices').insert({
        device_name: deviceName,
        device_type: deviceType,
        description: description,
        user_id: session.user.id,
      }).select();

      if (error) throw error;

      // Also add an activity record
      await supabase.from('activities').insert({
        user_id: session.user.id,
        activity_type: 'device_added',
        title: 'Device Added',
        description: `Added ${deviceName} (${deviceType})`,
        related_id: data[0].id,
        status: 'completed'
      });

      toast({
        title: "Device added successfully",
        description: "Your device has been registered for recycling",
      });

      // Reset form or navigate
      setDeviceName('');
      setDeviceType(deviceTypes[0]);
      setDescription('');
    } catch (error: any) {
      console.error("Error adding device:", error);
      toast({
        title: "Error adding device",
        description: error.message || "An error occurred while adding your device",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Add New Device
        </CardTitle>
        <CardDescription>
          Register your device for recycling or donation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deviceName">Device Name</Label>
            <Input
              id="deviceName"
              placeholder="E.g., My Old iPhone"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deviceType">Device Type</Label>
            <select
              id="deviceType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              required
            >
              {deviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Condition, age, any issues..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Device'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddDeviceForm;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Truck, CheckCircle, Package } from 'lucide-react';

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  status: string;
}

const SchedulePickup = () => {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableDevices();
  }, []);

  const fetchAvailableDevices = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('status', 'pending');

      if (error) throw error;
      setDevices(data || []);
    } catch (error: any) {
      console.error("Error fetching devices:", error);
    }
  };

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a pickup date",
        variant: "destructive",
      });
      return;
    }

    if (selectedDevices.length === 0) {
      toast({
        title: "Device selection required",
        description: "Please select at least one device for pickup",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to schedule a pickup",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Create pickup record
      const { data, error } = await supabase.from('pickups').insert({
        user_id: session.user.id,
        pickup_date: date.toISOString(),
        address: address,
        devices: selectedDevices,
      }).select();

      if (error) throw error;

      // Update device status
      for (const deviceId of selectedDevices) {
        await supabase
          .from('devices')
          .update({ status: 'scheduled' })
          .eq('id', deviceId);
      }

      // Create activity record
      await supabase.from('activities').insert({
        user_id: session.user.id,
        activity_type: 'pickup_scheduled',
        title: 'Pickup Scheduled',
        description: `Scheduled for ${format(date, 'PPP')}`,
        related_id: data[0].id,
        status: 'pending'
      });

      setSuccess(true);

      toast({
        title: "Pickup scheduled",
        description: "Your pickup has been successfully scheduled",
      });
    } catch (error: any) {
      console.error("Error scheduling pickup:", error);
      toast({
        title: "Error scheduling pickup",
        description: error.message || "An error occurred while scheduling your pickup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Pickup Scheduled!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="h-24 w-24 rounded-full bg-green-100 mx-auto flex items-center justify-center">
              <Truck className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-2">Your pickup has been scheduled</h3>
          <p className="text-muted-foreground mb-6">
            We'll pick up your devices on {date && format(date, 'PPPP')} at the provided address.
          </p>
          
          <div className="space-y-4">
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Schedule a Pickup
        </CardTitle>
        <CardDescription>
          We'll collect your e-waste from your location
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Pickup Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Pickup Date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Select Devices for Pickup</Label>
            
            {devices.length === 0 ? (
              <div className="text-center py-4 bg-muted/20 rounded-lg">
                <Package className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No devices available for pickup
                </p>
                <Button asChild variant="link" className="mt-1">
                  <a href="/add-device">Add a device first</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                {devices.map((device) => (
                  <div 
                    key={device.id}
                    className={`p-2 rounded-md flex items-center gap-2 cursor-pointer ${
                      selectedDevices.includes(device.id) 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'bg-muted/20 hover:bg-muted/30'
                    }`}
                    onClick={() => toggleDeviceSelection(device.id)}
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedDevices.includes(device.id)}
                      onChange={() => {}} // Handled by div click
                      className="h-4 w-4"
                    />
                    <div>
                      <p className="font-medium">{device.device_name}</p>
                      <p className="text-xs text-muted-foreground">{device.device_type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || selectedDevices.length === 0}
          >
            {loading ? 'Scheduling...' : 'Schedule Pickup'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SchedulePickup;

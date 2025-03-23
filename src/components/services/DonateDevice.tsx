
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Gift, CheckCircle, Package } from 'lucide-react';

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  status: string;
}

const DonateDevice = () => {
  const [recipient, setRecipient] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a donation date",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDevice) {
      toast({
        title: "Device selection required",
        description: "Please select a device to donate",
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
          description: "Please sign in to donate a device",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Create donation record
      const { data, error } = await supabase.from('donations').insert({
        user_id: session.user.id,
        recipient: recipient,
        donation_date: date.toISOString(),
        device_id: selectedDevice,
      }).select();

      if (error) throw error;

      // Update device status
      await supabase
        .from('devices')
        .update({ status: 'donated' })
        .eq('id', selectedDevice);

      // Create activity record
      await supabase.from('activities').insert({
        user_id: session.user.id,
        activity_type: 'device_donated',
        title: 'Device Donated',
        description: `Donated to ${recipient}`,
        related_id: data[0].id,
        status: 'completed'
      });

      setSuccess(true);

      toast({
        title: "Donation registered",
        description: "Your device donation has been registered",
      });
    } catch (error: any) {
      console.error("Error donating device:", error);
      toast({
        title: "Error donating device",
        description: error.message || "An error occurred while registering your donation",
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
            Donation Registered!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="h-24 w-24 rounded-full bg-green-100 mx-auto flex items-center justify-center">
              <Gift className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-2">Your donation has been registered</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for donating your device to {recipient}. Every donation helps bridge the digital divide.
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
          <Gift className="h-5 w-5" />
          Donate a Device
        </CardTitle>
        <CardDescription>
          Give your device a second life by donating it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Organization</Label>
            <Input
              id="recipient"
              placeholder="School, charity, or organization name"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Donation Date</Label>
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
                  disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Select Device to Donate</Label>
            
            {devices.length === 0 ? (
              <div className="text-center py-4 bg-muted/20 rounded-lg">
                <Package className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No devices available for donation
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
                      selectedDevice === device.id 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'bg-muted/20 hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedDevice(device.id)}
                  >
                    <input 
                      type="radio" 
                      name="device" 
                      checked={selectedDevice === device.id}
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
            disabled={loading || !selectedDevice}
          >
            {loading ? 'Processing...' : 'Register Donation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonateDevice;

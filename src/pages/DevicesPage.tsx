
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import DevicesList from '@/components/devices/DevicesList';

const DevicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <h1 className="text-3xl font-display font-semibold mb-6">My Devices</h1>
          <DevicesList />
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default DevicesPage;

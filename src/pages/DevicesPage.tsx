
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import DevicesList from '@/components/devices/DevicesList';

const DevicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 md:pt-20 pb-8 md:pb-12 w-full">
        <Container size="xl">
          <h1 className="text-2xl md:text-3xl font-display font-semibold mb-6">My Devices</h1>
          <DevicesList />
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default DevicesPage;

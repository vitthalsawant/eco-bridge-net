
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import SchedulePickup from '@/components/services/SchedulePickup';

const SchedulePickupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container size="sm">
          <h1 className="text-3xl font-display font-semibold mb-6 text-center">Schedule Pickup</h1>
          <SchedulePickup />
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default SchedulePickupPage;

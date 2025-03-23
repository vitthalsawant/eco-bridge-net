
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import DonateDevice from '@/components/services/DonateDevice';

const DonateDevicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container size="sm">
          <h1 className="text-3xl font-display font-semibold mb-6 text-center">Donate a Device</h1>
          <DonateDevice />
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default DonateDevicePage;

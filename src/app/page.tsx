import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QRInputSection from "@/components/qr/QRInputSection";


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QRInputSection />
      </main>
    </>  
  );
}

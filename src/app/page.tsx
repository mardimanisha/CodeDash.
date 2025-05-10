import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QRInputSection from "@/components/qr/QRInputSection";
import MainLayout from "@/layout/MainLayout";


export default function Home() {
  return (
    <MainLayout>
      <Header />
      <main className="">
        <Hero />
        <QRInputSection />
      </main>
    </MainLayout>  
  );
}

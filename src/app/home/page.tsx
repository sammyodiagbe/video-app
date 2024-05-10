import ChatScreenComponent from "@/components/chat-screen";
import SideBarComponent from "@/components/sidebar";

const HomePage = async () => {
  return (
    <main className="grid grid-cols-[450px_1fr] h-screen w-screen bg-gray-300">
      <SideBarComponent />
    </main>
  );
};

export default HomePage;

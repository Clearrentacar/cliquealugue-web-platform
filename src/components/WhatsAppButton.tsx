import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const whatsappNumber = "5511999999999"; // Substitua pelo número real
  const message = "Olá! Gostaria de informações sobre o CliqueAlugue.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-float"
    >
      <Button
        variant="whatsapp"
        size="lg"
        className="rounded-full h-14 w-14 shadow-elevated"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  );
};
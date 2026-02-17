import ChatClient from '@/components/chat/chat-client';

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
          <p className="text-muted-foreground">Ask questions, get explanations, or brainstorm ideas.</p>
        </div>
        <div className="flex-1 flex flex-col bg-card border rounded-lg overflow-hidden">
          <ChatClient />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useBranding } from '../BrandingContext';
import { 
  Sparkles, 
  Send, 
  X,
  Minimize2,
  Trash2,
  Clock,
  FileText,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FenBotPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export function FenBotPopup({ isOpen, onClose, onMinimize }: FenBotPopupProps) {
  const { branding } = useBranding();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClearChat = () => {
    setMessages([]);
    setInputValue('');
  };

  const suggestedQueries = [
    {
      icon: <FileText className="size-4" />,
      text: "What documents do I need to submit?",
    },
    {
      icon: <TrendingUp className="size-4" />,
      text: "Show my recent trades",
    },
    {
      icon: <AlertCircle className="size-4" />,
      text: "What are my pending tasks?",
    },
    {
      icon: <Clock className="size-4" />,
      text: "What's my account status?",
    }
  ];

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Documents query
    if (lowerQuery.includes('document') || lowerQuery.includes('submit') || lowerQuery.includes('upload')) {
      return `Based on your account, you have the following document requirements:\n\n• **Annual tax form (W-9)** - Due November 20, 2025 (High Priority)\n• **Q4 2024 Statement Review** - Recommended action\n\nYou can upload these documents in the Documents section. Need help with any specific document?`;
    }
    
    // Trades query
    if (lowerQuery.includes('trade') || lowerQuery.includes('order') || lowerQuery.includes('transaction')) {
      return `Here's a summary of your recent trading activity:\n\n**Recent Orders:**\n• **ORD-2025-001234** - Global Equity Fund subscription of $50,000 (Settled on Nov 11)\n• **ORD-2025-001189** - Sustainable Bond Fund subscription of $25,000 (Acknowledged)\n• **ORD-2025-000987** - Global Equity Fund redemption of 100 shares (Settled on Nov 1)\n\nYour most recent subscription order for Sustainable Bond Fund is currently being processed. Would you like more details on any specific order?`;
    }
    
    // Tasks query
    if (lowerQuery.includes('task') || lowerQuery.includes('pending') || lowerQuery.includes('action') || lowerQuery.includes('todo')) {
      return `You currently have 3 items requiring attention:\n\n**High Priority:**\n• Annual tax form (W-9) requires update - Due Nov 20, 2025\n\n**Medium Priority:**\n• Review Q4 2024 statement\n\n**Completed:**\n✓ Subscription order settled\n\nI recommend addressing the W-9 form first to avoid any compliance issues. Would you like me to guide you through the update process?`;
    }
    
    // Status/Account query
    if (lowerQuery.includes('status') || lowerQuery.includes('account') || lowerQuery.includes('portfolio') || lowerQuery.includes('balance')) {
      return `Here's your account status overview:\n\n**Portfolio Value:** $372,850.32\n**Performance:** +$2,834.68 (0.77%) as of Nov 11, 2025\n\n**Active Accounts:**\n• Global Equity Fund (ACC-2891047) - $247,850.32\n• Sustainable Bond Fund (ACC-2891048) - $125,000.00\n\n**Account Status:** Active and in good standing\n**YTD Return:** +8.4%\n\nIs there a specific aspect of your account you'd like to explore?`;
    }
    
    // Holdings/Performance query
    if (lowerQuery.includes('holding') || lowerQuery.includes('performance') || lowerQuery.includes('return')) {
      return `Your portfolio performance summary:\n\n**Year-to-Date Performance:**\n• Overall Return: +8.4%\n• Total Portfolio Value: $372,850.32\n• Change (Today): +0.77%\n\n**Individual Holdings:**\n• Global Equity Fund: +1.33% ($247,850.32)\n• Sustainable Bond Fund: -0.33% ($125,000.00)\n\nYour Global Equity Fund is outperforming expectations this year. Would you like a detailed breakdown?`;
    }
    
    // Fee query
    if (lowerQuery.includes('fee') || lowerQuery.includes('cost') || lowerQuery.includes('expense')) {
      return `Here's your fee structure:\n\n**Total Annual Fees:** 0.68%\n\nThis includes management fees, administrative costs, and fund expenses. Your fees are competitive compared to industry standards.\n\nWould you like a detailed breakdown of fees by fund?`;
    }

    // Help with navigation
    if (lowerQuery.includes('navigate') || lowerQuery.includes('find') || lowerQuery.includes('where')) {
      return `I can help you navigate the portal:\n\n• **Home** - View your portfolio overview\n• **Invest** - Browse and invest in funds\n• **Trades** - View and place orders\n• **Documents** - Upload and review documents\n• **Requests** - Manage account maintenance tasks\n• **Messages** - View alerts and notifications\n• **Settings** - Update your preferences\n\nWhat would you like to do?`;
    }
    
    // Default response
    return `I'm FenBot, your AI assistant! I'm here to help you with:\n\n• Account status and portfolio performance\n• Pending tasks and documents\n• Recent trades and orders\n• Investment holdings and returns\n• Account maintenance and navigation\n\nPlease feel free to ask me anything about your account, or select one of the suggested queries below.`;
  };

  const handleSubmit = async (query?: string) => {
    const messageText = query || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: generateResponse(messageText),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 800);
  };

  const handleSuggestedQuery = (queryText: string) => {
    handleSubmit(queryText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div 
      className={`fixed bottom-24 right-6 w-[380px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
      style={{ 
        height: '600px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        zIndex: 9999
      }}
    >
      {/* Header */}
      <div 
        className="p-4 rounded-t-2xl border-b border-slate-100"
        style={{
          background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.primaryColor}dd)`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <h3 className="text-white flex items-center gap-2">
                FenBot AI
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                  Beta
                </Badge>
              </h3>
              <p className="text-white/90 text-xs">Your intelligent assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={handleClearChat}
              title="Clear chat"
              disabled={messages.length === 0}
            >
              <Trash2 className="size-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={onMinimize}
              title="Minimize"
            >
              <Minimize2 className="size-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={onClose}
              title="Close"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50">
        {messages.length === 0 ? (
          <div className="text-center py-6 space-y-4">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full"
              style={{ backgroundColor: `${branding.primaryColor}20` }}
            >
              <Sparkles className="size-8" style={{ color: branding.primaryColor }} />
            </div>
            <div className="space-y-2">
              <h4 className="text-slate-900">How can I help you today?</h4>
              <p className="text-slate-600 text-sm">
                Ask me about your account, tasks, or trades
              </p>
            </div>
            <div className="space-y-2 pt-2">
              {suggestedQueries.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2.5"
                  style={{ borderColor: `${branding.primaryColor}30` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${branding.primaryColor}10`;
                    e.currentTarget.style.borderColor = `${branding.primaryColor}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = `${branding.primaryColor}30`;
                  }}
                  onClick={() => handleSuggestedQuery(suggestion.text)}
                >
                  <div className="flex items-center gap-2 text-slate-700">
                    <div style={{ color: branding.primaryColor }}>
                      {suggestion.icon}
                    </div>
                    <span className="text-sm">{suggestion.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'text-white'
                      : 'bg-white border border-slate-200 text-slate-900'
                  }`}
                  style={message.type === 'user' ? { backgroundColor: branding.primaryColor } : undefined}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                      <Sparkles className="size-3" style={{ color: branding.primaryColor }} />
                      <span className="text-xs" style={{ color: branding.primaryColor }}>FenBot</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line text-sm">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Sparkles className="size-3 animate-pulse" style={{ color: branding.primaryColor }} />
                    <span className="text-xs">FenBot is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 rounded-b-2xl">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-sm"
            disabled={isProcessing}
          />
          <Button
            onClick={() => handleSubmit()}
            disabled={!inputValue.trim() || isProcessing}
            className="text-white"
            style={{ backgroundColor: branding.primaryColor }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = `${branding.primaryColor}dd`;
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = branding.primaryColor;
              }
            }}
            size="sm"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Press Enter to send
        </p>
      </div>
    </div>
  );
}

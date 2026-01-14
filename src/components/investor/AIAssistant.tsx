import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useBranding } from '../BrandingContext';
import { 
  Sparkles, 
  Send, 
  ChevronDown, 
  ChevronUp,
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

interface AIAssistantProps {
  portfolioData?: any;
  tasksData?: any;
  tradesData?: any;
}

export function AIAssistant({ portfolioData, tasksData, tradesData }: AIAssistantProps) {
  const { branding } = useBranding();
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const suggestedQueries = [
    {
      icon: <FileText className="size-4" />,
      text: "What documents do I need to submit?",
      query: "documents"
    },
    {
      icon: <TrendingUp className="size-4" />,
      text: "Show my recent trades",
      query: "trades"
    },
    {
      icon: <AlertCircle className="size-4" />,
      text: "What are my pending tasks?",
      query: "tasks"
    },
    {
      icon: <Clock className="size-4" />,
      text: "What's my account status?",
      query: "status"
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
    
    // Default response
    return `I'm here to help you with information about:\n\n• Account status and portfolio performance\n• Pending tasks and documents\n• Recent trades and orders\n• Investment holdings and returns\n• Account maintenance and updates\n\nPlease feel free to ask me anything about your account, or select one of the suggested queries above.`;
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
    setIsExpanded(true);
    handleSubmit(queryText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer text-white"
        style={{
          background: `linear-gradient(to right, ${branding.primaryColor}, ${branding.primaryColor}dd)`
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-white flex items-center gap-2 text-base">
                AI Assistant
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                  Beta
                </Badge>
              </h2>
              <p className="text-white/90 text-xs">
                Ask me anything about your account
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/20"
          >
            {isExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Suggested Queries - Always Visible */}
      {!isExpanded && (
        <div className="p-4 bg-white">
          <p className="text-slate-600 text-xs mb-2">Quick queries:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedQueries.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-2 px-2 transition-colors text-xs"
                style={{
                  borderColor: `${branding.primaryColor}30`
                }}
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
                <div className="flex items-center gap-1.5 text-slate-700">
                  <div style={{ color: branding.primaryColor }}>
                    {suggestion.icon}
                  </div>
                  <span className="text-xs leading-tight">{suggestion.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="flex flex-col">
          {/* Messages Area */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto bg-slate-50">
            {messages.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ backgroundColor: `${branding.primaryColor}20` }}
                >
                  <Sparkles className="size-8" style={{ color: branding.primaryColor }} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-slate-900">How can I help you today?</h3>
                  <p className="text-slate-600">
                    Try asking about your account status, pending tasks, or recent trades
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto pt-4">
                  {suggestedQueries.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto py-3"
                      style={{
                        borderColor: `${branding.primaryColor}30`
                      }}
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
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'text-white'
                          : 'bg-white border border-slate-200 text-slate-900'
                      }`}
                      style={message.type === 'user' ? { backgroundColor: branding.primaryColor } : undefined}
                    >
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                          <Sparkles className="size-4" style={{ color: branding.primaryColor }} />
                          <span className="text-sm" style={{ color: branding.primaryColor }}>AI Assistant</span>
                        </div>
                      )}
                      <div className="whitespace-pre-line">{message.content}</div>
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
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Sparkles className="size-4 animate-pulse" style={{ color: branding.primaryColor }} />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your account..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
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
              >
                <Send className="size-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Press Enter to send • AI responses are based on your current account data
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

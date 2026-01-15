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
  Users,
  ShoppingCart,
  FileSearch,
  AlertTriangle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AMAIAssistantProps {
  workQueuesData?: any;
  metricsData?: any;
  casesData?: any;
}

export function AMAIAssistant({ workQueuesData, metricsData, casesData }: AMAIAssistantProps) {
  const { branding } = useBranding();
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const suggestedQueries = [
    {
      icon: <Users className="size-4" />,
      text: "Current pending KYC reviews",
      query: "kyc"
    },
    {
      icon: <ShoppingCart className="size-4" />,
      text: "Identify NIGO orders",
      query: "nigo"
    },
    {
      icon: <FileSearch className="size-4" />,
      text: "High risk approvals outstanding",
      query: "approvals"
    },
    {
      icon: <AlertTriangle className="size-4" />,
      text: "Urgent monitoring alerts",
      query: "alerts"
    }
  ];

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // KYC query
    if (lowerQuery.includes('kyc') || lowerQuery.includes('review') || lowerQuery.includes('onboarding')) {
      return `**Current KYC Reviews:**\n\nYou have **12 pending KYC reviews**, with **3 marked as urgent**:\n\n**High Priority:**\n• **CASE-2891** - Acme Capital Partners LLC (2 days old)\n• **CASE-2888** - Sterling Investment Group (4 days old)\n• **CASE-2885** - Quantum Asset Management (5 days old)\n\n**Standard Review:**\n• 9 additional cases awaiting review\n• Average processing time: 3.2 days\n• SLA compliance: 94%\n\nWould you like me to provide details on any specific case?`;
    }
    
    // NIGO orders query
    if (lowerQuery.includes('nigo') || lowerQuery.includes('order') || lowerQuery.includes('incomplete')) {
      return `**NIGO (Not In Good Order) Summary:**\n\nYou have **4 NIGO orders** requiring attention, with **2 urgent**:\n\n**Urgent - Missing Information:**\n• **ORD-2025-001456** - Global Equity Fund subscription ($250,000)\n  → Missing: Bank details and signed subscription agreement\n  → Investor: Peninsula Family Office\n\n• **ORD-2025-001449** - Sustainable Bond Fund redemption (1,000 shares)\n  → Missing: Authorized signature\n  → Investor: Harbor Trust\n\n**Standard Follow-up:**\n• 2 orders pending document corrections\n• Average NIGO resolution time: 1.8 days\n\nWould you like to send automated reminders to these investors?`;
    }
    
    // Approvals query
    if (lowerQuery.includes('approval') || lowerQuery.includes('risk') || lowerQuery.includes('dd') || lowerQuery.includes('diligence')) {
      return `**Outstanding High Risk Approvals:**\n\nYou have **7 due diligence approvals** pending, with **1 high risk**:\n\n**High Risk - Requires Senior Approval:**\n• **DD-2025-0234** - Emerging Markets Fund counterparty\n  → Risk Score: 7.8/10\n  → Flagged items: Jurisdiction concerns, complex ownership structure\n  → Assigned to: Compliance Team Lead\n  → Escalated 1 day ago\n\n**Medium Risk:**\n• 4 counterparty DD cases in review\n• 2 security DD approvals pending\n\n**SLA Status:**\n• High risk cases: Within SLA\n• Standard cases: 2 approaching deadline\n\nWould you like to expedite any of these reviews?`;
    }
    
    // Alerts query
    if (lowerQuery.includes('alert') || lowerQuery.includes('monitoring') || lowerQuery.includes('urgent')) {
      return `**Urgent Monitoring Alerts:**\n\nYou have **15 monitoring alerts**, with **5 marked as urgent**:\n\n**Critical:**\n• **Large Redemption Alert** - Global Equity Fund\n  → $2.5M redemption submitted by institutional investor\n  → Requires liquidity review\n\n• **KYC Expiry Warning** - 3 investors\n  → KYC documents expiring within 30 days\n  → Action required: Request updated documentation\n\n• **Threshold Breach** - 2 investors\n  → Ownership threshold notifications pending\n  → Regulatory filing required\n\n**Standard Alerts:**\n• 10 routine monitoring items for review\n• Average response time: 4 hours\n\nShould I generate the detailed alert report?`;
    }
    
    // Cases/Workflow query
    if (lowerQuery.includes('case') || lowerQuery.includes('workflow') || lowerQuery.includes('queue')) {
      return `**Work Queue Summary:**\n\nCurrent workload across all queues:\n\n• **KYC Reviews:** 12 pending (3 urgent)\n• **NIGO Orders:** 4 pending (2 urgent)\n• **DD Approvals:** 7 pending (1 high risk)\n• **Monitoring Alerts:** 15 pending (5 urgent)\n\n**Team Performance:**\n• Average case resolution: 2.8 days\n• STP Rate: 96.4%\n• Current capacity: 78%\n\n**Top Priority Actions:**\n1. Review high-risk DD case (DD-2025-0234)\n2. Follow up on 2 urgent NIGO orders\n3. Process 3 urgent KYC reviews\n\nWould you like to see individual team member workloads?`;
    }
    
    // Metrics/Performance query
    if (lowerQuery.includes('metric') || lowerQuery.includes('performance') || lowerQuery.includes('aum') || lowerQuery.includes('stat')) {
      return `**Key Performance Metrics:**\n\n**Assets Under Management:**\n• Total AUM: $2.4B (+4.2% this month)\n• Active Investors: 1,247 (+23 new this month)\n• Average account size: $1.9M\n\n**Operational Efficiency:**\n• Orders Today: 34\n• STP Rate: 96.4% (+1.2%)\n• Average processing time: 2.8 days\n• On-time completion: 94%\n\n**Work Queue Health:**\n• Total pending items: 38\n• Within SLA: 96%\n• Critical items: 11\n\nPerformance is strong across all metrics. Any specific area you'd like to dive deeper into?`;
    }
    
    // Default response
    return `I'm here to help you manage asset manager operations:\n\n• **Work Queue Status** - KYC reviews, NIGO orders, approvals, alerts\n• **Case Management** - Track and prioritize pending cases\n• **Performance Metrics** - AUM, processing efficiency, team capacity\n• **Risk Alerts** - High-risk items requiring attention\n• **Team Workload** - Capacity and assignment optimization\n\nPlease feel free to ask about any operational aspect, or select one of the quick queries above.`;
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
                Ask about work queues and operations
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
                    Ask about work queues, pending cases, or operational metrics
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
                placeholder="Ask about work queues, cases, or metrics..."
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
              Press Enter to send • AI responses based on current operational data
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

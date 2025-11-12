import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  FileText, 
  Download, 
  Search,
  Eye,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

export function InvestorDocuments() {
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    {
      id: '1',
      name: 'Global Equity Fund - Prospectus',
      type: 'Prospectus',
      fund: 'Global Equity Fund',
      date: '2025-01-15',
      size: '2.4 MB',
      viewed: true,
      category: 'Legal',
    },
    {
      id: '2',
      name: 'Q3 2025 Account Statement',
      type: 'Statement',
      fund: 'All Accounts',
      date: '2025-10-01',
      size: '456 KB',
      viewed: true,
      category: 'Statements',
    },
    {
      id: '3',
      name: 'Sustainable Bond Fund - KIID',
      type: 'KIID',
      fund: 'Sustainable Bond Fund',
      date: '2025-06-01',
      size: '184 KB',
      viewed: true,
      category: 'Key Information',
    },
    {
      id: '4',
      name: 'Global Equity Fund - Monthly Factsheet October 2025',
      type: 'Factsheet',
      fund: 'Global Equity Fund',
      date: '2025-11-01',
      size: '892 KB',
      viewed: false,
      category: 'Performance',
    },
    {
      id: '5',
      name: 'Tax Statement 2024',
      type: 'Tax Document',
      fund: 'All Accounts',
      date: '2025-01-31',
      size: '234 KB',
      viewed: true,
      category: 'Tax',
    },
    {
      id: '6',
      name: 'Subscription Confirmation - ORD-2025-001234',
      type: 'Confirmation',
      fund: 'Global Equity Fund',
      date: '2025-11-11',
      size: '128 KB',
      viewed: true,
      category: 'Trade Confirmations',
    },
  ];

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fund.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Legal', 'Statements', 'Key Information', 'Performance', 'Tax', 'Trade Confirmations'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const finalDocs = selectedCategory === 'All' 
    ? filteredDocs 
    : filteredDocs.filter(doc => doc.category === selectedCategory);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Documents</h1>
        <p className="text-slate-600">Access your fund materials, statements, and reports</p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {finalDocs.map((doc) => (
          <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="size-6 text-blue-600" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <h3 className="text-slate-900 truncate">{doc.name}</h3>
                  {doc.viewed && (
                    <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-1" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                  </span>
                  <span>•</span>
                  <span>{doc.fund}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {doc.date}
                  </span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="ghost" size="sm">
                  <Eye className="size-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="size-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {finalDocs.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="size-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-slate-900 mb-2">No documents found</h3>
          <p className="text-slate-600">Try adjusting your search or filters</p>
        </Card>
      )}
    </div>
  );
}

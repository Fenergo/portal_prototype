import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard,
  Users,
  Globe,
  Lock
} from 'lucide-react';

export function InvestorSettings() {
  const sections = [
    {
      icon: User,
      title: 'Profile Information',
      description: 'Update your personal details and contact information',
      action: 'Edit Profile',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Manage your password, two-factor authentication, and security settings',
      action: 'Manage Security',
      badge: 'FIDO2 Enabled',
    },
    {
      icon: CreditCard,
      title: 'Banking Details',
      description: 'View and update your payment methods and bank accounts',
      action: 'Manage Banking',
    },
    {
      icon: Users,
      title: 'Delegates & Permissions',
      description: 'Grant access to authorized signatories and advisors',
      action: 'Manage Delegates',
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Set your preferred language, timezone, and date formats',
      action: 'Update Preferences',
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Settings</h1>
        <p className="text-slate-600">Manage your account preferences and security</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="size-6 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-slate-900">{section.title}</h3>
                    {section.badge && (
                      <Badge variant="outline" className="text-xs">
                        {section.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-600">{section.description}</p>
                </div>
                <Button variant="outline">{section.action}</Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Bell className="size-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900">Notification Preferences</h3>
            <p className="text-slate-600">Choose how you want to receive updates and alerts</p>
          </div>
        </div>

        <div className="space-y-4 pl-16">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="text-slate-900">Email Notifications</div>
              <div className="text-slate-500">Receive updates via email</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="text-slate-900">Trade Confirmations</div>
              <div className="text-slate-500">Get notified when orders are executed</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="text-slate-900">NAV Updates</div>
              <div className="text-slate-500">Daily NAV pricing notifications</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="text-slate-900">Marketing Communications</div>
              <div className="text-slate-500">Updates about new funds and opportunities</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-slate-900">SMS Alerts</div>
              <div className="text-slate-500">Critical alerts via text message</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-6 bg-slate-50">
        <div className="flex items-start gap-4">
          <Lock className="size-6 text-slate-600 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="text-slate-900">Privacy & Data</h3>
            <p className="text-slate-600">
              Your data is encrypted and stored securely in compliance with GDPR, CCPA, and UK GDPR regulations.
              You can request a copy of your data or account deletion at any time.
            </p>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm">Download My Data</Button>
              <Button variant="outline" size="sm">Privacy Policy</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

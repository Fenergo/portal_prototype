import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { 
  Palette,
  Upload,
  Eye,
  CheckCircle2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { useBranding } from '../BrandingContext';

export function AdminBranding() {
  const { branding, updateBranding } = useBranding();
  const [tempColor, setTempColor] = useState(branding.primaryColor);
  const [tempCompanyName, setTempCompanyName] = useState(branding.companyName);
  const [showLogoSelector, setShowLogoSelector] = useState(false);

  const availableLogos = [
    { id: 'fenergo', name: 'Fenergo Logo', url: '/portal_prototype/fen_logo.jpg' },
    { id: 'br', name: 'BR Logo', url: '/portal_prototype/BR_logo.png' },
  ];

  const fenergoColors = [
    { name: 'Primary Teal', value: '#21CFB2' },
    { name: 'Light Teal', value: '#3CD5BB' },
    { name: 'Medium Teal', value: '#56DBC4' },
    { name: 'Soft Teal', value: '#71E0CE' },
    { name: 'Pale Teal', value: '#8CE6D7' },
    { name: 'Lightest Teal', value: '#A6ECE0' },
    { name: 'Pure Black', value: '#000000' },
  ];

  const presetThemes = [
    { name: 'Fenergo (Default)', primary: '#21CFB2', logo: 'fenergo' },
    { name: 'Navy Blue', primary: '#1E40AF', logo: null },
    { name: 'Forest Green', primary: '#059669', logo: null },
    { name: 'Royal Purple', primary: '#7C3AED', logo: null },
    { name: 'Crimson Red', primary: '#DC2626', logo: null },
    { name: 'Slate Gray', primary: '#475569', logo: null },
  ];

  const handleSave = () => {
    updateBranding({
      primaryColor: tempColor,
      companyName: tempCompanyName,
    });
  };

  const handleReset = () => {
    setTempColor('#21CFB2');
    setTempCompanyName('Fenergo');
    updateBranding({
      primaryColor: '#21CFB2',
      companyName: 'Fenergo',
      logoUrl: 'fenergo',
    });
  };

  const handleLogoSelect = (logoId: string) => {
    updateBranding({
      logoUrl: logoId,
    });
    setShowLogoSelector(false);
  };

  const handleThemeSelect = (theme: typeof presetThemes[0]) => {
    setTempColor(theme.primary);
    updateBranding({
      primaryColor: theme.primary,
      logoUrl: theme.logo || branding.logoUrl,
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">White-Label Branding</h1>
        <p className="text-slate-600">Customize the investor portal appearance with your brand identity</p>
      </div>

      {/* Preview Notice */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Eye className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            Changes are applied in real-time to the investor portal. Investors will see the updated
            branding on their next login. Asset Manager portal maintains Fenergo branding.
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Logo Upload */}
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <Upload className="size-5" />
              Company Logo
            </h3>
            
            <div className="space-y-4">
              <div className="p-8 border-2 border-dashed rounded-lg text-center bg-slate-50">
                <div className="size-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 p-2">
                  {branding.logoUrl === 'fenergo' ? (
                    <img 
                      src="/portal_prototype/fen_logo.jpg" 
                      alt="Fenergo"
                      className="h-8 object-contain"
                    />
                  ) : branding.logoUrl === 'br' ? (
                    <img 
                      src="/portal_prototype/BR_logo.png" 
                      alt="BR"
                      className="h-8 object-contain"
                    />
                  ) : (
                    <Palette className="size-8 text-slate-400" />
                  )}
                </div>
                <p className="text-slate-900 mb-2">Current Logo</p>
                <p className="text-slate-500 mb-4">
                  {branding.logoUrl === 'fenergo' ? 'Fenergo Logo' : branding.logoUrl === 'br' ? 'BR Logo' : 'No logo selected'}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowLogoSelector(!showLogoSelector)}
                >
                  <Upload className="size-4 mr-2" />
                  Select Logo
                </Button>
              </div>

              {showLogoSelector && (
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-white">
                  {availableLogos.map((logo) => (
                    <button
                      key={logo.id}
                      onClick={() => handleLogoSelect(logo.id)}
                      className={`p-4 border-2 rounded-lg hover:bg-slate-50 transition-all ${
                        branding.logoUrl === logo.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="h-16 flex items-center justify-center mb-2 bg-white rounded p-2">
                        <img 
                          src={logo.url} 
                          alt={logo.name}
                          className="max-h-12 object-contain"
                        />
                      </div>
                      <p className="text-sm text-slate-900">{logo.name}</p>
                      {branding.logoUrl === logo.id && (
                        <Badge className="mt-2 bg-blue-100 text-blue-700 text-xs">Selected</Badge>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={tempCompanyName}
                  onChange={(e) => setTempCompanyName(e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
            </div>
          </Card>

          {/* Color Selection */}
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <Palette className="size-5" />
              Primary Brand Color
            </h3>

            <div className="space-y-6">
              {/* Fenergo Teal Palette */}
              <div>
                <Label className="mb-3 block">Fenergo Color Palette</Label>
                <div className="grid grid-cols-7 gap-3">
                  {fenergoColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTempColor(color.value)}
                      className="group relative"
                    >
                      <div
                        className={`h-16 rounded-lg transition-all ${
                          tempColor === color.value
                            ? 'ring-4 ring-offset-2 ring-blue-500 scale-105'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                      {tempColor === color.value && (
                        <CheckCircle2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 text-white" />
                      )}
                      <div className="text-xs text-slate-600 mt-1 truncate">{color.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color */}
              <div>
                <Label htmlFor="customColor" className="mb-3 block">Custom Color</Label>
                <div className="flex gap-3 items-center">
                  <div
                    className="size-12 rounded-lg border-2"
                    style={{ backgroundColor: tempColor }}
                  />
                  <Input
                    id="customColor"
                    type="text"
                    value={tempColor}
                    onChange={(e) => setTempColor(e.target.value)}
                    placeholder="#21CFB2"
                    className="font-mono"
                  />
                  <Input
                    type="color"
                    value={tempColor}
                    onChange={(e) => setTempColor(e.target.value)}
                    className="w-20 h-10 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Preset Themes */}
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4">Quick Theme Presets</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {presetThemes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeSelect(theme)}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    tempColor === theme.primary
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="size-8 rounded"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span className="text-slate-900">{theme.name}</span>
                  </div>
                  {tempColor === theme.primary && (
                    <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleSave} size="lg">
              <CheckCircle2 className="size-5 mr-2" />
              Save Branding Changes
            </Button>
            <Button variant="outline" size="lg" onClick={handleReset}>
              <RotateCcw className="size-5 mr-2" />
              Reset to Fenergo Defaults
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4">Live Preview</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Portal Header</Label>
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="h-8 bg-white rounded flex items-center justify-center p-1">
                      {branding.logoUrl === 'fenergo' ? (
                        <img 
                          src="/portal_prototype/fen_logo.jpg"
                          alt="Logo"
                          className="h-6 object-contain"
                        />
                      ) : branding.logoUrl === 'br' ? (
                        <img 
                          src="/portal_prototype/BR_logo.png"
                          alt="Logo"
                          className="h-6 object-contain"
                        />
                      ) : (
                        <span className="text-slate-400 text-xs">Logo</span>
                      )}
                    </div>
                    <div>
                      <div className="text-slate-900 font-semibold">{tempCompanyName}</div>
                      <div className="text-slate-500 text-sm">Investor Portal</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Buttons & Links</Label>
                <div className="space-y-2">
                  <button
                    className="px-4 py-2 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: tempColor }}
                  >
                    Primary Button
                  </button>
                  <div className="flex gap-2">
                    <Badge style={{ backgroundColor: tempColor, color: 'white' }}>
                      Active Badge
                    </Badge>
                    <Badge 
                      style={{ 
                        backgroundColor: `${tempColor}20`,
                        color: tempColor,
                        borderColor: `${tempColor}40`
                      }}
                    >
                      Outline Badge
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Navigation</Label>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    className="w-full p-3 text-left transition-colors"
                    style={{ 
                      backgroundColor: `${tempColor}15`,
                      color: tempColor
                    }}
                  >
                    Active Menu Item
                  </button>
                  <button className="w-full p-3 text-left text-slate-600 hover:bg-slate-50">
                    Inactive Menu Item
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-green-900">White-Labeling Active</div>
                <p className="text-green-700 mt-1">
                  All changes are applied in real-time to the investor-facing portal.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-slate-600">
                <p className="mb-2">Branding applies to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Investor portal UI</li>
                  <li>Email communications</li>
                  <li>PDF documents (watermarks)</li>
                  <li>Fund launch microsites</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

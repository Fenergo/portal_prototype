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

  const fenergoColors = [
    { name: 'Primary Teal', value: '#21CFB2' },
    { name: 'Light Teal', value: '#3CD5BB' },
    { name: 'Medium Teal', value: '#56DBC4' },
    { name: 'Soft Teal', value: '#71E0CE' },
    { name: 'Pale Teal', value: '#8CE6D7' },
    { name: 'Lightest Teal', value: '#A6ECE0' },
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
                <div className="size-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  {branding.logoUrl === 'fenergo' ? (
                    <img 
                      src="data:image/png;base64,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" 
                      alt="Fenergo"
                      className="h-8"
                    />
                  ) : (
                    <Palette className="size-8 text-slate-400" />
                  )}
                </div>
                <p className="text-slate-900 mb-2">Current Logo</p>
                <p className="text-slate-500 mb-4">Recommended: SVG or PNG, max 200px height</p>
                <Button variant="outline" size="sm">
                  <Upload className="size-4 mr-2" />
                  Upload New Logo
                </Button>
              </div>

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
                <Label className="mb-3 block">Fenergo Teal Palette</Label>
                <div className="grid grid-cols-6 gap-3">
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
                  <div className="flex items-center gap-2">
                    <div
                      className="size-8 rounded-lg flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(to bottom right, ${tempColor}, ${tempColor}dd)` 
                      }}
                    >
                      {branding.logoUrl === 'fenergo' ? (
                        <img 
                          src="data:image/png;base64,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"
                          alt="Logo"
                          className="h-5 brightness-0 invert"
                        />
                      ) : (
                        <span className="text-white">Logo</span>
                      )}
                    </div>
                    <div>
                      <div className="text-slate-900">{tempCompanyName}</div>
                      <div className="text-slate-500">Investor Portal</div>
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

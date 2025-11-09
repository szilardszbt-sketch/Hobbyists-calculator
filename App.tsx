import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { DynamicField } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import AdPlaceholder from './components/AdPlaceholder';
import SeoContent from './components/SeoContent';
import CalculatorCard from './components/CalculatorCard';
import InputField from './components/InputField';
import OutputDisplay from './components/OutputDisplay';
import AiSuggestionBox from './components/AiSuggestionBox';
import SaveOptions from './components/SaveOptions';
import InspirationSection from './components/InspirationSection';

const DroneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor"><path d="M22 14.654a1 1 0 0 0-1.414-.924l-3.351 1.543a5.034 5.034 0 0 0-1.127-3.051l1.543-3.352a1 1 0 0 0-.924-1.414L14.654 2H9.346l-2.078 2.078a1 1 0 0 0-.924 1.414l1.543 3.352a5.034 5.034 0 0 0-3.051 1.127L3.393 8.428a1 1 0 0 0-1.414.924L2 14.654v4.692l2.078-2.078a1 1 0 0 0 1.414.924l3.352-1.543a5.034 5.034 0 0 0 1.127 3.051l-1.543 3.352a1 1 0 0 0 .924 1.414L9.346 22h5.308l2.078-2.078a1 1 0 0 0 .924-1.414l-1.543-3.352a5.034 5.034 0 0 0 3.051-1.127l3.352 1.543a1 1 0 0 0 1.414-.924L22 14.654V9.346l-2.078 2.078zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75zM12 18a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 12 18zM5.25 12a.75.75 0 0 1-.75-.75h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 .75.75zM21 12a.75.75 0 0 1-.75-.75h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 .75.75zM7.336 7.336a.75.75 0 0 1 1.06 0l2.122 2.121a.75.75 0 1 1-1.06 1.06L7.336 8.397a.75.75 0 0 1 0-1.06zm9.192 9.192a.75.75 0 0 1 1.06 0l2.122 2.121a.75.75 0 0 1-1.06 1.06l-2.121-2.122a.75.75 0 0 1 0-1.06zM16.528 7.336a.75.75 0 0 1 0 1.06L14.407 10.52a.75.75 0 1 1-1.06-1.06l2.121-2.122a.75.75 0 0 1 1.06 0zM8.397 16.528a.75.75 0 0 1 0 1.06L6.275 19.71a.75.75 0 1 1-1.06-1.06l2.122-2.121a.75.75 0 0 1 1.06 0z"/></svg>;

interface MainCalculatorState {
  title: string;
  isDefault: boolean;
  fields: DynamicField[];
  costs: { [key: string]: number | boolean };
  suggestion: string | null;
  isLoadingSuggestion: boolean;
  imageUrl: string | null;
}

const initialDefaultCalculatorState: MainCalculatorState = {
  title: "Drone Enthusiast",
  isDefault: true,
  fields: [
    { id: 'drone', name: 'Cost of Drone', label: 'Cost of Drone', isRecurring: false },
    { id: 'batteries', name: 'Extra Batteries', label: 'Cost of Extra Batteries', isRecurring: false },
    { id: 'camera', name: 'High-Quality Camera', label: 'Cost of High-Quality Camera (if separate)', isRecurring: false },
    { id: 'insurance', name: 'Annual Insurance', label: 'Annual Insurance Cost', isRecurring: true },
    { id: 'hasSubscription', name: 'Subscription', label: 'Recurring Software Subscription', type: 'checkbox' },
    { id: 'subscriptionCost', name: 'Annual Software Cost', label: 'Annual Software Cost', disabledIf: 'hasSubscription', isRecurring: true },
  ],
  costs: { drone: 0, batteries: 0, camera: 0, insurance: 0, hasSubscription: false, subscriptionCost: 0 },
  suggestion: null,
  isLoadingSuggestion: false,
  imageUrl: null,
};

const currencyOptions = {
    USD: { symbol: '$', name: 'US Dollar' }, EUR: { symbol: '€', name: 'Euro' }, GBP: { symbol: '£', name: 'British Pound' },
    JPY: { symbol: '¥', name: 'Japanese Yen' }, CAD: { symbol: '$', name: 'Canadian Dollar' },
};

const loadState = <T,>(key: string, initialState: T): T => {
    try {
        const savedState = localStorage.getItem(key);
        return savedState ? JSON.parse(savedState) : initialState;
    } catch (error) { console.error(`Error loading state for ${key}`, error); return initialState; }
};

const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => loadState('hobbyist-compass-darkMode', false));
  const [calculator, setCalculator] = useState<MainCalculatorState>(() => loadState('hobbyist-compass-mainCalculator', initialDefaultCalculatorState));
  const [currency, setCurrency] = useState<string>(() => loadState('hobbyist-compass-currency', 'USD'));
  const [apiError, setApiError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingCalculator, setIsGeneratingCalculator] = useState(false);
  const [generatorError, setGeneratorError] = useState<string | null>(null);
  
  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);

  useEffect(() => { localStorage.setItem('hobbyist-compass-darkMode', JSON.stringify(isDarkMode)); }, [isDarkMode]);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => { localStorage.setItem('hobbyist-compass-mainCalculator', JSON.stringify(calculator)); }, [calculator]);
  useEffect(() => { localStorage.setItem('hobbyist-compass-currency', JSON.stringify(currency)); }, [currency]);

  const handleThemeToggle = () => setIsDarkMode(prev => !prev);

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCalculator(prev => ({
      ...prev,
      costs: {
        ...prev.costs,
        [name]: type === 'checkbox' ? checked : (parseFloat(value) || 0)
      }
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculator(prev => ({ ...prev, title: e.target.value }));
  };

  const currencySymbol = useMemo(() => currencyOptions[currency as keyof typeof currencyOptions]?.symbol || '$', [currency]);
  
  const { startupCost, recurringCost, totalCost } = useMemo(() => {
    let startup = 0;
    let recurring = 0;
    
    Object.entries(calculator.costs).forEach(([key, value]) => {
      const field = calculator.fields.find(f => f.id === key);
      if (field?.type === 'checkbox' || typeof value !== 'number') return;
      
      if (field?.isRecurring) {
        recurring += value;
      } else {
        startup += value;
      }
    });
    
    return { startupCost: startup, recurringCost: recurring, totalCost: startup + recurring };
  }, [calculator.costs, calculator.fields]);


  const handleGenerateCalculator = async (query: string) => {
      if (!query.trim()) return;
      
      setSearchQuery(query);
      setIsGeneratingCalculator(true);
      setGeneratorError(null);
      setCalculator(prev => ({ ...initialDefaultCalculatorState, costs: {}, fields: [], title: 'Generating...', isDefault: false, imageUrl: null }));

      const schema = {
          type: Type.OBJECT,
          properties: {
            hobbyName: { type: Type.STRING, description: 'A short, catchy name for this hobby calculator, like "PC Build Budgeter" or "New Pet Planner".' },
            costComponents: {
              type: Type.ARRAY, description: 'A list of the primary cost components for this hobby.',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'A unique, camelCase identifier for this cost, e.g., "graphicsCard" or "initialVetVisit".' },
                  name: { type: Type.STRING, description: 'A short, user-friendly name for the input field, e.g., "Graphics Card (GPU)".' },
                  label: { type: Type.STRING, description: 'The full label for the input field, e.g., "Cost of Graphics Card (GPU)".' },
                  isRecurring: { type: Type.BOOLEAN, description: 'Set to true if this is an ongoing or monthly/annual cost (e.g., subscription, insurance, supplies), false for one-time startup costs.' }
                }, required: ['id', 'name', 'label', 'isRecurring']
              }
            }
          }, required: ['hobbyName', 'costComponents']
      };

      try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate the cost components for the hobby: '${query}'. Provide a list of items a user would need to budget for, distinguishing between one-time startup costs and recurring monthly/annual costs.`,
            config: { responseMimeType: "application/json", responseSchema: schema },
        });
        const result = JSON.parse(response.text);
        const initialCosts = result.costComponents.reduce((acc: any, field: DynamicField) => {
            acc[field.id] = 0;
            return acc;
        }, {});
        
        const newCalculatorState = {
            title: result.hobbyName,
            isDefault: false,
            fields: result.costComponents,
            costs: initialCosts,
            suggestion: null,
            isLoadingSuggestion: false,
            imageUrl: null,
        };

        setCalculator(newCalculatorState);
        
        // Now, generate an image for the new calculator
        try {
            const imageResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: `A clean, simple, high-quality icon representing the hobby of ${result.hobbyName}. Centered object on a plain background, suitable for a web application.` }] },
                config: { responseModalities: [Modality.IMAGE] },
            });

            for (const part of imageResponse.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setCalculator(prev => ({...prev, imageUrl: imageUrl}));
                    break; 
                }
            }
        } catch (imageError) {
            console.error("Image generation error:", imageError);
            // Image generation failed, but the calculator itself is fine. The user will see the fallback icon.
        }


      } catch (error) {
          console.error("Calculator generation error:", error);
          setGeneratorError("Sorry, I couldn't create that calculator. Please try a different hobby or rephrase your request.");
          setCalculator(initialDefaultCalculatorState);
      } finally {
          setIsGeneratingCalculator(false);
      }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerateCalculator(searchQuery);
  };

  const handleGenerateSuggestion = useCallback(async () => {
    setCalculator(prev => ({...prev, isLoadingSuggestion: true, suggestion: null}));
    setApiError(null);
    
    const costString = calculator.fields.map(field => `${field.name}: ${formatCurrency(calculator.costs[field.id] as number || 0, currency)} (${field.isRecurring ? 'recurring' : 'startup'})`).join(', ');
    const prompt = `You are 'The Hobbyist's Compass,' an AI assistant providing budget advice. Based on the user's cost breakdown in ${currency}, provide 2-3 brief, encouraging bullet points with tips on getting the best value or potential savings. Address the user directly. Keep the response under 100 words. Their costs for ${calculator.title} are: Startup Costs: ${formatCurrency(startupCost, currency)}, Recurring Costs: ${formatCurrency(recurringCost, currency)}. Full breakdown: ${costString}.`;

    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        setCalculator(prev => ({...prev, suggestion: response.text}));
    } catch (error) {
        console.error("AI suggestion error:", error);
        setApiError("Sorry, I couldn't generate a suggestion right now. Please try again later.");
    } finally {
        setCalculator(prev => ({...prev, isLoadingSuggestion: false}));
    }
  }, [ai, currency, calculator.title, calculator.fields, calculator.costs, startupCost, recurringCost]);

  const handleResetCalculator = () => {
    setCalculator(initialDefaultCalculatorState);
    setApiError(null);
    setSearchQuery('');
    setGeneratorError(null);
  };

  const handleSaveAsPDF = () => {
    const createRows = (fields: DynamicField[]) => {
        return fields
            .filter(field => field.type !== 'checkbox')
            .map(field => `<tr><td style="padding: 8px; border: 1px solid #ddd;">${field.label}</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatCurrency(calculator.costs[field.id] as number || 0, currency)}</td></tr>`)
            .join('');
    };
    const startupFields = calculator.fields.filter(f => !f.isRecurring);
    const recurringFields = calculator.fields.filter(f => f.isRecurring);
    const htmlContent = `<html><head><title>${calculator.title} - Cost Calculation</title><style>body{font-family:sans-serif;margin:2em}table{width:100%;border-collapse:collapse;margin-bottom:2em}th,td{padding:8px;border:1px solid #ddd;text-align:left}thead{background-color:#f2f2f2}h1,h2{color:#333}.total td{font-weight:bold;background-color:#f9f9f9}</style></head><body><h1>${calculator.title} - Cost Calculation</h1><p>Generated by The Hobbyist's Compass</p><h2>Startup Costs</h2><table><thead><tr><th>Item</th><th>Estimated Cost</th></tr></thead><tbody>${createRows(startupFields)}<tr class="total"><td><strong>Total Startup Cost</strong></td><td style="text-align: right;"><strong>${formatCurrency(startupCost, currency)}</strong></td></tr></tbody></table>${recurringFields.length > 0 ? `<h2>Recurring Costs</h2><table><thead><tr><th>Item</th><th>Estimated Cost</th></tr></thead><tbody>${createRows(recurringFields)}<tr class="total"><td><strong>Total Recurring Cost</strong></td><td style="text-align: right;"><strong>${formatCurrency(recurringCost, currency)}</strong></td></tr></tbody></table>` : ''}<h2>Grand Total</h2><table><tbody><tr class="total"><td><strong>Grand Total</strong></td><td style="text-align: right;"><strong>${formatCurrency(totalCost, currency)}</strong></td></tr></tbody></table></body></html>`;
    const win = window.open('', '', 'height=600,width=800');
    if (win) { win.document.write(htmlContent); win.document.close(); win.focus(); }
  };
  
  const handleSaveAsCSV = () => {
    const headers = ["Category", "Item", "Cost"];
    const startupRows = calculator.fields
      .filter(field => field.type !== 'checkbox' && !field.isRecurring)
      .map(field => ["Startup", `"${field.label.replace(/"/g, '""')}"`, calculator.costs[field.id] || 0]);
    const recurringRows = calculator.fields
      .filter(field => field.type !== 'checkbox' && field.isRecurring)
      .map(field => ["Recurring", `"${field.label.replace(/"/g, '""')}"`, calculator.costs[field.id] || 0]);

    const rows = [...startupRows, ...recurringRows];
    rows.push(['Summary', '"Total Startup Cost"', startupCost]);
    rows.push(['Summary', '"Total Recurring Cost"', recurringCost]);
    rows.push(['Summary', '"Grand Total"', totalCost]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${calculator.title.replace(/\s/g, '_')}_costs.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailResults = () => {
    let body = `Hello,\n\nHere are the estimated costs for my hobby: ${calculator.title}\n\n`;
    
    body += '--- STARTUP COSTS ---\n';
    calculator.fields
      .filter(field => field.type !== 'checkbox' && !field.isRecurring)
      .forEach(field => { body += `${field.label}: ${formatCurrency(calculator.costs[field.id] as number || 0, currency)}\n`; });
    body += `Total Startup: ${formatCurrency(startupCost, currency)}\n\n`;

    const recurringFields = calculator.fields.filter(field => field.type !== 'checkbox' && field.isRecurring);
    if (recurringFields.length > 0) {
      body += '--- RECURRING COSTS ---\n';
      recurringFields.forEach(field => { body += `${field.label}: ${formatCurrency(calculator.costs[field.id] as number || 0, currency)}\n`; });
      body += `Total Recurring: ${formatCurrency(recurringCost, currency)}\n\n`;
    }

    body += `Grand Total: ${formatCurrency(totalCost, currency)}\n\nCalculated with The Hobbyist's Compass.`;
    const subject = `Hobby Cost Calculation: ${calculator.title}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <Header isDarkMode={isDarkMode} onToggleTheme={handleThemeToggle} />
      
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 px-4 sm:px-0">
          <div>
            <label htmlFor="currency-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Choose your currency:</label>
            <select id="currency-select" name="currency" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {Object.entries(currencyOptions).map(([code, details]) => <option key={code} value={code}>{details.name} ({code})</option>)}
            </select>
          </div>
          <form onSubmit={handleFormSubmit} className="w-full sm:w-auto flex-grow sm:max-w-md">
            <label htmlFor="hobby-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Generate a new calculator:</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="search" name="hobby-search" id="hobby-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Build a PC, Get a Pet..." />
              <button type="submit" disabled={isGeneratingCalculator} className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-200 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-500">
                {isGeneratingCalculator ? '...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mb-12"><AdPlaceholder type="banner" /></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    
                    <div className="xl:col-span-2">
                        {generatorError && <div className="mb-4 text-center p-4 text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-lg">{generatorError}</div>}
                        <CalculatorCard title={calculator.title} icon={calculator.isDefault ? <DroneIcon /> : <SparklesIcon />} onReset={handleResetCalculator} isEditable={true} onTitleChange={handleTitleChange} imageUrl={calculator.imageUrl}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {calculator.fields.map(field => (
                                    <InputField key={field.id} id={field.id} name={field.id} label={field.label} value={calculator.costs[field.id] || (field.type === 'checkbox' ? false : 0)} onChange={handleCostChange} symbol={currencySymbol} type={field.type || 'number'} disabled={field.disabledIf ? !calculator.costs[field.disabledIf] : false} />
                                ))}
                            </div>
                            <hr className="my-4 border-t border-gray-200 dark:border-gray-700" />
                            <div className="space-y-2">
                                <OutputDisplay label="Total Estimated Startup Cost" value={startupCost} description="One-time initial investment" currency={currency} />
                                <OutputDisplay label="Total Estimated Recurring Cost" value={recurringCost} description="Ongoing monthly/annual costs" currency={currency} />
                                <OutputDisplay label="Grand Total" value={totalCost} description="Sum of startup and recurring costs" currency={currency} />
                            </div>
                            <AiSuggestionBox isLoading={calculator.isLoadingSuggestion} suggestion={calculator.suggestion} error={apiError} onGenerate={handleGenerateSuggestion} isButtonDisabled={totalCost === 0} />
                            <SaveOptions onSavePDF={handleSaveAsPDF} onSaveCSV={handleSaveAsCSV} onEmail={handleEmailResults} isButtonDisabled={totalCost === 0}/>
                        </CalculatorCard>
                    </div>

                    <InspirationSection onGenerate={handleGenerateCalculator} />

                    <div className="flex items-center justify-center"><AdPlaceholder type="in-content" /></div>
                </div>
            </div>

            <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-8"><AdPlaceholder type="sidebar" /></div>
            </aside>
        </div>
      </main>
      <SeoContent />
      <Footer />
    </div>
  );
}

export default App;
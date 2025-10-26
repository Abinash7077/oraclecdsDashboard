'use client'
import { useState, useRef } from 'react';

export default function OracleStyleCRM() {
  // Entity Configuration - Like Oracle's Object Builder
  const [entityConfig, setEntityConfig] = useState({
    name: 'Customer',
    fields: [
      { name: 'customerId', label: 'Customer ID', type: 'text', required: true, readOnly: true },
      { name: 'firstName', label: 'First Name', type: 'text', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true, unique: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: false },
      { name: 'company', label: 'Company', type: 'text', required: false },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Prospect'], default: 'Prospect' },
      { name: 'accountValue', label: 'Account Value', type: 'number', required: false },
      { name: 'assignedTo', label: 'Assigned To', type: 'text', required: false },
      { name: 'notes', label: 'Notes', type: 'textarea', required: false }
    ],
    workflows: [],
    validations: [],
    triggers: []
  });

  // Form State
  const [formState, setFormState] = useState(
    entityConfig.fields.reduce((acc, field) => {
      acc[field.name] = field.default || '';
      return acc;
    }, {})
  );

  // Workflow/Automation Code
  const [automationCode, setAutomationCode] = useState(``);

  const [output, setOutput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fieldListeners = useRef({});

  // Field operations
  const setField = (fieldName, value) => {
    setFormState(prev => {
      const newState = { ...prev, [fieldName]: value };
      
      if (fieldListeners.current[fieldName]) {
        try {
          fieldListeners.current[fieldName](value, newState);
        } catch (err) {
          console.error('Listener error:', err);
        }
      }
      
      return newState;
    });
  };

  const getField = (fieldName) => {
    return formState[fieldName];
  };

  const onFieldChange = (fieldName, callback) => {
    fieldListeners.current[fieldName] = callback;
  };

  const getEntityConfig = () => {
    return entityConfig;
  };

  const showMessage = (message, type = 'info') => {
    const msg = { id: Date.now(), message, type };
    setMessages(prev => [...prev, msg]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== msg.id));
    }, 5000);
  };

  // Mock API
  const callAPI = async (url, method = 'GET', data = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          customerId: 'CUST-' + Date.now(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@acme.com',
          phone: '+1234567890',
          company: 'ACME Corp',
          status: 'Active',
          accountValue: 150000,
          assignedTo: 'Senior Account Manager'
        };
        
        resolve({
          success: true,
          message: `${method} ${url} completed`,
          data: method === 'GET' ? (url.includes('search') ? [mockData] : mockData) : data,
          timestamp: new Date().toISOString()
        });
      }, 800);
    });
  };

  // Execute automation code
  const executeAutomation = async () => {
    setOutput('');
    setLoading(true);
    
    try {
      const logs = [];
      const mockConsole = {
        log: (...args) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          logs.push(message);
          setOutput(prev => prev + message + '\n');
        }
      };

      const formProxy = new Proxy(formState, {
        get: (target, prop) => target[prop],
        set: (target, prop, value) => {
          setField(prop, value);
          return true;
        }
      });

      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const func = new AsyncFunction(
        'form',
        'setField',
        'getField',
        'onFieldChange',
        'validate',
        'callAPI',
        'showMessage',
        'getEntityConfig',
        'console',
        automationCode
      );
      
      await func(
        formProxy,
        setField,
        getField,
        onFieldChange,
        () => true,
        callAPI,
        showMessage,
        getEntityConfig,
        mockConsole
      );
      
      if (logs.length === 0) {
        setOutput('✓ Automation executed successfully!');
      }
    } catch (err) {
      setOutput(`❌ Error: ${err.message}\n\n${err.stack}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setField(fieldName, value);
  };

  const clearForm = () => {
    setFormState(entityConfig.fields.reduce((acc, field) => {
      acc[field.name] = field.default || '';
      return acc;
    }, {}));
    setOutput('');
    setMessages([]);
    fieldListeners.current = {};
  };

  // Get message icon based on type
  const getMessageIcon = (type) => {
    switch(type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  };

  const getMessageColor = (type) => {
    switch(type) {
      case 'success': return 'bg-green-500 border-green-600';
      case 'error': return 'bg-red-500 border-red-600';
      case 'warning': return 'bg-yellow-500 border-yellow-600';
      default: return 'bg-blue-500 border-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 shadow-2xl border border-blue-400">
          <h1 className="text-3xl font-bold text-white mb-2">Oracle-Style CRM Platform</h1>
          <p className="text-blue-100">Enterprise Customer Management with Workflow Automation</p>
        </div>

        {/* Messages/Notifications */}
        {messages.length > 0 && (
          <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`${getMessageColor(msg.type)} text-white px-4 py-3 rounded-lg shadow-lg border-l-4 flex items-center gap-3 animate-slide-in`}
              >
                <span className="text-xl font-bold">{getMessageIcon(msg.type)}</span>
                <span>{msg.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Entity Info */}
        <div className="mb-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Entity: {entityConfig.name}</h3>
              <p className="text-sm text-gray-400">{entityConfig.fields.length} fields configured</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded text-xs font-semibold">
                {entityConfig.fields.filter(f => f.required).length} Required
              </span>
              <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded text-xs font-semibold">
                Workflow Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-6 bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>📝</span> Customer Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entityConfig.fields.map((field, idx) => (
              <div key={idx} className={`flex flex-col gap-2 ${field.type === 'textarea' ? 'col-span-full' : ''}`}>
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  {field.label}
                  {field.required && <span className="text-red-400">*</span>}
                  {field.readOnly && <span className="text-xs text-gray-500">(Read-only)</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formState[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    disabled={field.readOnly}
                    className="border border-gray-600 rounded h-9 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formState[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    disabled={field.readOnly}
                    rows={3}
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formState[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    disabled={field.readOnly}
                    className="border border-gray-600 rounded h-9 px-3 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}
                <div className="text-xs text-gray-500 font-mono">field: "{field.name}"</div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation/Workflow Engine */}
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-purple-700 to-blue-700 px-6 py-4 flex items-center justify-between border-b border-gray-600">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <div>
                <h2 className="text-lg font-semibold text-white">Workflow & Automation Engine</h2>
                <p className="text-xs text-blue-200">Oracle-style Business Logic Builder</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
          </div>

          <textarea
            value={automationCode}
            onChange={(e) => setAutomationCode(e.target.value)}
            className="w-full h-96 p-6 bg-black text-green-400 font-mono text-sm focus:outline-none resize-none"
            style={{ 
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              lineHeight: '1.6',
              tabSize: 2
            }}
            spellCheck={false}
          />

          {output && (
            <div className="border-t border-gray-700 bg-gray-900 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📊</span>
                <div className="text-sm font-semibold text-gray-300">EXECUTION LOG</div>
                <div className="h-px flex-1 bg-gray-700"></div>
              </div>
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap overflow-auto max-h-64 bg-black p-4 rounded border border-gray-800">
                {output}
              </pre>
            </div>
          )}

          <div className="bg-gray-700 px-6 py-4 flex items-center justify-between border-t border-gray-600">
            <div className="text-xs text-gray-300">
              💡 Define business rules, validations, and workflows above
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearForm}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all font-medium text-sm shadow-lg hover:shadow-xl"
              >
                🗑️ Clear Form
              </button>
              <button
                onClick={executeAutomation}
                disabled={loading}
                className="px-8 py-2.5 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Executing...
                  </>
                ) : (
                  <>⚡ Run Automation</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-all shadow-lg hover:shadow-xl">
            <div className="text-2xl mb-2">➕</div>
            <div className="font-semibold">New Customer</div>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-all shadow-lg hover:shadow-xl">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-semibold">Search</div>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-all shadow-lg hover:shadow-xl">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">Reports</div>
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-all shadow-lg hover:shadow-xl">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold">Settings</div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
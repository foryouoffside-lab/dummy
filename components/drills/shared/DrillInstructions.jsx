'use client';

import { useState } from 'react';
import { Target, Zap, Clock, Award, ChevronRight, ChevronLeft } from 'lucide-react';

export default function DrillInstructions({ 
  title, 
  steps, 
  tips = [],
  estimatedTime,
  points,
  onStart 
}) {
  
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onStart();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center rounded-t-2xl">
          <Target className="w-12 h-12 mx-auto mb-2" />
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-blue-100 text-sm mt-1">How to play</p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 p-4 border-b border-gray-100">
          <div className="text-center">
            <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-900">{points} XP</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-900">{estimatedTime}</p>
            <p className="text-xs text-gray-500">Est. Time</p>
          </div>
          <div className="text-center">
            <Award className="w-4 h-4 text-purple-500 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-900">Achievements</p>
            <p className="text-xs text-gray-500">Earn badges</p>
          </div>
        </div>
        
        {/* Steps Carousel */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
              <div className="flex gap-1">
                {steps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition ${
                      idx === currentStep ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">{steps[currentStep].icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Start Drill' : 'Next'}
              {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* Tips Section */}
        {tips.length > 0 && (
          <div className="bg-yellow-50 p-4 border-t border-yellow-100">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span> Pro Tips
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
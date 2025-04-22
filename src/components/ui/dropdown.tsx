'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'


interface Scenario {
    label: string;
    value: string;
    description: string;
    prompt: string;
}

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedScenario, setSelectedScenario] = useState('Sales');

    const scenarios: Scenario[] = [
        { 
            label: 'Sales', 
            value: 'sales',
            description: 'Practice sales negotiation skills',
            prompt: 'You are playing the role of a sales person',
        },
        { 
            label: 'Salary', 
            value: 'salary',
            description: 'Practice negotiating your salary',
            prompt: 'You are playing the role of an employee negotiating a salary increase. '
        },
        { 
            label: 'Contract', 
            value: 'contract',
            description: 'Practice negotiating a contract',
            prompt: 'You are playing the role of a business partner negotiating contract terms.'
        },
    ];
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    // STOPPING HERE YOU STILL NEED TO ADD TO SIDE BAR AND LINK BACK TO CHAT
    const handleSelect = (scenario: Scenario) => {
        setSelectedScenario(scenario.label);
        setIsOpen(false);
    };
 
    return (
        <div className="relative w-full">
            <button 
                type="button"
                className="w-full inline-flex justify-between items-center rounded-md 
                px-3 py-1.5 text-sm bg-white hover:bg-[#ff914d] hover:text-white 
                transition-colors duration-200 border border-gray-200"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                <span className="text-gray-700">{selectedScenario}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div 
                    className="absolute w-full mt-1 rounded-md shadow-lg bg-white ring-1 ring-gray-200 z-10"
                    role="menu"
                >
                    {scenarios.map((scenario, index) => (
                        <button
                            key={index}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-[#ff914d] hover:text-white 
                            transition-colors duration-200 border-b last:border-b-0"
                            onClick={() => handleSelect(scenario)}
                            role="menuitem"
                        >
                            <div className="text-gray-900">{scenario.label}</div>
                            <div className="text-gray-400 text-xs mt-0.5">{scenario.description}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
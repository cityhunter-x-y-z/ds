/* ===================================
   CHECKBOX STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Toggle/Checkbox.stories.tsx
   Based on Figma Checkbox specifications (Node: 396-13807)
   24 variants: 4 states × 3 toggle options × 2 label options
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import React from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Toggle/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox component following Figma design specifications. 16x16px checkbox with 24 variants covering all states and toggle options including indeterminate state.'
      }
    }
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'disable'],
      description: 'Checkbox state'
    },
    toggle: {
      control: 'select',
      options: ['off', 'on', 'indeterminate'],
      description: 'Checkbox toggle state'
    },
    label: {
      control: 'boolean',
      description: 'Whether to show label text'
    },
    labelText: {
      control: 'text',
      description: 'Label text content'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when checkbox state changes'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ===== BASIC STORIES =====

export const Default: Story = {
  args: {
    state: 'default'
    // No toggle prop = uncontrolled mode
  }
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return (
      <Checkbox
        state="default"
        toggle={checked ? 'on' : 'off'}
        onChange={(isChecked) => setChecked(isChecked)}
      />
    );
  }
};

export const Indeterminate: Story = {
  render: () => {
    const [toggle, setToggle] = React.useState<'off' | 'on' | 'indeterminate'>('indeterminate');
    return (
      <Checkbox
        state="default"
        toggle={toggle}
        onChange={(isChecked) => setToggle(isChecked ? 'on' : 'off')}
      />
    );
  }
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        state="default"
        toggle={checked ? 'on' : 'off'}
        label={true}
        labelText="Checkbox Label"
        onChange={(isChecked) => setChecked(isChecked)}
      />
    );
  }
};

export const Disabled: Story = {
  args: {
    state: 'disable',
    toggle: 'off'
  }
};

export const DisabledChecked: Story = {
  args: {
    state: 'disable',
    toggle: 'on'
  }
};

// ===== ALL STATES SHOWCASE =====

export const AllStates: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      default: false,
      hover: false,
      focus: false,
      disable: false
    });
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Default</div>
          <Checkbox 
            state="default" 
            toggle={states.default ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, default: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Hover</div>
          <Checkbox 
            state="hover" 
            toggle={states.hover ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, hover: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Focus</div>
          <Checkbox 
            state="focus" 
            toggle={states.focus ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, focus: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Disabled</div>
          <Checkbox state="disable" toggle={states.disable ? 'on' : 'off'} />
        </div>
      </div>
    );
  }
};

// ===== ALL TOGGLE OPTIONS =====

export const AllToggleOptions: Story = {
  render: () => {
    const [states, setStates] = React.useState({ off: false, on: true, indeterminate: 'indeterminate' as const });
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>OFF</div>
          <Checkbox 
            toggle={states.off ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, off: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>ON</div>
          <Checkbox 
            toggle={states.on ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, on: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Indeterminate</div>
          <Checkbox 
            toggle={states.indeterminate}
            onChange={(checked) => setStates(prev => ({ ...prev, indeterminate: checked ? 'on' : 'off' }))}
          />
        </div>
      </div>
    );
  }
};

// ===== WITH LABELS =====

export const WithLabels: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      terms: false,
      newsletter: true,
      notifications: 'indeterminate' as const,
      disabled: false
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox 
          label={true} 
          labelText="Accept terms and conditions" 
          toggle={states.terms ? 'on' : 'off'}
          onChange={(checked) => setStates(prev => ({ ...prev, terms: checked }))}
        />
        <Checkbox 
          label={true} 
          labelText="Subscribe to newsletter" 
          toggle={states.newsletter ? 'on' : 'off'}
          onChange={(checked) => setStates(prev => ({ ...prev, newsletter: checked }))}
        />
        <Checkbox 
          label={true} 
          labelText="Enable notifications" 
          toggle={states.notifications}
          onChange={(checked) => setStates(prev => ({ ...prev, notifications: checked ? 'on' : 'off' }))}
        />
        <Checkbox 
          label={true} 
          labelText="Disabled option" 
          state="disable" 
          toggle={states.disabled ? 'on' : 'off'}
        />
      </div>
    );
  }
};

// ===== INTERACTIVE STORY =====

export const Interactive: Story = {
  render: () => {
    const [checkboxStates, setCheckboxStates] = React.useState({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Interactive Checkboxes
        </h3>
        
        <Checkbox
          label={true}
          labelText="Option 1"
          toggle={checkboxStates.checkbox1 ? 'on' : 'off'}
          onChange={(checked) => setCheckboxStates(prev => ({ ...prev, checkbox1: checked === true }))}
        />
        
        <Checkbox
          label={true}
          labelText="Option 2"
          toggle={checkboxStates.checkbox2 ? 'on' : 'off'}
          onChange={(checked) => setCheckboxStates(prev => ({ ...prev, checkbox2: checked === true }))}
        />
        
        <Checkbox
          label={true}
          labelText="Option 3"
          toggle={checkboxStates.checkbox3 ? 'on' : 'off'}
          onChange={(checked) => setCheckboxStates(prev => ({ ...prev, checkbox3: checked === true }))}
        />
        
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#667085' }}>
          Selected: {Object.entries(checkboxStates)
            .filter(([_, checked]) => checked)
            .map(([key]) => key)
            .join(', ') || 'None'}
        </div>
      </div>
    );
  }
};

// ===== ALL 24 VARIANTS MATRIX =====

export const All24Variants: Story = {
  render: () => {
    const [states, setStates] = React.useState(() => {
      const initial: Record<string, boolean | 'indeterminate'> = {};
      ['default', 'hover', 'focus', 'disable'].forEach(state => {
        initial[`${state}-off`] = false;
        initial[`${state}-on`] = true;
        initial[`${state}-ind`] = 'indeterminate';
        initial[`${state}-label-off`] = false;
        initial[`${state}-label-on`] = true;
        initial[`${state}-label-ind`] = 'indeterminate';
      });
      return initial;
    });
    
    const updateState = (key: string, value: boolean) => {
      if (key.includes('disable')) return; // Don't update disabled states
      setStates(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'semibold' }}>
          All 24 Figma Variants (4 states × 3 toggle options × 2 label options)
        </h3>
        
        {/* Without Labels */}
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 'medium' }}>
            Without Labels (12 variants)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {['default', 'hover', 'focus', 'disable'].map(state => (
              <div key={`no-label-${state}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'medium', textAlign: 'center' }}>
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <Checkbox 
                    state={state as any} 
                    toggle={states[`${state}-off`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-off`, checked)}
                  />
                  <Checkbox 
                    state={state as any} 
                    toggle={states[`${state}-on`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-on`, checked)}
                  />
                  <Checkbox 
                    state={state as any} 
                    toggle={states[`${state}-ind`]}
                    onChange={(checked) => updateState(`${state}-ind`, checked)}
                  />
                </div>
                <div style={{ fontSize: '10px', textAlign: 'center', color: '#667085' }}>
                  OFF / ON / IND
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* With Labels */}
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 'medium' }}>
            With Labels (12 variants)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {['default', 'hover', 'focus', 'disable'].map(state => (
              <div key={`with-label-${state}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'medium' }}>
                  {state.charAt(0).toUpperCase() + state.slice(1)} State
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Checkbox 
                    state={state as any} 
                    label={true} 
                    labelText={`${state} OFF`} 
                    toggle={states[`${state}-label-off`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-label-off`, checked)}
                  />
                  <Checkbox 
                    state={state as any} 
                    label={true} 
                    labelText={`${state} ON`} 
                    toggle={states[`${state}-label-on`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-label-on`, checked)}
                  />
                  <Checkbox 
                    state={state as any} 
                    label={true} 
                    labelText={`${state} Indeterminate`} 
                    toggle={states[`${state}-label-ind`]}
                    onChange={(checked) => updateState(`${state}-label-ind`, checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
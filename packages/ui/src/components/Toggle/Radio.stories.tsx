/* ===================================
   RADIO STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Toggle/Radio.stories.tsx
   Based on Figma Radio specifications (Node: 392-10690)
   16 variants: 4 states × 2 toggle options × 2 label options
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';
import React from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Toggle/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio component following Figma design specifications. 16x16px circular radio with 16 variants covering all states and toggle options.'
      }
    }
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'disable'],
      description: 'Radio state'
    },
    toggle: {
      control: 'select',
      options: ['off', 'on'],
      description: 'Radio toggle state'
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
      description: 'Whether the radio is disabled'
    },
    name: {
      control: 'text',
      description: 'Radio group name'
    },
    value: {
      control: 'text',
      description: 'Radio value'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when radio state changes'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ===== BASIC STORIES =====

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(false);
    return (
      <Radio
        state="default"
        toggle={selected ? 'on' : 'off'}
        name="radio-example"
        value="option1"
        onChange={(checked) => setSelected(checked)}
      />
    );
  }
};

export const Selected: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(true);
    return (
      <Radio
        state="default"
        toggle={selected ? 'on' : 'off'}
        name="radio-example"
        value="option1"
        onChange={(checked) => setSelected(checked)}
      />
    );
  }
};

export const WithLabel: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(false);
    return (
      <Radio
        state="default"
        toggle={selected ? 'on' : 'off'}
        label={true}
        labelText="Radio Option"
        name="radio-example"
        value="option1"
        onChange={(checked) => setSelected(checked)}
      />
    );
  }
};

export const Disabled: Story = {
  args: {
    state: 'disable',
    toggle: 'off',
    name: 'radio-example',
    value: 'option1'
  }
};

export const DisabledSelected: Story = {
  args: {
    state: 'disable',
    toggle: 'on',
    name: 'radio-example',
    value: 'option1'
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
          <Radio 
            state="default" 
            name="states-demo" 
            value="default"
            toggle={states.default ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, default: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Hover</div>
          <Radio 
            state="hover" 
            name="states-demo" 
            value="hover"
            toggle={states.hover ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, hover: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Focus</div>
          <Radio 
            state="focus" 
            name="states-demo" 
            value="focus"
            toggle={states.focus ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, focus: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Disabled</div>
          <Radio state="disable" name="states-demo" value="disabled" toggle={states.disable ? 'on' : 'off'} />
        </div>
      </div>
    );
  }
};

// ===== SELECTED STATES =====

export const SelectedStates: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      default: true,
      hover: true,
      focus: true,
      disable: true
    });
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Default Selected</div>
          <Radio 
            state="default" 
            name="selected-demo" 
            value="default"
            toggle={states.default ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, default: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Hover Selected</div>
          <Radio 
            state="hover" 
            name="selected-demo" 
            value="hover"
            toggle={states.hover ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, hover: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Focus Selected</div>
          <Radio 
            state="focus" 
            name="selected-demo" 
            value="focus"
            toggle={states.focus ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, focus: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Disabled Selected</div>
          <Radio state="disable" name="selected-demo" value="disabled" toggle={states.disable ? 'on' : 'off'} />
        </div>
      </div>
    );
  }
};

// ===== RADIO GROUP STORY =====

export const RadioGroupExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = React.useState('option1');
    
    return (
      <RadioGroup
        name="example-group"
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4 (Disabled)', disabled: true }
        ]}
      />
    );
  }
};

// ===== INTERACTIVE SINGLE RADIOS =====

export const InteractiveSingleRadios: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Choose your preferred option:
        </h3>
        
        <Radio
          label={true}
          labelText="Small size"
          name="size-options"
          value="small"
          toggle={selectedOption === 'small' ? 'on' : 'off'}
          onChange={(checked, event) => {
            if (checked) setSelectedOption(event.target.value);
          }}
        />
        
        <Radio
          label={true}
          labelText="Medium size"
          name="size-options"
          value="medium"
          toggle={selectedOption === 'medium' ? 'on' : 'off'}
          onChange={(checked, event) => {
            if (checked) setSelectedOption(event.target.value);
          }}
        />
        
        <Radio
          label={true}
          labelText="Large size"
          name="size-options"
          value="large"
          toggle={selectedOption === 'large' ? 'on' : 'off'}
          onChange={(checked, event) => {
            if (checked) setSelectedOption(event.target.value);
          }}
        />
        
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#667085' }}>
          Selected: {selectedOption || 'None'}
        </div>
      </div>
    );
  }
};

// ===== ALL 16 VARIANTS MATRIX =====

export const All16Variants: Story = {
  render: () => {
    const [states, setStates] = React.useState(() => {
      const initial: Record<string, boolean> = {};
      ['default', 'hover', 'focus', 'disable'].forEach(state => {
        initial[`${state}-off`] = false;
        initial[`${state}-on`] = true;
        initial[`${state}-label-off`] = false;
        initial[`${state}-label-on`] = true;
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
          All 16 Figma Variants (4 states × 2 toggle options × 2 label options)
        </h3>
        
        {/* Without Labels */}
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 'medium' }}>
            Without Labels (8 variants)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {['default', 'hover', 'focus', 'disable'].map(state => (
              <div key={`no-label-${state}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'medium', textAlign: 'center' }}>
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <Radio 
                    state={state as any} 
                    name={`${state}-group`} 
                    value="off"
                    toggle={states[`${state}-off`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-off`, checked)}
                  />
                  <Radio 
                    state={state as any} 
                    name={`${state}-group`} 
                    value="on"
                    toggle={states[`${state}-on`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-on`, checked)}
                  />
                </div>
                <div style={{ fontSize: '10px', textAlign: 'center', color: '#667085' }}>
                  OFF / ON
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* With Labels */}
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 'medium' }}>
            With Labels (8 variants)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {['default', 'hover', 'focus', 'disable'].map(state => (
              <div key={`with-label-${state}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'medium' }}>
                  {state.charAt(0).toUpperCase() + state.slice(1)} State
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Radio 
                    state={state as any} 
                    label={true} 
                    labelText={`${state} OFF`}
                    name={`${state}-label-group`}
                    value="off"
                    toggle={states[`${state}-label-off`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-label-off`, checked)}
                  />
                  <Radio 
                    state={state as any} 
                    label={true} 
                    labelText={`${state} ON`}
                    name={`${state}-label-group`}
                    value="on"
                    toggle={states[`${state}-label-on`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-label-on`, checked)}
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

// ===== MULTIPLE RADIO GROUPS =====

export const MultipleRadioGroups: Story = {
  render: () => {
    const [selectedSize, setSelectedSize] = React.useState('medium');
    const [selectedColor, setSelectedColor] = React.useState('blue');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
            Size Options
          </h3>
          <RadioGroup
            name="size-group"
            value={selectedSize}
            onChange={(value) => setSelectedSize(value)}
            options={[
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' }
            ]}
          />
        </div>
        
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
            Color Options
          </h3>
          <RadioGroup
            name="color-group"
            value={selectedColor}
            onChange={(value) => setSelectedColor(value)}
            options={[
              { value: 'red', label: 'Red' },
              { value: 'blue', label: 'Blue' },
              { value: 'green', label: 'Green' },
              { value: 'yellow', label: 'Yellow (Disabled)', disabled: true }
            ]}
          />
        </div>
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Selected: Size = {selectedSize}, Color = {selectedColor}
        </div>
      </div>
    );
  }
};
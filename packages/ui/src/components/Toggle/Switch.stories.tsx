/* ===================================
   SWITCH STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Toggle/Switch.stories.tsx
   Based on Figma Switch specifications (Node: 388-9960)
   16 variants: 4 states × 2 toggle options × 2 label options
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import React from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Toggle/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Switch component following Figma design specifications. 40x24px pill-shaped switch with sliding thumb mechanism and 16 variants covering all states.'
      }
    }
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'disable'],
      description: 'Switch state'
    },
    toggle: {
      control: 'select',
      options: ['off', 'on'],
      description: 'Switch toggle state'
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
      description: 'Whether the switch is disabled'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when switch state changes'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ===== BASIC STORIES =====

export const Default: Story = {
  args: {
    state: 'default'
    // No toggle prop = uncontrolled mode
  }
};

export const On: Story = {
  render: () => {
    const [isOn, setIsOn] = React.useState(true);
    return (
      <Switch
        state="default"
        toggle={isOn ? 'on' : 'off'}
        onChange={(checked) => setIsOn(checked)}
      />
    );
  }
};

export const WithLabel: Story = {
  render: () => {
    const [isOn, setIsOn] = React.useState(false);
    return (
      <Switch
        state="default"
        toggle={isOn ? 'on' : 'off'}
        label={true}
        labelText="Enable notifications"
        onChange={(checked) => setIsOn(checked)}
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

export const DisabledOn: Story = {
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
          <Switch 
            state="default" 
            toggle={states.default ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, default: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Hover</div>
          <Switch 
            state="hover" 
            toggle={states.hover ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, hover: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Focus</div>
          <Switch 
            state="focus" 
            toggle={states.focus ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, focus: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Disabled</div>
          <Switch state="disable" toggle={states.disable ? 'on' : 'off'} />
        </div>
      </div>
    );
  }
};

// ===== ON STATES =====

export const OnStates: Story = {
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
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Default ON</div>
          <Switch 
            state="default" 
            toggle={states.default ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, default: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Hover ON</div>
          <Switch 
            state="hover" 
            toggle={states.hover ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, hover: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Focus ON</div>
          <Switch 
            state="focus" 
            toggle={states.focus ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, focus: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Disabled ON</div>
          <Switch state="disable" toggle={states.disable ? 'on' : 'off'} />
        </div>
      </div>
    );
  }
};

// ===== WITH LABELS =====

export const WithLabels: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      darkMode: false,
      notifications: true,
      autoSave: false,
      disabled: false
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch 
          label={true} 
          labelText="Enable dark mode" 
          toggle={states.darkMode ? 'on' : 'off'}
          onChange={(checked) => setStates(prev => ({ ...prev, darkMode: checked }))}
        />
        <Switch 
          label={true} 
          labelText="Allow notifications" 
          toggle={states.notifications ? 'on' : 'off'}
          onChange={(checked) => setStates(prev => ({ ...prev, notifications: checked }))}
        />
        <Switch 
          label={true} 
          labelText="Auto-save documents" 
          toggle={states.autoSave ? 'on' : 'off'}
          onChange={(checked) => setStates(prev => ({ ...prev, autoSave: checked }))}
        />
        <Switch 
          label={true} 
          labelText="Disabled feature" 
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
    const [switchStates, setSwitchStates] = React.useState({
      darkMode: false,
      notifications: true,
      autoSave: false,
      analytics: false
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Settings Panel
        </h3>
        
        <Switch
          label={true}
          labelText="Dark mode"
          toggle={switchStates.darkMode ? 'on' : 'off'}
          onChange={(checked) => setSwitchStates(prev => ({ ...prev, darkMode: checked }))}
        />
        
        <Switch
          label={true}
          labelText="Push notifications"
          toggle={switchStates.notifications ? 'on' : 'off'}
          onChange={(checked) => setSwitchStates(prev => ({ ...prev, notifications: checked }))}
        />
        
        <Switch
          label={true}
          labelText="Auto-save"
          toggle={switchStates.autoSave ? 'on' : 'off'}
          onChange={(checked) => setSwitchStates(prev => ({ ...prev, autoSave: checked }))}
        />
        
        <Switch
          label={true}
          labelText="Analytics tracking"
          toggle={switchStates.analytics ? 'on' : 'off'}
          onChange={(checked) => setSwitchStates(prev => ({ ...prev, analytics: checked }))}
        />
        
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#667085' }}>
          Enabled: {Object.entries(switchStates)
            .filter(([_, enabled]) => enabled)
            .map(([key]) => key)
            .join(', ') || 'None'}
        </div>
      </div>
    );
  }
};

// ===== SETTINGS FORM EXAMPLE =====

export const SettingsForm: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      emailNotifications: true,
      pushNotifications: false,
      marketingEmails: false,
      securityAlerts: true,
      productUpdates: false
    });
    
    return (
      <div style={{ 
        padding: '24px', 
        border: '1px solid #e4e7ec', 
        borderRadius: '8px',
        backgroundColor: '#fff',
        maxWidth: '400px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'semibold' }}>
          Notification Preferences
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'medium' }}>Email notifications</div>
              <div style={{ fontSize: '12px', color: '#667085' }}>Receive updates via email</div>
            </div>
            <Switch
              toggle={settings.emailNotifications ? 'on' : 'off'}
              onChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'medium' }}>Push notifications</div>
              <div style={{ fontSize: '12px', color: '#667085' }}>Get notified on your device</div>
            </div>
            <Switch
              toggle={settings.pushNotifications ? 'on' : 'off'}
              onChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'medium' }}>Marketing emails</div>
              <div style={{ fontSize: '12px', color: '#667085' }}>Promotional content and offers</div>
            </div>
            <Switch
              toggle={settings.marketingEmails ? 'on' : 'off'}
              onChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'medium' }}>Security alerts</div>
              <div style={{ fontSize: '12px', color: '#667085' }}>Important security updates</div>
            </div>
            <Switch
              toggle={settings.securityAlerts ? 'on' : 'off'}
              onChange={(checked) => setSettings(prev => ({ ...prev, securityAlerts: checked }))}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'medium' }}>Product updates</div>
              <div style={{ fontSize: '12px', color: '#667085' }}>New features and improvements</div>
            </div>
            <Switch
              toggle={settings.productUpdates ? 'on' : 'off'}
              onChange={(checked) => setSettings(prev => ({ ...prev, productUpdates: checked }))}
            />
          </div>
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
                  <Switch 
                    state={state as any} 
                    toggle={states[`${state}-off`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-off`, checked)}
                  />
                  <Switch 
                    state={state as any} 
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
                  <Switch 
                    state={state as any} 
                    label={true} 
                    labelText={`${state} OFF`} 
                    toggle={states[`${state}-label-off`] ? 'on' : 'off'}
                    onChange={(checked) => updateState(`${state}-label-off`, checked)}
                  />
                  <Switch 
                    state={state as any} 
                    label={true} 
                    labelText={`${state} ON`} 
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
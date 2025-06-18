/* ===================================
   CUBE TOGGLE STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Toggle/CubeToggle.stories.tsx
   Based on Figma Cube/Toggle specifications (Node: 1206-89512)
   8 variants: 4 states × 2 toggle options
   Fixed dimensions: 68px × 32px
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { CubeToggle } from './CubeToggle';
import React from 'react';

const meta: Meta<typeof CubeToggle> = {
  title: 'Components/Toggle/CubeToggle',
  component: CubeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cube Toggle component following Figma design specifications. Fixed 68x32px compact toggle with 8 variants covering all states and toggle options.'
      }
    }
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'disable'],
      description: 'Cube toggle state'
    },
    toggle: {
      control: 'select',
      options: ['off', 'on'],
      description: 'Cube toggle state'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the cube toggle is disabled'
    },
    children: {
      control: 'text',
      description: 'Custom content (defaults to OFF/ON)'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when cube toggle state changes'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<typeof CubeToggle>;

// ===== BASIC STORIES =====

export const Default: Story = {
  render: () => {
    const [isOn, setIsOn] = React.useState(false);
    return (
      <CubeToggle
        state="default"
        toggle={isOn ? 'on' : 'off'}
        onChange={(checked) => setIsOn(checked)}
      />
    );
  }
};

export const On: Story = {
  render: () => {
    const [isOn, setIsOn] = React.useState(true);
    return (
      <CubeToggle
        state="default"
        toggle={isOn ? 'on' : 'off'}
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
          <CubeToggle 
            state="default" 
            toggle={states.default ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, default: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Hover</div>
          <CubeToggle 
            state="hover" 
            toggle={states.hover ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, hover: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Focus</div>
          <CubeToggle 
            state="focus" 
            toggle={states.focus ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, focus: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Disabled</div>
          <CubeToggle state="disable" toggle={states.disable ? 'on' : 'off'} />
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
          <CubeToggle 
            state="default" 
            toggle={states.default ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, default: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Hover ON</div>
          <CubeToggle 
            state="hover" 
            toggle={states.hover ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, hover: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Focus ON</div>
          <CubeToggle 
            state="focus" 
            toggle={states.focus ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, focus: checked }))}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'semibold' }}>Disabled ON</div>
          <CubeToggle state="disable" toggle={states.disable ? 'on' : 'off'} />
        </div>
      </div>
    );
  }
};

// ===== INTERACTIVE STORY =====

export const Interactive: Story = {
  render: () => {
    const [isOn, setIsOn] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Interactive Cube Toggle
        </h3>
        
        <CubeToggle
          toggle={isOn ? 'on' : 'off'}
          onChange={(checked) => setIsOn(checked)}
        />
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Current state: {isOn ? 'ON' : 'OFF'}
        </div>
      </div>
    );
  }
};

// ===== CUSTOM CONTENT =====

export const CustomContent: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      mode: false,
      live: true,
      auto: false,
      sync: true
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Custom Content Examples
        </h3>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <CubeToggle
            toggle={states.mode ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, mode: checked }))}
          >
            MODE
          </CubeToggle>
          
          <CubeToggle
            toggle={states.live ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, live: checked }))}
          >
            LIVE
          </CubeToggle>
          
          <CubeToggle
            toggle={states.auto ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, auto: checked }))}
          >
            AUTO
          </CubeToggle>
          
          <CubeToggle
            toggle={states.sync ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, sync: checked }))}
          >
            SYNC
          </CubeToggle>
        </div>
      </div>
    );
  }
};

// ===== MULTIPLE TOGGLES =====

export const MultipleToggles: Story = {
  render: () => {
    const [toggleStates, setToggleStates] = React.useState({
      wifi: true,
      bluetooth: false,
      cellular: true,
      airplane: false
    });
    
    const updateToggle = (key: string, value: boolean) => {
      setToggleStates(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div style={{ 
        padding: '24px', 
        border: '1px solid #e4e7ec', 
        borderRadius: '8px',
        backgroundColor: '#fff',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          System Controls
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px' }}>Wi-Fi</span>
          <CubeToggle
            toggle={toggleStates.wifi ? 'on' : 'off'}
            onChange={(checked) => updateToggle('wifi', checked)}
          />
          
          <span style={{ fontSize: '14px' }}>Bluetooth</span>
          <CubeToggle
            toggle={toggleStates.bluetooth ? 'on' : 'off'}
            onChange={(checked) => updateToggle('bluetooth', checked)}
          />
          
          <span style={{ fontSize: '14px' }}>Cellular</span>
          <CubeToggle
            toggle={toggleStates.cellular ? 'on' : 'off'}
            onChange={(checked) => updateToggle('cellular', checked)}
          />
          
          <span style={{ fontSize: '14px' }}>Airplane Mode</span>
          <CubeToggle
            toggle={toggleStates.airplane ? 'on' : 'off'}
            onChange={(checked) => updateToggle('airplane', checked)}
          />
        </div>
        
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#667085' }}>
          Active: {Object.entries(toggleStates)
            .filter(([_, active]) => active)
            .map(([key]) => key)
            .join(', ') || 'None'}
        </div>
      </div>
    );
  }
};

// ===== STATUS INDICATORS =====

export const StatusIndicators: Story = {
  render: () => {
    const [statuses, setStatuses] = React.useState({
      server: true,
      database: false,
      cache: true,
      queue: false
    });
    
    const toggleStatus = (key: string) => {
      setStatuses(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };
    
    return (
      <div style={{ 
        padding: '24px', 
        border: '1px solid #e4e7ec', 
        borderRadius: '8px',
        backgroundColor: '#fff',
        maxWidth: '400px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Service Status Dashboard
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 'medium' }}>Web Server</span>
          <span style={{ 
            fontSize: '12px', 
            color: statuses.server ? '#10b981' : '#ef4444',
            fontWeight: 'medium'
          }}>
            {statuses.server ? 'ONLINE' : 'OFFLINE'}
          </span>
          <CubeToggle
            toggle={statuses.server ? 'on' : 'off'}
            onChange={() => toggleStatus('server')}
          />
          
          <span style={{ fontSize: '14px', fontWeight: 'medium' }}>Database</span>
          <span style={{ 
            fontSize: '12px', 
            color: statuses.database ? '#10b981' : '#ef4444',
            fontWeight: 'medium'
          }}>
            {statuses.database ? 'ONLINE' : 'OFFLINE'}
          </span>
          <CubeToggle
            toggle={statuses.database ? 'on' : 'off'}
            onChange={() => toggleStatus('database')}
          />
          
          <span style={{ fontSize: '14px', fontWeight: 'medium' }}>Cache Service</span>
          <span style={{ 
            fontSize: '12px', 
            color: statuses.cache ? '#10b981' : '#ef4444',
            fontWeight: 'medium'
          }}>
            {statuses.cache ? 'ONLINE' : 'OFFLINE'}
          </span>
          <CubeToggle
            toggle={statuses.cache ? 'on' : 'off'}
            onChange={() => toggleStatus('cache')}
          />
          
          <span style={{ fontSize: '14px', fontWeight: 'medium' }}>Message Queue</span>
          <span style={{ 
            fontSize: '12px', 
            color: statuses.queue ? '#10b981' : '#ef4444',
            fontWeight: 'medium'
          }}>
            {statuses.queue ? 'ONLINE' : 'OFFLINE'}
          </span>
          <CubeToggle
            toggle={statuses.queue ? 'on' : 'off'}
            onChange={() => toggleStatus('queue')}
          />
        </div>
      </div>
    );
  }
};

// ===== ALL 8 VARIANTS MATRIX =====

export const All8Variants: Story = {
  render: () => {
    const [states, setStates] = React.useState(() => {
      const initial: Record<string, boolean> = {};
      ['default', 'hover', 'focus', 'disable'].forEach(state => {
        initial[`${state}-off`] = false;
        initial[`${state}-on`] = true;
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
          All 8 Figma Variants (4 states × 2 toggle options)
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {['default', 'hover', 'focus', 'disable'].map(state => (
            <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 'medium', textAlign: 'center' }}>
                {state.charAt(0).toUpperCase() + state.slice(1)} State
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <CubeToggle 
                  state={state as any} 
                  toggle={states[`${state}-off`] ? 'on' : 'off'}
                  onChange={(checked) => updateState(`${state}-off`, checked)}
                />
                <div style={{ fontSize: '10px', color: '#667085' }}>OFF</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <CubeToggle 
                  state={state as any} 
                  toggle={states[`${state}-on`] ? 'on' : 'off'}
                  onChange={(checked) => updateState(`${state}-on`, checked)}
                />
                <div style={{ fontSize: '10px', color: '#667085' }}>ON</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

// ===== FIGMA DIMENSIONS SHOWCASE =====

export const FigmaDimensions: Story = {
  render: () => {
    const [states, setStates] = React.useState({ left: false, right: true });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'semibold' }}>
          Figma Dimensions: 68px × 32px (Fixed)
        </h3>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          padding: '16px',
          border: '1px dashed #e4e7ec',
          borderRadius: '4px'
        }}>
          <CubeToggle 
            toggle={states.left ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, left: checked }))}
          />
          <span style={{ fontSize: '14px', color: '#667085' }}>←→ 68px</span>
          <CubeToggle 
            toggle={states.right ? 'on' : 'off'}
            onChange={(checked) => setStates(prev => ({ ...prev, right: checked }))}
          />
        </div>
        
        <div style={{ fontSize: '12px', color: '#667085', textAlign: 'center' }}>
          Fixed dimensions as specified in Figma<br />
          Width: 68px | Height: 32px
        </div>
      </div>
    );
  }
};
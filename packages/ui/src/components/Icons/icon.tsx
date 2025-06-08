/* ===================================
   ICON SYSTEM - TypeScript Fixed Implementation
   File: packages/ui/src/components/Icon/Icon.tsx
   ================================== */

import React from 'react';

// Base icon props interface
export interface BaseIconProps {
  size?: 16 | 20 | 24;
  stroke?: string;
  fill?: string;
  className?: string;
  'aria-hidden'?: boolean;
  role?: string;
}

// Icon component type
export type IconComponent = React.FC<BaseIconProps>;

// Default icon props
const DEFAULT_ICON_PROPS: Partial<BaseIconProps> = {
  size: 24,
  stroke: 'currentColor',
  fill: 'none',
  'aria-hidden': true,
  role: 'img'
};

// Icon wrapper component for consistent styling
export const IconWrapper: React.FC<BaseIconProps & { children: React.ReactNode }> = ({
  size = 24,
  stroke = 'currentColor',
  fill = 'none',
  className = '',
  children,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

// Common Icons Library
export const ChevronDownIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="m6 9 6 6 6-6" />
  </IconWrapper>
);

export const ChevronUpIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="m18 15-6-6-6 6" />
  </IconWrapper>
);

export const ChevronLeftIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="m15 18-6-6 6-6" />
  </IconWrapper>
);

export const ChevronRightIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconWrapper>
);

export const PlusIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M5 12h14" />
    <path d="m12 5v14" />
  </IconWrapper>
);

export const XIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconWrapper>
);

export const CheckIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </IconWrapper>
);

export const SearchIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </IconWrapper>
);

export const DownloadIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </IconWrapper>
);

export const UploadIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </IconWrapper>
);

export const AttachmentIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M14.9999 7.50001L7.19054 15.4406C6.932 15.726 6.79309 16.0998 6.80257 16.4847C6.81205 16.8697 6.96919 17.2362 7.24146 17.5085C7.51372 17.7807 7.88027 17.9379 8.2652 17.9474C8.65012 17.9568 9.02396 17.8179 9.30929 17.5594L18.6187 8.11876C19.1357 7.54808 19.4136 6.80042 19.3946 6.03056C19.3757 5.2607 19.0614 4.52762 18.5168 3.98308C17.9723 3.43855 17.2392 3.12427 16.4694 3.10531C15.6995 3.08636 14.9518 3.36418 14.3812 3.88126L5.07179 13.3219C4.2289 14.1648 3.75537 15.308 3.75537 16.5C3.75537 17.692 4.2289 18.8352 5.07179 19.6781C5.91468 20.521 7.05789 20.9946 8.24992 20.9946C9.44195 20.9946 10.5852 20.521 11.428 19.6781L19.1249 12" />
  </IconWrapper>
);

export const EditIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </IconWrapper>
);

export const DeleteIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </IconWrapper>
);

export const SettingsIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6" />
    <path d="m21 12-6-6-6 6-6-6" />
  </IconWrapper>
);

export const InfoIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="m12 8h.01" />
  </IconWrapper>
);

export const WarningIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="m12 17.02.01 0" />
  </IconWrapper>
);

export const ErrorIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </IconWrapper>
);

export const LoadingIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </IconWrapper>
);

export const EyeIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </IconWrapper>
);

export const HeartIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </IconWrapper>
);

export const RefreshIcon: IconComponent = (props) => (
  <IconWrapper {...DEFAULT_ICON_PROPS} {...props}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </IconWrapper>
);

// Icon registry for dynamic icon loading
export const ICON_REGISTRY = {
  'chevron-down': ChevronDownIcon,
  'chevron-up': ChevronUpIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'plus': PlusIcon,
  'x': XIcon,
  'check': CheckIcon,
  'search': SearchIcon,
  'download': DownloadIcon,
  'upload': UploadIcon,
  'attachment': AttachmentIcon,
  'edit': EditIcon,
  'delete': DeleteIcon,
  'settings': SettingsIcon,
  'info': InfoIcon,
  'warning': WarningIcon,
  'error': ErrorIcon,
  'loading': LoadingIcon,
  'eye': EyeIcon,
  'heart': HeartIcon,
  'refresh': RefreshIcon,
} as const;

export type IconName = keyof typeof ICON_REGISTRY;

// Dynamic Icon component with proper typing
export interface DynamicIconProps {
  name: IconName;
  size?: 16 | 20 | 24;
  stroke?: string;
  fill?: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = ICON_REGISTRY[name];
  return IconComponent ? <IconComponent {...props} aria-hidden /> : null;
};

// Icon utilities
export const getIconByName = (name: IconName): IconComponent | null => {
  return ICON_REGISTRY[name] || null;
};

export const getAvailableIcons = (): IconName[] => {
  return Object.keys(ICON_REGISTRY) as IconName[];
};
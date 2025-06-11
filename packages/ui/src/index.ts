/* ===================================
   UI LIBRARY MAIN EXPORT
   File: packages/ui/src/index.ts
   ================================== */

// Import theme CSS
import '@gazebo/tokens/src/theme.css';

// Export Button component
export { Button } from './components/Button';
export type { 
  ButtonProps, 
  TextButtonProps, 
  IconButtonProps,
  ButtonVariant,
  ButtonSize,
  IconPosition
} from './components/Button';
export { 
  isIconButton,
  isIconButtonProps,
  isTextButtonProps
} from './components/Button';

// Export Input component
export { Input } from './components/Input';
export type {
  InputProps,
  BaseInputProps,
  TextInputProps,
  SearchInputProps,
  PasswordInputProps,
  CreditCardInputProps,
  NumberInputProps,
  PhoneInputProps,
  CurrencyInputProps,
  SelectInputProps,
  MultiSelectInputProps,
  DatePickerInputProps,
  VerificationInputProps,
  SelectOption,
  InputVariant,
  InputState,
  InputSize,
  LabelPosition
} from './components/Input';
export {
  isTextBasedInput,
  isSearchInput,
  isPasswordInput,
  isCreditCardInput,
  isNumberInput,
  isPhoneInput,
  isCurrencyInput,
  isSelectInput,
  isDatePickerInput,
  isVerificationInput,
  isTextareaInput,
  getInputType,
  isErrorState,
  isSuccessState,
  isWarningState,
  isDisabledState,
  INPUT_STATES,
  INPUT_VARIANTS
} from './components/Input';

// Export Icons component
export {
  IconWrapper,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  XIcon,
  CheckIcon,
  SearchIcon,
  DownloadIcon,
  UploadIcon,
  AttachmentIcon,
  EditIcon,
  DeleteIcon,
  SettingsIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
  LoadingIcon,
  EyeIcon,
  EyeOffIcon,
  HeartIcon,
  RefreshIcon,
  CreditCardIcon,
  CardVisaIcon,
  CardMastercardIcon,
  CardAmexIcon,
  CardDiscoverIcon,
  ICON_REGISTRY,
  DynamicIcon,
  getIconByName,
  getAvailableIcons
} from './components/Icons';
export type {
  BaseIconProps,
  IconComponent,
  IconName,
  DynamicIconProps,
  IconRegistry,
  IconWrapperProps,
  IconSize,
  IconUtils
} from './components/Icons';
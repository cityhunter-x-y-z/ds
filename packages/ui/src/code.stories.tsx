import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "./code";

const meta = {
  title: "Components/Code",
  component: Code,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Code content",
    },
    className: {
      control: "text",
      description: "CSS class name",
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "npm install",
    className: "",
  },
};

export const FunctionName: Story = {
  args: {
    children: "useState()",
    className: "",
  },
};

export const WithStyling: Story = {
  args: {
    children: "const value = 42;",
    className: "px-2 py-1 bg-gray-100 rounded font-mono text-sm",
  },
};

export const MultiLine: Story = {
  args: {
    children: "import { useState } from 'react';",
    className: "block p-4 bg-gray-900 text-green-400 rounded font-mono",
  },
};

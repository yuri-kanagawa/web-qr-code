import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from './Button'

const meta = {
  title: 'UI/Cores/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'contained',
    color: 'secondary'
  }
}

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined'
  }
}

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text'
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'contained',
    disabled: true
  }
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'contained',
    size: 'large'
  }
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'contained',
    size: 'small'
  }
}

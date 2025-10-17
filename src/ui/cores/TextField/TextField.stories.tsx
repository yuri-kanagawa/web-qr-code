import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta = {
  title: 'UI/Cores/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard']
    },
    size: {
      control: 'select',
      options: ['small', 'medium']
    },
    disabled: {
      control: 'boolean'
    },
    error: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...'
  }
}

export const Filled: Story = {
  args: {
    label: 'Filled TextField',
    variant: 'filled',
    placeholder: 'Enter text...'
  }
}

export const Standard: Story = {
  args: {
    label: 'Standard TextField',
    variant: 'standard',
    placeholder: 'Enter text...'
  }
}

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email'
  }
}

export const Error: Story = {
  args: {
    label: 'Email',
    error: true,
    helperText: 'Invalid email address',
    value: 'invalid-email'
  }
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
    value: 'Cannot edit this'
  }
}

export const Multiline: Story = {
  args: {
    label: 'Message',
    multiline: true,
    rows: 4,
    placeholder: 'Enter your message...'
  }
}

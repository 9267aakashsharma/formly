# Design Engineering Take-Home Exercise

## Challenge: FormKit - A Visual Form Builder

FormKit is a visual form builder that allows users to create custom forms by dragging and dropping components, configuring their properties, and instantly previewing the result. Your task is to enhance and complete this form builder prototype.

## Getting Started

This repository contains a starter Next.js application with basic form builder structure already in place. Your job is to expand and enhance the existing functionality.

### Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Navigate to `http://localhost:3000` to see the app
5. Click "Start Building" to access the form builder at `/builder`

## Current Implementation

The repository includes a basic foundation with:

### Tech Stack

- **Next.js 15.3** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Zustand** for state management
- **React Hook Form** for form handling
- **Lucide React** for icons
- **Comprehensive UI components** (Button, Input, Card, etc.)

### Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with "Start Building" link
│   └── builder/
│       └── page.tsx        # Form builder interface
├── components/
│   ├── canvas.tsx          # Main form canvas component
│   ├── header.tsx          # Builder header
│   └── ui/                 # Complete UI component library
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── select.tsx
│       └── ... (12 components total)
└── lib/
    └── store.ts            # Zustand store for form state
```

### What's Already Built

- ✅ Basic Next.js app structure
- ✅ Form builder layout with sidebar and canvas
- ✅ Zustand store with field management
- ✅ Complete UI component library
- ✅ TypeScript configuration
- ✅ Basic form field rendering

### What You Need to Build

## Core Requirements

### 1. Enhanced Form Builder Interface

- **Sidebar Component Panel**: Populate the empty sidebar with draggable form components
- **Component Configuration**: Add a property panel to edit field settings
- **Visual Polish**: Improve the overall design and user experience

### 2. Form Components to Implement

Expand beyond the basic text input to include:

- Text Input (partially implemented)
- Text Area
- Select Dropdown
- Checkbox
- Radio Button Group
- Number Input
- Email Input

### 3. Drag & Drop Functionality

- Drag components from sidebar to canvas
- Reorder components within the canvas
- Visual feedback during drag operations
- Delete/remove components

### 4. Component Configuration

- Edit component labels and placeholders
- Set required/optional status
- Configure options for select/radio components
- Add validation rules

### 5. Form State Management

Enhance the existing Zustand store to handle:

- Component reordering
- Component deletion
- Field validation
- Form preview state

## Bonus Features (Choose what interests you)

- **Form Preview Mode**: Toggle between builder and preview
- **Export/Import**: Save forms as JSON
- **Form Validation**: Real-time validation feedback
- **Custom Styling**: Theme and style options
- **Responsive Design**: Mobile-friendly interface
- **Component Grouping**: Sections and fieldsets

## What We're Evaluating

### Code Quality (25%)

- Clean, readable TypeScript code
- Proper component architecture
- Good state management patterns
- Error handling and edge cases

### User Experience (25%)

- Intuitive drag-and-drop interactions
- Smooth animations and transitions
- Clear visual feedback
- Logical workflow

### Visual Design (25%)

- Professional appearance
- Consistent design system
- Attention to detail
- Responsive layout

### Problem Solving (25%)

- Creative solutions to complex interactions
- Performance considerations
- Code organization and scalability
- Use of existing components and patterns

## Implementation Tips

### Working with the Existing Code

- The `useFormStore` in `/src/lib/store.ts` is your main state management
- UI components in `/src/components/ui/` follow shadcn/ui patterns
- The `FormBuilderCanvas` component renders the current form fields
- Use the existing TypeScript interfaces as a starting point

### Suggested Approach

1. **Start with the sidebar**: Add draggable component buttons
2. **Implement basic drag & drop**: Get components moving to the canvas
3. **Enhance field rendering**: Support different input types
4. **Add configuration**: Property panel for editing fields
5. **Polish the experience**: Animations, validation, and UX improvements

### Libraries You Might Find Useful

The project already includes most dependencies you'll need, but feel free to add:

- `@dnd-kit/core` for drag and drop
- `framer-motion` for animations
- Additional icons from `lucide-react`

## Time Expectation

Plan for **1 hour** of focused work. We'd rather see a few features implemented really well than many features implemented poorly.

## Submission

When complete, ensure your solution:

1. Runs without errors (`npm run dev`)
2. Demonstrates your strongest skills
3. Includes brief comments explaining key decisions
4. Works with the existing code structure

## Questions?

If you have any questions about the existing code or requirements, please don't hesitate to reach out.

Good luck building! 🚀

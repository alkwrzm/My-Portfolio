# Quick Color Reference Guide

## 🎨 Using the New Color System

### Gradient Text Classes

```tsx
// Orange to Pink gradient (main brand)
<span className="gradient-text-orange-pink">Product Excellence</span>

// Full spectrum gradient (orange → pink → purple)
<span className="gradient-text">Amazing Text</span>
```

### Color Values

#### Primary Palette
```css
--color-primary: #FF6B35    /* Orange */
--color-secondary: #FF006E  /* Pink */
--color-accent: #00F5FF     /* Cyan */
--color-success: #00FF88    /* Green */
```

#### Backgrounds
```css
bg-black                    /* Pure black #000000 */
bg-[#0A0A0A]               /* Card backgrounds */
bg-[#1A1A1A]               /* Input backgrounds */
```

#### Borders
```css
border-[#2A2A2A]           /* Default borders */
border-[#FF6B35]           /* Orange accent */
border-[#FF006E]           /* Pink accent */
border-[#00F5FF]           /* Cyan accent */
```

#### Text
```css
text-white                  /* Primary text */
text-gray-400              /* Secondary text */
text-gray-300              /* Body text */
```

### Gradient Backgrounds

```tsx
// Button gradient
className="bg-gradient-to-r from-[#FF6B35] to-[#FF006E]"

// Hover state
className="hover:from-[#FF8555] hover:to-[#FF2080]"

// Animated gradient (for backgrounds)
className="animated-gradient"
```

### Interactive Effects

```tsx
// Lift effect on hover
className="hover-lift"

// Glow effects
className="glow-orange"   // Orange glow
className="glow-pink"     // Pink glow
className="glow-accent"   // Cyan glow

// Border gradient animation
className="border-gradient"
```

### Common Patterns

#### Vibrant CTA Button
```tsx
<Button 
  className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF006E] hover:from-[#FF8555] hover:to-[#FF2080] text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-orange"
>
  Click Me
</Button>
```

#### Interactive Card
```tsx
<Card className="bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#FF6B35] transition-all duration-300 hover-lift group">
  <CardHeader>
    <Icon className="text-[#FF6B35] group-hover:scale-110 transition-transform" />
    <CardTitle className="text-white">Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-400">Content</p>
  </CardContent>
</Card>
```

#### Availability Badge
```tsx
<Badge 
  variant="outline" 
  className="border-[#00FF88] bg-[#00FF88]/10 text-[#00FF88] hover:bg-[#00FF88]/20"
>
  <Sparkles className="w-3 h-3 mr-2 inline" />
  Available for opportunities
</Badge>
```

#### Section Title
```tsx
<h2 className="text-3xl md:text-4xl font-bold mb-4">
  Section <span className="gradient-text-orange-pink">Title</span>
</h2>
<div className="w-20 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF006E] rounded-full" />
```

### Animation Classes

```css
/* Scroll indicator */
animate-[scroll-indicator_2s_ease-in-out_infinite]

/* Gradient shift */
animated-gradient

/* Hover lift */
hover-lift
```

### Transition Durations

```tsx
transition-all duration-300   // Fast (buttons, links)
transition-all duration-500   // Medium (cards, images)
transition-all duration-800   // Slow (dramatic effects)
```

## 💡 Design Tips

1. **Use gradients sparingly** - Reserve for headlines and CTAs
2. **Maintain contrast** - Always ensure text is readable
3. **Consistent hover states** - Use lift + border color change
4. **Icon animations** - Scale to 110% on hover
5. **Glow effects** - Use on primary CTAs only

## 🚀 Quick Start Examples

### Hero Section Pattern
```tsx
<section className="relative min-h-screen bg-black">
  <h1 className="text-7xl font-bold">
    <span className="text-white">Crafting</span>
    <br />
    <span className="gradient-text-orange-pink">Excellence</span>
  </h1>
  
  <Button className="bg-gradient-to-r from-[#FF6B35] to-[#FF006E] glow-orange">
    Get Started
  </Button>
  
  {/* Background glows */}
  <div className="absolute top-1/4 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-[#FF6B35]/20 blur-[150px]" />
</section>
```

### Card Grid Pattern
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map((item, i) => (
    <Card className="bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#FF6B35] hover-lift group">
      <CardHeader>
        <item.Icon className="text-[#FF6B35] group-hover:scale-110 transition-transform" />
        <CardTitle className="text-white">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

## 📱 Responsive Considerations

- Gradients work on all screen sizes
- Hover effects are touch-friendly
- Text remains readable on mobile
- Glow effects are subtle on small screens

## ✨ Pro Tips

1. **Layer glows** - Use multiple background glows for depth
2. **Gradient direction** - Use `90deg` for horizontal, `135deg` for diagonal
3. **Opacity** - Use `/10`, `/20` for subtle backgrounds
4. **Group hover** - Use `group` and `group-hover:` for parent-child interactions
5. **Stagger animations** - Use different delays for sequential reveals

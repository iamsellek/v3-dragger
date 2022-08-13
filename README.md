# v3-dragger

A vue toolset that let's you make any element draggable, on both mobile and desktop with just 4 lines of code!

## Installation

You know the drill here:

### NPM

`npm install v3-dragger`

### Yarn

`yarn add v3-dragger`

## Usage

There are two ways you can use v3-dragger. The far easier and quicker way is as a vue directive, but some hook functions are also provided, in case you have a special use case and just want to have the library do _only_ the math for you.

### Directive

If you're planning on using the provided directive (recommended!), you'll need to register it globally in your Vue project.

```ts main.ts
import { createApp } from 'vue';
import { vDraggerBeforeMount, vDraggerUnMount } from 'v3-dragger';

createApp(App)
  .directive('dragger', {
    beforeMount: vDraggerBeforeMount,
    unmounted: vDraggerUnMount,
  })
  .mount('#app');
```

```vue Draggable.vue
<div class="draggable-element" v-dragger>This is a draggable element</div>
```

If you do this, CSS variables by the names of `--v-dragger-y-offset` and `--v-dragger-x-offset` will automatically be added to the element. All you have to do at this point is set the proper positions of your element using those CSS variables. Here's an example:

```css
.draggable-element {
  position: relative;
  top: var(--v-dragger-y-offset);
  left: var(--v-dragger-x-offset);
}
```

And you're done! You can now drag your element around the screen.

### Directive with custom events

If you need to add extra functionality to your drag start, move, or end functions, you totally can! Make sure you set up the directive in your project like in the [previous section](#directive).

When you add your directive to an element, you can pass in any one of three functions that will fire when your drag/touch event starts, when your element is moved, and when your drag/touch event ends:

```html Draggable.vue
<template>
  <div
    class="draggable-element"
    v-dragger="{
      dragStart: () => {
        // do things on drag start
      },
      dragMove: (e) => {
        // do things when the element is dragged/moved
      },
      dragEnd: () => {
        // do things on drag end
      },
    }"
  >
    Drag me
  </div>
</template>
```

### Hook functions

In case you have a special use case (maybe you want to add the CSS variables to an element that isn't the one actually being dragged), you'll need to use the hook functions and do the rest of the work yourself.

In your script tag, import the proper hook function. You can import `useMobileDragger`, `useDesktopDragger`, or `useDragger`, depending on which device you want your drag to work on. `useDragger` works on both mobile and desktop.

The hook function will return several state variables and functions for your use. `useMobileDragger` will return variables that start with 'touch' while `useDesktopDragger` and `useDragger` will return variables that start with 'drag'.

#### dragYStart/touchYStart, dragXStart/touchXStart

These are the starting positions of the cursor when the user started the drag/touch event. They are set to 0 until the user starts dragging.

#### dragYOffset/touchYOffset, dragXOffset/touchXOffset

These are the current offsets of the cursor from the starting position. They are set to 0 until the user starts dragging. These are the important variables for you. You'll use these to set the CSS position of your element using CSS variables.

#### dragStart, dragMove, resetState

These three are event functions. `dragStart` and `dragEnd` obviously fire at the appropriate times. `resetState` allows you to manually reset all of the state variables (above) back to 0 in one function call.

You'll notice the hook isn't returning a `dragEnd`. This is because the logic that should fire on a drag's end is going to be entirely dependent on the use case. If you don't need to do anything special on a drag's end, you don't have to worry about anything at all at this point!

### Using hook functions in conjunction with CSS variables

So you've fired the hook function and you're grabbing the necessary variables off of it to allow your user to drag your element. What next? First, you'll need to utilize CSS variables in order to set the position of your element as the user drags. In your script tag, create a computed property that returns a CSS variable as a string.

```ts Draggable.vue
const dragYOffsetCss = computed(
  () => `--drag-y-offset: ${touchYOffset.value}px`
);
```

In your template, you'll have to add the computed property as the element's style and make sure you register your events!

```html Draggable.vue
<div
  class="draggable-element"
  :style="dragYOffsetCss"
  @dragstart="dragStart"
  @drag="dragMove"
  @dragmove="dragMove"
>
  This element is draggable on desktop!
</div>
```

You now have access to this value in your CSS and can use it to change an element's position as you see fit!

```css Draggable.vue
top: var(--drag-y-offset);
left: var(--drag-x-offset);
```

### Desktop vs mobile

You'll be working with two separate types of events when dealing with dragging between a desktop and a mobile device. As an FYI, here are the proper HTML events -> what platform they are utilized on -> and their corresponding functions returned by the hook functions:

#### useMobileDragger

- @touchstart -> Mobile only -> touchStart
- @touchmove -> Mobile only -> touchMove
- @touchend -> Mobile only -> touchEnd

#### useDesktopDragger

- @dragstart -> Desktop only -> dragStart
- @dragmove -> Desktop only -> dragMove
- @dragend -> Desktop only -> dragEnd

#### useDragger

- @dragstart -> Desktop and Mobile -> dragStart AND
- @touchstart -> Desktop and Mobile -> dragStart
- @dragmove -> Desktop and Mobile -> dragMove AND
- @touchmove -> Desktop and Mobile -> dragMove
- @dragend -> Desktop and Mobile -> dragEnd AND
- @touchend -> Desktop and Mobile -> dragEnd

As you can see, if you want to make something that works on both mobile and desktop, you'll need to add 6 events to your element.

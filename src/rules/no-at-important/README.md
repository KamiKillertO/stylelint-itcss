# no-at-important

This rule forbid the use of `!important`.
_`!important` make css maintenance hard, you should use it with [care](https://css-tricks.com/when-using-important-is-the-right-choice/)._

## options

### true

The following pattern are considered violations:

```css
a {
  color: white !important;
}

.foo {
  color: white !important;
}
```

### ignoreLayers: ["string"]

The ITCSS archi is based on [layers](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), it can be usefull to use `!important` in some of them like the `utilities` one.

This option disable the rule in the layers targeted by the option's content.

For example, given `ignoreLayers: ["utilities"]`

The following patterns are *not* considered violations:

```css
// file `styles/utilities/_utilities.util.css`
a {
  color: white !important;
}

.foo {
  color: white !important;
}
```

```css
// file `styles/utilities/util.css`
a {
  color: white !important;
}

.foo {
  color: white !important;
}
```

The following patterns are considered violations:

```css
// file `styles/layer/main.css`
a {
  color: white !important;
}

.foo {
  color: white !important;
}
```

```css
// file `styles/layer/_layer.main.css`
a {
  color: white !important;
}

.foo {
  color: white !important;
}
```

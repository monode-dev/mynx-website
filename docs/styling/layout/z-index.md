---
outline: deep
---

# Z Index

The 'zIndex' property determines the stacking order of components. For example when a component's 'zIndex' integer is set to 3, it ensures that the component appears in front of any other positioned elements with a 'zIndex' value lower than 3.

## Examples

```md
<Modal
/_..._/
cardStyle={{
    cornerRadius: 0.5,
    zIndex: 4,
    ...props.cardStyle,
  }}
/_..._/

>

<!-- Modal content -->
</Modal>
```

If you have a tooltip component that should appear above all other elements when it's visible, you could use zIndex in a similar way:

```md
<Tooltip
/_..._/
tooltipStyle={{
    zIndex: 3,
    ...props.tooltipStyle,
  }}
/_..._/

> /_..._/
> </Tooltip>
```

In this example, the Tooltip component will appear above other elements that have a zIndex of less than 3.

<br>

Similarly, if you have a dropdown menu that should appear above other elements when it's open, you could use zIndex:

```md
<DropdownMenu
/_..._/
menuStyle={{
    zIndex: 4,
    ...props.menuStyle,
  }}
/_..._/

> /_..._/
> </DropdownMenu>
```

In this example, the DropdownMenu component will appear above other elements that have a zIndex of less than 4.

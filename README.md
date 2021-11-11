# Sladio

[Documentación en español](https://groovy-stocking-90c.notion.site/Primeros-pasos-ca72a1fb376a42a1b7f26c4255ad0866)

#

## How is it used?

The first step is to install sladio as a dependency

```powershell
npm install sladio
```

In our html you must assign the following classes

```jsx
<div class="sladio">
  <div class="sladio__container">
    <div class="sladio__items">item0</div>
    <div class="sladio__items">item1</div>
    <div class="sladio__items">item2</div>
   </div>
</div>
```

You can also place an id in the element explicitly, if you do not do it, sladio will assign it automatically, ***note that this id is the one that goes in the configuration object***

```jsx

<div class="sladio" id="slider1">
	//...
</div>
```

If you don't put the `sladio_ container` container, sladio will create it automatically and put all the items inside it.


Once downloaded and with the assigned classes we create an instance of sladio

```jsx
const slider = new Sladio();
```

Sladio receives its configuration object as the first and only parameter, if it does not detect one it
automatically sets one default


### Default configuration

```jsx
navigation: {
	dragAndDrop: true,
	orientation: 'horizontal',
	infinity: false,
	buttons: {
		active: false,
	},
}
```


### Configuration object

As sladio is a fairly customizable slider, its configuration will be somewhat extensive, I recommend you to have
this configuration in an external file, and thus have the cleanest code.

#

```jsx
export const sladioConfig = {};
```

#

```jsx
import { sladioConfig } from '{path}/sladioConfig';

const slider = new Sladio(sladioConfig);

// Or...

const slider = new Sladio({
	//...
});
```

### Example configuration

```jsx
const config = {
  mode: 'development',

  navegation: {

    slider1: {
      dragAndDrop: true,
      orientation: 'horizontal', 
      infinity: true, 

      buttons: {
        active: true, 
        btnPrev: 'btn__prev',
        btnNext: 'btn__next',
        position: 'center',
      },

    },

  },
};
```


### Parametros

| Key                             | Value                                                                | Type    | Description                                                                                                                                                                                                                                               |
| ------------------------------- | -------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode                            | development / production                                             | string  | In this parameter we define if we are in a production or development environment, this is responsible for showing us logs in the console of missing configurations or errors.                                                                             |
| navegation                      | sliderId                                                             | object  | This parameter defines the configuration for the navigation of the slider, it is a list of objects where their keys are the ids of the sliders for example: **slider1**                                                                                   |
| navegation.sliderId.dragAndDrop | true / false                                                         | boolean | This parameter tells us if we want the drag & drop in our slider (Desktop mode)                                                                                                                                                                           |
| navegation.sliderId.orientation | vertical / horizontal                                                | string  | This parameter tells us if we want the selected slider to scroll horizontally or vertically                                                                                                                                                               |
| navegation.sliderId.infinity    | true / false                                                         | boolean | This parameter tells us that the selected slider has an infinite scroll                                                                                                                                                                                   |
| navegation.sliderId.buttons     | active: boolean, btnPrev: string, btnNext: string, position: string, | object  | This parameter configures the slider buttons - active: receives a boolean, this show or hide buttons - btnPrev, btnNext: Name of the class that will be applied to the buttons - position: Position where the buttons will be shown (top, center, bottom) |

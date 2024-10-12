# Melodix

## About 

`@taynotfound/Melodix` is a Music app for ProzillaOS.

## Installation

`@prozilla-os/core` is required to run this application.

```sh
$ npm install @prozilla-os/core @taynotfound/Melodix
$ yarn add @prozilla-os/core @taynotfound/Melodix
$ pnpm add @prozilla-os/core @taynotfound/Melodix
```

## Usage

### Basic setup

```tsx
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView, AppsConfig } from "@prozilla-os/core";
import { Melodix } from "@taynotfound/Melodix";

function App() {
  return (
    <ProzillaOS
      systemName="Example"
      tagLine="Powered by ProzillaOS"
      config={{
        apps: new AppsConfig({
          apps: [ Melodix ]
        })
      }}
    >
      <Taskbar/>
      <WindowsView/>
      <ModalsView/>
      <Desktop/>
    </ProzillaOS>
  );
}
```

## Links

- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

[github]: https://github.com/prozilla-os/Melodix-app
[npm]: https://www.npmjs.com/package/@taynotfound/Melodix
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla